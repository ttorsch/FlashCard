import React from 'react';
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
    <div className="w-full max-w-md mx-auto px-4 my-2">
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-select snap-x">
        {allCategoriesList.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isSelected = selectedCategory === cat;
          const displayCatName = cat === 'All Categories' ? t.allCategories : cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`snap-start whitespace-nowrap min-h-[38px] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active-push border ${
                isSelected
                  ? 'bg-[#0B1F3B] text-white border-[#0B1F3B] shadow-sm'
                  : 'bg-white text-[#0B1F3B]/70 border-[#0B1F3B]/12 hover:border-[#0B1F3B]/30'
              }`}
            >
              <span>{displayCatName}</span>
              <span
                className={`ml-0.5 px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#F6F1EA] text-[#0B1F3B]/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
