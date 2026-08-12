import React from 'react';
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

  const speeds = [0.5, 0.8, 1.0];

  return (
    <div className="w-full max-w-md mx-auto px-4 my-2 no-select">
      <div className="flex flex-col gap-3">
        {/* Main Controls: Circle Prev, Pill Shuffle, Terracotta Next */}
        <div className="flex items-center gap-2.5">
          {/* Previous Card Circle Button */}
          <button
            onClick={handlePrevClick}
            disabled={totalCards <= 1}
            className="w-13 h-13 rounded-full bg-white text-[#0B1F3B] border border-[#0B1F3B]/12 hover:border-[#0B1F3B]/30 active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center text-xl font-bold shrink-0 shadow-xs cursor-pointer"
            title="Previous card"
          >
            ‹
          </button>

          {/* Shuffle Button */}
          <button
            onClick={handleShuffleClick}
            disabled={totalCards <= 1}
            className={`flex-1 h-13 rounded-full border text-sm font-bold transition-all duration-200 flex items-center justify-center shadow-xs active-push cursor-pointer ${
              isShuffled
                ? 'bg-[#0B1F3B] text-white border-[#0B1F3B]'
                : 'bg-white text-[#0B1F3B] border-[#0B1F3B]/12 hover:border-[#0B1F3B]/30'
            }`}
          >
            {t.shuffle}
          </button>

          {/* Next Card Button (Terracotta Pill) */}
          <button
            onClick={handleNextClick}
            disabled={totalCards <= 1}
            className="w-24 h-13 rounded-full bg-[#EB6F43] hover:bg-[#D85F35] text-white font-bold text-sm shadow-md shadow-[#EB6F43]/20 active-push disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{t.next}</span>
            <span className="text-base">›</span>
          </button>
        </div>

        {/* Audio Speed Selector (0.5x, 0.8x, 1.0x) & Swipe Notice */}
        <div className="flex items-center justify-between px-1 text-xs text-[#0B1F3B]/60 font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="text-[#0B1F3B]/60">{t.speed}:</span>
            <div className="flex items-center gap-1">
              {speeds.map((s) => {
                const isActive = rate === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      triggerHaptic();
                      setRate(s);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EB6F43] text-white shadow-xs'
                        : 'bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 hover:border-[#EB6F43]'
                    }`}
                  >
                    {s}x
                  </button>
                );
              })}
            </div>
          </div>

          <span className="lb-caption text-[11px]">{t.swipeNotice}</span>
        </div>
      </div>
    </div>
  );
};
