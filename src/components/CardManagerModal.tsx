import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Search, RotateCcw, Save, Layers, FolderPlus, Tag, BookOpen, MessageSquareQuote } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { SurfPhrase } from '../data/surfPhrases';
import type { TranslationKeys } from '../data/translations';

interface CardManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: SurfVocabulary[];
  categories: string[];
  phrases: SurfPhrase[];
  phraseCategories: string[];
  onAddCard: (newCard: Omit<SurfVocabulary, 'id'>) => void;
  onEditCard: (updatedCard: SurfVocabulary) => void;
  onDeleteCard: (id: string) => void;
  onResetVocabulary: () => void;
  onAddCategory: (newCat: string) => void;
  onDeleteCategory: (catToDelete: string) => void;
  onAddPhrase: (newPhrase: Omit<SurfPhrase, 'id'>) => void;
  onEditPhrase: (updatedPhrase: SurfPhrase) => void;
  onDeletePhrase: (id: string) => void;
  initialMode?: 'vocab' | 'phrases';
  targetPhrase?: SurfPhrase | null;
  targetCard?: SurfVocabulary | null;
  t: TranslationKeys;
}

export const CardManagerModal: React.FC<CardManagerModalProps> = ({
  isOpen,
  onClose,
  cards,
  categories,
  phrases,
  phraseCategories,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onResetVocabulary,
  onAddCategory,
  onDeleteCategory,
  onAddPhrase,
  onEditPhrase,
  onDeletePhrase,
  initialMode = 'vocab',
  targetPhrase = null,
  targetCard = null,
  t
}) => {
  const [managerMode, setManagerMode] = useState<'vocab' | 'phrases'>(initialMode);
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'categories'>('list');

  // Vocab State
  const [editingCard, setEditingCard] = useState<SurfVocabulary | null>(null);
  const [cardCategory, setCardCategory] = useState<string>(categories[0] || 'Introduce Myself');
  const [english, setEnglish] = useState('');
  const [thaiMeaning, setThaiMeaning] = useState('');
  const [thaiPhonetic, setThaiPhonetic] = useState('');
  const [example, setExample] = useState('');
  const [audioText, setAudioText] = useState('');
  const [surfTip, setSurfTip] = useState('');

  // Phrase State
  const [editingPhrase, setEditingPhrase] = useState<SurfPhrase | null>(null);
  const [phraseCategory, setPhraseCategory] = useState<string>(phraseCategories[0] || 'Introduce Myself');
  const [phraseEnglish, setPhraseEnglish] = useState('');
  const [phraseThaiMeaning, setPhraseThaiMeaning] = useState('');
  const [phraseThaiPhonetic, setPhraseThaiPhonetic] = useState('');
  const [phraseContext, setPhraseContext] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [newCatInput, setNewCatInput] = useState('');

  // Sync initial targets on open
  useEffect(() => {
    if (isOpen) {
      setManagerMode(initialMode);
      if (targetPhrase) {
        setManagerMode('phrases');
        handleStartEditPhrase(targetPhrase);
      } else if (targetCard) {
        setManagerMode('vocab');
        handleStartEditCard(targetCard);
      } else {
        setActiveTab('list');
      }
    }
  }, [isOpen, initialMode, targetPhrase, targetCard]);

  if (!isOpen) return null;

  const resetCardForm = () => {
    setEditingCard(null);
    setCardCategory(categories[0] || 'Introduce Myself');
    setEnglish('');
    setThaiMeaning('');
    setThaiPhonetic('');
    setExample('');
    setAudioText('');
    setSurfTip('');
  };

  const resetPhraseForm = () => {
    setEditingPhrase(null);
    setPhraseCategory(phraseCategories[0] || 'Introduce Myself');
    setPhraseEnglish('');
    setPhraseThaiMeaning('');
    setPhraseThaiPhonetic('');
    setPhraseContext('');
  };

  const handleStartAddCard = () => {
    resetCardForm();
    setActiveTab('form');
  };

  const handleStartEditCard = (card: SurfVocabulary) => {
    setEditingCard(card);
    setCardCategory(card.category);
    setEnglish(card.english);
    setThaiMeaning(card.thaiMeaning);
    setThaiPhonetic(card.thaiPhonetic);
    setExample(card.example);
    setAudioText(card.audioText);
    setSurfTip(card.surfTip || '');
    setActiveTab('form');
  };

  const handleStartAddPhrase = () => {
    resetPhraseForm();
    setActiveTab('form');
  };

  const handleStartEditPhrase = (phrase: SurfPhrase) => {
    setEditingPhrase(phrase);
    setPhraseCategory(phrase.category);
    setPhraseEnglish(phrase.english);
    setPhraseThaiMeaning(phrase.thaiMeaning);
    setPhraseThaiPhonetic(phrase.thaiPhonetic || '');
    setPhraseContext(phrase.context || '');
    setActiveTab('form');
  };

  const handleSubmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !thaiMeaning.trim()) return;

    if (editingCard) {
      onEditCard({
        id: editingCard.id,
        category: cardCategory,
        english: english.trim(),
        thaiMeaning: thaiMeaning.trim(),
        thaiPhonetic: thaiPhonetic.trim() || english.trim(),
        example: example.trim(),
        audioText: audioText.trim() || english.trim(),
        surfTip: surfTip.trim()
      });
    } else {
      onAddCard({
        category: cardCategory,
        english: english.trim(),
        thaiMeaning: thaiMeaning.trim(),
        thaiPhonetic: thaiPhonetic.trim() || english.trim(),
        example: example.trim(),
        audioText: audioText.trim() || english.trim(),
        surfTip: surfTip.trim()
      });
    }

    resetCardForm();
    setActiveTab('list');
  };

  const handleSubmitPhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phraseEnglish.trim() || !phraseThaiMeaning.trim()) return;

    if (editingPhrase) {
      onEditPhrase({
        id: editingPhrase.id,
        category: phraseCategory,
        english: phraseEnglish.trim(),
        thaiMeaning: phraseThaiMeaning.trim(),
        thaiPhonetic: phraseThaiPhonetic.trim(),
        context: phraseContext.trim(),
        audioText: phraseEnglish.trim()
      });
    } else {
      onAddPhrase({
        category: phraseCategory,
        english: phraseEnglish.trim(),
        thaiMeaning: phraseThaiMeaning.trim(),
        thaiPhonetic: phraseThaiPhonetic.trim(),
        context: phraseContext.trim(),
        audioText: phraseEnglish.trim()
      });
    }

    resetPhraseForm();
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

  const filteredPhrases = phrases.filter(
    (phrase) =>
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.thaiMeaning.includes(searchQuery) ||
      (phrase.thaiPhonetic && phrase.thaiPhonetic.includes(searchQuery)) ||
      phrase.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0B1F3B]/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[90vh] flex flex-col rounded-3xl border border-[#0B1F3B]/20 shadow-2xl bg-white text-[#0B1F3B] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0B1F3B]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EB6F43]/10 text-[#EB6F43] flex items-center justify-center border border-[#EB6F43]/30">
              <Layers className="w-5 h-5 text-[#EB6F43]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0B1F3B]">
                {managerMode === 'vocab' ? 'ระบบจัดการคำศัพท์' : 'ระบบจัดการประโยคใช้งาน'}
              </h2>
              <p className="text-xs text-[#0B1F3B]/60 font-semibold">
                {managerMode === 'vocab'
                  ? `${cards.length} คำศัพท์ | ${categories.length} หมวดหมู่`
                  : `${phrases.length} ประโยคใช้งาน | ${phraseCategories.length} หมวดหมู่`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#0B1F3B]/50 hover:text-[#0B1F3B] rounded-xl hover:bg-[#F6F1EA] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manager Mode Switcher (Vocab vs Phrases) */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#0B1F3B]/10 bg-[#F6F1EA] shrink-0 gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#0B1F3B]/15 shrink-0">
            <button
              onClick={() => {
                setManagerMode('vocab');
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                managerMode === 'vocab'
                  ? 'bg-[#0B1F3B] text-white shadow-sm'
                  : 'text-[#0B1F3B]/70 hover:text-[#0B1F3B]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>คำศัพท์ ({cards.length})</span>
            </button>
            <button
              onClick={() => {
                setManagerMode('phrases');
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                managerMode === 'phrases'
                  ? 'bg-[#0B1F3B] text-white shadow-sm'
                  : 'text-[#0B1F3B]/70 hover:text-[#0B1F3B]'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>ประโยคใช้งาน ({phrases.length})</span>
            </button>
          </div>

          {/* Tab Sub-actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-[#EB6F43] text-white shadow-xs'
                  : 'bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 hover:text-[#0B1F3B]'
              }`}
            >
              รายการทั้งหมด
            </button>

            <button
              onClick={() => (managerMode === 'vocab' ? handleStartAddCard() : handleStartAddPhrase())}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                activeTab === 'form'
                  ? 'bg-[#EB6F43] text-white shadow-xs'
                  : 'bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 hover:text-[#0B1F3B]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeTab === 'form' ? 'แก้ไข' : 'เพิ่มใหม่'}</span>
            </button>

            {managerMode === 'vocab' && (
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  activeTab === 'categories'
                    ? 'bg-[#EB6F43] text-white shadow-xs'
                    : 'bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 hover:text-[#0B1F3B]'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>หมวดหมู่</span>
              </button>
            )}

            {managerMode === 'vocab' && activeTab === 'list' && (
              <button
                onClick={() => {
                  if (window.confirm('Reset all vocabulary back to default list? Custom edits will be removed.')) {
                    onResetVocabulary();
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#EB6F43]/10 text-[#EB6F43] border border-[#EB6F43]/20 hover:bg-[#EB6F43]/20 transition-all flex items-center gap-1 shrink-0"
                title="Reset vocabulary to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* MODE 1: VOCABULARY */}
          {managerMode === 'vocab' && (
            <>
              {/* VOCAB LIST */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1F3B]/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาคำศัพท์..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] placeholder-[#0B1F3B]/40 text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {filteredCards.map((card) => (
                      <div
                        key={card.id}
                        className="p-4 bg-[#F6F1EA] rounded-2xl border border-[#0B1F3B]/10 hover:border-[#EB6F43]/40 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-[#0B1F3B] truncate">
                              {card.english}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 font-bold shrink-0">
                              {card.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#0B1F3B] font-bold truncate">{card.thaiMeaning}</p>
                          {card.example && (
                            <p className="text-[11px] text-[#0B1F3B]/60 italic truncate mt-0.5">"{card.example}"</p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleStartEditCard(card)}
                            className="p-2 rounded-xl bg-white hover:bg-[#EB6F43]/10 text-[#EB6F43] border border-[#0B1F3B]/15 transition-all cursor-pointer"
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
                            className="p-2 rounded-xl bg-white hover:bg-[#EB6F43]/10 text-[#EB6F43] border border-[#0B1F3B]/15 transition-all cursor-pointer"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredCards.length === 0 && (
                      <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
                        {t.noCardsFound}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VOCAB FORM */}
              {activeTab === 'form' && (
                <form onSubmit={handleSubmitCard} className="space-y-4 max-w-xl mx-auto">
                  <h3 className="text-sm font-black text-[#EB6F43] uppercase tracking-wider mb-2">
                    {editingCard ? `แก้ไขคำศัพท์: ${editingCard.english}` : 'เพิ่มคำศัพท์ใหม่'}
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">หมวดหมู่</label>
                    <select
                      value={cardCategory}
                      onChange={(e) => setCardCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">English Word</label>
                    <input
                      type="text"
                      required
                      value={english}
                      onChange={(e) => setEnglish(e.target.value)}
                      placeholder="e.g. Pop-up"
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3B] mb-1">คำแปลภาษาไทย</label>
                      <input
                        type="text"
                        required
                        value={thaiMeaning}
                        onChange={(e) => setThaiMeaning(e.target.value)}
                        placeholder="e.g. การลุกขึ้นยืนบนบอร์ด"
                        className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3B] mb-1">คำอ่านออกเสียง (Phonetic)</label>
                      <input
                        type="text"
                        value={thaiPhonetic}
                        onChange={(e) => setThaiPhonetic(e.target.value)}
                        placeholder="e.g. ป๊อป-อัพ"
                        className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">ประโยคตัวอย่าง (Example)</label>
                    <textarea
                      rows={2}
                      value={example}
                      onChange={(e) => setExample(e.target.value)}
                      placeholder="e.g. Pop up in one smooth motion."
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B1F3B]/10">
                    <button
                      type="button"
                      onClick={() => {
                        resetCardForm();
                        setActiveTab('list');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#0B1F3B]/60 hover:text-[#0B1F3B] bg-[#F6F1EA] transition-all cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-black text-white bg-[#EB6F43] hover:bg-[#D85F35] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-white" />
                      บันทึกคำศัพท์
                    </button>
                  </div>
                </form>
              )}

              {/* VOCAB CATEGORIES */}
              {activeTab === 'categories' && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <form onSubmit={handleAddCategorySubmit} className="p-4 bg-[#F6F1EA] rounded-2xl border border-[#0B1F3B]/15 space-y-3">
                    <h3 className="text-xs font-black text-[#0B1F3B] uppercase tracking-wider flex items-center gap-1.5">
                      <FolderPlus className="w-4 h-4 text-[#EB6F43]" /> เพิ่มหมวดหมู่ใหม่
                    </h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={newCatInput}
                        onChange={(e) => setNewCatInput(e.target.value)}
                        placeholder="พิมพ์ชื่อหมวดหมู่..."
                        className="flex-1 px-3.5 py-2 bg-white rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#0B1F3B] text-white text-xs font-bold hover:bg-[#0B1F3B]/90 transition-all flex items-center gap-1 shrink-0 shadow-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> เพิ่ม
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="p-3.5 bg-[#F6F1EA] rounded-2xl border border-[#0B1F3B]/10 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-[#EB6F43]" />
                          <span className="text-xs font-bold text-[#0B1F3B]">{cat}</span>
                        </div>
                        {categories.length > 1 && (
                          <button
                            onClick={() => onDeleteCategory(cat)}
                            className="p-2 rounded-xl bg-white hover:bg-[#EB6F43]/10 text-[#EB6F43] border border-[#0B1F3B]/15 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* MODE 2: USEFUL PHRASES */}
          {managerMode === 'phrases' && (
            <>
              {/* PHRASES LIST */}
              {activeTab === 'list' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1F3B]/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาประโยคใช้งาน..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] placeholder-[#0B1F3B]/40 text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {filteredPhrases.map((phrase) => (
                      <div
                        key={phrase.id}
                        className="p-4 bg-[#F6F1EA] rounded-2xl border border-[#0B1F3B]/10 hover:border-[#EB6F43]/40 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-black text-[#0B1F3B] truncate">
                              "{phrase.english}"
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#0B1F3B]/70 border border-[#0B1F3B]/15 font-bold shrink-0">
                              {phrase.category}
                            </span>
                          </div>
                          {phrase.thaiPhonetic && (
                            <p className="text-xs font-semibold text-[#EB6F43] font-mono truncate">{phrase.thaiPhonetic}</p>
                          )}
                          <p className="text-xs text-[#0B1F3B] font-bold truncate mt-0.5">{phrase.thaiMeaning}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleStartEditPhrase(phrase)}
                            className="p-2 rounded-xl bg-white hover:bg-[#EB6F43]/10 text-[#EB6F43] border border-[#0B1F3B]/15 transition-all cursor-pointer"
                            title="Edit Phrase"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete phrase "${phrase.english}"?`)) {
                                onDeletePhrase(phrase.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-[#EB6F43]/10 text-[#EB6F43] border border-[#0B1F3B]/15 transition-all cursor-pointer"
                            title="Delete Phrase"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredPhrases.length === 0 && (
                      <div className="text-center py-12 text-[#0B1F3B]/50 text-xs font-semibold">
                        {t.noCardsFound}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PHRASE FORM */}
              {activeTab === 'form' && (
                <form onSubmit={handleSubmitPhrase} className="space-y-4 max-w-xl mx-auto">
                  <h3 className="text-sm font-black text-[#EB6F43] uppercase tracking-wider mb-2">
                    {editingPhrase ? `แก้ไขประโยค: "${editingPhrase.english}"` : 'เพิ่มประโยคใหม่'}
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">หมวดหมู่ประโยค</label>
                    <select
                      value={phraseCategory}
                      onChange={(e) => setPhraseCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    >
                      {phraseCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">English Phrase (ประโยคภาษาอังกฤษ)</label>
                    <input
                      type="text"
                      required
                      value={phraseEnglish}
                      onChange={(e) => setPhraseEnglish(e.target.value)}
                      placeholder='e.g. Our main goal today is to have fun and surf safely!'
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3B] mb-1">คำแปลภาษาไทย</label>
                      <input
                        type="text"
                        required
                        value={phraseThaiMeaning}
                        onChange={(e) => setPhraseThaiMeaning(e.target.value)}
                        placeholder="e.g. เป้าหมายหลักของเราวันนี้คือ สนุกและโต้คลื่นอย่างปลอดภัย!"
                        className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3B] mb-1">คำอ่านออกเสียง (Thai Phonetic)</label>
                      <input
                        type="text"
                        value={phraseThaiPhonetic}
                        onChange={(e) => setPhraseThaiPhonetic(e.target.value)}
                        placeholder='"เอาเออร์ เมน โกล ทู-เดย์..."'
                        className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3B] mb-1">คำแนะนำเพิ่มเติม (Coaching Tip / Context)</label>
                    <textarea
                      rows={2}
                      value={phraseContext}
                      onChange={(e) => setPhraseContext(e.target.value)}
                      placeholder="e.g. เน้นย้ำความสนุกควบคู่กับความปลอดภัยเป็นหลัก"
                      className="w-full px-3.5 py-2.5 bg-[#F6F1EA] rounded-xl border border-[#0B1F3B]/15 text-[#0B1F3B] text-xs font-semibold focus:outline-none focus:border-[#0B1F3B] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B1F3B]/10">
                    <button
                      type="button"
                      onClick={() => {
                        resetPhraseForm();
                        setActiveTab('list');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#0B1F3B]/60 hover:text-[#0B1F3B] bg-[#F6F1EA] transition-all cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-black text-white bg-[#EB6F43] hover:bg-[#D85F35] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-white" />
                      บันทึกประโยค
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
