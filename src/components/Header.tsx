import React, { useState } from 'react';
import { useFoundation } from '../context/FoundationContext';
import { Menu, X, ChevronRight, Mail } from 'lucide-react';
import { FOUNDATION_INFO_EMAIL } from '../config/contact';
import { LOGO_PATH } from '../data/foundation';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { currentFullName, textSize, setTextSize } = useFoundation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'トップ' },
    { id: 'about', label: '財団について' },
    { id: 'grants', label: '助成事業' },
    { id: 'disclosures', label: '情報公開' },
    { id: 'donations', label: 'ご支援のお願い' },
    { id: 'news', label: 'お知らせ' },
    { id: 'contact', label: 'お問い合わせ' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Skip Link for WCAG / JIS X 8341-3 Keyboard Accessibility */}
      <a href="#main-content" className="skip-link">
        本文へスキップ
      </a>

      {/* Top Utility Bar: Accessibility & Office Contact */}
      <div className="bg-[#1e1f1c] text-[#d6d4cd] text-xs py-1.5 px-4 sm:px-8 border-b border-[#2d2e29]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-300 text-[11px]">
            <span className="hidden sm:inline text-stone-400">公式窓口：</span>
            <a
              href={`mailto:${FOUNDATION_INFO_EMAIL}`}
              className="inline-flex items-center gap-1 hover:text-white transition-colors font-mono"
            >
              <Mail className="w-3 h-3 text-[#9ec48f]" />
              <span>{FOUNDATION_INFO_EMAIL}</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Text Size Switcher (WCAG / JIS X 8341-3 Accessibility) */}
            <div className="flex items-center gap-1.5" role="group" aria-label="文字サイズ変更">
              <span className="text-stone-400 text-[11px] hidden sm:inline">文字サイズ:</span>
              <button
                type="button"
                onClick={() => setTextSize('normal')}
                aria-pressed={textSize === 'normal'}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  textSize === 'normal'
                    ? 'bg-[#47623d] text-white font-medium'
                    : 'bg-[#2d2e29] text-stone-300 hover:bg-[#3a3b34]'
                }`}
              >
                標準
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                aria-pressed={textSize === 'large'}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  textSize === 'large'
                    ? 'bg-[#47623d] text-white font-medium'
                    : 'bg-[#2d2e29] text-stone-300 hover:bg-[#3a3b34]'
                }`}
              >
                拡大
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Foundation Name */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group focus-visible:ring-2 focus-visible:ring-[#47623d] focus-visible:ring-offset-2 rounded-lg p-1 cursor-pointer"
          >
            <img
              src={LOGO_PATH}
              alt="なごみ平和財団 NAGOMI PEACE FOUNDATION ロゴマーク"
              className="h-14 sm:h-15 w-auto object-contain shrink-0 group-hover:scale-102 transition-transform drop-shadow-2xs"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-[#5a7a4f] tracking-wider leading-none mb-1">
                困難を抱える人の自立と共生を支える
              </span>
              <span className="text-base sm:text-xl font-bold tracking-tight text-[#22211e] font-serif leading-tight">
                {currentFullName}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="メインナビゲーション">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#f0f4ee] text-[#374d2e] shadow-2xs font-bold'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#47623d] cursor-pointer"
              aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="px-4 pt-3 pb-6 space-y-1" aria-label="モバイルナビゲーション">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#f0f4ee] text-[#374d2e] font-bold border-l-4 border-[#47623d]'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
