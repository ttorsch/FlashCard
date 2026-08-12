import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SURF_VOCABULARY, CATEGORIES } from './data/surfVocabulary';
import type { SurfVocabulary } from './data/surfVocabulary';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { Flashcard } from './components/Flashcard';
import { ControlPanel } from './components/ControlPanel';
import { useSpeech } from './hooks/useSpeech';
import { Waves, BookMarked, RefreshCcw } from 'lucide-react';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);
  const [starredIds, setStarredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_starred');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const { speak, stop, isSpeaking, rate, setRate } = useSpeech();

  // Save progress to local storage
  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_starred', JSON.stringify(starredIds));
    } catch (e) {
      console.error('Failed to save starred cards', e);
    }
  }, [starredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_mastered', JSON.stringify(masteredIds));
    } catch (e) {
      console.error('Failed to save mastered cards', e);
    }
  }, [masteredIds]);

  // Compute filtered dataset
  const filteredCards = useMemo(() => {
    let list: SurfVocabulary[] = SURF_VOCABULARY;

    if (selectedCategory !== 'All Categories') {
      list = list.filter((card) => card.category === selectedCategory);
    }

    if (showStarredOnly) {
      list = list.filter((card) => starredIds.includes(card.id));
    }

    if (isShuffled) {
      // Deterministic shuffle based on seed
      const array = [...list];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(i + shuffledSeed)) * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    return list;
  }, [selectedCategory, showStarredOnly, starredIds, isShuffled, shuffledSeed]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Categories': SURF_VOCABULARY.length
    };

    CATEGORIES.forEach((cat) => {
      if (cat !== 'All Categories') {
        counts[cat] = SURF_VOCABULARY.filter((card) => card.category === cat).length;
      }
    });

    return counts;
  }, []);

  // Ensure index stays in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    stop();
  }, [selectedCategory, showStarredOnly, isShuffled, stop]);

  const currentCard = filteredCards[currentIndex] || null;

  // Next & Prev handlers
  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    stop();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  }, [filteredCards.length, stop]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    stop();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length, stop]);

  const handleShuffle = useCallback(() => {
    setIsShuffled(true);
    setShuffledSeed(Date.now());
    setCurrentIndex(0);
    setIsFlipped(false);
    stop();
  }, [stop]);

  const handleToggleStar = useCallback((id: string) => {
    setStarredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleToggleMastered = useCallback((id: string) => {
    setMasteredIds((prev) => {
      const isNewMaster = !prev.includes(id);
      if (isNewMaster) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#14b8a6', '#f59e0b']
        });
      }
      return isNewMaster ? [...prev, id] : prev.filter((item) => item !== id);
    });
  }, []);

  const handleResetProgress = useCallback(() => {
    setStarredIds([]);
    setMasteredIds([]);
    setShowStarredOnly(false);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (currentCard) {
          speak(currentCard.audioText || currentCard.english);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, speak, currentCard]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between pb-8 select-none overflow-x-hidden">
      {/* Header with Stats & Progress */}
      <Header
        currentIndex={currentIndex}
        totalCards={filteredCards.length}
        starredCount={starredIds.length}
        masteredCount={masteredIds.length}
        showStarredOnly={showStarredOnly}
        setShowStarredOnly={setShowStarredOnly}
        onResetProgress={handleResetProgress}
      />

      {/* Category Filter Pills */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Main Flashcard View */}
      <main className="flex-1 flex flex-col items-center justify-center my-2">
        {currentCard ? (
          <Flashcard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((prev) => !prev)}
            onSpeak={speak}
            isSpeaking={isSpeaking}
            isStarred={starredIds.includes(currentCard.id)}
            onToggleStar={handleToggleStar}
            isMastered={masteredIds.includes(currentCard.id)}
            onToggleMastered={handleToggleMastered}
            onSwipeNext={handleNext}
            onSwipePrev={handlePrev}
          />
        ) : (
          /* Empty State when zero cards match criteria */
          <div className="w-full max-w-lg mx-auto px-4 py-16 text-center glass-panel rounded-3xl border border-slate-800 my-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <BookMarked className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Bookmarked Cards</h3>
            <p className="text-sm text-slate-400 mb-6">
              You haven't bookmarked any cards in this category yet. Click the bookmark icon on any card to save it for quick review!
            </p>
            <button
              onClick={() => setShowStarredOnly(false)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-4 h-4" /> View All Cards
            </button>
          </div>
        )}
      </main>

      {/* Footer Controls & Navigation */}
      {filteredCards.length > 0 && (
        <ControlPanel
          onPrev={handlePrev}
          onNext={handleNext}
          onShuffle={handleShuffle}
          isShuffled={isShuffled}
          rate={rate}
          setRate={setRate}
          totalCards={filteredCards.length}
        />
      )}

      {/* Footer Branding */}
      <footer className="text-center text-xs text-slate-500 mt-2">
        <p className="flex items-center justify-center gap-1">
          Crafted with <Waves className="w-3.5 h-3.5 text-cyan-400 inline" /> for Surf Instructors & English Surf Learners
        </p>
      </footer>
    </div>
  );
}
