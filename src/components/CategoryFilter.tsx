import React from 'react';
import { Filter, Layers } from 'lucide-react';
import type { TranslationKeys } from '../data/translations';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
  t: TranslationKeys;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  t
}) => {
  const allCategoriesList = ['All Categories', ...categories];

  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#1D52B8] px-1">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#1D52B8]" />
            {t.topicCategories}
          </span>
          <span className="text-[#0F214A]/60 font-semibold lowercase">{t.swipeTopics}</span>
        </div>

        {/* Scrollable category pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full py-1 px-0.5 scrollbar-none no-select snap-x">
          {allCategoriesList.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            const displayCatName = cat === 'All Categories' ? t.allCategories : cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`snap-start whitespace-nowrap min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer active-push ${
                  isSelected
                    ? 'bg-[#1D52B8] text-white border-[#1D52B8] shadow-md shadow-[#1D52B8]/20'
                    : 'bg-white text-[#0F214A] border-[#0F214A]/15 hover:border-[#1D52B8]/50 hover:bg-[#FAF8F5]'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#1D52B8]'}`} />
                <span>{displayCatName}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                    isSelected ? 'bg-white/20 text-white font-bold' : 'bg-[#E8E3D9] text-[#0F214A]/70'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
