import React, { useRef } from 'react';
import {
  Volume2,
  Bookmark,
  RotateCw,
  Lightbulb,
  CheckCircle2,
  Volume1,
  MessageSquareQuote,
  Languages,
  HandMetal
} from 'lucide-react';
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

  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2 no-select">
      {/* Mobile Swipe Guidance bar above card */}
      <div className="flex items-center justify-between text-[10px] text-[#0F214A]/60 font-semibold px-2 mb-1">
        <span>{t.swipePrev}</span>
        <span className="text-[#1D52B8] font-bold flex items-center gap-1">
          <HandMetal className="w-3 h-3 text-[#1D52B8]" /> {t.swipeOrTap}
        </span>
        <span>{t.swipeNext}</span>
      </div>

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
          className={`relative w-full min-h-[440px] sm:min-h-[460px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden glass-card-front flex flex-col justify-between overflow-hidden bg-white">
            {/* Top Bar: Category Pill & Star/Mastered */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-3 py-1 text-xs font-black rounded-xl bg-[#1D52B8] text-white shadow-sm">
                  {card.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Star Button */}
                <button
                  onClick={handleStarClick}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 active-push ${
                    isStarred
                      ? 'bg-[#E52E2A]/15 border-[#E52E2A] text-[#E52E2A] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#0F214A]/20 text-[#0F214A]/50 hover:text-[#E52E2A]'
                  }`}
                  title={isStarred ? 'Remove bookmark' : 'Bookmark card'}
                >
                  <Bookmark className={`w-5 h-5 ${isStarred ? 'fill-[#E52E2A] text-[#E52E2A]' : ''}`} />
                </button>

                {/* Mastered Button */}
                <button
                  onClick={handleMasteredClick}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 active-push ${
                    isMastered
                      ? 'bg-[#1D52B8]/15 border-[#1D52B8] text-[#1D52B8] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#0F214A]/20 text-[#0F214A]/50 hover:text-[#1D52B8]'
                  }`}
                  title={isMastered ? 'Mark as reviewing' : 'Mark as mastered'}
                >
                  <CheckCircle2 className={`w-5 h-5 ${isMastered ? 'text-[#1D52B8] fill-[#1D52B8]/20' : ''}`} />
                </button>
              </div>
            </div>

            {/* Main Center Content: English Term */}
            <div className="my-auto text-center py-4 z-10 flex flex-col items-center justify-center">
              <span className="text-[11px] uppercase tracking-widest text-[#E52E2A] font-black mb-2">
                {t.englishTerminologyBadge}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0F214A] tracking-tight mb-4 px-2 leading-tight">
                {card.english}
              </h2>

              {/* Quick Pronounce Button */}
              <button
                onClick={handleAudioClick}
                className={`mt-1 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md active-push ${
                  isSpeaking
                    ? 'bg-[#E52E2A] text-white scale-105 animate-pulse'
                    : 'bg-[#1D52B8] text-white hover:bg-[#17449E]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Volume1 className="w-5 h-5 animate-spin text-white" />
                    <span>{t.speaking}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-white" />
                    <span>{t.listenAudio}</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Mobile Cue: Tap to Flip */}
            <div className="flex items-center justify-between text-xs text-[#0F214A]/60 border-t border-[#0F214A]/10 pt-3 z-10 font-bold">
              <span className="flex items-center gap-1 text-[#1D52B8]">
                <Languages className="w-3.5 h-3.5" /> {t.englishFront}
              </span>
              <div className="flex items-center gap-1.5 font-bold bg-[#E52E2A]/10 text-[#E52E2A] px-3 py-1.5 rounded-full border border-[#E52E2A]/30">
                <RotateCw className="w-3.5 h-3.5 text-[#E52E2A]" />
                <span>{t.tapToFlip}</span>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden rotate-y-180 glass-card-back flex flex-col justify-between overflow-hidden bg-[#FAF8F5]">
            {/* Top Bar: Thai Header & Audio */}
            <div className="flex items-center justify-between z-10 border-b border-[#0F214A]/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-black rounded-lg bg-[#E52E2A] text-white">
                  {t.thaiTranslationBadge}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAudioClick}
                  className="w-10 h-10 rounded-xl bg-[#1D52B8] text-white flex items-center justify-center active-push shadow-sm hover:bg-[#17449E]"
                  title="Play native English audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Center Content: Thai Meaning & Phonetics */}
            <div className="my-auto py-1 z-10 flex flex-col gap-3">
              {/* Thai Meaning */}
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#0F214A]/60 font-bold">{t.thaiMeaningHeader}</span>
                <h3 className="text-xl sm:text-3xl font-black text-[#0F214A] mt-0.5 leading-snug">
                  {card.thaiMeaning}
                </h3>
              </div>

              {/* Phonetic Pronunciation Guide */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#1D52B8]/25 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#1D52B8] font-black flex items-center gap-1 mb-0.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#1D52B8]" />
                  {t.thaiPhoneticHeader}
                </span>
                <p className="text-lg sm:text-2xl font-black text-[#0F214A] tracking-wide">
                  "{card.thaiPhonetic}"
                </p>
              </div>

              {/* Example Sentence */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#0F214A]/15 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#E52E2A] font-black flex items-center gap-1 mb-1">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#E52E2A]" />
                  {t.exampleSentenceHeader}
                </span>
                <p className="text-xs sm:text-base text-[#0F214A]/90 font-medium italic leading-relaxed">
                  "{card.example}"
                </p>
              </div>

              {/* Surf Teaching Tip (if available) */}
              {card.surfTip && (
                <div className="flex items-start gap-2 text-[11px] bg-[#E52E2A]/10 text-[#0F214A] p-2.5 rounded-xl border border-[#E52E2A]/25">
                  <Lightbulb className="w-4 h-4 text-[#E52E2A] shrink-0 mt-0.5" />
                  <span><strong className="font-bold text-[#E52E2A]">{t.surfTipHeader}</strong> {card.surfTip}</span>
                </div>
              )}
            </div>

            {/* Bottom Mobile Cue: Back Side Indicator */}
            <div className="flex items-center justify-between text-xs text-[#0F214A]/60 border-t border-[#0F214A]/10 pt-2.5 z-10 font-bold">
              <span className="flex items-center gap-1 text-[#E52E2A]">
                <Languages className="w-3.5 h-3.5" /> {t.thaiBack}
              </span>
              <div className="flex items-center gap-1.5 font-bold text-[#1D52B8] bg-white px-3 py-1.5 rounded-full border border-[#1D52B8]/30">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{t.tapToFlipBack}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
