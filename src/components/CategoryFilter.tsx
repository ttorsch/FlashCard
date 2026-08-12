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
    <div className="w-full max-w-4xl mx-auto px-4 my-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Topic Filter:</span>
        </div>

        {/* Scrollable category pills on mobile / Grid on desktop */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none no-select">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 border-cyan-300 font-bold shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-cyan-500/40 hover:bg-slate-800'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <span>{cat}</span>
                <span
                  className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-md ${
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
