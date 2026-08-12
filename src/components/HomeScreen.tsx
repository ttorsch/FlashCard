import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { TranslationKeys } from '../data/translations';

interface HomeScreenProps {
  vocabulary: SurfVocabulary[];
  categories: string[];
  masteredIds: string[];
  onOpenStudyCategory: (cat: string) => void;
  onGoStudy: () => void;
  t: TranslationKeys;
}

const CAT_TH: Record<string, string> = {
  'Paddling & Takeoff': 'การพายและการออกตัว',
  'Ocean & Environment': 'ทะเลและสิ่งแวดล้อม',
  'Ocean & Waves': 'ทะเลและคลื่น',
  'Board & Equipment': 'อุปกรณ์โต้คลื่น',
  'Stance & Board': 'ท่ายืนและบอร์ด',
  'Safety & Etiquette': 'ความปลอดภัยและมารยาท',
  'Stance & Riding': 'ท่ายืนและการขี่',
  'Wave Reading & Positioning': 'การอ่านคลื่นและการยืนตำแหน่ง'
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  vocabulary,
  categories,
  masteredIds,
  onOpenStudyCategory,
  onGoStudy,
  t
}) => {
  const learnedCount = vocabulary.filter((c) => masteredIds.includes(c.id)).length;
  const totalCount = vocabulary.length;

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-24 flex flex-col gap-5 animate-fadeIn">
      {/* Top Title */}
      <div className="flex flex-col gap-0.5">
        <span className="lb-micro">SURF THAI</span>
        <h1 className="text-xl font-black text-[#0B1F3B] leading-tight">
          {t.welcomeTitle}
        </h1>
      </div>

      {/* Today's Learning Banner */}
      <div className="bg-[#0B1F3B] rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4 text-white">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
            TODAY
          </span>
          <h2 className="text-xl font-bold text-white leading-snug">
            {t.todayBannerTitle}
          </h2>
          <p className="text-xs text-white/70 font-medium mt-0.5">
            {t.learnedCountLabel} {learnedCount} {t.of} {totalCount} {t.cardCount}
          </p>
        </div>

        <button
          onClick={onGoStudy}
          className="w-16 h-16 rounded-full bg-[#EB6F43] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#EB6F43]/30 hover:scale-105 active-push transition-all shrink-0 cursor-pointer"
        >
          {t.goButton}
        </button>
      </div>

      {/* 2 Stat Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#0B1F3B]/10 flex flex-col gap-1">
          <span className="text-3xl font-black text-[#0B1F3B] font-mono leading-none">
            {learnedCount}
          </span>
          <span className="text-xs font-bold text-[#0B1F3B]/60">
            {t.learnedCountLabel}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#0B1F3B]/10 flex flex-col gap-1">
          <span className="text-3xl font-black text-[#EB6F43] font-mono leading-none">
            {totalCount}
          </span>
          <span className="text-xs font-bold text-[#0B1F3B]/60">
            {t.totalCountLabel}
          </span>
        </div>
      </div>

      {/* Categories List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-black text-[#0B1F3B]">
          {t.categoriesHeader}
        </h3>

        <div className="flex flex-col gap-2.5">
          {categories.map((catName) => {
            const catCards = vocabulary.filter((c) => c.category === catName);
            const doneCards = catCards.filter((c) => masteredIds.includes(c.id)).length;
            const subLabel = CAT_TH[catName] || catName;

            return (
              <button
                key={catName}
                onClick={() => onOpenStudyCategory(catName)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#0B1F3B]/10 flex items-center justify-between text-left hover:border-[#EB6F43]/40 active-push transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                  <span className="text-sm font-bold text-[#0B1F3B] truncate">
                    {catName}
                  </span>
                  <span className="text-xs text-[#0B1F3B]/50 font-medium truncate">
                    {subLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#0B1F3B]/70 bg-[#F6F1EA] px-2.5 py-1 rounded-lg">
                    {doneCards}/{catCards.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#0B1F3B]/40" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
