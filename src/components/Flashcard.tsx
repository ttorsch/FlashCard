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
  Languages
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
  // Swipe Gesture Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

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
      onSwipeNext();
    } else if (isRightSwipe && onSwipePrev) {
      onSwipePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSpeak(card.audioText || card.english);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(card.id);
  };

  const handleMasteredClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="w-full max-w-2xl mx-auto px-4 my-4 no-select">
      {/* Perspective Container */}
      <div
        className="perspective-1000 w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Card Inner 3D Container */}
        <div
          onClick={onFlip}
          className={`relative w-full min-h-[420px] sm:min-h-[460px] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-9 backface-hidden glass-card-front flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Wave Watermarks */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Category Pill, Difficulty, Bookmarks */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 text-xs font-bold rounded-xl bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 shadow-sm">
                  {card.category}
                </span>
                {getDifficultyBadge(card.difficulty)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Star Button */}
                <button
                  onClick={handleStarClick}
                  className={`p-2.5 rounded-xl border transition-all duration-200 ${
                    isStarred
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-amber-300 hover:bg-slate-700'
                  }`}
                  title={isStarred ? 'Remove bookmark' : 'Bookmark card'}
                >
                  <Bookmark className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>

                {/* Mastered Button */}
                <button
                  onClick={handleMasteredClick}
                  className={`p-2.5 rounded-xl border transition-all duration-200 ${
                    isMastered
                      ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-emerald-300 hover:bg-slate-700'
                  }`}
                  title={isMastered ? 'Mark as reviewing' : 'Mark as mastered'}
                >
                  <CheckCircle2 className={`w-5 h-5 ${isMastered ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
                </button>
              </div>
            </div>

            {/* Main Center Content: English Term */}
            <div className="my-auto text-center py-6 z-10 flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">
                ENGLISH SURF TERMINOLOGY
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
                {card.english}
              </h2>

              {/* Quick Pronounce Button */}
              <button
                onClick={handleAudioClick}
                className={`mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 border shadow-lg ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-300 scale-105 animate-pulse'
                    : 'bg-slate-800/90 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Volume1 className="w-5 h-5 animate-spin" />
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

            {/* Bottom Cue: Tap to Flip */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4 z-10">
              <span className="flex items-center gap-1.5 text-cyan-400/80 font-medium">
                <Languages className="w-4 h-4" /> Front Side
              </span>
              <div className="flex items-center gap-1.5 font-medium bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/80 text-cyan-300 animate-bounce">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Tap card to flip</span>
              </div>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-9 backface-hidden rotate-y-180 glass-card-back flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Wave Watermarks */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Thai Header & Audio */}
            <div className="flex items-center justify-between z-10 border-b border-teal-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  คำแปลภาษาไทย
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAudioClick}
                  className="p-2.5 rounded-xl bg-slate-800/90 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/40 transition-colors"
                  title="Play native English audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Center Content: Thai Meaning & Phonetics */}
            <div className="my-auto py-2 z-10 flex flex-col gap-4">
              {/* Thai Meaning */}
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">ความหมาย (Thai Meaning)</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-200 mt-1">
                  {card.thaiMeaning}
                </h3>
              </div>

              {/* Phonetic Pronunciation Guide */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-teal-500/30 shadow-inner">
                <span className="text-xs uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-1.5 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                  คำอ่านออกเสียง (Thai Phonetic)
                </span>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  "{card.thaiPhonetic}"
                </p>
              </div>

              {/* Example Sentence */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5 mb-1.5">
                  <MessageSquareQuote className="w-4 h-4 text-cyan-400" />
                  Example Sentence
                </span>
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  "{card.example}"
                </p>
              </div>

              {/* Surf Teaching Tip (if available) */}
              {card.surfTip && (
                <div className="flex items-start gap-2 text-xs bg-amber-500/10 text-amber-200 p-3 rounded-xl border border-amber-500/20">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="font-semibold text-amber-300">Surf Instructor Tip:</strong> {card.surfTip}</span>
                </div>
              )}
            </div>

            {/* Bottom Cue: Back Side Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3 z-10">
              <span className="flex items-center gap-1.5 text-teal-400/80 font-medium">
                <Languages className="w-4 h-4" /> Back Side (Thai & Phonetics)
              </span>
              <div className="flex items-center gap-1.5 font-medium text-cyan-300">
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
