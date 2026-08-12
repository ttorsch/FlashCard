import React from 'react';
import { Waves, Sparkles, BookMarked, CheckCircle2, RefreshCw } from 'lucide-react';

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
    <header className="w-full max-w-4xl mx-auto px-4 pt-6 pb-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl shadow-xl border border-cyan-500/20">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Waves className="w-7 h-7 text-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 tracking-tight">
                SURF ENGLISH
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Flashcards
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Thai Surf Instructor & Student Vocabulary Guide
            </p>
          </div>
        </div>

        {/* Quick Stats & Filter Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Filter Button */}
          <button
            onClick={() => setShowStarredOnly((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              showStarredOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-amber-500/40 hover:text-amber-200'
            }`}
            title="Toggle Starred Cards filter"
          >
            <BookMarked className={`w-4 h-4 ${showStarredOnly ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>Bookmarked ({starredCount})</span>
          </button>

          {/* Mastered Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mastered: {masteredCount}</span>
          </div>

          {/* Reset button */}
          {(starredCount > 0 || masteredCount > 0) && (
            <button
              onClick={onResetProgress}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-cyan-300 hover:bg-slate-700 transition-colors border border-slate-700"
              title="Reset bookmarked and mastered progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1.5">
          <span>Card {totalCards > 0 ? currentIndex + 1 : 0} of {totalCards}</span>
          <span className="text-cyan-400 font-semibold">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-400 rounded-full transition-all duration-300 ease-out shadow-sm shadow-cyan-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
