import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit2, ChevronDown, ChevronRight, BookOpen, MessageSquareQuote } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [expandedItemIds, setExpandedItemIds] = useState<Record<string, boolean>>({});

  const toggleItemExpanded = (id: string) => {
    setExpandedItemIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Unique categories list for pill filter bar
  const currentCategories = useMemo(() => {
    const source = manageMode === 'vocab' ? vocabulary : phrases;
    const cats = Array.from(new Set(source.map((item) => item.category || 'General')));
    return ['All', ...cats.sort((a, b) => a.localeCompare(b))];
  }, [manageMode, vocabulary, phrases]);

  // Filtered vocabulary cards
  const filteredCards = useMemo(() => {
    return vocabulary.filter((c) => {
      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        c.english.toLowerCase().includes(query.toLowerCase()) ||
        c.thaiMeaning.includes(query) ||
        (c.thaiPhonetic && c.thaiPhonetic.includes(query)) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [vocabulary, selectedCategory, query]);

  // Filtered phrases
  const filteredPhrases = useMemo(() => {
    return phrases.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.english.toLowerCase().includes(query.toLowerCase()) ||
        p.thaiMeaning.includes(query) ||
        (p.thaiPhonetic && p.thaiPhonetic.includes(query)) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [phrases, selectedCategory, query]);

  // Group vocabulary cards by category
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

  // Group phrases by category
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

  const shownCount = manageMode === 'vocab' ? filteredCards.length : filteredPhrases.length;

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-20 flex flex-col gap-4 animate-fadeIn">
      {/* Header Matching Reference Screenshot */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB6F43]">
            SURF LESSON
          </span>
          <h1 className="text-2xl font-black text-[#0B1F3B] tracking-tight">
            {manageMode === 'vocab' ? 'Vocabulary' : 'Phrasebook'}
          </h1>
        </div>
        <span className="text-xs font-semibold text-[#0B1F3B]/50 mt-1">
          {shownCount} shown
        </span>
      </div>

      {/* Mode Switcher Pills (Vocab vs Phrasebook) */}
      <div className="flex items-center gap-2 p-1 bg-[#0B1F3B]/8 rounded-2xl">
        <button
          onClick={() => {
            setManageMode('vocab');
            setSelectedCategory('All');
            setQuery('');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
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
            setSelectedCategory('All');
            setQuery('');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            manageMode === 'phrases'
              ? 'bg-white text-[#0B1F3B] shadow-xs'
              : 'text-[#0B1F3B]/60 hover:text-[#0B1F3B]'
          }`}
        >
          <MessageSquareQuote className={`w-3.5 h-3.5 ${manageMode === 'phrases' ? 'text-[#EB6F43]' : 'text-[#0B1F3B]/50'}`} />
          <span>ประโยคใช้งาน ({phrases.length})</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1F3B]/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search English or Thai"
          className="w-full pl-11 pr-4 py-3 bg-[#EBE5DF]/60 rounded-2xl text-[#0B1F3B] placeholder-[#0B1F3B]/40 text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#EB6F43]/30 transition-all"
        />
      </div>

      {/* Category Pills Filter Bar (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
        {currentCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#EB6F43] text-white shadow-sm'
                  : 'bg-white text-[#0B1F3B] border border-[#0B1F3B]/10 hover:border-[#EB6F43]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Add New Item Button */}
      <button
        onClick={onOpenPinModal}
        className="w-full py-3.5 px-4 rounded-full bg-[#EB6F43] hover:bg-[#D85F35] text-white font-bold text-sm shadow-md shadow-[#EB6F43]/20 flex items-center justify-center gap-2 active-push transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4 text-white" />
        <span>{manageMode === 'vocab' ? '+ เพิ่มการ์ดใหม่' : '+ เพิ่มประโยคใหม่'}</span>
      </button>

      {/* SECTION 1: VOCABULARY GROUPS */}
      {manageMode === 'vocab' && (
        <div className="flex flex-col gap-6 mt-1">
          {groupedCards.map((group) => (
            <div key={group.categoryName} className="flex flex-col gap-2">
              {/* Category Group Header matching reference design */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0B1F3B]/60">
                  {group.categoryName}
                </span>
                <span className="text-xs font-mono font-bold text-[#0B1F3B]/40">
                  {group.items.length}
                </span>
              </div>

              {/* Group Container Box */}
              <div className="bg-white rounded-3xl border border-[#0B1F3B]/10 shadow-xs divide-y divide-[#0B1F3B]/8 overflow-hidden">
                {group.items.map((card) => {
                  const isExpanded = !!expandedItemIds[card.id];
                  const isLearned = masteredIds.includes(card.id);

                  return (
                    <div key={card.id} className="p-4 flex flex-col gap-2.5">
                      {/* Row Main Header */}
                      <div
                        onClick={() => toggleItemExpanded(card.id)}
                        className="flex items-start justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <h4 className="text-sm font-bold text-[#0B1F3B] group-hover:text-[#EB6F43] transition-colors leading-snug">
                            {card.english}
                          </h4>
                          {card.thaiPhonetic && (
                            <p className="text-xs font-semibold text-[#EB6F43] font-mono">
                              {card.thaiPhonetic}
                            </p>
                          )}
                          {!isExpanded && (
                            <p className="text-xs text-[#0B1F3B]/70 font-medium truncate mt-0.5">
                              {card.thaiMeaning}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isLearned && (
                            <span className="text-[10px] font-mono font-bold text-[#0B1F3B]/40 bg-[#0B1F3B]/5 px-2 py-0.5 rounded-full">
                              เรียนแล้ว
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#0B1F3B]/40" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#0B1F3B]/40" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content View */}
                      {isExpanded && (
                        <div className="pt-1 flex flex-col gap-2.5 animate-fadeIn">
                          <p className="text-xs text-[#0B1F3B]/80 font-medium leading-relaxed">
                            {card.thaiMeaning}
                          </p>

                          {card.example && (
                            <div className="p-2.5 rounded-xl bg-[#F6F1EA] text-[11px] text-[#0B1F3B]/70 italic">
                              "{card.example}"
                            </div>
                          )}

                          {card.surfTip && (
                            <div className="text-[11px] font-semibold text-[#EB6F43]">
                              💡 {card.surfTip}
                            </div>
                          )}

                          {/* Action Pill Buttons */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCardToEdit(card);
                              }}
                              className="px-4 py-1.5 rounded-full bg-[#0B1F3B]/8 hover:bg-[#0B1F3B]/15 text-[#0B1F3B] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCards.length === 0 && (
            <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
              {t.noCardsFound}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: PHRASEBOOK GROUPS */}
      {manageMode === 'phrases' && (
        <div className="flex flex-col gap-6 mt-1">
          {groupedPhrases.map((group) => (
            <div key={group.categoryName} className="flex flex-col gap-2">
              {/* Category Group Header matching reference design */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0B1F3B]/60">
                  {group.categoryName}
                </span>
                <span className="text-xs font-mono font-bold text-[#0B1F3B]/40">
                  {group.items.length}
                </span>
              </div>

              {/* Group Container Box */}
              <div className="bg-white rounded-3xl border border-[#0B1F3B]/10 shadow-xs divide-y divide-[#0B1F3B]/8 overflow-hidden">
                {group.items.map((phrase) => {
                  const isExpanded = !!expandedItemIds[phrase.id];
                  const isLearned = masteredIds.includes(phrase.id);

                  return (
                    <div key={phrase.id} className="p-4 flex flex-col gap-2.5">
                      {/* Row Main Header */}
                      <div
                        onClick={() => toggleItemExpanded(phrase.id)}
                        className="flex items-start justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <h4 className="text-sm font-bold text-[#0B1F3B] group-hover:text-[#EB6F43] transition-colors leading-snug">
                            {phrase.english}
                          </h4>
                          {phrase.thaiPhonetic && (
                            <p className="text-xs font-semibold text-[#EB6F43] font-mono">
                              {phrase.thaiPhonetic}
                            </p>
                          )}
                          {!isExpanded && (
                            <p className="text-xs text-[#0B1F3B]/70 font-medium truncate mt-0.5">
                              {phrase.thaiMeaning}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isLearned && (
                            <span className="text-[10px] font-mono font-bold text-[#0B1F3B]/40 bg-[#0B1F3B]/5 px-2 py-0.5 rounded-full">
                              เรียนแล้ว
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-[#0B1F3B]/40" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#0B1F3B]/40" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content View */}
                      {isExpanded && (
                        <div className="pt-1 flex flex-col gap-2.5 animate-fadeIn">
                          <p className="text-xs text-[#0B1F3B]/80 font-medium leading-relaxed">
                            {phrase.thaiMeaning}
                          </p>

                          {phrase.context && (
                            <div className="text-[11px] font-semibold text-[#EB6F43]">
                              💡 {phrase.context}
                            </div>
                          )}

                          {/* Action Pill Buttons */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectPhraseToEdit) {
                                  onSelectPhraseToEdit(phrase);
                                } else {
                                  onOpenPinModal();
                                }
                              }}
                              className="px-4 py-1.5 rounded-full bg-[#0B1F3B]/8 hover:bg-[#0B1F3B]/15 text-[#0B1F3B] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

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
