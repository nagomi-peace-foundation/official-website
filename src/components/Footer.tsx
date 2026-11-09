import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import { ArrowUpRight } from 'lucide-react';
import { LOGO_PATH } from '../data/foundation';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openPolicyModal: (policyId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openPolicyModal }) => {
  const { currentFullName, foundation } = useFoundation();

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1c1d1a] text-[#d6d4cd] border-t border-[#2d2e29]">
      {/* Upper Footer: Core Information & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Tier 1: Brand Row (Logo, Foundation Name, and Quick Contact) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#2d2e29]">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="bg-white p-1 rounded-lg shadow-xs border border-stone-200 shrink-0">
              <img
                src={LOGO_PATH}
                alt="なごみ平和財団 ロゴマーク"
                className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-[15px] xl:text-base font-bold text-white tracking-tight whitespace-nowrap block group-hover:text-[#9ec48f] transition-colors">
                {currentFullName}
              </span>
              <span className="text-[9.5px] sm:text-[10px] tracking-widest text-stone-400 font-sans uppercase whitespace-nowrap block mt-0.5">
                NAGOMI PEACE FOUNDATION
              </span>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-500">公式窓口：</span>
              <a
                href="mailto:info@nagomi-zaidan.or.jp"
                className="font-mono text-stone-300 hover:text-white transition-colors underline"
              >
                info@nagomi-zaidan.or.jp
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="px-3.5 py-1.5 bg-[#2a3625] hover:bg-[#374930] text-[#c9dec3] border border-[#445b3c] rounded-md text-xs font-medium transition-colors"
            >
              お問い合わせ
            </button>
          </div>
        </div>

        {/* Tier 2: 3 Balanced Navigation Columns (5-4-3 ratio for optimal text width) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Site Map (財団のご案内) */}
          <div className="md:col-span-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 border-b border-stone-800 pb-2">
              財団のご案内
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline text-left block"
                >
                  トップページ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline text-left block"
                >
                  財団について（設立趣旨・代表理事挨拶・役員・定款【抜粋】）
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('grants')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline text-left block"
                >
                  助成事業（募集要領・申請書・選考）
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('disclosures')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline text-left block"
                >
                  情報公開（定款【抜粋】・事業計画書・財務諸表）
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('donations')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline text-left block"
                >
                  ご支援のお願い（寄附）
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: News & Inquiries (広報・窓口) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 border-b border-stone-800 pb-2">
              広報・窓口
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('news')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline"
                >
                  お知らせ一覧
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline"
                >
                  お問い合わせフォーム
                </button>
              </li>
              <li className="pt-2 text-stone-400 space-y-1">
                <div>
                  <span className="text-[11px] text-stone-500">事業年度：</span>
                  <span className="text-stone-300 text-xs ml-1">{foundation.fiscalYear}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500">設立日：</span>
                  <span className="text-stone-300 text-xs ml-1">令和8年8月29日</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Policies (コンプライアンス方針) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 border-b border-stone-800 pb-2">
              コンプライアンス方針
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('privacy')}
                  className="text-left hover:text-white transition-colors text-stone-400 hover:underline leading-relaxed flex items-center gap-1"
                >
                  <span>個人情報保護方針</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('myNumber')}
                  className="text-left hover:text-white transition-colors text-stone-400 hover:underline leading-relaxed flex items-center gap-1"
                >
                  <span>特定個人情報等の取扱い方針</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('antiSocial')}
                  className="text-left hover:text-white transition-colors text-stone-400 hover:underline leading-relaxed flex items-center gap-1"
                >
                  <span>反社会的勢力排除に関する基本方針</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('sitePolicy')}
                  className="text-left hover:text-white transition-colors text-stone-400 hover:underline leading-relaxed flex items-center gap-1"
                >
                  <span>サイトポリシー</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer: Copyright */}
      <div className="bg-stone-950 py-4 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>
            所在地：{foundation.address}
          </p>
          <p>
            Copyright &copy; 2026 {currentFullName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
