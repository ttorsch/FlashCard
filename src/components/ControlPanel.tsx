import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Gauge
} from 'lucide-react';

interface ControlPanelProps {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  isShuffled: boolean;
  rate: number;
  setRate: (rate: number) => void;
  totalCards: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onPrev,
  onNext,
  onShuffle,
  isShuffled,
  rate,
  setRate,
  totalCards
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
    if (rate === 0.8) return '0.8x Slow';
    if (rate === 1.0) return '1.0x Normal';
    return '1.2x Fast';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2 no-select safe-area-bottom">
      <div className="glass-panel p-3 sm:p-4 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col gap-3">
        {/* Main Controls: Large Thumb-friendly Buttons for Phones */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Previous Card Button */}
          <button
            onClick={handlePrevClick}
            disabled={totalCards <= 1}
            className="flex-1 min-h-[50px] py-3 px-3 rounded-2xl bg-slate-900/90 text-slate-200 border border-slate-700 hover:border-cyan-500/50 active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 font-bold text-sm shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-400" />
            <span>Prev</span>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffleClick}
            disabled={totalCards <= 1}
            className={`min-h-[50px] px-4 rounded-2xl border font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-md active-push ${
              isShuffled
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 border-teal-300 shadow-teal-500/20'
                : 'bg-slate-900/90 text-cyan-300 border-slate-700 hover:border-cyan-500/50'
            }`}
            title="Shuffle card deck"
          >
            <Shuffle className={`w-4 h-4 ${isShuffled ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>Shuffle</span>
          </button>

          {/* Next Card Button */}
          <button
            onClick={handleNextClick}
            disabled={totalCards <= 1}
            className="flex-1 min-h-[50px] py-3 px-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 border border-cyan-300 active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-1.5 font-black text-sm shadow-lg shadow-cyan-500/20"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>

        {/* Secondary Options Bar: Audio Speed & Keyboard Shortcuts */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 px-1 text-xs text-slate-400">
          {/* Audio Speed Rate Toggle */}
          <button
            onClick={handleRateToggle}
            className="flex items-center gap-1.5 min-h-[36px] px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/40 text-slate-300 active-push transition-colors"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Speed: <strong className="text-cyan-300">{getRateLabel()}</strong></span>
          </button>

          {/* Mobile Gestures Notice */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Swipe cards to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
