import React from 'react';
import { ChevronRight, BookOpen, MessageSquareQuote, Sparkles, Volume2 } from 'lucide-react';
import type { SurfVocabulary } from '../data/surfVocabulary';
import type { SurfPhrase } from '../data/surfPhrases';
import type { TranslationKeys } from '../data/translations';

interface HomeScreenProps {
  vocabulary: SurfVocabulary[];
  categories: string[];
  phrases: SurfPhrase[];
  phraseCategories: string[];
  masteredIds: string[];
  onOpenStudyCategory: (cat: string) => void;
  onGoStudy: () => void;
  onGoPhrases: () => void;
  onSpeak: (text: string) => void;
  t: TranslationKeys;
}

const CAT_TH: Record<string, string> = {
  'Paddling & Takeoff': 'การพายและการออกตัว',
  'Ocean & Environment': 'ทะเลและสิ่งแวดล้อม',
  'Ocean & Waves': 'ทะเลและคลื่น',
  'Board & Equipment': 'อุปกรณ์โต้คลื่น',
  'Stance & Board': 'ท่ายืนและบอร์ด',
  'Safety & Etiquette': 'ความปลอดภัยและมารยาท',
  'Stance & Riding': 'ท่ายืนและการขี่',
  'Wave Reading & Positioning': 'การอ่านคลื่นและการยืนตำแหน่ง'
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  vocabulary,
  categories,
  phrases,
  phraseCategories,
  masteredIds,
  onOpenStudyCategory,
  onGoStudy,
  onGoPhrases,
  onSpeak,
  t
}) => {
  const learnedCount = vocabulary.filter((c) => masteredIds.includes(c.id)).length;
  const totalVocabCount = vocabulary.length;
  const totalPhrasesCount = phrases.length;

  const featuredPhrase = phrases[0] || {
    english: 'Paddle with your chest up!',
    thaiMeaning: 'พายโดยยกหน้าอกขึ้นจากบอร์ด!',
    thaiPhonetic: '"พัด-เดิล วิธ ยัวร์ เชสท์ อัพ!"'
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-24 flex flex-col gap-6 animate-fadeIn">
      {/* Hero Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EB6F43]/10 text-[#EB6F43] font-bold text-[11px] w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SURF ENGLISH & THAI</span>
        </div>
        <h1 className="text-2xl font-black text-[#0B1F3B] leading-tight tracking-tight">
          {t.welcomeTitle}
        </h1>
        <p className="text-xs text-[#0B1F3B]/70 font-medium leading-relaxed">
          {t.landingHeroSub}
        </p>

        {/* 2 Quick Practice Launchers */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={onGoStudy}
            className="p-3.5 rounded-2xl bg-[#0B1F3B] text-white font-bold text-xs flex items-center justify-between shadow-md active-push transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#EB6F43]" />
              <span>{t.startVocabBtn}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/50" />
          </button>

          <button
            onClick={onGoPhrases}
            className="p-3.5 rounded-2xl bg-[#EB6F43] text-white font-bold text-xs flex items-center justify-between shadow-md shadow-[#EB6F43]/20 active-push transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-white" />
              <span>{t.startPhrasesBtn}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* Today's Learning Banner */}
      <div className="bg-[#0B1F3B] rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4 text-white">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
            TODAY
          </span>
          <h2 className="text-xl font-bold text-white leading-snug">
            {t.todayBannerTitle}
          </h2>
          <p className="text-xs text-white/70 font-medium mt-0.5">
            {t.learnedCountLabel} {learnedCount} {t.of} {totalVocabCount} {t.cardCount}
          </p>
        </div>

        <button
          onClick={onGoStudy}
          className="w-16 h-16 rounded-full bg-[#EB6F43] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#EB6F43]/30 hover:scale-105 active-push transition-all shrink-0 cursor-pointer"
        >
          {t.goButton}
        </button>
      </div>

      {/* 3 Stat Cards Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#0B1F3B]/10 flex flex-col gap-0.5">
          <span className="text-2xl font-black text-[#0B1F3B] font-mono leading-none">
            {totalVocabCount}
          </span>
          <span className="text-[10px] font-bold text-[#0B1F3B]/60 truncate">
            {t.totalCountLabel}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#0B1F3B]/10 flex flex-col gap-0.5">
          <span className="text-2xl font-black text-[#EB6F43] font-mono leading-none">
            {totalPhrasesCount}
          </span>
          <span className="text-[10px] font-bold text-[#0B1F3B]/60 truncate">
            {t.totalPhrasesCountLabel}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#0B1F3B]/10 flex flex-col gap-0.5">
          <span className="text-2xl font-black text-[#0B1F3B] font-mono leading-none">
            {learnedCount}
          </span>
          <span className="text-[10px] font-bold text-[#0B1F3B]/60 truncate">
            {t.learnedCountLabel}
          </span>
        </div>
      </div>

      {/* Featured Phrase Preview Banner */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#EB6F43]/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#EB6F43] flex items-center gap-1">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#EB6F43]" />
            {t.featuredPhraseHeader}
          </span>
          <button
            onClick={() => onSpeak(featuredPhrase.english)}
            className="p-1.5 rounded-full bg-[#EB6F43]/10 text-[#EB6F43] hover:bg-[#EB6F43]/20 transition-colors cursor-pointer"
            title="Listen audio"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h4 className="text-base font-bold text-[#0B1F3B]">
            "{featuredPhrase.english}"
          </h4>
          <p className="text-xs font-semibold text-[#EB6F43] font-mono mt-0.5">
            {featuredPhrase.thaiPhonetic}
          </p>
          <p className="text-xs text-[#0B1F3B]/70 font-medium mt-1">
            {featuredPhrase.thaiMeaning}
          </p>
        </div>

        <button
          onClick={onGoPhrases}
          className="w-full py-2.5 rounded-xl bg-[#F6F1EA] hover:bg-[#EB6F43]/10 text-[#0B1F3B] font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer mt-1"
        >
          <span>ดูประโยคใช้งานทั้งหมด</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#EB6F43]" />
        </button>
      </div>

      {/* Phrase Categories Breakdown */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-black text-[#0B1F3B]">
          {t.phraseCategoriesHeader}
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {phraseCategories.map((pCat) => {
            const count = phrases.filter((p) => p.category === pCat).length;
            return (
              <button
                key={pCat}
                onClick={onGoPhrases}
                className="p-3 bg-white rounded-2xl border border-[#0B1F3B]/10 flex flex-col justify-between gap-2 text-left hover:border-[#EB6F43]/40 active-push transition-all cursor-pointer shadow-xs"
              >
                <span className="text-xs font-bold text-[#0B1F3B] line-clamp-2">
                  {pCat}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#EB6F43] bg-[#EB6F43]/10 px-2 py-0.5 rounded-md w-fit">
                  {count} phrases
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vocabulary Categories List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-black text-[#0B1F3B]">
          {t.categoriesHeader}
        </h3>

        <div className="flex flex-col gap-2.5">
          {categories.map((catName) => {
            const catCards = vocabulary.filter((c) => c.category === catName);
            const doneCards = catCards.filter((c) => masteredIds.includes(c.id)).length;
            const subLabel = CAT_TH[catName] || catName;

            return (
              <button
                key={catName}
                onClick={() => onOpenStudyCategory(catName)}
                className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#0B1F3B]/10 flex items-center justify-between text-left hover:border-[#EB6F43]/40 active-push transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-0.5 min-w-0 pr-2">
                  <span className="text-sm font-bold text-[#0B1F3B] truncate">
                    {catName}
                  </span>
                  <span className="text-xs text-[#0B1F3B]/50 font-medium truncate">
                    {subLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#0B1F3B]/70 bg-[#F6F1EA] px-2.5 py-1 rounded-lg">
                    {doneCards}/{catCards.length}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#0B1F3B]/40" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
