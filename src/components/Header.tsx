import React from 'react';
import { Waves, Sparkles, BookMarked, CheckCircle2, RefreshCw, Smartphone } from 'lucide-react';

interface HeaderProps {
  currentIndex: number;
  totalCards: number;
  starredCount: number;
  masteredCount: number;
  showStarredOnly: boolean;
  setShowStarredOnly: (val: boolean | ((prev: boolean) => boolean)) => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentIndex,
  totalCards,
  starredCount,
  masteredCount,
  showStarredOnly,
  setShowStarredOnly,
  onResetProgress
}) => {
  const progressPercent = totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 0;

  return (
    <header className="w-full max-w-2xl mx-auto px-3 pt-3 sm:pt-6 pb-1">
      {/* Top Banner */}
      <div className="flex flex-col gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-cyan-500/20">
        
        {/* Row 1: Logo & Mobile Web App Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/30 shrink-0">
              <Waves className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 tracking-tight">
                  SURF ENGLISH
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-cyan-300" /> Mobile
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1">
                Thai Surf Instructor & Student Vocabulary
              </p>
            </div>
          </div>

          <div className="hidden xs:flex items-center gap-1 text-[11px] text-cyan-400/80 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Ready</span>
          </div>
        </div>

        {/* Row 2: Quick Stats & Filter Badges (Touch Optimized 44px+ height) */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5">
          {/* Star Filter Button */}
          <button
            onClick={() => setShowStarredOnly((prev) => !prev)}
            className={`flex-1 min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border active-push ${
              showStarredOnly
                ? 'bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-amber-500/40 hover:text-amber-200'
            }`}
            title="Toggle Starred Cards filter"
          >
            <BookMarked className={`w-4 h-4 ${showStarredOnly ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>Starred ({starredCount})</span>
          </button>

          {/* Mastered Counter */}
          <div className="min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mastered: {masteredCount}</span>
          </div>

          {/* Reset button */}
          {(starredCount > 0 || masteredCount > 0) && (
            <button
              onClick={onResetProgress}
              className="w-10 h-[42px] flex items-center justify-center rounded-xl bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-700 active-push shrink-0"
              title="Reset progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
          <span>Card {totalCards > 0 ? currentIndex + 1 : 0} of {totalCards}</span>
          <span className="text-cyan-400 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-400 rounded-full transition-all duration-300 ease-out shadow-sm shadow-cyan-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
