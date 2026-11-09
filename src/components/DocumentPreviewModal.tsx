import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import { X, FileText, Download, ShieldCheck, ExternalLink, Eye, AlertCircle } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

export interface PreviewDocumentInfo {
  title: string;
  url?: string;
  downloadUrl?: string;
  fileName?: string;
}

interface DocumentPreviewModalProps {
  document: PreviewDocumentInfo | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
}) => {
  const { currentFullName, foundation } = useFoundation();
  if (!document) return null;

  const hasRealPdf = Boolean(document.url);
  const pdfUrl = getAssetUrl(document.url);
  const downloadUrl = getAssetUrl(document.downloadUrl || document.url);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="document-modal-title"
    >
      <div
        className={`relative w-full ${
          hasRealPdf ? 'max-w-5xl' : 'max-w-2xl'
        } bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]`}
      >
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#faf9f5] border-b border-[#e7e4dc] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-[#f2f6ef] text-[#47623d] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h2 id="document-modal-title" className="text-base font-bold text-stone-900 truncate">
                {document.title}
              </h2>
              <p className="text-xs text-stone-500 truncate">
                {currentFullName} 正式公開文書（PDF）
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasRealPdf && (
              <>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d5d0c3] text-stone-700 bg-white hover:bg-stone-50 text-xs font-medium transition-colors"
                  title="新しいタブでPDFを開く"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>新規タブで開く</span>
                </a>
                <a
                  href={downloadUrl}
                  download={document.fileName || 'document.pdf'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#47623d] hover:bg-[#374d2e] text-white text-xs font-semibold transition-colors shadow-xs"
                  title="PDFファイルを保存"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ダウンロード</span>
                </a>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
              aria-label="閉じる"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {hasRealPdf ? (
          <div className="flex-1 overflow-hidden flex flex-col bg-stone-100 p-2 sm:p-4">
            {/* Direct Open Banner for Chrome Compatibility */}
            <div className="mb-2 p-3 bg-[#f2f6ef] rounded-lg border border-[#d6e3cf] flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs text-[#2e4325]">
                <ExternalLink className="w-4 h-4 text-[#47623d] shrink-0" />
                <span className="font-medium">
                  ※Chrome等のセキュリティ制限で画面内プレビューがブロックされる場合は、新規タブで開いてご覧ください。
                </span>
              </div>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>新規タブで直接開く</span>
              </a>
            </div>

            {document.title.includes('申請書') && (
              <div className="mb-2.5 p-3 rounded-lg bg-[#fdfaf7] border border-[#f3ded2] text-xs text-stone-700">
                <span className="font-bold text-[#b8582d] flex items-center gap-1.5 text-xs mb-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#c4683f]" />
                  <span>【申請書の記入に関する注意事項】</span>
                </span>
                <p className="text-[11px] leading-relaxed text-stone-600 pl-5">
                  申請書（PDF）の入力欄には、行数や記入スペースに制限があります。実施スケジュール等について入力欄が不足する場合は、お手数ですが、該当する項目名を明記した補足資料を別途作成し、申請書と併せてご提出ください。
                </p>
              </div>
            )}

            {document.title.includes('定款') && (
              <div className="mb-2.5 p-3 rounded-lg bg-[#faf9f5] border border-[#e7e4dc] text-xs text-stone-600 leading-relaxed">
                ※本定款はホームページ公開用として、附則等を省略した抜粋版です。正式な定款原本は当財団にて保管しています。
              </div>
            )}

            <div className="flex-1 w-full rounded-lg overflow-hidden border border-stone-300 bg-white shadow-inner min-h-[50vh] sm:min-h-[68vh] relative">
              <object
                data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full min-h-[50vh] sm:min-h-[68vh]"
              >
                <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center h-full">
                  <FileText className="w-12 h-12 text-stone-400" />
                  <p className="text-sm font-semibold text-stone-700">
                    ブラウザのセキュリティ設定により画面内表示が制限されています。
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#47623d] text-white rounded-lg text-xs font-semibold flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>新規タブでPDFを開く</span>
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5 text-sm text-stone-700 overflow-y-auto">
            <div className="border border-[#e7e4dc] rounded-lg p-5 bg-[#faf9f5]/50 space-y-4">
              <div className="border-b border-[#e7e4dc] pb-3 flex justify-between items-center text-xs text-stone-500">
                <span>文書形式：PDF / 電子公表</span>
                <span>法人成立：{foundation.establishedDateJp || '令和8年8月29日'}</span>
              </div>

              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#f2f6ef] text-[#47623d] flex items-center justify-center border border-[#d6e3cf]">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">{document.title}</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  当法人の定款及び情報公開規程に基づき整備・保管される正式文書です。
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-[#e7e4dc] text-xs space-y-2 text-stone-600">
                <div className="flex justify-between">
                  <span className="text-stone-400">発行者：</span>
                  <span className="font-medium text-stone-800">{currentFullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">事務所所在地：</span>
                  <span className="text-stone-800">{foundation.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">法人番号：</span>
                  <span className="text-stone-800 font-mono font-medium">{foundation.corporateNumber}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              ※第1期決算書類等は、第1期事業年度（令和8年8月29日〜令和9年3月31日）終了後に開催される定時評議員会での承認を経て適時開示されます。
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#faf9f5] border-t border-[#e7e4dc] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[#47623d] font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>定款及び公募規程に基づく公式資料</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
            >
              閉じる
            </button>
            {hasRealPdf && (
              <a
                href={downloadUrl}
                download={document.fileName || 'document.pdf'}
                className="px-4 py-2 bg-[#47623d] hover:bg-[#374d2e] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDFをダウンロード</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
