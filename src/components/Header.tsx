import { BookMarked, CheckCircle2, RefreshCw, PlusCircle } from 'lucide-react';

interface HeaderProps {
  currentIndex: number;
  totalCards: number;
  starredCount: number;
  masteredCount: number;
  showStarredOnly: boolean;
  setShowStarredOnly: (val: boolean | ((prev: boolean) => boolean)) => void;
  onResetProgress: () => void;
  onOpenPinModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentIndex,
  totalCards,
  starredCount,
  masteredCount,
  showStarredOnly,
  setShowStarredOnly,
  onResetProgress,
  onOpenPinModal
}) => {
  const progressPercent = totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 0;

  return (
    <header className="w-full max-w-2xl mx-auto px-3 pt-3 sm:pt-6 pb-1">
      {/* Top Banner */}
      <div className="flex flex-col gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-cyan-500/20">
        
        {/* Quick Actions & Manage Cards */}
        <div className="flex items-center justify-between">
          <button
            onClick={onOpenPinModal}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-300 transition-all active-push shadow-sm shadow-cyan-500/10"
            title="Add or Manage Flashcards (PIN Required)"
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>Add / Manage Cards</span>
          </button>
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
