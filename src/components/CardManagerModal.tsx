import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Search, RotateCcw, Save, Layers, FolderPlus, Tag } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { TranslationKeys } from '../data/translations';

interface CardManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: SurfVocabulary[];
  categories: string[];
  onAddCard: (newCard: Omit<SurfVocabulary, 'id'>) => void;
  onEditCard: (updatedCard: SurfVocabulary) => void;
  onDeleteCard: (id: string) => void;
  onResetVocabulary: () => void;
  onAddCategory: (newCat: string) => void;
  onDeleteCategory: (catToDelete: string) => void;
  t: TranslationKeys;
}

export const CardManagerModal: React.FC<CardManagerModalProps> = ({
  isOpen,
  onClose,
  cards,
  categories,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onResetVocabulary,
  onAddCategory,
  onDeleteCategory,
  t
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'categories'>('list');
  const [editingCard, setEditingCard] = useState<SurfVocabulary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // New Category input
  const [newCatInput, setNewCatInput] = useState('');

  // Form State
  const [category, setCategory] = useState<string>(categories[0] || 'Paddling & Takeoff');
  const [english, setEnglish] = useState('');
  const [thaiMeaning, setThaiMeaning] = useState('');
  const [thaiPhonetic, setThaiPhonetic] = useState('');
  const [example, setExample] = useState('');
  const [audioText, setAudioText] = useState('');
  const [surfTip, setSurfTip] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingCard(null);
    setCategory(categories[0] || 'Paddling & Takeoff');
    setEnglish('');
    setThaiMeaning('');
    setThaiPhonetic('');
    setExample('');
    setAudioText('');
    setSurfTip('');
  };

  const handleStartAdd = () => {
    resetForm();
    setActiveTab('form');
  };

  const handleStartEdit = (card: SurfVocabulary) => {
    setEditingCard(card);
    setCategory(card.category);
    setEnglish(card.english);
    setThaiMeaning(card.thaiMeaning);
    setThaiPhonetic(card.thaiPhonetic);
    setExample(card.example);
    setAudioText(card.audioText);
    setSurfTip(card.surfTip || '');
    setActiveTab('form');
  };

  const handleSubmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !thaiMeaning.trim()) return;

    if (editingCard) {
      onEditCard({
        id: editingCard.id,
        category,
        english: english.trim(),
        thaiMeaning: thaiMeaning.trim(),
        thaiPhonetic: thaiPhonetic.trim() || english.trim(),
        example: example.trim(),
        audioText: audioText.trim() || `${english.trim()}. ${example.trim()}`,
        surfTip: surfTip.trim()
      });
    } else {
      onAddCard({
        category,
        english: english.trim(),
        thaiMeaning: thaiMeaning.trim(),
        thaiPhonetic: thaiPhonetic.trim() || english.trim(),
        example: example.trim(),
        audioText: audioText.trim() || `${english.trim()}. ${example.trim()}`,
        surfTip: surfTip.trim()
      });
    }

    resetForm();
    setActiveTab('list');
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    onAddCategory(newCatInput.trim());
    setNewCatInput('');
  };

  const filteredCards = cards.filter(
    (card) =>
      card.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.thaiMeaning.includes(searchQuery) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0F214A]/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[90vh] flex flex-col glass-panel rounded-3xl border border-[#0F214A]/20 shadow-2xl bg-white text-[#0F214A] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0F214A]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1D52B8]/10 text-[#1D52B8] flex items-center justify-center border border-[#1D52B8]/30">
              <Layers className="w-5 h-5 text-[#1D52B8]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0F214A]">{t.managerTitle}</h2>
              <p className="text-xs text-[#0F214A]/60 font-semibold">{t.totalCards} {cards.length} | {t.categoriesCount} {categories.length}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#0F214A]/50 hover:text-[#0F214A] rounded-xl hover:bg-[#FAF8F5] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Header Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#0F214A]/10 bg-[#FAF8F5] shrink-0 gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#0F214A]/15 shrink-0">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-[#1D52B8] text-white shadow-sm'
                  : 'text-[#0F214A]/70 hover:text-[#0F214A]'
              }`}
            >
              {t.tabAllCards} ({cards.length})
            </button>
            <button
              onClick={handleStartAdd}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'form'
                  ? 'bg-[#1D52B8] text-white shadow-sm'
                  : 'text-[#0F214A]/70 hover:text-[#0F214A]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              {editingCard ? t.tabEditCard : t.tabAddCard}
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#1D52B8] text-white shadow-sm'
                  : 'text-[#0F214A]/70 hover:text-[#0F214A]'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{t.tabCategories} ({categories.length})</span>
            </button>
          </div>

          {activeTab === 'list' && (
            <button
              onClick={() => {
                if (window.confirm('Reset all vocabulary back to default list? Custom edits will be removed.')) {
                  onResetVocabulary();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E52E2A]/10 text-[#E52E2A] border border-[#E52E2A]/20 hover:bg-[#E52E2A]/20 transition-all flex items-center gap-1.5 shrink-0"
              title="Reset vocabulary to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.resetDefaults}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: ALL CARDS LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F214A]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] placeholder-[#0F214A]/40 text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                />
              </div>

              {/* Cards List */}
              <div className="space-y-2.5">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#0F214A]/10 hover:border-[#1D52B8]/40 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-[#1D52B8] truncate">
                          {card.english}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#0F214A]/70 border border-[#0F214A]/15 font-bold shrink-0">
                          {card.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#0F214A] font-bold truncate">{card.thaiMeaning}</p>
                      {card.example && (
                        <p className="text-[11px] text-[#0F214A]/60 italic truncate mt-0.5">"{card.example}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleStartEdit(card)}
                        className="p-2 rounded-xl bg-white hover:bg-[#1D52B8]/10 text-[#1D52B8] border border-[#0F214A]/15 transition-all"
                        title="Edit Card"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete card "${card.english}"?`)) {
                            onDeleteCard(card.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-[#E52E2A]/10 text-[#E52E2A] border border-[#0F214A]/15 transition-all"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredCards.length === 0 && (
                  <div className="text-center py-12 text-[#0F214A]/50 text-xs font-semibold">
                    {t.noCardsFound}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT CARD FORM */}
          {activeTab === 'form' && (
            <form onSubmit={handleSubmitCard} className="space-y-4 max-w-xl mx-auto">
              <h3 className="text-sm font-black text-[#E52E2A] uppercase tracking-wider mb-2">
                {editingCard ? `${t.editCardTitle} ${editingCard.english}` : t.createCardTitle}
              </h3>

              {/* Category Selection */}
              <div>
                <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.categoryLabel}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* English */}
              <div>
                <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.englishLabel}</label>
                <input
                  type="text"
                  required
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  placeholder="e.g. Bottom Turn"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                />
              </div>

              {/* Thai Meaning & Phonetic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.thaiMeaningLabel}</label>
                  <input
                    type="text"
                    required
                    value={thaiMeaning}
                    onChange={(e) => setThaiMeaning(e.target.value)}
                    placeholder="e.g. การเลี้ยวบอร์ดที่ฐานคลื่น"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.thaiPhoneticLabel}</label>
                  <input
                    type="text"
                    value={thaiPhonetic}
                    onChange={(e) => setThaiPhonetic(e.target.value)}
                    placeholder="e.g. บอท-ทอม-เทิร์น"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                  />
                </div>
              </div>

              {/* Example Sentence */}
              <div>
                <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.exampleLabel}</label>
                <textarea
                  rows={2}
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="e.g. A good bottom turn sets up your speed for the rest of the wave."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8] resize-none"
                />
              </div>

              {/* Surf Tip */}
              <div>
                <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.surfTipLabel}</label>
                <input
                  type="text"
                  value={surfTip}
                  onChange={(e) => setSurfTip(e.target.value)}
                  placeholder="e.g. ย่อตัวลงต่ำแล้วตามด้วยการหมุนหัวไหล่ไปในทิศทางที่จะเลี้ยว"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                />
              </div>

              {/* Audio Read-Aloud Text */}
              <div>
                <label className="block text-xs font-bold text-[#0F214A] mb-1">{t.audioTextLabel}</label>
                <input
                  type="text"
                  value={audioText}
                  onChange={(e) => setAudioText(e.target.value)}
                  placeholder="Defaults to: English word + Example sentence"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0F214A]/10">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab('list');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#0F214A]/60 hover:text-[#0F214A] bg-[#FAF8F5] hover:bg-[#E8E3D9] transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-black text-white bg-[#E52E2A] hover:bg-[#D4221E] shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-white" />
                  {editingCard ? t.updateCard : t.saveCard}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-xl mx-auto">
              {/* Add New Category Form */}
              <form onSubmit={handleAddCategorySubmit} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#0F214A]/15 space-y-3">
                <h3 className="text-xs font-black text-[#1D52B8] uppercase tracking-wider flex items-center gap-1.5">
                  <FolderPlus className="w-4 h-4 text-[#1D52B8]" /> {t.addNewCategory}
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder={t.addCategoryPlaceholder}
                    className="flex-1 px-3.5 py-2 bg-white rounded-xl border border-[#0F214A]/15 text-[#0F214A] text-xs font-semibold focus:outline-none focus:border-[#1D52B8]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1D52B8] text-white text-xs font-bold hover:bg-[#17449E] transition-all flex items-center gap-1 shrink-0 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> {t.addBtn}
                  </button>
                </div>
              </form>

              {/* Categories List */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-[#0F214A]/70 uppercase tracking-wider">
                  {t.existingCategories} ({categories.length})
                </h4>

                <div className="space-y-2">
                  {categories.map((cat) => {
                    const cardCount = cards.filter((c) => c.category === cat).length;
                    return (
                      <div
                        key={cat}
                        className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#0F214A]/10 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#1D52B8]" />
                          <span className="text-xs font-bold text-[#0F214A]">{cat}</span>
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-white text-[#0F214A]/70 border border-[#0F214A]/15 rounded-md">
                            {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                          </span>
                        </div>

                        {categories.length > 1 && (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Delete category "${cat}"? ${
                                    cardCount > 0
                                      ? `${cardCount} cards in this category will be reassigned to "${
                                          categories.find((c) => c !== cat) || 'General'
                                        }".`
                                      : ''
                                  }`
                                )
                              ) {
                                onDeleteCategory(cat);
                              }
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-[#E52E2A]/10 text-[#E52E2A] border border-[#0F214A]/15 transition-all"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
