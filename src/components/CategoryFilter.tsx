import React from 'react';
import { Filter, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/surfVocabulary';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-3 my-2">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-cyan-400/90 px-1">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            Topic Categories
          </span>
          <span className="text-slate-400 font-normal lowercase">swipe topics →</span>
        </div>

        {/* Scrollable category pills optimized for mobile touch */}
        <div className="flex items-center gap-2 overflow-x-auto w-full py-1 px-0.5 scrollbar-none no-select snap-x">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`snap-start whitespace-nowrap min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer active-push ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{cat}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                    isSelected ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
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
