import React from 'react';
import { useFoundation } from '../context/FoundationContext';

export const GovernanceChart: React.FC = () => {
  const { currentFullName } = useFoundation();

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#47623d]"></span>
          ガバナンス・組織体制図
        </h3>
        <p className="mt-1 text-sm text-stone-600">
          当財団は、評議員会、理事会、監事の3機関が相互に牽制・連携し、透明性の高い公正な運営を行うガバナンス体制を確立しています。
        </p>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[760px] p-2">
          <svg
            viewBox="0 0 880 520"
            className="w-full h-auto font-sans"
            role="img"
            aria-label={`${currentFullName}のガバナンス組織図`}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#47623d" />
              </marker>
              <marker
                id="auditarrow"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#c49641" />
              </marker>
              <marker
                id="dasharrow"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#7a766c" />
              </marker>
            </defs>

            {/* Connecting Lines */}
            {/* Councilor Selection Committee to Council */}
            <path
              d="M 210 75 L 340 75"
              stroke="#7a766c"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#dasharrow)"
            />
            <text x="275" y="65" textAnchor="middle" className="text-[11px] fill-stone-500 font-medium">選任諮問・推薦</text>

            {/* Council to Board of Directors */}
            <path
              d="M 470 120 L 470 200"
              stroke="#47623d"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead)"
            />
            <text x="480" y="165" textAnchor="start" className="text-[12px] fill-[#374d2e] font-bold">選任・監督</text>

            {/* Council to Auditor */}
            <path
              d="M 600 75 L 720 75 L 720 200"
              stroke="#47623d"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            <text x="660" y="65" textAnchor="middle" className="text-[11px] fill-[#374d2e] font-medium">選任・監督</text>

            {/* Auditor Audit path to Board & Council */}
            <path
              d="M 660 250 L 590 250"
              stroke="#c49641"
              strokeWidth="2"
              strokeDasharray="5 3"
              markerEnd="url(#auditarrow)"
            />
            <text x="625" y="240" textAnchor="middle" className="text-[11px] fill-[#8f6a27] font-semibold">職務監査</text>

            {/* Board of Directors to Representative Director */}
            <path
              d="M 470 300 L 470 360"
              stroke="#47623d"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead)"
            />
            <text x="480" y="335" textAnchor="start" className="text-[12px] fill-[#374d2e] font-bold">選定・業務指示</text>

            {/* Grant Selection Committee to Board (Advisory / Screening) */}
            <path
              d="M 210 250 L 350 250"
              stroke="#c4683f"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="280" y="240" textAnchor="middle" className="text-[11px] fill-[#a9542e] font-medium">審査・答申</text>

            {/* Representative Director to Secretariat */}
            <path
              d="M 470 440 L 470 480"
              stroke="#47623d"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead)"
            />

            {/* 1. 評議員選定委員会 */}
            <g transform="translate(40, 35)">
              <rect width="170" height="80" rx="8" fill="#faf9f5" stroke="#d5d0c3" strokeWidth="1.5" />
              <text x="85" y="30" textAnchor="middle" className="text-[14px] font-bold fill-stone-800">評議員選定委員会</text>
              <text x="85" y="52" textAnchor="middle" className="text-[11px] fill-stone-500">外部委員を含む</text>
              <text x="85" y="68" textAnchor="middle" className="text-[11px] fill-stone-500">評議員選定の客観性を確保</text>
            </g>

            {/* 2. 評議員会 (最高意思決定機関) */}
            <g transform="translate(340, 20)">
              <rect width="260" height="100" rx="8" fill="#f2f6ef" stroke="#47623d" strokeWidth="2" />
              <text x="130" y="35" textAnchor="middle" className="text-[16px] font-bold fill-[#283822]">評議員会</text>
              <text x="130" y="55" textAnchor="middle" className="text-[11px] font-semibold fill-[#47623d]">【最高意思決定機関】</text>
              <text x="130" y="74" textAnchor="middle" className="text-[11px] fill-[#374d2e]">定款変更 / 役員選任・解任</text>
              <text x="130" y="90" textAnchor="middle" className="text-[11px] fill-[#374d2e]">決算承認 / 基本方針決定</text>
            </g>

            {/* 3. 監事 (独立監査) */}
            <g transform="translate(660, 200)">
              <rect width="180" height="95" rx="8" fill="#fcf7ec" stroke="#c49641" strokeWidth="1.8" />
              <text x="90" y="32" textAnchor="middle" className="text-[15px] font-bold fill-[#523d15]">監事</text>
              <text x="90" y="52" textAnchor="middle" className="text-[11px] font-semibold fill-[#9e762c]">【監査機関】</text>
              <text x="90" y="70" textAnchor="middle" className="text-[11px] fill-[#715421]">理事の職務執行監査</text>
              <text x="90" y="86" textAnchor="middle" className="text-[11px] fill-[#715421]">財務・財産状況の監査</text>
            </g>

            {/* 4. 助成選考委員会 */}
            <g transform="translate(40, 205)">
              <rect width="170" height="90" rx="8" fill="#fdf5f0" stroke="#c4683f" strokeWidth="1.8" />
              <text x="85" y="32" textAnchor="middle" className="text-[14px] font-bold fill-[#5c240d]">助成選考委員会</text>
              <text x="85" y="52" textAnchor="middle" className="text-[11px] font-semibold fill-[#b05228]">【専門審査諮問機関】</text>
              <text x="85" y="70" textAnchor="middle" className="text-[11px] fill-[#823a17]">外部有識者による専門審査</text>
              <text x="85" y="86" textAnchor="middle" className="text-[11px] fill-[#823a17]">公正・透明な採択案策定</text>
            </g>

            {/* 5. 理事会 */}
            <g transform="translate(350, 200)">
              <rect width="240" height="100" rx="8" fill="#f5f8f3" stroke="#5d7e52" strokeWidth="2" />
              <text x="120" y="35" textAnchor="middle" className="text-[16px] font-bold fill-[#283822]">理事会</text>
              <text x="120" y="55" textAnchor="middle" className="text-[11px] font-semibold fill-[#47623d]">【業務執行の決定機関】</text>
              <text x="120" y="74" textAnchor="middle" className="text-[11px] fill-[#374d2e]">事業計画・予算の決定</text>
              <text x="120" y="90" textAnchor="middle" className="text-[11px] fill-[#374d2e]">助成案件の最終決定</text>
            </g>

            {/* 6. 代表理事・理事長 */}
            <g transform="translate(360, 360)">
              <rect width="220" height="80" rx="8" fill="#374d2e" stroke="#263620" strokeWidth="2" />
              <text x="110" y="32" textAnchor="middle" className="text-[15px] font-bold fill-white">代表理事（理事長）</text>
              <text x="110" y="52" textAnchor="middle" className="text-[11px] fill-[#d6e5cb] font-medium">清水 樹郎</text>
              <text x="110" y="68" textAnchor="middle" className="text-[11px] fill-[#d6e5cb]">当法人の代表及び業務統括</text>
            </g>

            {/* 7. 事務局 */}
            <g transform="translate(380, 480)">
              <rect width="180" height="35" rx="6" fill="#faf9f5" stroke="#d5d0c3" strokeWidth="1.5" />
              <text x="90" y="23" textAnchor="middle" className="text-[13px] font-bold fill-stone-800">事務局（実務執行）</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Accessible text explanation for screen readers and detail lovers */}
      <div className="mt-6 pt-6 border-t border-stone-200">
        <h4 className="text-sm font-semibold text-stone-900 mb-3">各機関の役割と相互関係</h4>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600">
          <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-100">
            <dt className="font-bold text-stone-900 mb-1 text-sm">評議員会（最高意思決定機関）</dt>
            <dd>理事・監事とは完全に分離された独立の機関として、役員の選任・解任、定款の変更、事業計画及び決算の承認等、重要事項の意思決定を行います。</dd>
          </div>
          <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-100">
            <dt className="font-bold text-stone-900 mb-1 text-sm">監事（独立監査機関）</dt>
            <dd>理事の職務執行および財産の状況を常に監査し、評議員会および理事会に報告する権限を有します。適正かつ透明な法人運営を担保します。</dd>
          </div>
          <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-100">
            <dt className="font-bold text-stone-900 mb-1 text-sm">助成選考委員会（専門審査機関）</dt>
            <dd>福祉・教育・就労支援などの外部有識者を含む審査委員会を組織し、利害関係を排除した公正中立な選考審査を行い、理事会へ答申します。</dd>
          </div>
          <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-100">
            <dt className="font-bold text-stone-900 mb-1 text-sm">理事会・代表理事（業務執行）</dt>
            <dd>評議員会で定められた基本方針に基づき、当法人の事業計画・予算の策定、助成対象の最終決定を行い、代表理事（理事長）が事務局を指揮統括します。</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
