import React, { useState } from 'react';
import { useFoundation } from '../context/FoundationContext';
import disclosuresData from '../content/disclosures.json';
import { getAssetUrl } from '../utils/assetPath';
import {
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  Lock,
  UserCheck,
  Users,
  ArrowRight
} from 'lucide-react';

import { PreviewDocumentInfo } from '../components/DocumentPreviewModal';

interface DisclosuresPageProps {
  setPreviewDoc: (doc: string | PreviewDocumentInfo) => void;
  setCurrentTab?: (tab: string) => void;
}

interface DisclosureDocItem {
  title: string;
  fileType: string;
  status: string;
  fileDate?: string;
  fileName?: string | null;
  fileSize?: string;
  description?: string;
  note?: string;
  url?: string;
  downloadUrl?: string;
  linkTab?: string;
  linkAnchor?: string;
}

export const DisclosuresPage: React.FC<DisclosuresPageProps> = ({ setPreviewDoc, setCurrentTab }) => {
  const { currentFullName } = useFoundation();
  const currentTerm = disclosuresData[0];

  const handleNavigateInternal = (tab: string, anchor?: string) => {
    if (setCurrentTab) {
      setCurrentTab(tab);
    }
    if (anchor) {
      window.location.hash = anchor;
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          INFORMATION DISCLOSURE
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          情報公開
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}は、</span>
          <span className="inline-block">高い透明性と社会への説明責任を果たすため、</span>
          <span className="inline-block">定款【抜粋】、事業計画書、収支予算書及び決算・財務諸表を適時適切に開示いたします。</span>
        </p>
      </div>

      {/* Fiscal Year Status Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#f5f4ef] border border-[#e7e4dc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#47623d] shrink-0" />
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              対象年度：{currentTerm.fiscalYear}
            </h2>
            <p className="text-xs text-stone-500">
              当法人は令和8年8月29日に設立登記されたため、第1期事業年度は「令和8年8月29日〜令和9年3月31日」となります。
            </p>
          </div>
        </div>
        <span className="text-xs font-medium px-3 py-1 bg-[#fcf7ec] text-[#9c7429] border border-[#fae5be] rounded-md shrink-0">
          決算書類：{currentTerm.statusNote}
        </span>
      </div>

      {/* Disclosures Table by Category */}
      <div className="space-y-8">
        {currentTerm.categories.map((cat, cIdx) => {
          return (
            <section
              key={cIdx}
              className="bg-white rounded-xl border border-[#e7e4dc] overflow-hidden shadow-xs"
            >
              <div className="bg-[#faf9f5] px-6 py-3.5 border-b border-[#e7e4dc] flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#47623d]" />
                  <span>{cat.categoryName}</span>
                </h3>
              </div>

              <div className="divide-y divide-[#ece9e1]">
                {(cat.documents as DisclosureDocItem[]).map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf9f5] transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded bg-stone-100 text-stone-600 shrink-0 mt-0.5">
                        {doc.status === 'internal-link' || doc.linkTab ? (
                          <Users className="w-4 h-4 text-[#47623d]" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="text-sm font-bold text-stone-900">
                          {doc.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                          <span>形式：{doc.fileType}</span>
                          {doc.fileSize && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{doc.fileSize}</span>
                            </>
                          )}
                          {doc.fileDate && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{doc.fileDate}</span>
                            </>
                          )}
                          {doc.note && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-amber-800 font-medium">{doc.note}</span>
                            </>
                          )}
                        </div>
                        {doc.description && (
                          <p className="text-xs text-stone-500 leading-relaxed pt-0.5 max-w-2xl">
                            ※{doc.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pl-9 sm:pl-0">
                      {doc.status === 'internal-link' || doc.linkTab ? (
                        <button
                          type="button"
                          onClick={() => handleNavigateInternal(doc.linkTab || 'about', doc.linkAnchor || 'officers')}
                          className="px-3.5 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                          title="「財団について」の役員・評議員等へ移動"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>「財団について」で閲覧</span>
                          <ArrowRight className="w-3 h-3 text-stone-200" />
                        </button>
                      ) : doc.status === 'available' ? (
                        <div className="flex items-center gap-2">
                          {doc.url ? (
                            <a
                              href={getAssetUrl(doc.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                              title="新しいタブでPDFを開く"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>閲覧</span>
                              <ExternalLink className="w-3 h-3 text-stone-200" />
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc.title)}
                              className="px-3.5 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>閲覧</span>
                            </button>
                          )}
                          {doc.url && (
                            <a
                              href={getAssetUrl(doc.downloadUrl || doc.url)}
                              download={doc.fileName || `${doc.title}.pdf`}
                              className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-[#d5d0c3] text-stone-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                              title="PDFファイルを保存"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">保存</span>
                            </a>
                          )}
                        </div>
                      ) : doc.status === 'external' ? (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <span>行政庁公表サイトへ</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded border border-stone-200 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-stone-600" />
                          <span>{currentTerm.statusNote}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
