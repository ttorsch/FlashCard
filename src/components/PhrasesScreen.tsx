import React, { useState, useRef } from 'react';
import { Star, Check, Play, Volume1, Globe, Lightbulb } from 'lucide-react';
import type { SurfPhrase } from '../data/surfPhrases';
import type { TranslationKeys } from '../data/translations';
import { ControlPanel } from './ControlPanel';

interface PhrasesScreenProps {
  phrases: SurfPhrase[];
  phraseCategories: string[];
  starredIds: string[];
  masteredIds: string[];
  onToggleStar: (id: string) => void;
  onToggleMastered: (id: string) => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  rate: number;
  setRate: (rate: number) => void;
  toggleLang: () => void;
  t: TranslationKeys;
}

export const PhrasesScreen: React.FC<PhrasesScreenProps> = ({
  phrases,
  phraseCategories,
  starredIds,
  masteredIds,
  onToggleStar,
  onToggleMastered,
  onSpeak,
  isSpeaking,
  rate,
  setRate,
  toggleLang,
  t
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Phrases');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // Swipe Gesture & Mobile Haptics
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 45;

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore if unsupported
      }
    }
  };

  const filteredPhrases = React.useMemo(() => {
    let list = phrases;
    if (selectedCategory !== 'All Phrases') {
      list = list.filter((p) => p.category === selectedCategory);
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
  }, [phrases, selectedCategory, isShuffled, shuffledSeed]);

  const currentPhrase = filteredPhrases[currentIndex] || null;

  const handleNext = () => {
    if (filteredPhrases.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredPhrases.length);
  };

  const handlePrev = () => {
    if (filteredPhrases.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredPhrases.length) % filteredPhrases.length);
  };

  const handleShuffle = () => {
    setIsShuffled(true);
    setShuffledSeed(Date.now());
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    if (currentPhrase) {
      onSpeak(currentPhrase.audioText || currentPhrase.english);
    }
  };

  const progressPct =
    filteredPhrases.length > 0 ? Math.round(((currentIndex + 1) / filteredPhrases.length) * 100) : 0;

  const allCategoryList = ['All Phrases', ...phraseCategories];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-24 flex flex-col gap-3 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="lb-micro">SURF THAI PHRASES</span>
          <h1 className="text-xl font-black text-[#0B1F3B]">
            {t.phrasesTitle}
          </h1>
        </div>

        <button
          onClick={toggleLang}
          className="p-2 rounded-full bg-white text-[#0B1F3B] border border-[#0B1F3B]/15 font-bold text-xs active-push shadow-xs cursor-pointer"
          title="Switch UI Language"
        >
          <Globe className="w-4 h-4 text-[#EB6F43]" />
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-select snap-x">
        {allCategoryList.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All Phrases' ? phrases.length : phrases.filter((p) => p.category === cat).length;
          const label = cat === 'All Phrases' ? t.allPhrasesCategories : cat;

          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`snap-start whitespace-nowrap min-h-[38px] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active-push border ${
                isSelected
                  ? 'bg-[#0B1F3B] text-white border-[#0B1F3B] shadow-sm'
                  : 'bg-white text-[#0B1F3B]/70 border-[#0B1F3B]/12 hover:border-[#0B1F3B]/30'
              }`}
            >
              <span>{label}</span>
              <span
                className={`ml-0.5 px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F6F1EA] text-[#0B1F3B]/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between text-xs font-bold text-[#0B1F3B]/60 px-1">
        <span>
          {filteredPhrases.length > 0 ? currentIndex + 1 : 0} / {filteredPhrases.length}
        </span>
        <span className="text-[#EB6F43] font-mono font-bold">{progressPct}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#0B1F3B]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#EB6F43] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Phrase Card */}
      <main className="my-1 no-select">
        {currentPhrase ? (
          <div
            className="perspective-1000 w-full"
            onTouchStart={(e) => {
              touchStartX.current = e.targetTouches[0].clientX;
            }}
            onTouchMove={(e) => {
              touchEndX.current = e.targetTouches[0].clientX;
            }}
            onTouchEnd={() => {
              if (!touchStartX.current || !touchEndX.current) return;
              const distance = touchStartX.current - touchEndX.current;
              if (distance > minSwipeDistance) handleNext();
              else if (distance < -minSwipeDistance) handlePrev();
              touchStartX.current = null;
              touchEndX.current = null;
            }}
          >
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              className={`relative w-full min-h-[420px] rounded-[28px] transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                WebkitTransformStyle: 'preserve-3d',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* FRONT SIDE (White Card) */}
              <div
                className={`absolute inset-0 w-full h-full rounded-[28px] p-6 glass-card-front flex flex-col justify-between overflow-hidden bg-white border border-[#0B1F3B]/12 transition-opacity duration-300 ${
                  isFlipped ? 'opacity-0 pointer-events-none invisible' : 'opacity-100 z-10 visible'
                }`}
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg) translateZ(1px)',
                  WebkitTransform: 'rotateY(0deg) translateZ(1px)'
                }}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#F6F1EA] text-[#0B1F3B]/80 border border-[#0B1F3B]/10 truncate max-w-[60%]">
                    {currentPhrase.category}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(currentPhrase.id);
                      }}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all active-push ${
                        starredIds.includes(currentPhrase.id)
                          ? 'bg-[#EB6F43] border-[#EB6F43] text-white shadow-sm'
                          : 'bg-transparent border-[#0B1F3B]/15 text-[#0B1F3B]/40 hover:text-[#EB6F43]'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${starredIds.includes(currentPhrase.id) ? 'fill-white text-white' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMastered(currentPhrase.id);
                      }}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all active-push ${
                        masteredIds.includes(currentPhrase.id)
                          ? 'bg-[#0B1F3B] border-[#0B1F3B] text-white shadow-sm'
                          : 'bg-transparent border-[#0B1F3B]/15 text-[#0B1F3B]/40 hover:text-[#0B1F3B]'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="my-auto text-center py-4 z-10 flex flex-col items-center justify-center gap-4">
                  <span className="lb-micro tracking-widest">{t.englishPhraseBadge}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3B] leading-snug px-2">
                    "{currentPhrase.english}"
                  </h2>

                  <button
                    onClick={handleAudioClick}
                    className={`mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-md active-push ${
                      isSpeaking
                        ? 'bg-[#EB6F43] text-white scale-105 animate-pulse'
                        : 'bg-[#EB6F43] text-white hover:bg-[#D85F35]'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <Volume1 className="w-4 h-4 animate-spin text-white" />
                        <span>{t.speaking}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                        <span>{t.listenAudio}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-xs text-[#0B1F3B]/45 font-medium z-10">
                  {t.tapToFlip}
                </div>
              </div>

              {/* BACK SIDE (Midnight Navy Card) */}
              <div
                className={`absolute inset-0 w-full h-full rounded-[28px] p-6 glass-card-back flex flex-col justify-between overflow-hidden bg-[#0B1F3B] text-white transition-opacity duration-300 ${
                  isFlipped ? 'opacity-100 z-10 visible' : 'opacity-0 pointer-events-none invisible'
                }`}
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(1px)',
                  WebkitTransform: 'rotateY(180deg) translateZ(1px)'
                }}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#EB6F43] text-white">
                    {t.thaiTranslationBadge}
                  </span>

                  <button
                    onClick={handleAudioClick}
                    className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center active-push hover:bg-white/25 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </button>
                </div>

                <div className="my-auto py-2 z-10 flex flex-col gap-4">
                  {/* Thai Meaning */}
                  <div className="flex flex-col gap-1">
                    <span className="lb-micro text-white/50">{t.thaiMeaningHeader}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {currentPhrase.thaiMeaning}
                    </h3>
                  </div>

                  {/* Thai Phonetics */}
                  {currentPhrase.thaiPhonetic && (
                    <div className="border-t border-white/14 pt-3 flex flex-col gap-1">
                      <span className="lb-micro text-[#EB6F43] font-bold">THAI PHONETIC (คำอ่านออกเสียง)</span>
                      <p className="text-base sm:text-lg font-semibold text-white font-mono">
                        {currentPhrase.thaiPhonetic}
                      </p>
                    </div>
                  )}

                  {/* Context / Coaching Tip */}
                  {currentPhrase.context && (
                    <div className="border-t border-white/14 pt-3 flex flex-col gap-1">
                      <span className="lb-micro text-white/50 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-[#EB6F43]" />
                        {t.contextTipHeader}
                      </span>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                        {currentPhrase.context}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-[#0B1F3B]/50 text-xs font-semibold">
            {t.noCardsFound}
          </div>
        )}
      </main>

      {/* Footer Controls */}
      {filteredPhrases.length > 0 && (
        <ControlPanel
          onPrev={handlePrev}
          onNext={handleNext}
          onShuffle={handleShuffle}
          isShuffled={isShuffled}
          rate={rate}
          setRate={setRate}
          totalCards={filteredPhrases.length}
          t={t}
        />
      )}
    </div>
  );
};
