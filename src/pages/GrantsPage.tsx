import React, { useState } from 'react';
import { useFoundation } from '../context/FoundationContext';
import grantsData from '../content/grants.json';
import { PreviewDocumentInfo } from '../components/DocumentPreviewModal';
import { getAssetUrl } from '../utils/assetPath';
import {
  FileText,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  ExternalLink,
  Layers,
  FileCheck2,
  Mail,
  Info,
  AlertCircle
} from 'lucide-react';

interface GrantsPageProps {
  setPreviewDoc: (doc: string | PreviewDocumentInfo) => void;
}

export const GrantsPage: React.FC<GrantsPageProps> = ({ setPreviewDoc }) => {
  const { currentFullName } = useFoundation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const grant = grantsData[0];

  const selectionSteps = [
    {
      step: '01',
      title: '申請受付・公募',
      period: '2026年11月09日 〜 2027年01月08日',
      actor: '申請者',
      desc: '指定の申請書類（助成金申請書、事業計画書、積算根拠書類等）を応募先メールアドレス宛てに送信。'
    },
    {
      step: '02',
      title: '事務局確認（形式審査）',
      period: '2027年01月上旬',
      actor: '当財団事務局',
      desc: '応募要件の充足、必要書類の確認、支援対象事業の適合性及び事業実施能力を確認します。'
    },
    {
      step: '03',
      title: '選考委員会による審査',
      period: '2027年01月中',
      actor: '選考委員会',
      desc: '定款第45条に基づき、外部有識者を含む選考委員会により、公平性・利益相反排除を徹底した上で、要領所定の基準により厳正に審査・答申します。'
    },
    {
      step: '04',
      title: '理事会による最終決議',
      period: '2027年01月下旬',
      actor: '理事会',
      desc: '選考委員会の答申に基づき、助成対象者及び交付額（1件上限100万円・総額600万円予定）を最終決定します。'
    },
    {
      step: '05',
      title: '結果通知・交付・報告',
      period: '通知：1月中 ／ 交付：3月予定',
      actor: '事務局 ↔ 申請者',
      desc: 'メールにて結果通知。指定口座へ交付（対象期間：2027年4月〜2028年3月）。事業終了後1か月以内に実績報告書を提出。'
    }
  ];

  const faqs = [
    {
      q: 'どのような団体・個人が申請対象となりますか？',
      a: '精神的な困難等により支援を必要とする方に対し、生活・教育・就労・社会参加支援を行う個人又は法人（特定非営利活動法人、一般社団法人、一般財団法人、社会福祉法人、任意団体等）が対象です。法人格の種類は問いませんが、事業実施能力を確認します。'
    },
    {
      q: '第1期公募の募集期間と支援対象期間はいつですか？',
      a: '募集期間は「2026年11月09日〜2027年01月08日」です。選考結果は2027年01月中にメールにて通知し、2027年03月に交付予定です。支援対象期間は「2027年04月01日〜2028年03月31日」となります。'
    },
    {
      q: '助成金額と採択件数はどのくらいですか？',
      a: '1件あたり100万円を上限とし、年間6件程度（総額600万円を予定）です。審査のうえ、事業に必要と認められる額を交付します。'
    },
    {
      q: '人件費や消耗品費も助成の対象となりますか？',
      a: '支援活動に直接必要な経費であれば、直接従事する者の人件費、講師謝金、教材・消耗品購入費、会場費、交通費等が対象となります（設備購入や人件費は申請時に必要性と積算根拠を明記）。なお、一般管理費や交際費、借入金返済費用等は対象外です。'
    },
    {
      q: '他の助成金・補助金との併用は可能ですか？',
      a: '国・地方公共団体による補助金等との併用は可能ですが、同一の経費に対する重複充当は認められません。また、同一事業について他の民間財団や企業等から助成金を受ける場合は申請対象外となります。'
    },
    {
      q: '事業終了後、どのような報告が必要ですか？',
      a: '事業終了後1か月以内に、活動報告書、収支報告書、領収書等の証憑、及び成果を示す資料をご提出いただきます。'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          GRANT PROGRAMS
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          助成事業
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}は、</span>
          <span className="inline-block">困難な状況にある方々の自立、回復及び社会参加を包括的に支援するため、</span>
          <span className="inline-block">現場で活動する民間支援活動への助成を行っています。</span>
        </p>
      </div>

      {/* 1. 公募概要 */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              公募概要
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              2026年度（令和8年度 第1期）助成プログラムの基本要件と募集内容の要約です
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1 bg-white text-stone-700 border border-[#d5d0c3] rounded-md">
              募集期間：2026年11月09日 〜 2027年01月08日
            </span>
            <span className="text-xs font-semibold px-3 py-1 bg-[#f2f6ef] text-[#47623d] border border-[#d6e3cf] rounded-md">
              {grant.statusLabel}
            </span>
          </div>
        </div>

        {/* Program Overview Summary Card (公募概要 要約版) */}
        <div className="bg-white rounded-xl border border-[#e7e4dc] overflow-hidden shadow-xs">
          <div className="bg-[#faf9f5] px-6 py-4 border-b border-[#e7e4dc] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-[#47623d]">
                {grant.fiscalYear} 公募概要（要約）
              </span>
              <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                {grant.title}
              </h3>
            </div>
            <div className="text-xs font-semibold px-3 py-1 bg-white border border-[#d5d0c3] rounded text-stone-700">
              募集期間：2026年11月09日 〜 2027年01月08日
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm text-stone-700 leading-relaxed">
              <span className="inline-block">当財団は、精神的な困難等により日常生活、学習、就労又は社会参加に</span>
              <span className="inline-block">支援を必要とする方への直接的支援を行う民間支援活動（個人・法人・任意団体）への助成を行います。</span>
            </p>

            {/* Key Parameters Table (要約テーブル) */}
            <div className="overflow-hidden rounded-lg border border-[#e7e4dc]">
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-[#e7e4dc]">
                  <tr className="bg-[#fbfaf6]">
                    <th className="w-32 sm:w-44 px-4 py-3 font-bold text-stone-900 shrink-0">助成対象者</th>
                    <td className="px-4 py-3 text-stone-700">
                      生活支援・教育支援・就労支援・社会参加支援を行う個人又は法人（団体を含む。法人格不問・事業実施能力を確認）
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <th className="px-4 py-3 font-bold text-stone-900">支援対象事業</th>
                    <td className="px-4 py-3 text-stone-700">
                      日本国内で実施し、募集テーマに合致する個別事業またはプロジェクト
                    </td>
                  </tr>
                  <tr className="bg-[#fbfaf6]">
                    <th className="px-4 py-3 font-bold text-stone-900">助成金額・件数</th>
                    <td className="px-4 py-3 text-stone-700 font-semibold text-[#47623d]">
                      1件あたり 100万円を上限 ／ 年間6件程度（総額600万円予定）
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <th className="px-4 py-3 font-bold text-stone-900">募集期間</th>
                    <td className="px-4 py-3 text-stone-900 font-bold">
                      2026年11月09日 〜 2027年01月08日（メール受付）
                    </td>
                  </tr>
                  <tr className="bg-[#fbfaf6]">
                    <th className="px-4 py-3 font-bold text-stone-900">支援対象期間</th>
                    <td className="px-4 py-3 text-stone-900 font-medium">
                      2027年04月01日 〜 2028年03月31日
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <th className="px-4 py-3 font-bold text-stone-900">応募方法</th>
                    <td className="px-4 py-3 text-stone-700">
                      所定の申請書類を応募先メールアドレス（
                      <a href={`mailto:${grant.contact.email}`} className="text-[#47623d] hover:underline font-medium">
                        {grant.contact.email}
                      </a>
                      ）宛てにメールにて提出
                    </td>
                  </tr>
                  <tr className="bg-[#fbfaf6]">
                    <th className="px-4 py-3 font-bold text-stone-900">選考・交付時期</th>
                    <td className="px-4 py-3 text-stone-700">
                      選考結果通知：2027年01月中（メール通知） ／ 交付：2027年03月予定（指定口座へ交付）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4 Themes Concise Summary */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#47623d]" />
                <span>対象となる4つの募集テーマ</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf] space-y-1">
                  <span className="font-bold text-[#47623d] block">A. 生活支援｜生活の安定と自立</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    食料・日用品提供、生活相談・伴走、住まい確保、生活再建、アウトリーチ活動等。
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#fcf7ec] border border-[#fae5be] space-y-1">
                  <span className="font-bold text-[#b8852e] block">B. 教育支援｜学習機会の確保と学びの継続</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    経済的困難のある子ども・若者への学習支援、不登校支援、教材・ICT機器貸与、日本語支援等。
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#fdf5f0] border border-[#fae8de] space-y-1">
                  <span className="font-bold text-[#c4683f] block">C. 就労支援｜就労機会の確保と職場定着</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    就労相談・キャリア面談、職業訓練・資格取得、職場体験、合理的配慮支援、定着支援等。
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#f4f7f6] border border-[#d2e0dd] space-y-1">
                  <span className="font-bold text-[#2d6a5e] block">D. 社会参加支援｜孤立の予防と地域とのつながり</span>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    居場所づくり・交流拠点運営、当事者ピアサポート、文化・スポーツ・地域参加等。
                  </p>
                </div>
              </div>
            </div>

            {/* Note pointing to the official PDF */}
            <div className="p-4 rounded-lg bg-[#faf9f5] border border-[#e7e4dc] flex items-start gap-2.5 text-xs text-stone-600">
              <Info className="w-4 h-4 text-[#47623d] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                助成対象者要件の詳細、対象経費・対象外経費の細則、応募書類一覧及び選考基準については、下記掲載の
                <a
                  href={getAssetUrl(grant.guidelinesPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#47623d] font-bold hover:underline mx-1 inline-flex items-center gap-0.5"
                >
                  <span>「2026年度 支援活動助成金 募集要領（PDF）」</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
                をご確認ください。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 募集要領＆申請書（公募情報・関係書類PDF） */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            募集要領＆申請書（PDF）
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            2026年度 支援活動助成金の公式募集要領および申請書様式（入力可能PDF）を閲覧・ダウンロードできます
          </p>
        </div>

        {/* PDF Download Cards (Featured Primary UI) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document 1: 募集要領 PDF */}
          <div className="bg-white rounded-xl border-2 border-[#d6e3cf] p-6 shadow-xs hover:border-[#47623d] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#f2f6ef] text-[#47623d] border border-[#d6e3cf]">
                  公募要領（PDF）
                </span>
                <span className="text-xs text-stone-400 font-mono">全5ページ / 約312KB</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                2026年度 支援活動助成金 募集要領
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                助成の目的、募集テーマ（4分野）、助成額（1件上限100万円・総額600万円予定）、助成対象者要件、対象経費の細則、選考基準及び提出書類等を定めた公式募集要領です。
              </p>
              <div className="text-[11px] text-[#47623d] font-medium bg-[#f2f6ef] rounded px-2.5 py-1 border border-[#d6e3cf] inline-block">
                募集期間：2026年11月09日 〜 2027年01月08日（17:00必着）
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#f0ede6] space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={getAssetUrl(grant.guidelinesPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>新規タブでPDFを閲覧</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                </a>

                <a
                  href={getAssetUrl(grant.guidelinesPdfClean || grant.guidelinesPdf)}
                  download={grant.guidelinesFileName}
                  className="px-4 py-2.5 bg-white hover:bg-[#faf9f5] border border-[#d5d0c3] text-stone-800 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDFをダウンロード</span>
                </a>
              </div>
            </div>
          </div>

          {/* Document 2: 申請書フォーム PDF */}
          <div className="bg-white rounded-xl border-2 border-[#fae8de] p-6 shadow-xs hover:border-[#c4683f] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#fdf5f0] text-[#c4683f] border border-[#fae8de]">
                  申請書様式（入力可能PDF）
                </span>
                <span className="text-xs text-stone-400 font-mono">全5ページ / 約391KB</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                2026年度 支援活動助成金 申請書
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                応募者概要、活動理念・実績、事業計画（支援対象・課題・活動内容・対象人数・実施場所・成果指標）、及び助成対象経費の積算根拠・収支予算明細を記入する公式所定様式です。
              </p>
              <div className="text-[11px] text-[#a9542e] font-medium bg-[#fdf5f0] rounded px-2.5 py-1 border border-[#fae8de] inline-block">
                受付期間：2026年11月09日 〜 2027年01月08日（メール提出）
              </div>

              {/* 【申請書の記入に関する注意事項】 */}
              <div className="p-3.5 bg-[#fdfaf7] rounded-lg border border-[#f3ded2] text-xs text-stone-700 space-y-1 mt-2">
                <span className="font-bold text-[#b8582d] flex items-center gap-1.5 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#c4683f]" />
                  <span>【申請書の記入に関する注意事項】</span>
                </span>
                <p className="text-[11px] leading-relaxed text-stone-600 pl-5">
                  申請書（PDF）の入力欄には、行数や記入スペースに制限があります。実施スケジュール等について入力欄が不足する場合は、お手数ですが、該当する項目名を明記した補足資料を別途作成し、申請書と併せてご提出ください。
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#f0ede6] space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={getAssetUrl(grant.applicationFormPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#c4683f] hover:bg-[#a9542e] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>新規タブでPDFを閲覧</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                </a>

                <a
                  href={getAssetUrl(grant.applicationFormPdfClean || grant.applicationFormPdf)}
                  download={grant.applicationFormFileName}
                  className="px-4 py-2.5 bg-white hover:bg-[#fdf5f0] border border-[#e8d7cf] text-stone-800 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDFをダウンロード</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 選考プロセス */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            選考プロセス
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            定款及び募集要領に基づき、公正・透明で専門的な審査基準により厳正に審査・決定されます
          </p>
        </div>

        {/* 選考フロー ステップ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {selectionSteps.map((s, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#e7e4dc] p-5 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <span className="font-mono text-xs font-bold text-[#47623d] px-2 py-0.5 bg-[#f2f6ef] rounded whitespace-nowrap shrink-0">
                    STEP {s.step}
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium whitespace-nowrap">
                    {s.actor}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {s.title}
                </h3>
                <div className="text-[10px] text-stone-400 font-mono mb-2">
                  {s.period}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {index < selectionSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-stone-300 bg-white rounded-full p-0.5 border border-[#e7e4dc]">
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. 採択実績 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            採択実績
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">過去の採択案件および成果報告</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <Clock className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-stone-800">
              第1期公募受付中（選考結果は2027年1月公表予定）
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              <span className="inline-block">当法人は令和8年8月29日に設立登記を完了し、</span>
              <span className="inline-block">現在第1期助成（2026年度）の公募を行っております。</span>
              <span className="inline-block">理事会決議及び採択通知完了後、採択者名、事業名、</span>
              <span className="inline-block">助成金額及び活動成果を順次公開いたします。</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. 助成FAQ */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            よくあるご質問（FAQ）
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">助成申請に関する主な疑問にお答えします</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <span className="font-mono text-emerald-800 font-bold text-xs px-2 py-0.5 bg-emerald-50 rounded">Q</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50/50">
                    <div className="flex items-start gap-2 pt-3">
                      <span className="font-mono text-stone-600 font-bold text-xs px-2 py-0.5 bg-stone-200 rounded shrink-0">A</span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
