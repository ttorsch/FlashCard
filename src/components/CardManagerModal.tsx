import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Search, RotateCcw, Save, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/surfVocabulary';
import type { SurfVocabulary } from '../data/surfVocabulary';

interface CardManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: SurfVocabulary[];
  onAddCard: (newCard: Omit<SurfVocabulary, 'id'>) => void;
  onEditCard: (updatedCard: SurfVocabulary) => void;
  onDeleteCard: (id: string) => void;
  onResetVocabulary: () => void;
}

export const CardManagerModal: React.FC<CardManagerModalProps> = ({
  isOpen,
  onClose,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onResetVocabulary
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [editingCard, setEditingCard] = useState<SurfVocabulary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [category, setCategory] = useState<string>(CATEGORIES[1]);
  const [english, setEnglish] = useState('');
  const [thaiMeaning, setThaiMeaning] = useState('');
  const [thaiPhonetic, setThaiPhonetic] = useState('');
  const [example, setExample] = useState('');
  const [audioText, setAudioText] = useState('');
  const [surfTip, setSurfTip] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingCard(null);
    setCategory(CATEGORIES[1]);
    setEnglish('');
    setThaiMeaning('');
    setThaiPhonetic('');
    setExample('');
    setAudioText('');
    setSurfTip('');
    setDifficulty('Beginner');
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
    setDifficulty(card.difficulty || 'Beginner');
    setActiveTab('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
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
        surfTip: surfTip.trim(),
        difficulty
      });
    } else {
      onAddCard({
        category,
        english: english.trim(),
        thaiMeaning: thaiMeaning.trim(),
        thaiPhonetic: thaiPhonetic.trim() || english.trim(),
        example: example.trim(),
        audioText: audioText.trim() || `${english.trim()}. ${example.trim()}`,
        surfTip: surfTip.trim(),
        difficulty
      });
    }

    resetForm();
    setActiveTab('list');
  };

  const filteredCards = cards.filter(
    (card) =>
      card.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.thaiMeaning.includes(searchQuery) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[90vh] flex flex-col glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-900/95 text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Flashcard Manager</h2>
              <p className="text-xs text-slate-400">Total Cards: {cards.length}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Header Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/50 shrink-0 gap-2">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'list'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Cards ({cards.length})
            </button>
            <button
              onClick={handleStartAdd}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'form'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              {editingCard ? 'Edit Card' : 'Add New Card'}
            </button>
          </div>

          {activeTab === 'list' && (
            <button
              onClick={() => {
                if (window.confirm('Reset all vocabulary back to default list? Custom edits will be removed.')) {
                  onResetVocabulary();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
              title="Reset vocabulary to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'list' ? (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cards by English, Thai, or Category..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 rounded-xl border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Cards List */}
              <div className="space-y-2.5">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-cyan-300 truncate">
                          {card.english}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                          {card.category}
                        </span>
                        {card.difficulty && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                            {card.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-medium truncate">{card.thaiMeaning}</p>
                      {card.example && (
                        <p className="text-[11px] text-slate-400 italic truncate mt-0.5">"{card.example}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleStartEdit(card)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-all"
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
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-700 transition-all"
                        title="Delete Card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredCards.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No flashcards found matching your search.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Add / Edit Form */
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">
                {editingCard ? `Editing: ${editingCard.english}` : 'Create New Flashcard'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced')}
                    className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* English */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">English Word / Term *</label>
                <input
                  type="text"
                  required
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  placeholder="e.g. Bottom Turn"
                  className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Thai Meaning & Phonetic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thai Meaning *</label>
                  <input
                    type="text"
                    required
                    value={thaiMeaning}
                    onChange={(e) => setThaiMeaning(e.target.value)}
                    placeholder="e.g. การเลี้ยวบอร์ดที่ฐานคลื่น"
                    className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thai Phonetic Pronunciation</label>
                  <input
                    type="text"
                    value={thaiPhonetic}
                    onChange={(e) => setThaiPhonetic(e.target.value)}
                    placeholder="e.g. บอท-ทอม-เทิร์น"
                    className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Example Sentence */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Example Sentence</label>
                <textarea
                  rows={2}
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="e.g. A good bottom turn sets up your speed for the rest of the wave."
                  className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Surf Tip */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Surf Tip (Thai advice)</label>
                <input
                  type="text"
                  value={surfTip}
                  onChange={(e) => setSurfTip(e.target.value)}
                  placeholder="e.g. ย่อตัวลงต่ำแล้วตามด้วยการหมุนหัวไหล่ไปในทิศทางที่จะเลี้ยว"
                  className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Audio Read-Aloud Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Audio Text (Read Aloud Voice Text)</label>
                <input
                  type="text"
                  value={audioText}
                  onChange={(e) => setAudioText(e.target.value)}
                  placeholder="Defaults to: English word + Example sentence"
                  className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab('list');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  {editingCard ? 'Update Card' : 'Save Card'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
