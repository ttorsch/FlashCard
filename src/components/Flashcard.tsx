import React, { useRef } from 'react';
import { Star, Check, Play, Volume1 } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { TranslationKeys } from '../data/translations';

interface FlashcardProps {
  card: SurfVocabulary;
  isFlipped: boolean;
  onFlip: () => void;
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
  isStarred: boolean;
  onToggleStar: (id: string) => void;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
  frontLang?: 'EN' | 'TH';
  t: TranslationKeys;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  isFlipped,
  onFlip,
  onSpeak,
  isSpeaking,
  isStarred,
  onToggleStar,
  isMastered,
  onToggleMastered,
  onSwipeNext,
  onSwipePrev,
  frontLang = 'EN',
  t
}) => {
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeNext) {
      triggerHaptic();
      onSwipeNext();
    } else if (isRightSwipe && onSwipePrev) {
      triggerHaptic();
      onSwipePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleFlipClick = () => {
    triggerHaptic();
    onFlip();
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    onSpeak(card.audioText || card.english);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    onToggleStar(card.id);
  };

  const handleMasteredClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    onToggleMastered(card.id);
  };

  const frontLabel = frontLang === 'EN' ? 'ENGLISH' : t.thaiMeaningHeader;
  const frontWord = frontLang === 'EN' ? card.english : card.thaiMeaning;
  const frontFontSize = frontLang === 'EN' ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';

  const backLabel = frontLang === 'EN' ? 'THAI MEANING' : 'ENGLISH';
  const backWord = frontLang === 'EN' ? card.thaiMeaning : card.english;

  return (
    <div className="w-full max-w-md mx-auto px-4 my-2 no-select">
      {/* Perspective Container */}
      <div
        className="perspective-1000 w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Card Inner 3D Container */}
        <div
          onClick={handleFlipClick}
          className={`relative w-full min-h-[420px] rounded-[28px] transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            WebkitTransformStyle: 'preserve-3d',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* ================= FRONT SIDE (White Card) ================= */}
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
            {/* Top Bar: Category Pill & Star / Mastered Actions */}
            <div className="flex items-center justify-between z-10">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#F6F1EA] text-[#0B1F3B]/80 border border-[#0B1F3B]/10 truncate max-w-[60%]">
                {card.category}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {/* Bookmark / Star Button */}
                <button
                  onClick={handleStarClick}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all active-push ${
                    isStarred
                      ? 'bg-[#EB6F43] border-[#EB6F43] text-white shadow-sm'
                      : 'bg-transparent border-[#0B1F3B]/15 text-[#0B1F3B]/40 hover:text-[#EB6F43]'
                  }`}
                  title={isStarred ? 'Remove bookmark' : 'Bookmark card'}
                >
                  <Star className={`w-4 h-4 ${isStarred ? 'fill-white text-white' : ''}`} />
                </button>

                {/* Learned / Mastered Button */}
                <button
                  onClick={handleMasteredClick}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all active-push ${
                    isMastered
                      ? 'bg-[#0B1F3B] border-[#0B1F3B] text-white shadow-sm'
                      : 'bg-transparent border-[#0B1F3B]/15 text-[#0B1F3B]/40 hover:text-[#0B1F3B]'
                  }`}
                  title={isMastered ? 'Mark as reviewing' : 'Mark as learned'}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Center Content: Term & Listen Audio */}
            <div className="my-auto text-center py-4 z-10 flex flex-col items-center justify-center gap-4">
              <span className="lb-micro tracking-widest">{frontLabel}</span>

              <h2 className={`${frontFontSize} font-bold text-[#0B1F3B] leading-tight px-2`}>
                {frontWord}
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

            {/* Bottom Mobile Cue */}
            <div className="text-center text-xs text-[#0B1F3B]/45 font-medium z-10">
              {t.tapToFlip}
            </div>
          </div>

          {/* ================= BACK SIDE (Dark Midnight Navy Card) ================= */}
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
            {/* Top Bar: Thai Badge & Audio */}
            <div className="flex items-center justify-between z-10">
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[#EB6F43] text-white">
                {t.thaiTranslationBadge}
              </span>

              <button
                onClick={handleAudioClick}
                className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center active-push hover:bg-white/25 transition-all"
                title="Listen audio"
              >
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </button>
            </div>

            {/* Main Center Content */}
            <div className="my-auto py-2 z-10 flex flex-col gap-4">
              {/* Thai Meaning */}
              <div className="flex flex-col gap-1">
                <span className="lb-micro text-white/50">{backLabel}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {backWord}
                </h3>
              </div>

              {/* Thai Phonetic */}
              {card.thaiPhonetic && (
                <div className="border-t border-white/14 pt-3 flex flex-col gap-1">
                  <span className="lb-micro text-white/50">THAI PHONETIC</span>
                  <p className="text-base sm:text-lg font-semibold text-white">
                    {card.thaiPhonetic}
                  </p>
                </div>
              )}

              {/* Example Sentence */}
              {card.example && (
                <div className="border-t border-white/14 pt-3 flex flex-col gap-1">
                  <span className="lb-micro text-white/50">EXAMPLE</span>
                  <p className="text-xs sm:text-sm text-white/85 italic leading-relaxed">
                    "{card.example}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
