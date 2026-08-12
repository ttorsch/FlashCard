import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { SURF_VOCABULARY, DEFAULT_CATEGORIES } from './data/surfVocabulary';
import type { SurfVocabulary } from './data/surfVocabulary';
import { SURF_PHRASES, DEFAULT_PHRASE_CATEGORIES } from './data/surfPhrases';
import type { SurfPhrase } from './data/surfPhrases';
import { TRANSLATIONS } from './data/translations';
import type { Language } from './data/translations';

import { Navbar } from './components/Navbar';
import type { ScreenType } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { CategoryFilter } from './components/CategoryFilter';
import { Flashcard } from './components/Flashcard';
import { ControlPanel } from './components/ControlPanel';
import { PhrasesScreen } from './components/PhrasesScreen';
import { ManageScreen } from './components/ManageScreen';
import { PinModal } from './components/PinModal';
import { CardManagerModal } from './components/CardManagerModal';

import { useSpeech } from './hooks/useSpeech';
import { BookMarked, RefreshCcw, Globe } from 'lucide-react';

export function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [frontCardLang, setFrontCardLang] = useState<'EN' | 'TH'>('EN');

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_lang');
      return saved === 'th' || saved === 'en' ? saved : 'th';
    } catch {
      return 'th';
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

  // Auto-purge legacy localStorage keys on mount to prevent old cached mock data
  useEffect(() => {
    try {
      localStorage.removeItem('surf_flashcard_custom_vocabulary');
      localStorage.removeItem('surf_flashcard_categories');
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Vocabulary State
  const [vocabulary, setVocabulary] = useState<SurfVocabulary[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_vocabulary');
      return saved ? JSON.parse(saved) : SURF_VOCABULARY;
    } catch {
      return SURF_VOCABULARY;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Useful Phrases State
  const [phrases, setPhrases] = useState<SurfPhrase[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_phrases');
      return saved ? JSON.parse(saved) : SURF_PHRASES;
    } catch {
      return SURF_PHRASES;
    }
  });

  const [phraseCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_phrase_categories');
      return saved ? JSON.parse(saved) : DEFAULT_PHRASE_CATEGORIES;
    } catch {
      return DEFAULT_PHRASE_CATEGORIES;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);

  const [starredIds, setStarredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_starred');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('surf_flashcard_v2_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Modals
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isCardManagerOpen, setIsCardManagerOpen] = useState(false);

  const { speak, stop, isSpeaking, rate, setRate } = useSpeech();

  // Storage Effects (v2 Keys)
  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_v2_vocabulary', JSON.stringify(vocabulary));
    } catch (e) {
      console.error('Failed to save vocabulary', e);
    }
  }, [vocabulary]);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_v2_phrases', JSON.stringify(phrases));
    } catch (e) {
      console.error('Failed to save phrases', e);
    }
  }, [phrases]);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_v2_categories', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_v2_starred', JSON.stringify(starredIds));
    } catch (e) {
      console.error('Failed to save starred cards', e);
    }
  }, [starredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('surf_flashcard_v2_mastered', JSON.stringify(masteredIds));
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
    setPhrases(SURF_PHRASES);
    localStorage.removeItem('surf_flashcard_v2_vocabulary');
    localStorage.removeItem('surf_flashcard_v2_categories');
    localStorage.removeItem('surf_flashcard_v2_phrases');
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

  // Compute filtered dataset for vocabulary
  const filteredCards = useMemo(() => {
    let list: SurfVocabulary[] = vocabulary;

    if (selectedCategory !== 'All Categories') {
      list = list.filter((card) => card.category === selectedCategory);
    }

    if (showStarredOnly) {
      list = list.filter((card) => starredIds.includes(card.id));
    }

    if (isShuffled) {
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

  // Reset index on filter change
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
          colors: ['#EB6F43', '#0B1F3B', '#F6F1EA']
        });
      }
      return isNewMaster ? [...prev, id] : prev.filter((item) => item !== id);
    });
  }, []);

  // Navigation handlers
  const handleOpenStudyCategory = useCallback((catName: string) => {
    setSelectedCategory(catName);
    setScreen('study');
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const handleEditCardFromManage = useCallback((card: SurfVocabulary) => {
    setSelectedCategory(card.category);
    const indexInCat = vocabulary
      .filter((c) => c.category === card.category)
      .findIndex((c) => c.id === card.id);
    setCurrentIndex(Math.max(0, indexInCat));
    setScreen('study');
    setIsFlipped(false);
  }, [vocabulary]);

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

  const progressPct =
    filteredCards.length > 0 ? Math.round(((currentIndex + 1) / filteredCards.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F6F1EA] text-[#0B1F3B] flex flex-col justify-between select-none overflow-x-hidden">
      {/* SCREEN 1: HOME LANDING PAGE */}
      {screen === 'home' && (
        <HomeScreen
          vocabulary={vocabulary}
          categories={categories}
          phrases={phrases}
          phraseCategories={phraseCategories}
          masteredIds={masteredIds}
          onOpenStudyCategory={handleOpenStudyCategory}
          onGoStudy={() => setScreen('study')}
          onGoPhrases={() => setScreen('phrases')}
          onSpeak={speak}
          t={t}
        />
      )}

      {/* SCREEN 2: STUDY VOCABULARY */}
      {screen === 'study' && (
        <div className="w-full max-w-md mx-auto px-4 pt-6 pb-16 flex flex-col gap-3 animate-fadeIn">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <span className="lb-micro">SURF THAI VOCABULARY</span>
              <h1 className="text-xl font-black text-[#0B1F3B]">
                {t.tabStudy}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Front Card Language Toggle */}
              <button
                onClick={() => setFrontCardLang((prev) => (prev === 'EN' ? 'TH' : 'EN'))}
                className="px-3 py-1.5 rounded-full bg-white text-[#0B1F3B] border border-[#0B1F3B]/15 font-bold text-xs active-push shadow-xs cursor-pointer"
              >
                หน้าการ์ด: {frontCardLang}
              </button>

              {/* Site Language Switcher */}
              <button
                onClick={toggleLang}
                className="p-2 rounded-full bg-white text-[#0B1F3B] border border-[#0B1F3B]/15 font-bold text-xs active-push shadow-xs cursor-pointer"
                title="Switch UI Language"
              >
                <Globe className="w-4 h-4 text-[#EB6F43]" />
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            t={t}
          />

          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-[#0B1F3B]/60 px-1">
            <span>
              {filteredCards.length > 0 ? currentIndex + 1 : 0} / {filteredCards.length}
            </span>
            <span className="text-[#EB6F43] font-mono font-bold">{progressPct}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#0B1F3B]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EB6F43] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Main Flashcard */}
          <main className="my-1">
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
                frontLang={frontCardLang}
                t={t}
              />
            ) : (
              <div className="w-full max-w-sm mx-auto px-4 py-16 text-center bg-white rounded-3xl border border-[#0B1F3B]/15 my-6 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#EB6F43]/10 text-[#EB6F43] flex items-center justify-center mx-auto mb-3 border border-[#EB6F43]/20">
                  <BookMarked className="w-7 h-7 text-[#EB6F43]" />
                </div>
                <h3 className="text-lg font-black text-[#0B1F3B] mb-1">{t.noBookmarkedTitle}</h3>
                <p className="text-xs text-[#0B1F3B]/70 font-semibold mb-5">
                  {t.noBookmarkedDesc}
                </p>
                <button
                  onClick={() => setShowStarredOnly(false)}
                  className="px-5 py-2.5 rounded-full bg-[#EB6F43] text-white font-bold text-xs shadow-md hover:bg-[#D85F35] transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5 text-white" /> {t.viewAllCards}
                </button>
              </div>
            )}
          </main>

          {/* Footer Controls */}
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
        </div>
      )}

      {/* SCREEN 3: USEFUL PHRASES */}
      {screen === 'phrases' && (
        <PhrasesScreen
          phrases={phrases}
          phraseCategories={phraseCategories}
          starredIds={starredIds}
          masteredIds={masteredIds}
          onToggleStar={handleToggleStar}
          onToggleMastered={handleToggleMastered}
          onSpeak={speak}
          isSpeaking={isSpeaking}
          rate={rate}
          setRate={setRate}
          toggleLang={toggleLang}
          t={t}
        />
      )}

      {/* SCREEN 4: MANAGE */}
      {screen === 'manage' && (
        <ManageScreen
          vocabulary={vocabulary}
          masteredIds={masteredIds}
          onOpenPinModal={() => setIsPinModalOpen(true)}
          onSelectCardToEdit={handleEditCardFromManage}
          t={t}
        />
      )}

      {/* Fixed Bottom Navigation Bar (4 Tabs) */}
      <Navbar currentScreen={screen} onSelectScreen={setScreen} t={t} />

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

      {/* Card Manager Modal */}
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
    </div>
  );
}
