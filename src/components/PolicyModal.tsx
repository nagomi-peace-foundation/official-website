import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import { getPolicies } from '../content/policies';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  policyId: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyId, onClose }) => {
  const { status } = useFoundation();
  if (!policyId) return null;

  const policies = getPolicies(status);
  const policy = policies[policyId] || policies.privacy;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#faf9f5] border-b border-[#e7e4dc] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#f2f6ef] text-[#47623d]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="policy-modal-title" className="text-lg font-bold text-stone-900">
                {policy.title}
              </h2>
              <p className="text-xs text-stone-500">{policy.lastUpdated}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-stone-700 leading-relaxed">
          {policy.lead && (
            <div className="p-4 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf] text-[#2c3d25] font-medium text-xs leading-relaxed">
              {policy.lead}
            </div>
          )}

          <div className="space-y-6">
            {policy.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm border-b border-stone-100 pb-1">
                  {section.heading}
                </h3>
                <div className="space-y-1.5 text-xs text-stone-600 pl-1">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#faf9f5] border-t border-[#e7e4dc] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-[#47623d]" />
            <span>定款及び関連法令遵守規程に基づく制定</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-stone-900 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
