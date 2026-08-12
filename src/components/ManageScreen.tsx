import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit2, BookOpen, MessageSquareQuote, Tag, ChevronDown } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { SurfPhrase } from '../data/surfPhrases';
import type { TranslationKeys } from '../data/translations';

interface ManageScreenProps {
  vocabulary: SurfVocabulary[];
  phrases: SurfPhrase[];
  masteredIds: string[];
  onOpenPinModal: () => void;
  onSelectCardToEdit: (card: SurfVocabulary) => void;
  onSelectPhraseToEdit?: (phrase: SurfPhrase) => void;
  t: TranslationKeys;
}

export const ManageScreen: React.FC<ManageScreenProps> = ({
  vocabulary,
  phrases,
  masteredIds,
  onOpenPinModal,
  onSelectCardToEdit,
  onSelectPhraseToEdit,
  t
}) => {
  const [manageMode, setManageMode] = useState<'vocab' | 'phrases'>('vocab');
  const [query, setQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (catKey: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey]
    }));
  };

  const filteredCards = useMemo(
    () =>
      vocabulary.filter(
        (c) =>
          c.english.toLowerCase().includes(query.toLowerCase()) ||
          c.thaiMeaning.includes(query) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      ),
    [vocabulary, query]
  );

  const filteredPhrases = useMemo(
    () =>
      phrases.filter(
        (p) =>
          p.english.toLowerCase().includes(query.toLowerCase()) ||
          p.thaiMeaning.includes(query) ||
          (p.thaiPhonetic && p.thaiPhonetic.includes(query)) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ),
    [phrases, query]
  );

  // Group vocabulary cards by category and order categories alphabetically
  const groupedCards = useMemo(() => {
    const groups: Record<string, SurfVocabulary[]> = {};
    filteredCards.forEach((card) => {
      const cat = card.category || 'General';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(card);
    });

    const sortedCategoryNames = Object.keys(groups).sort((a, b) => a.localeCompare(b));

    return sortedCategoryNames.map((catName) => ({
      categoryName: catName,
      items: groups[catName]
    }));
  }, [filteredCards]);

  // Group phrases by category and order categories alphabetically
  const groupedPhrases = useMemo(() => {
    const groups: Record<string, SurfPhrase[]> = {};
    filteredPhrases.forEach((phrase) => {
      const cat = phrase.category || 'General';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(phrase);
    });

    const sortedCategoryNames = Object.keys(groups).sort((a, b) => a.localeCompare(b));

    return sortedCategoryNames.map((catName) => ({
      categoryName: catName,
      items: groups[catName]
    }));
  }, [filteredPhrases]);

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-16 flex flex-col gap-4 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col gap-0.5">
        <span className="lb-micro">SURF THAI</span>
        <h1 className="text-xl font-black text-[#0B1F3B]">
          {t.tabManage}
        </h1>
      </div>

      {/* Segmented Control (Vocab vs Phrases) */}
      <div className="flex rounded-2xl bg-[#0B1F3B]/10 p-1 border border-[#0B1F3B]/10">
        <button
          onClick={() => {
            setManageMode('vocab');
            setQuery('');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            manageMode === 'vocab'
              ? 'bg-white text-[#0B1F3B] shadow-xs'
              : 'text-[#0B1F3B]/60 hover:text-[#0B1F3B]'
          }`}
        >
          <BookOpen className={`w-3.5 h-3.5 ${manageMode === 'vocab' ? 'text-[#EB6F43]' : 'text-[#0B1F3B]/50'}`} />
          <span>คำศัพท์ ({vocabulary.length})</span>
        </button>

        <button
          onClick={() => {
            setManageMode('phrases');
            setQuery('');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            manageMode === 'phrases'
              ? 'bg-white text-[#0B1F3B] shadow-xs'
              : 'text-[#0B1F3B]/60 hover:text-[#0B1F3B]'
          }`}
        >
          <MessageSquareQuote className={`w-3.5 h-3.5 ${manageMode === 'phrases' ? 'text-[#EB6F43]' : 'text-[#0B1F3B]/50'}`} />
          <span>ประโยคใช้งาน ({phrases.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1F3B]/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            manageMode === 'vocab'
              ? t.searchPlaceholder || 'ค้นหาคำศัพท์...'
              : 'ค้นหาประโยคใช้งาน...'
          }
          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-[#0B1F3B]/12 text-[#0B1F3B] placeholder-[#0B1F3B]/40 text-xs font-semibold focus:outline-none focus:border-[#0B1F3B] shadow-xs"
        />
      </div>

      {/* Add New Button (Triggers PIN 2026 Modal) */}
      <button
        onClick={onOpenPinModal}
        className="w-full py-3.5 px-4 rounded-full bg-[#EB6F43] hover:bg-[#D85F35] text-white font-bold text-sm shadow-md shadow-[#EB6F43]/20 flex items-center justify-center gap-2 active-push transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 text-white" />
        <span>{manageMode === 'vocab' ? '+ เพิ่มการ์ดใหม่' : '+ เพิ่มประโยคใหม่'}</span>
      </button>

      {/* Count label */}
      <div className="lb-caption">
        {manageMode === 'vocab'
          ? `การ์ดทั้งหมด ${vocabulary.length} ใบ (ย่อ/ขยายหมวดหมู่ได้)`
          : `ประโยคทั้งหมด ${phrases.length} ประโยค (ย่อ/ขยายหมวดหมู่ได้)`}
      </div>

      {/* Mode 1: Vocabulary List (Collapsible Grouped Categories) */}
      {manageMode === 'vocab' && (
        <div className="flex flex-col gap-3.5">
          {groupedCards.map((group) => {
            const catKey = `vocab_${group.categoryName}`;
            const isCollapsed = !!collapsedCategories[catKey];

            return (
              <div key={group.categoryName} className="flex flex-col gap-2.5">
                {/* Category Header with Sign Button & Chevron */}
                <div
                  onClick={() => toggleCategoryCollapse(catKey)}
                  className="flex items-center justify-between px-3 py-2.5 bg-white rounded-2xl border border-[#0B1F3B]/10 shadow-xs cursor-pointer hover:border-[#EB6F43]/40 active-push transition-all select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#EB6F43]/10 text-[#EB6F43] flex items-center justify-center font-bold text-xs shrink-0">
                      {isCollapsed ? '+' : '−'}
                    </span>
                    <span className="text-xs font-black text-[#0B1F3B] uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <Tag className="w-3.5 h-3.5 text-[#EB6F43] shrink-0" />
                      {group.categoryName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono font-bold text-[#0B1F3B]/70 bg-[#F6F1EA] px-2 py-0.5 rounded-md">
                      {group.items.length} {group.items.length === 1 ? 'card' : 'cards'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0B1F3B]/50 transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Group Vocab Cards List (Collapsible) */}
                {!isCollapsed && (
                  <div className="flex flex-col gap-2.5 pl-1 animate-fadeIn">
                    {group.items.map((card) => {
                      const isLearned = masteredIds.includes(card.id);

                      return (
                        <div
                          key={card.id}
                          className="p-4 bg-white rounded-2xl border border-[#0B1F3B]/10 shadow-xs flex items-center justify-between gap-3 hover:border-[#EB6F43]/40 transition-all"
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
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCardToEdit(card);
                              }}
                              className="w-8 h-8 rounded-full border border-[#0B1F3B]/12 bg-transparent text-[#0B1F3B]/60 hover:text-[#0B1F3B] flex items-center justify-center active-push transition-all cursor-pointer"
                              title="Edit card"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredCards.length === 0 && (
            <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
              {t.noCardsFound}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Useful Phrases List (Collapsible Grouped Categories) */}
      {manageMode === 'phrases' && (
        <div className="flex flex-col gap-3.5">
          {groupedPhrases.map((group) => {
            const catKey = `phrase_${group.categoryName}`;
            const isCollapsed = !!collapsedCategories[catKey];

            return (
              <div key={group.categoryName} className="flex flex-col gap-2.5">
                {/* Category Header with Sign Button & Chevron */}
                <div
                  onClick={() => toggleCategoryCollapse(catKey)}
                  className="flex items-center justify-between px-3 py-2.5 bg-white rounded-2xl border border-[#0B1F3B]/10 shadow-xs cursor-pointer hover:border-[#EB6F43]/40 active-push transition-all select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#EB6F43]/10 text-[#EB6F43] flex items-center justify-center font-bold text-xs shrink-0">
                      {isCollapsed ? '+' : '−'}
                    </span>
                    <span className="text-xs font-black text-[#0B1F3B] uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <Tag className="w-3.5 h-3.5 text-[#EB6F43] shrink-0" />
                      {group.categoryName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono font-bold text-[#EB6F43] bg-[#EB6F43]/10 px-2 py-0.5 rounded-md">
                      {group.items.length} {group.items.length === 1 ? 'phrase' : 'phrases'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0B1F3B]/50 transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Group Phrase Cards List (Collapsible) */}
                {!isCollapsed && (
                  <div className="flex flex-col gap-2.5 pl-1 animate-fadeIn">
                    {group.items.map((phrase) => {
                      const isLearned = masteredIds.includes(phrase.id);

                      return (
                        <div
                          key={phrase.id}
                          className="p-4 bg-white rounded-2xl border border-[#0B1F3B]/10 shadow-xs flex items-center justify-between gap-3 hover:border-[#EB6F43]/40 transition-all"
                        >
                          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-[#0B1F3B] truncate">
                              "{phrase.english}"
                            </span>
                            {phrase.thaiPhonetic && (
                              <span className="text-xs font-semibold text-[#EB6F43] font-mono truncate">
                                {phrase.thaiPhonetic}
                              </span>
                            )}
                            <span className="text-xs text-[#0B1F3B]/50 truncate">
                              {phrase.thaiMeaning}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectPhraseToEdit) {
                                  onSelectPhraseToEdit(phrase);
                                } else {
                                  onOpenPinModal();
                                }
                              }}
                              className="w-8 h-8 rounded-full border border-[#0B1F3B]/12 bg-transparent text-[#0B1F3B]/60 hover:text-[#0B1F3B] flex items-center justify-center active-push transition-all cursor-pointer"
                              title="Edit phrase"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredPhrases.length === 0 && (
            <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
              {t.noCardsFound}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
