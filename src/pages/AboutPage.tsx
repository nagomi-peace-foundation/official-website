import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import { GovernanceChart } from '../components/GovernanceChart';
import { PreviewDocumentInfo } from '../components/DocumentPreviewModal';
import { LOGO_PATH } from '../data/foundation';
import {
  Building2,
  FileText,
  UserCheck,
  ShieldCheck,
  Compass,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink
} from 'lucide-react';

interface AboutPageProps {
  setPreviewDoc?: (doc: string | PreviewDocumentInfo) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setPreviewDoc }) => {
  const { currentFullName, foundation } = useFoundation();

  React.useEffect(() => {
    const rawHash = window.location.hash.replace('#', '');
    if (rawHash === 'officers' || rawHash === 'about-officers') {
      const timer = setTimeout(() => {
        const el = document.getElementById('officers');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* Page Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          ABOUT THE FOUNDATION
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          財団について
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}は、</span>
          <span className="inline-block">精神的な困難等に直面する方々に寄り添う民間支援活動を助成し、</span>
          <span className="inline-block">支え手の基盤充実と包摂的な地域社会の形成に寄与する一般財団法人です。</span>
        </p>
      </div>

      {/* 1. 設立目的（定款第3条 原文） */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#47623d]" />
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            設立趣旨・目的
          </h2>
        </div>

        <div className="bg-[#2a3825] text-white rounded-xl p-6 sm:p-10 shadow-sm border border-[#3b4e34] relative overflow-hidden">
          <div className="border-b border-[#3d5337] pb-3 mb-6 text-xs text-[#d3e5cb] flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold tracking-wider text-[#e0b45d]">定款第3条（目的）抜粋</span>
            <div className="flex items-center gap-2">
              <a
                href={foundation.articlesPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#47623d] hover:bg-[#58784d] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs border border-[#5d7c52]"
                title="新しいタブで定款【抜粋】PDFを開く"
              >
                <FileText className="w-3.5 h-3.5 text-[#e0b45d]" />
                <span>定款【抜粋】（PDF）を閲覧</span>
                <ExternalLink className="w-3 h-3 text-[#d3e5cb]" />
              </a>
              <a
                href={foundation.articlesPdfClean || foundation.articlesPdf}
                download={foundation.articlesFileName}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors border border-white/20"
                title="定款【抜粋】PDFファイルをダウンロード"
              >
                <Download className="w-3.5 h-3.5" />
                <span>保存</span>
              </a>
            </div>
          </div>

          <blockquote className="text-base sm:text-lg leading-relaxed font-serif text-stone-100 pl-4 border-l-3 border-[#c4683f] space-y-1.5">
            <span className="block text-sm text-[#e0b45d] font-semibold">（目 的）</span>
            <p>第３条　{foundation.purpose}</p>
          </blockquote>

          <div className="mt-4 pt-3 border-t border-[#3b4e34] text-xs text-[#c0d4b9] leading-relaxed">
            ※本定款はホームページ公開用として、附則等を省略した抜粋版です。正式な定款原本は当財団にて保管しています。
          </div>
        </div>
      </section>

      {/* 2. 代表理事 挨拶 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#47623d]" />
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            代表理事 挨拶
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="space-y-6">
            <div className="space-y-5 text-stone-800 text-base sm:text-[17.5px] leading-loose font-handwriting">
              <p className="indent-[1em]">
                AIや宇宙やバイオテクノロジー等の先端分野では技術革新が日進月歩で進化しており、実際に我々の生活もとても便利になり大きな恩恵を受けています。その一方で、冷たい競争社会から弾き出されて、精神的に病む人、引籠る人、学校や仕事に通えない人たちの数はますます増えています。
              </p>
              <p className="indent-[1em]">
                世の中は本当に良くなっているのでしょうか。健康を与えられている人にはこのような弱い人達に共感し手を差し伸べることと、弱い人も安心して暮らせるように社会を少しでも良くすることが求められているではないでしょうか。それは弱者のためである以前に、たまたま健常者であり、勝ち残ってきた人たち自身がより良く生きるために必要なことと考えます。
              </p>
              <p className="indent-[1em]">
                なごみ平和財団は精神的な困難を抱える人々を中心として、生活支援・教育支援・就労支援をされておられる個人または法人に対する助成をさせていただきます。 苦難にある人々の社会的自立と回復を支援し、支えられる側と支える側が互いに協働して進む社会を目指しています。
              </p>
              <p className="indent-[1em]">
                このような思いを共有いただける方々と連携して新しい良き社会の構築を目指して小さな実践から取り組み始めようと思っております。どうぞよろしくお願い申し上げます。
              </p>
            </div>

            <div className="pt-6 border-t border-[#f0ede6] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-stone-700 font-handwriting">
              <p className="text-base text-stone-600 font-handwriting">
                令和８年１１月
              </p>
              <div className="text-right">
                <p className="text-xs text-stone-500 font-medium font-handwriting">なごみ平和財団　代表理事</p>
                <p className="text-2xl font-semibold text-stone-900 font-handwriting tracking-wider mt-1">
                  清水　樹郎
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 シンボルマーク・ロゴについて */}
      <section className="space-y-4">
        <div className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="shrink-0 p-4 bg-[#faf9f5] rounded-xl border border-[#e7e4dc] flex items-center justify-center">
              <img
                src={LOGO_PATH}
                alt="なごみ平和財団 シンボルマーク及び公式ロゴ"
                className="w-48 sm:w-56 h-auto object-contain"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-xs font-semibold text-[#47623d] tracking-wider uppercase">
                  OFFICIAL LOGO & SYMBOL
                </p>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  シンボルマークに込められた想い
                </h3>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                <span className="inline-block">{currentFullName}のロゴマークは、</span>
                <span className="inline-block">人と人、社会と現場が手を取り合う「和（調和・共生）」の理念と、</span>
                <span className="inline-block">誰もが尊厳をもって暮らせる「平和」への願いを表現しています。</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf] space-y-1">
                  <span className="font-bold text-[#47623d] block">温かな心と寄り添う手</span>
                  <p className="text-stone-600">困難を抱える方に寄り添い、自立と回復をそっと包み込んで支える温もりを表します。</p>
                </div>
                <div className="p-3 rounded-lg bg-[#fcf7ec] border border-[#fae5be] space-y-1">
                  <span className="font-bold text-[#c49641] block">未来へ翔び立つ平和の鳩</span>
                  <p className="text-stone-600">社会参加を果たし、希望に満ちた未来へ羽ばたく再生と平和の象徴です。</p>
                </div>
                <div className="p-3 rounded-lg bg-[#fdf5f0] border border-[#fae8de] space-y-1">
                  <span className="font-bold text-[#c4683f] block">重なり合う二つの輪</span>
                  <p className="text-stone-600">助成者と支援現場、地域社会が有機的に結ばれる持続可能な支援の環（ネットワーク）を表します。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 法人概要表 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#47623d]" />
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              法人概要
            </h2>
          </div>
          <span className="text-xs text-stone-500">令和8年8月29日 成立</span>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm border-collapse" aria-label="法人概要表">
            <tbody className="divide-y divide-stone-200">
              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 w-1/3 sm:w-1/4 align-top">
                  法人名称
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900 font-semibold">
                  {currentFullName}
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  主たる事務所の所在地
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  <div className="font-medium whitespace-pre-line leading-relaxed">{foundation.address}</div>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  設立年月日
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  令和8年8月29日
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  法人番号
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  <span className="font-mono font-bold text-stone-900 tracking-wider">
                    {foundation.corporateNumber}
                  </span>
                  <span className="ml-3 text-xs text-[#47623d] bg-[#f2f6ef] px-2 py-0.5 rounded border border-[#d6e3cf]">
                    国税庁指定（13桁）
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  事業年度
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  {foundation.fiscalYear}
                  <div className="text-xs text-stone-500">第1期事業年度：{foundation.firstFiscalYear}</div>
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  設立者
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  {foundation.founder}
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  基本財産
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  {foundation.basicEndowment}
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  事業区域
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  {foundation.activityArea}
                </td>
              </tr>

              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  公告の方法
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  {foundation.publicNoticeMethod}
                </td>
              </tr>

              {/* 法人種別 row */}
              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  法人種別
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  <span className="font-semibold text-stone-900">一般財団法人</span>
                  <span className="ml-2 text-xs text-stone-500">（一般社団法人及び一般財団法人に関する法律に基づく法人）</span>
                </td>
              </tr>

              {/* 定款 row */}
              <tr className="hover:bg-stone-50/50">
                <th scope="row" className="py-3.5 px-4 sm:px-6 bg-stone-50 font-bold text-stone-800 align-top">
                  定款【抜粋】
                </th>
                <td className="py-3.5 px-4 sm:px-6 text-stone-900">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={foundation.articlesPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#47623d] hover:bg-[#374d2e] text-white rounded text-xs font-semibold transition-colors shadow-xs"
                      title="新しいタブで定款【抜粋】PDFを開く"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>定款【抜粋】のPDFを閲覧</span>
                      <ExternalLink className="w-3 h-3 text-stone-200" />
                    </a>
                    <a
                      href={foundation.articlesPdfClean || foundation.articlesPdf}
                      download={foundation.articlesFileName}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-stone-50 text-stone-700 border border-[#d5d0c3] rounded text-xs font-medium transition-colors"
                      title="定款【抜粋】PDFファイルを保存"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ダウンロード</span>
                    </a>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">
                    ※本定款はホームページ公開用として、附則等を省略した抜粋版です。正式な定款原本は当財団にて保管しています。
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 役員等名簿（住所は掲載しない） */}
      <section id="officers" className="space-y-4 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#47623d]" />
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              役員・評議員等
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">（2026年8月29日現在）</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Officers (理事・監事) */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="px-6 py-3.5 bg-stone-100 border-b border-stone-200 font-bold text-sm text-stone-900 flex justify-between items-center">
              <span>理事及び監事</span>
              <span className="text-xs text-stone-500 font-normal">計 4名</span>
            </div>
            <table className="w-full text-left text-sm" aria-label="理事及び監事一覧">
              <thead className="bg-stone-50 text-xs text-stone-500 border-b border-stone-200">
                <tr>
                  <th scope="col" className="py-3 px-6 font-semibold w-1/2 sm:w-5/12">役職</th>
                  <th scope="col" className="py-3 px-6 font-semibold">氏名</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {foundation.officers.map((officer, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-stone-700">
                      {officer.role}
                    </td>
                    <td className="py-3.5 px-6 text-stone-900 font-bold text-base">
                      {officer.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Councilors (評議員) */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="px-6 py-3.5 bg-stone-100 border-b border-stone-200 font-bold text-sm text-stone-900 flex justify-between items-center">
              <span>評議員</span>
              <span className="text-xs text-stone-500 font-normal">計 3名</span>
            </div>
            <table className="w-full text-left text-sm" aria-label="評議員一覧">
              <thead className="bg-stone-50 text-xs text-stone-500 border-b border-stone-200">
                <tr>
                  <th scope="col" className="py-3 px-6 font-semibold w-1/2 sm:w-5/12">役職</th>
                  <th scope="col" className="py-3 px-6 font-semibold">氏名</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {foundation.councilors.map((councilor, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-stone-700">
                      {councilor.role}
                    </td>
                    <td className="py-3.5 px-6 text-stone-900 font-bold text-base">
                      {councilor.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. ガバナンス・組織体制（SVG組織図） */}
      <section className="space-y-4">
        <GovernanceChart />
      </section>
    </div>
  );
};
