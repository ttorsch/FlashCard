import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Gauge
} from 'lucide-react';
import type { TranslationKeys } from '../data/translations';

interface ControlPanelProps {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  isShuffled: boolean;
  rate: number;
  setRate: (rate: number) => void;
  totalCards: number;
  t: TranslationKeys;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onPrev,
  onNext,
  onShuffle,
  isShuffled,
  rate,
  setRate,
  totalCards,
  t
}) => {
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore if unsupported
      }
    }
  };

  const handlePrevClick = () => {
    triggerHaptic();
    onPrev();
  };

  const handleNextClick = () => {
    triggerHaptic();
    onNext();
  };

  const handleShuffleClick = () => {
    triggerHaptic();
    onShuffle();
  };

  const handleRateToggle = () => {
    triggerHaptic();
    if (rate === 0.8) setRate(1.0);
    else if (rate === 1.0) setRate(1.2);
    else setRate(0.8);
  };

  const getRateLabel = () => {
    if (rate === 0.8) return t.speedSlow;
    if (rate === 1.0) return t.speedNormal;
    return t.speedFast;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2 no-select safe-area-bottom">
      <div className="glass-panel p-3 sm:p-4 rounded-3xl border border-[#0F214A]/10 shadow-md bg-white flex flex-col gap-3">
        {/* Main Controls: Large Thumb-friendly Buttons for Phones */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Previous Card Button */}
          <button
            onClick={handlePrevClick}
            disabled={totalCards <= 1}
            className="flex-1 min-h-[50px] py-3 px-3 rounded-2xl bg-[#FAF8F5] text-[#0F214A] border border-[#0F214A]/20 hover:border-[#1D52B8]/50 active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 font-bold text-sm shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-[#1D52B8]" />
            <span>{t.prev}</span>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffleClick}
            disabled={totalCards <= 1}
            className={`min-h-[50px] px-4 rounded-2xl border font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm active-push ${
              isShuffled
                ? 'bg-[#1D52B8] text-white border-[#1D52B8] shadow-md'
                : 'bg-[#FAF8F5] text-[#0F214A] border-[#0F214A]/20 hover:border-[#1D52B8]/50'
            }`}
            title="Shuffle card deck"
          >
            <Shuffle className={`w-4 h-4 ${isShuffled ? 'text-white' : 'text-[#1D52B8]'}`} />
            <span>{t.shuffle}</span>
          </button>

          {/* Next Card Button */}
          <button
            onClick={handleNextClick}
            disabled={totalCards <= 1}
            className="flex-1 min-h-[50px] py-3 px-3 rounded-2xl bg-[#E52E2A] hover:bg-[#D4221E] text-white border border-[#E52E2A] active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 font-black text-sm shadow-md shadow-[#E52E2A]/20"
          >
            <span>{t.next}</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Secondary Options Bar: Audio Speed & Keyboard Shortcuts */}
        <div className="flex items-center justify-between border-t border-[#0F214A]/10 pt-2 px-1 text-xs text-[#0F214A]/70 font-semibold">
          {/* Audio Speed Rate Toggle */}
          <button
            onClick={handleRateToggle}
            className="flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-xl bg-[#FAF8F5] border border-[#0F214A]/15 hover:border-[#E52E2A]/40 text-[#0F214A] active-push transition-colors"
          >
            <Gauge className="w-3.5 h-3.5 text-[#E52E2A]" />
            <span>{t.speed} <strong className="text-[#E52E2A] font-black">{getRateLabel()}</strong></span>
          </button>

          {/* Mobile Gestures Notice */}
          <div className="flex items-center gap-1 text-[11px] text-[#0F214A]/60">
            <span>{t.swipeNotice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
