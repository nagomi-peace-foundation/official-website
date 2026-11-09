import React, { useState } from 'react';
import { useFoundation } from '../context/FoundationContext';
import { getPolicies } from '../content/policies';
import { ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface PolicyPageProps {
  initialPolicyId?: string;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialPolicyId = 'privacy' }) => {
  const { status, currentFullName } = useFoundation();
  const [activePolicy, setActivePolicy] = useState(initialPolicyId);

  const policies = getPolicies(status);
  const current = policies[activePolicy] || policies.privacy;

  const policyList = [
    { id: 'privacy', title: '個人情報保護方針' },
    { id: 'myNumber', title: '特定個人情報等の取扱い方針' },
    { id: 'antiSocial', title: '反社会的勢力排除に関する基本方針' },
    { id: 'sitePolicy', title: 'サイトポリシー' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          COMPLIANCE & POLICIES
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          コンプライアンス・諸方針
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}は、</span>
          <span className="inline-block">関連法令及び高い倫理基準を遵守し、</span>
          <span className="inline-block">公正で信頼される法人活動を徹底するための基本方針を定めています。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="bg-white rounded-xl border border-[#e7e4dc] p-2 shadow-xs space-y-1">
            {policyList.map((p) => {
              const isActive = activePolicy === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePolicy(p.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#47623d] text-white font-bold'
                      : 'text-stone-700 hover:bg-[#faf9f5]'
                  }`}
                >
                  <span>{p.title}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#f5f4ef] text-[11px] text-stone-500 space-y-1 border border-[#e7e4dc]">
            <div className="flex items-center gap-1 font-semibold text-stone-700">
              <ShieldCheck className="w-4 h-4 text-[#47623d]" />
              <span>適正運営基準</span>
            </div>
            <p>当法人の定款及び理事会決議に基づき整備された基本方針です。</p>
          </div>
        </aside>

        {/* Policy Content */}
        <div className="lg:col-span-3">
          <article className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="border-b border-[#e7e4dc] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                {current.title}
              </h2>
              <span className="text-xs text-stone-500 font-mono">{current.lastUpdated}</span>
            </div>

            {current.lead && (
              <div className="p-4 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf] text-[#2c3d25] font-medium text-xs sm:text-sm leading-relaxed">
                {current.lead}
              </div>
            )}

            <div className="space-y-6">
              {current.sections.map((section, idx) => (
                <section key={idx} className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 border-b border-stone-100 pb-1">
                    {section.heading}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed pl-1">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
