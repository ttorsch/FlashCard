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
  const handleRateToggle = () => {
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
    <div className="w-full max-w-2xl mx-auto px-4 my-4 no-select">
      <div className="glass-panel p-4 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col gap-4">
        {/* Main Controls: Previous, Play/Shuffle, Next */}
        <div className="flex items-center justify-between gap-3">
          {/* Previous Card Button */}
          <button
            onClick={onPrev}
            disabled={totalCards <= 1}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700/80 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 font-bold shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-400" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Shuffle Button */}
          <button
            onClick={onShuffle}
            disabled={totalCards <= 1}
            className={`py-3 px-5 rounded-2xl border font-bold transition-all duration-200 flex items-center gap-2 shadow-lg active:scale-95 ${
              isShuffled
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 border-teal-300 shadow-teal-500/20'
                : 'bg-slate-800/90 text-cyan-300 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700/80'
            }`}
            title="Shuffle card deck"
          >
            <Shuffle className={`w-5 h-5 ${isShuffled ? 'text-slate-950 animate-spin-once' : 'text-cyan-400'}`} />
            <span className="hidden sm:inline">{isShuffled ? 'Shuffled' : 'Shuffle'}</span>
          </button>

          {/* Next Card Button */}
          <button
            onClick={onNext}
            disabled={totalCards <= 1}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 border border-cyan-300 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 font-black shadow-lg shadow-cyan-500/20"
          >
            <span className="hidden sm:inline">Next Card</span>
            <ChevronRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>

        {/* Secondary Options Bar: Audio Speed & Keyboard Shortcuts */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 px-1 text-xs text-slate-400">
          {/* Audio Speed Rate Toggle */}
          <button
            onClick={handleRateToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Speed: <strong className="text-cyan-300">{getRateLabel()}</strong></span>
          </button>

          {/* Keyboard Hint Info */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-300">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-300">→</kbd> Nav
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-300">Space</kbd> Flip
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-300">S</kbd> Audio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
