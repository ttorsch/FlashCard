import React, { useRef } from 'react';
import {
  Volume2,
  Bookmark,
  RotateCw,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Volume1,
  MessageSquareQuote,
  Flame,
  Languages,
  HandMetal
} from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';

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
  onSwipePrev
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

  const getDifficultyBadge = (diff?: string) => {
    switch (diff) {
      case 'Beginner':
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Beginner
          </span>
        );
      case 'Intermediate':
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" /> Intermediate
          </span>
        );
      case 'Advanced':
        return (
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" /> Advanced
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2 no-select">
      {/* Mobile Swipe Guidance bar above card */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 mb-1">
        <span>← Swipe Prev</span>
        <span className="text-cyan-400/90 font-semibold flex items-center gap-1">
          <HandMetal className="w-3 h-3 text-cyan-400" /> Swipe or Tap card
        </span>
        <span>Swipe Next →</span>
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
          className={`relative w-full min-h-[440px] sm:min-h-[460px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden glass-card-front flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Wave Glows */}
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-44 h-44 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Category Pill, Difficulty, Star/Mastered (48px Touch Targets) */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 text-xs font-bold rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                  {card.category}
                </span>
                {getDifficultyBadge(card.difficulty)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Star Button */}
                <button
                  onClick={handleStarClick}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 active-push ${
                    isStarred
                      ? 'bg-amber-500/25 border-amber-400/60 text-amber-300 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:text-amber-300'
                  }`}
                  title={isStarred ? 'Remove bookmark' : 'Bookmark card'}
                >
                  <Bookmark className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>

                {/* Mastered Button */}
                <button
                  onClick={handleMasteredClick}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 active-push ${
                    isMastered
                      ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:text-emerald-300'
                  }`}
                  title={isMastered ? 'Mark as reviewing' : 'Mark as mastered'}
                >
                  <CheckCircle2 className={`w-5 h-5 ${isMastered ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                </button>
              </div>
            </div>

            {/* Main Center Content: English Term */}
            <div className="my-auto text-center py-4 z-10 flex flex-col items-center justify-center">
              <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                ENGLISH SURF TERMINOLOGY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md px-2 leading-tight">
                {card.english}
              </h2>

              {/* Quick Pronounce Button */}
              <button
                onClick={handleAudioClick}
                className={`mt-1 inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-200 border shadow-lg active-push ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-300 scale-105 animate-pulse'
                    : 'bg-slate-900/95 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/20'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Volume1 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Speaking...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-cyan-400" />
                    <span>Listen Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Mobile Cue: Tap to Flip */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 z-10">
              <span className="flex items-center gap-1 text-cyan-400/80 font-medium">
                <Languages className="w-3.5 h-3.5" /> English Front
              </span>
              <div className="flex items-center gap-1.5 font-bold bg-cyan-500/20 text-cyan-200 px-3 py-1.5 rounded-full border border-cyan-500/40 animate-pulse">
                <RotateCw className="w-3.5 h-3.5 text-cyan-300" />
                <span>Tap to flip</span>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden rotate-y-180 glass-card-back flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Wave Glows */}
            <div className="absolute -left-12 -top-12 w-44 h-44 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Thai Header & Audio */}
            <div className="flex items-center justify-between z-10 border-b border-teal-500/20 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  คำแปลภาษาไทย
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAudioClick}
                  className="w-10 h-10 rounded-xl bg-slate-900/90 text-cyan-300 border border-cyan-500/40 flex items-center justify-center active-push"
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
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">ความหมาย (Thai Meaning)</span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-teal-200 mt-0.5 leading-snug">
                  {card.thaiMeaning}
                </h3>
              </div>

              {/* Phonetic Pronunciation Guide */}
              <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-teal-500/30 shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-1 mb-0.5">
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                  คำอ่านออกเสียง (Thai Phonetic)
                </span>
                <p className="text-lg sm:text-2xl font-bold text-white tracking-wide">
                  "{card.thaiPhonetic}"
                </p>
              </div>

              {/* Example Sentence */}
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
                <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1 mb-1">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
                  Example Sentence
                </span>
                <p className="text-xs sm:text-base text-slate-200 italic leading-relaxed">
                  "{card.example}"
                </p>
              </div>

              {/* Surf Teaching Tip (if available) */}
              {card.surfTip && (
                <div className="flex items-start gap-2 text-[11px] bg-amber-500/10 text-amber-200 p-2.5 rounded-xl border border-amber-500/20">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="font-semibold text-amber-300">Surf Instructor Tip:</strong> {card.surfTip}</span>
                </div>
              )}
            </div>

            {/* Bottom Mobile Cue: Back Side Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 z-10">
              <span className="flex items-center gap-1 text-teal-400/80 font-medium">
                <Languages className="w-3.5 h-3.5" /> Thai Back
              </span>
              <div className="flex items-center gap-1.5 font-bold text-cyan-300 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
