import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SURF_VOCABULARY, DEFAULT_CATEGORIES } from './data/surfVocabulary';
import type { SurfVocabulary } from './data/surfVocabulary';
import { TRANSLATIONS } from './data/translations';
import type { Language } from './data/translations';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { Flashcard } from './components/Flashcard';
import { ControlPanel } from './components/ControlPanel';
import { PinModal } from './components/PinModal';
import { CardManagerModal } from './components/CardManagerModal';
import { useSpeech } from './hooks/useSpeech';
import { Waves, BookMarked, RefreshCcw } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_lang');
      return (saved === 'th' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'th' : 'en'));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_lang', lang);
    } catch (e) {
      console.error('Failed to save language preference', e);
    }
  }, [lang]);

  const [vocabulary, setVocabulary] = useState<SurfVocabulary[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_custom_vocabulary');
      return saved ? JSON.parse(saved) : SURF_VOCABULARY;
    } catch {
      return SURF_VOCABULARY;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

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

  // PIN & Card Manager Modals
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isCardManagerOpen, setIsCardManagerOpen] = useState(false);

  const { speak, stop, isSpeaking, rate, setRate } = useSpeech();

  // Save vocabulary to local storage
  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_custom_vocabulary', JSON.stringify(vocabulary));
    } catch (e) {
      console.error('Failed to save vocabulary', e);
    }
  }, [vocabulary]);

  // Save categories to local storage
  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

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

  // Card Management Handlers
  const handleAddCard = useCallback((newCardData: Omit<SurfVocabulary, 'id'>) => {
    const newCard: SurfVocabulary = {
      ...newCardData,
      id: `surf-custom-${Date.now()}`
    };
    setVocabulary((prev) => [newCard, ...prev]);
  }, []);

  const handleEditCard = useCallback((updatedCard: SurfVocabulary) => {
    setVocabulary((prev) => prev.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
  }, []);

  const handleDeleteCard = useCallback((id: string) => {
    setVocabulary((prev) => prev.filter((card) => card.id !== id));
    setStarredIds((prev) => prev.filter((item) => item !== id));
    setMasteredIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const handleResetVocabulary = useCallback(() => {
    setVocabulary(SURF_VOCABULARY);
    setCategories(DEFAULT_CATEGORIES);
    localStorage.removeItem('surf_flashcard_custom_vocabulary');
    localStorage.removeItem('surf_flashcard_categories');
  }, []);

  // Category Handlers
  const handleAddCategory = useCallback((newCat: string) => {
    setCategories((prev) => {
      if (prev.includes(newCat)) return prev;
      return [...prev, newCat];
    });
  }, []);

  const handleDeleteCategory = useCallback((catToDelete: string) => {
    setCategories((prev) => {
      const remaining = prev.filter((c) => c !== catToDelete);
      const fallbackCat = remaining[0] || 'General';

      // Reassign cards in deleted category to fallback category
      setVocabulary((prevVocab) =>
        prevVocab.map((card) =>
          card.category === catToDelete ? { ...card, category: fallbackCat } : card
        )
      );

      return remaining;
    });

    if (selectedCategory === catToDelete) {
      setSelectedCategory('All Categories');
    }
  }, [selectedCategory]);

  // Compute filtered dataset
  const filteredCards = useMemo(() => {
    let list: SurfVocabulary[] = vocabulary;

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
  }, [vocabulary, selectedCategory, showStarredOnly, starredIds, isShuffled, shuffledSeed]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Categories': vocabulary.length
    };

    categories.forEach((cat) => {
      counts[cat] = vocabulary.filter((card) => card.category === cat).length;
    });

    return counts;
  }, [vocabulary, categories]);

  // Ensure index stays in bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    stop();
  }, [selectedCategory, showStarredOnly, isShuffled, vocabulary.length, stop]);

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
          colors: ['#E52E2A', '#1D52B8', '#0F214A']
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
      if (isPinModalOpen || isCardManagerOpen) return;
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
  }, [handleNext, handlePrev, speak, currentCard, isPinModalOpen, isCardManagerOpen]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0F214A] flex flex-col justify-between pb-8 select-none overflow-x-hidden">
      {/* Header with Stats, Progress & PIN Protected Manage Cards Button */}
      <Header
        currentIndex={currentIndex}
        totalCards={filteredCards.length}
        starredCount={starredIds.length}
        masteredCount={masteredIds.length}
        showStarredOnly={showStarredOnly}
        setShowStarredOnly={setShowStarredOnly}
        onResetProgress={handleResetProgress}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
        t={t}
      />

      {/* Category Filter Pills */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        t={t}
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
            t={t}
          />
        ) : (
          /* Empty State when zero cards match criteria */
          <div className="w-full max-w-lg mx-auto px-4 py-16 text-center glass-panel rounded-3xl border border-[#0F214A]/15 my-6 shadow-md bg-white">
            <div className="w-16 h-16 rounded-2xl bg-[#E52E2A]/10 text-[#E52E2A] flex items-center justify-center mx-auto mb-4 border border-[#E52E2A]/20">
              <BookMarked className="w-8 h-8 text-[#E52E2A]" />
            </div>
            <h3 className="text-xl font-black text-[#0F214A] mb-2">{t.noBookmarkedTitle}</h3>
            <p className="text-sm text-[#0F214A]/70 font-semibold mb-6">
              {t.noBookmarkedDesc}
            </p>
            <button
              onClick={() => setShowStarredOnly(false)}
              className="px-5 py-2.5 rounded-xl bg-[#E52E2A] text-white font-black text-sm shadow-md hover:bg-[#D4221E] transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-4 h-4 text-white" /> {t.viewAllCards}
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
          t={t}
        />
      )}

      {/* PIN Verification Modal (2026 PIN) */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          setIsPinModalOpen(false);
          setIsCardManagerOpen(true);
        }}
        correctPin="2026"
        t={t}
      />

      {/* Card Manager Modal (Add, Edit, Delete Cards & Categories) */}
      <CardManagerModal
        isOpen={isCardManagerOpen}
        onClose={() => setIsCardManagerOpen(false)}
        cards={vocabulary}
        categories={categories}
        onAddCard={handleAddCard}
        onEditCard={handleEditCard}
        onDeleteCard={handleDeleteCard}
        onResetVocabulary={handleResetVocabulary}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        t={t}
      />

      {/* Footer Branding */}
      <footer className="text-center text-xs text-[#0F214A]/60 font-semibold mt-2">
        <p className="flex items-center justify-center gap-1">
          Crafted with <Waves className="w-3.5 h-3.5 text-[#1D52B8] inline" /> for Surf Instructors & English Surf Learners
        </p>
      </footer>
    </div>
  );
}
