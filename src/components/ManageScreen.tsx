import React, { useState } from 'react';
import { Search, Plus, Edit2 } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { TranslationKeys } from '../data/translations';

interface ManageScreenProps {
  vocabulary: SurfVocabulary[];
  masteredIds: string[];
  onOpenPinModal: () => void;
  onSelectCardToEdit: (card: SurfVocabulary) => void;
  t: TranslationKeys;
}

export const ManageScreen: React.FC<ManageScreenProps> = ({
  vocabulary,
  masteredIds,
  onOpenPinModal,
  onSelectCardToEdit,
  t
}) => {
  const [query, setQuery] = useState('');

  const filteredCards = vocabulary.filter(
    (c) =>
      c.english.toLowerCase().includes(query.toLowerCase()) ||
      c.thaiMeaning.includes(query) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-16 flex flex-col gap-4 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <span className="lb-micro">SURF THAI</span>
        <h1 className="text-xl font-black text-[#0B1F3B]">
          {t.tabManage}
        </h1>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1F3B]/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-[#0B1F3B]/12 text-[#0B1F3B] placeholder-[#0B1F3B]/40 text-xs font-semibold focus:outline-none focus:border-[#0B1F3B] shadow-xs"
        />
      </div>

      {/* Add New Card Button (Triggers PIN 2026) */}
      <button
        onClick={onOpenPinModal}
        className="w-full py-3.5 px-4 rounded-full bg-[#EB6F43] hover:bg-[#D85F35] text-white font-bold text-sm shadow-md shadow-[#EB6F43]/20 flex items-center justify-center gap-2 active-push transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 text-white" />
        <span>+ เพิ่มการ์ดใหม่</span>
      </button>

      {/* Count label */}
      <div className="lb-caption">
        การ์ดทั้งหมด {vocabulary.length} ใบ
      </div>

      {/* Vocabulary Rows List */}
      <div className="flex flex-col gap-2.5">
        {filteredCards.map((card) => {
          const isLearned = masteredIds.includes(card.id);

          return (
            <div
              key={card.id}
              className="p-4 bg-white rounded-2xl border border-[#0B1F3B]/10 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <span className="text-sm font-bold text-[#0B1F3B] truncate">
                  {card.english}
                </span>
                <span className="text-xs text-[#0B1F3B]/50 truncate">
                  {card.thaiMeaning}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[11px] font-mono font-bold ${
                    isLearned ? 'text-[#0B1F3B]/40' : 'text-[#EB6F43]'
                  }`}
                >
                  {isLearned ? 'เรียนแล้ว' : 'ใหม่'}
                </span>

                <button
                  onClick={() => onSelectCardToEdit(card)}
                  className="w-8 h-8 rounded-full border border-[#0B1F3B]/12 bg-transparent text-[#0B1F3B]/60 hover:text-[#0B1F3B] flex items-center justify-center active-push transition-all cursor-pointer"
                  title="Edit card"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredCards.length === 0 && (
          <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
            {t.noCardsFound}
          </div>
        )}
      </div>
    </div>
  );
};
