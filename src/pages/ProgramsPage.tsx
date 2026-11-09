import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import { HeartHandshake, ArrowRight } from 'lucide-react';

interface ProgramsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ setCurrentTab }) => {
  const { currentFullName } = useFoundation();

  const grantProgram = {
    badge: '助成事業',
    icon: HeartHandshake,
    title: '民間支援活動への直接助成',
    plainDescription:
      '精神的な困難等に直面する方々に寄り添う民間支援活動を対象に、「生活支援（生活の安定と自立）」「教育支援（学びの場の確保）」「就労支援（就業機会と定着）」「社会参加支援（居場所と孤立予防）」の4分野にわたる直接支援活動に対して資金助成を実施します。',
    targetExamples:
      '【対象例】生活相談・自立支援NPO、子ども食堂・無料学習支援、就業定着・中間就労支援、居場所づくり・ピアサポート団体 等',
    placeholderNote:
      '※2026年度（第1期）助成金の募集要領および申請書様式は「助成事業」ページにて公開・受付中です（募集期間：2026年11月09日〜2027年01月08日）。'
  };

  const Icon = grantProgram.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          OUR PROGRAMS
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          事業紹介
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}は、主に、民間支援活動への助成を通じて</span>
          <span className="inline-block">困難な状況にある方々の自立と社会参加を包括的に支援してまいります。</span>
        </p>
      </div>

      {/* Program: 助成事業のみ */}
      <div className="space-y-8">
        <article className="bg-white rounded-xl border border-[#e7e4dc] overflow-hidden shadow-xs transition-colors hover:border-[#47623d]/60">
          {/* Card Header: 助成事業とのみ記載 */}
          <div className="bg-[#faf9f5] border-b border-[#e7e4dc] px-5 py-3.5 flex items-center">
            <span className="text-sm sm:text-base font-bold text-stone-900">
              {grantProgram.badge}
            </span>
          </div>

          {/* Main Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Plain-Language Explanation */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#f2f6ef] text-[#47623d]">
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <h2 className="text-lg font-bold text-stone-900">
                  {grantProgram.title}
                </h2>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed pl-9">
                <span className="inline-block">精神的な困難等に直面する方々に寄り添う民間支援活動を対象に、</span>
                <span className="inline-block">「生活支援（生活の安定と自立）」「教育支援（学びの場の確保）」</span>
                <span className="inline-block">「就労支援（就業機会と定着）」「社会参加支援（居場所と孤立予防）」の</span>
                <span className="inline-block">4分野にわたる直接支援活動に対して資金助成を実施します。</span>
              </p>

              <div className="pl-9 pt-1 space-y-2 text-xs">
                <p className="text-stone-500 font-medium">
                  {grantProgram.targetExamples}
                </p>
                <p className="text-stone-700 bg-[#f7f6f2] p-2.5 rounded border border-[#e7e4dc] font-medium">
                  {grantProgram.placeholderNote}
                </p>
              </div>
            </div>

            {/* CTA for Grants */}
            <div className="pt-2 pl-9">
              <button
                type="button"
                onClick={() => setCurrentTab('grants')}
                className="px-4 py-2 text-white bg-[#47623d] hover:bg-[#374d2e] rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>助成公募の詳細ページへ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
