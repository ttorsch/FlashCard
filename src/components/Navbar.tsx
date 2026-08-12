import React from 'react';
import { Home, BookOpen, MessageSquareQuote, Settings } from 'lucide-react';
import type { TranslationKeys } from '../data/translations';

export type ScreenType = 'home' | 'study' | 'phrases' | 'manage';

interface NavbarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  t: TranslationKeys;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  t
}) => {
  const tabs = [
    { key: 'home' as ScreenType, name: t.tabHome || 'หน้าแรก', icon: Home },
    { key: 'study' as ScreenType, name: t.tabStudy || 'คำศัพท์', icon: BookOpen },
    { key: 'phrases' as ScreenType, name: t.tabPhrases || 'ประโยคใช้งาน', icon: MessageSquareQuote },
    { key: 'manage' as ScreenType, name: t.tabManage || 'จัดการ', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#0B1F3B]/10 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => onSelectScreen(tab.key)}
              className="flex-1 flex flex-col items-center gap-1 py-1 px-1 rounded-xl transition-all cursor-pointer active-push"
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? 'bg-[#EB6F43]' : 'bg-transparent'
                  }`}
                />
              </div>
              <div className="flex items-center gap-1">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#0B1F3B]' : 'text-[#0B1F3B]/45'
                  }`}
                />
                <span
                  className={`text-[11px] font-bold transition-colors truncate ${
                    isActive ? 'text-[#0B1F3B]' : 'text-[#0B1F3B]/50'
                  }`}
                >
                  {tab.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
