import React from 'react';
import { BookMarked, CheckCircle2, RefreshCw, PlusCircle, Globe } from 'lucide-react';
import type { Language, TranslationKeys } from '../data/translations';

interface HeaderProps {
  currentIndex: number;
  totalCards: number;
  starredCount: number;
  masteredCount: number;
  showStarredOnly: boolean;
  setShowStarredOnly: (val: boolean | ((prev: boolean) => boolean)) => void;
  onResetProgress: () => void;
  onOpenPinModal: () => void;
  lang: Language;
  onToggleLang: () => void;
  t: TranslationKeys;
}

export const Header: React.FC<HeaderProps> = ({
  currentIndex,
  totalCards,
  starredCount,
  masteredCount,
  showStarredOnly,
  setShowStarredOnly,
  onResetProgress,
  onOpenPinModal,
  lang,
  onToggleLang,
  t
}) => {
  const progressPercent = totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 0;

  return (
    <header className="w-full max-w-2xl mx-auto px-3 pt-3 sm:pt-6 pb-1">
      {/* Top Banner */}
      <div className="flex flex-col gap-3 glass-panel p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-md border border-[#0F214A]/10 bg-white/90">
        
        {/* Quick Actions, Manage Cards & Language Switcher */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onOpenPinModal}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-[#E52E2A] text-white hover:bg-[#D4221E] transition-all active-push shadow-sm"
            title="Add or Manage Flashcards (PIN Required)"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>{t.addManageCards}</span>
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1D52B8]/10 text-[#1D52B8] border border-[#1D52B8]/30 hover:bg-[#1D52B8]/20 transition-all font-black text-xs active-push shrink-0"
            title="Switch Language (English / Thai)"
          >
            <Globe className="w-4 h-4 text-[#1D52B8]" />
            <span>{lang === 'en' ? '🇹🇭 TH' : '🇺🇸 EN'}</span>
          </button>
        </div>

        {/* Row 2: Quick Stats & Filter Badges */}
        <div className="flex items-center justify-between gap-2 border-t border-[#0F214A]/10 pt-2.5">
          {/* Star Filter Button */}
          <button
            onClick={() => setShowStarredOnly((prev) => !prev)}
            className={`flex-1 min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border active-push ${
              showStarredOnly
                ? 'bg-[#E52E2A]/10 text-[#E52E2A] border-[#E52E2A]/40 shadow-sm'
                : 'bg-[#FAF8F5] text-[#0F214A] border-[#0F214A]/15 hover:border-[#E52E2A]/40 hover:text-[#E52E2A]'
            }`}
            title="Toggle Starred Cards filter"
          >
            <BookMarked className={`w-4 h-4 ${showStarredOnly ? 'text-[#E52E2A] fill-[#E52E2A]' : 'text-[#0F214A]/60'}`} />
            <span>{t.starred} ({starredCount})</span>
          </button>

          {/* Mastered Counter */}
          <div className="min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1D52B8]/10 text-[#1D52B8] border border-[#1D52B8]/30 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1D52B8]" />
            <span>{t.mastered}: {masteredCount}</span>
          </div>

          {/* Reset button */}
          {(starredCount > 0 || masteredCount > 0) && (
            <button
              onClick={onResetProgress}
              className="w-10 h-[42px] flex items-center justify-center rounded-xl bg-[#FAF8F5] text-[#0F214A]/60 hover:text-[#E52E2A] border border-[#0F214A]/15 active-push shrink-0"
              title="Reset progress"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F214A]/70 mb-1">
          <span>{t.cardCount} {totalCards > 0 ? currentIndex + 1 : 0} {t.of} {totalCards}</span>
          <span className="text-[#1D52B8] font-black">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-[#E8E3D9] rounded-full overflow-hidden border border-[#0F214A]/10">
          <div
            className="h-full bg-gradient-to-r from-[#1D52B8] to-[#E52E2A] rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
