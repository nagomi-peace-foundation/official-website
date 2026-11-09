import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import newsData from '../content/news.json';
import grantsData from '../content/grants.json';
import { LOGO_PATH } from '../data/foundation';
import { getAssetUrl } from '../utils/assetPath';
import {
  HandHeart,
  ArrowRight,
  ArrowDown,
  FileText,
  Clock,
  Heart,
  Shield,
  Coins,
  Users,
  Compass,
  SunMedium,
  Globe2,
  CircleDot,
  ExternalLink
} from 'lucide-react';

import { PreviewDocumentInfo } from '../components/DocumentPreviewModal';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  setSelectedNewsId: (id: string) => void;
  setPreviewDoc: (doc: string | PreviewDocumentInfo) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentTab,
  setSelectedNewsId,
  setPreviewDoc
}) => {
  const { currentFullName } = useFoundation();
  const latestNews = newsData.slice(0, 3);
  const activeGrant = grantsData[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f7f6f0] via-[#faf9f5] to-[#faf9f5] border-b border-[#e7e4dc] pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Subtle warm decorative background */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#f2f6ef] blur-3xl opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#fdf5f0] blur-3xl opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Prominent Logo Display Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/95 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-[#e7e4dc] shadow-sm flex flex-col items-center text-center max-w-md w-full relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#6f8c62] via-[#c4683f] to-[#c49641]"></div>
                
                <img
                  src={LOGO_PATH}
                  alt="なごみ平和財団 NAGOMI PEACE FOUNDATION ロゴマーク"
                  className="w-56 sm:w-64 h-auto object-contain py-2 transition-transform duration-300 group-hover:scale-102"
                />

                <div className="mt-4 pt-4 border-t border-[#f0ede6] w-full text-xs text-stone-500 space-y-1">
                  <p className="font-medium text-[#47623d]">
                    和（なごみ）の心と平和の祈り
                  </p>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    <span className="inline-block">支え合う手と温かな心、</span>
                    <span className="inline-block">未来へ翔び立つ平和の象徴を重ね合わせた</span>
                    <br />
                    <span className="inline-block">財団の公式シンボルです。</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Philosophy & Messaging */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#47623d] tracking-wider bg-[#f2f6ef] px-3 py-1 rounded-full border border-[#e1ebdc]">
                <span className="w-2 h-2 rounded-full bg-[#47623d]"></span>
                <span>{currentFullName} 公式ホームページ</span>
              </div>

              {/* Philosophy statement */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#22211e] tracking-tight leading-snug font-serif">
                <span className="block">困難を抱える人の</span>
                <span className="inline-block whitespace-nowrap">自立、回復、</span>
                <span className="inline-block whitespace-nowrap">そして社会参加へ。</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
                <span className="inline-block">精神的な困難等に直面する方々に寄り添う民間支援活動を助成し、</span>
                <span className="inline-block">支え手の基盤充実と包摂的な地域社会の形成に寄与します。</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('grants')}
                  className="px-6 py-3 bg-[#47623d] hover:bg-[#374d2e] text-white rounded-lg font-medium text-sm transition-colors shadow-sm flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#47623d]"
                >
                  <span>助成事業のご案内</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('about')}
                  className="px-6 py-3 bg-white hover:bg-[#f5f4ef] text-stone-800 border border-[#dcd8cd] rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                >
                  <span>財団概要・設立趣旨</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 目指す共生社会の姿（キービジュアル） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e7e4dc] shadow-sm overflow-hidden">
          {/* メインイラストレーション画像 */}
          <div className="relative w-full aspect-[16/9] bg-[#f5f4ef] overflow-hidden">
            <img
              src={getAssetUrl('/assets/aistudio/__6_210b4ab0.png')}
              alt="多世代と地域が支え合い、共に生きる包摂的な社会のイメージ（一般財団法人なごみ平和財団）"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* ビジョンメッセージ・理念 */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#faf9f5] via-white to-[#faf9f5] border-t border-[#f0ede6]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#47623d] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#47623d]" />
                  <span>VISION & INCLUSION ・ 目指す共生社会の姿</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#22211e] font-serif tracking-tight">
                  誰もが尊厳をもち、支え合って生きられる地域社会へ
                </h2>
                <div className="space-y-2.5 text-sm text-stone-600 leading-relaxed">
                  <p>
                    <span className="inline-block">心の不調や不安、孤独・孤立など、精神的な困難に直面する方々が、</span>
                    <br className="hidden md:inline" />
                    <span className="inline-block">温かな見守りと寄り添いの中で、</span>
                    <span className="inline-block">自立・回復、そして社会参加への歩みを進められる地域社会を目指します。</span>
                  </p>
                  <p>
                    <span className="inline-block">なごみ平和財団は、精神的な困難を中心に、身体的・経済的・社会的な困難にも目を向け、</span>
                    <br className="hidden md:inline" />
                    <span className="inline-block">一人ひとりの状況に応じた支援を届ける現場の活動を支えます。</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  type="button"
                  onClick={() => setCurrentTab('about')}
                  className="px-5 py-2.5 bg-white hover:bg-[#f5f4ef] text-[#47623d] border border-[#d2dec9] rounded-lg text-xs font-semibold transition-colors shadow-2xs flex items-center gap-2 group"
                >
                  <span>財団概要・設立趣旨</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 支援のかたちと財団の役割 (課題から自立・回復・社会参加へ至る支援の枠組み) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
            MISSION & FRAMEWORK
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#22211e] tracking-tight font-serif">
            支援のかたちと財団の役割
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            <span className="inline-block">精神的な困難等に直面する方々と、自立・回復・社会参加への歩みを、</span>
            <span className="inline-block">現場で寄り添う民間支援活動への助成を通じてつなぎます。</span>
          </p>
        </div>

        {/* 構造図カードコンテナ */}
        <div className="bg-[#faf9f5] border border-[#e7e4dc] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* 上段：私たちが向き合う課題 */}
          <div className="bg-white rounded-xl border border-[#e7e4dc] p-5 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0ede6] pb-3">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-stone-700" />
                <span>私たちが向き合う課題</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono uppercase">CHALLENGES</span>
            </div>

            {/* 心の不調と、重なり合う困難 */}
            <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-serif">
                心の不調と、重なり合う困難
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                孤立や生活の不安など、いくつもの困難が重なる現実に目を向けます。
              </p>
            </div>

            {/* 困難の4つの側面 */}
            <div className="flex items-center justify-center gap-3 text-stone-400 text-xs font-medium pt-1">
              <span className="h-px w-14 bg-[#e7e4dc]"></span>
              <span className="text-stone-500 text-xs tracking-wider">
                困難の4つの側面
              </span>
              <span className="h-px w-14 bg-[#e7e4dc]"></span>
            </div>

            {/* 従属的な4類型（下に小さく配置） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {/* 1. 精神的 */}
              <div className="p-3.5 bg-[#faf9f5] rounded-lg border border-[#fae8de] space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-[#c4683f]">
                  <Heart className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-xs text-stone-900">精神的</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  社会的孤立、心の不調・不安、トラウマ、家族問題、生きづらさなど
                </p>
              </div>

              {/* 2. 身体的 */}
              <div className="p-3.5 bg-[#faf9f5] rounded-lg border border-[#faeccd] space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-[#b8852e]">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-xs text-stone-900">身体的</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  障害、難病、心身機能の制約、加齢に伴う生活上の不自由など
                </p>
              </div>

              {/* 3. 経済的 */}
              <div className="p-3.5 bg-[#faf9f5] rounded-lg border border-[#e1ebdc] space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-[#47623d]">
                  <Coins className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-xs text-stone-900">経済的</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  生活困窮、ひとり親・低所得世帯、住まいや学習機会の不足など
                </p>
              </div>

              {/* 4. 社会的 */}
              <div className="p-3.5 bg-[#faf9f5] rounded-lg border border-[#d2e0dd] space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-[#2d6a5e]">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-bold text-xs text-stone-900">社会的</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  制度の狭間の課題、就労困難、偏見・差別、相談相手の欠如など
                </p>
              </div>
            </div>
          </div>

          {/* つなぐ矢印・コネクター 1 */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <ArrowDown className="w-5 h-5 text-[#47623d]" />
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border-2 border-[#47623d] shadow-xs text-stone-900">
              <Users className="w-4 h-4 text-[#47623d] shrink-0" />
              <span className="text-sm sm:text-base font-bold tracking-wide">
                現場で一人ひとりに寄り添う民間活動
              </span>
            </div>
            <ArrowDown className="w-5 h-5 text-[#47623d]" />
          </div>

          {/* 中段：なごみ平和財団の役割（助成と支え手の基盤充実） */}
          <div className="bg-white rounded-xl border-2 border-[#47623d] p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#47623d] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg font-mono">
              ROLE & GRANTS
            </div>

            <div className="space-y-5">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#47623d] tracking-wider uppercase">
                  <HandHeart className="w-4 h-4" />
                  <span>なごみ平和財団の助成アプローチ</span>
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  民間支援活動への助成と、支え手の基盤充実
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  <span className="inline-block">精神的な困難等を抱える方に直接支援を届ける民間団体や個人の活動資金を助成し、</span>
                  <span className="inline-block">支援者が孤立せず持続的に活動を継続できる組織基盤を支えます。</span>
                </p>
              </div>

              {/* 4つの助成テーマ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf] text-center">
                  <span className="font-bold text-[#47623d] text-xs block mb-0.5">A. 生活支援</span>
                  <span className="text-[11px] text-stone-600 block">生活の安定と自立</span>
                </div>
                <div className="p-3 rounded-lg bg-[#fcf7ec] border border-[#fae5be] text-center">
                  <span className="font-bold text-[#b8852e] text-xs block mb-0.5">B. 教育支援</span>
                  <span className="text-[11px] text-stone-600 block">学びの場の確保</span>
                </div>
                <div className="p-3 rounded-lg bg-[#fdf5f0] border border-[#fae8de] text-center">
                  <span className="font-bold text-[#c4683f] text-xs block mb-0.5">C. 就労支援</span>
                  <span className="text-[11px] text-stone-600 block">就業機会と定着</span>
                </div>
                <div className="p-3 rounded-lg bg-[#f4f7f6] border border-[#d2e0dd] text-center">
                  <span className="font-bold text-[#2d6a5e] text-xs block mb-0.5">D. 社会参加支援</span>
                  <span className="text-[11px] text-stone-600 block">居場所と孤立予防</span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentTab('grants');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="px-5 py-2.5 bg-[#f2f6ef] hover:bg-[#e4ede0] text-[#2d4325] border border-[#c2d7b8] rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <span>4つの助成テーマと支援方針を見る</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#47623d]" />
                </button>
              </div>
            </div>
          </div>

          {/* つなぐ矢印・コネクター 2 */}
          <div className="flex flex-col items-center justify-center py-2 space-y-2">
            <ArrowDown className="w-5 h-5 text-[#47623d]" />
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border-2 border-[#47623d] shadow-xs text-stone-900">
              <SunMedium className="w-4 h-4 text-[#b8852e] shrink-0" />
              <span className="text-sm sm:text-base font-bold tracking-wide">
                支援が実を結び、誰もが尊厳ある社会へ
              </span>
            </div>
            <ArrowDown className="w-5 h-5 text-[#47623d]" />
          </div>

          {/* 下段：目指す3つの支援成果（自立・回復・社会参加） */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#47623d]"></span>
                <span>目指す3つの支援成果（自立・回復・社会参加）</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono uppercase">Goals</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. 自立 */}
              <div className="p-5 bg-white rounded-xl border border-[#e7e4dc] shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5 text-[#47623d]">
                  <div className="p-2 rounded-lg bg-[#f2f6ef] border border-[#d6e3cf]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">自立</h4>
                    <span className="text-[11px] text-[#47623d] font-medium">生活基盤と自己決定の確立</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  生活困窮や学習・就労の困難から脱し、一人ひとりが自らの力で生活を整え、将来を選択できる基盤を確立します。
                </p>
              </div>

              {/* 2. 回復 */}
              <div className="p-5 bg-white rounded-xl border border-[#e7e4dc] shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5 text-[#b8852e]">
                  <div className="p-2 rounded-lg bg-[#fcf7ec] border border-[#fae5be]">
                    <SunMedium className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">回復</h4>
                    <span className="text-[11px] text-[#b8852e] font-medium">安心と尊厳の回復</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  温かな居場所や伴走者との信頼を通じて、心身の癒しと自己肯定感、尊厳を取り戻し、生きる力を再構築します。
                </p>
              </div>

              {/* 3. 社会参加 */}
              <div className="p-5 bg-white rounded-xl border border-[#e7e4dc] shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5 text-[#2d6a5e]">
                  <div className="p-2 rounded-lg bg-[#f4f7f6] border border-[#d2e0dd]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">社会参加</h4>
                    <span className="text-[11px] text-[#2d6a5e] font-medium">包摂的な地域社会の形成</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  孤立を防ぎ、地域や社会の中で役割とつながりを持ち、多様な人々が共に支え合って暮らせる包摂的な地域社会を築きます。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Open Grant Section (公募中の助成 - 実践・エントリー窓口) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#e7e4dc] pb-3">
          <div>
            <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-1">
              ACTIVE GRANT APPLICATION
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              現在公募中の助成事業（第1期エントリー窓口）
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-[#fdf5f0] text-[#a9542e] border border-[#fae8de] rounded-full self-start sm:self-auto">
            第1期公募 受付中
          </span>
        </div>

        <div className="bg-gradient-to-r from-[#2f4029] via-[#3d5335] to-[#263521] text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
            <img
              src={LOGO_PATH}
              alt=""
              className="w-72 h-auto filter brightness-200"
            />
          </div>

          <div className="max-w-3xl space-y-4 relative">
            <div className="flex flex-wrap items-center gap-2 text-[#d1e5c8] text-xs font-semibold tracking-wider">
              <Clock className="w-4 h-4 text-[#e0b45d]" />
              <span>助成公募情報</span>
              <span aria-hidden="true">·</span>
              <span>{activeGrant.fiscalYear}</span>
              <span aria-hidden="true">·</span>
              <span className="bg-[#47623d]/70 text-[#f6d89b] px-2 py-0.5 rounded text-[11px] font-mono border border-[#5d7c52]">
                募集期間：2026年11月09日 〜 2027年01月08日
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {activeGrant.title}
            </h2>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              {activeGrant.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 text-xs text-stone-200 border-y border-[#4d6343]">
              <div>
                <span className="block text-[#e0b45d] font-semibold mb-0.5">助成対象：</span>
                <span>{activeGrant.target}</span>
              </div>
              <div>
                <span className="block text-[#e0b45d] font-semibold mb-0.5">助成金額：</span>
                <span>{activeGrant.grantAmount}</span>
              </div>
              <div>
                <span className="block text-[#e0b45d] font-semibold mb-0.5">募集期間：</span>
                <span className="font-semibold text-white">2026年11月09日 〜 2027年01月08日</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentTab('grants')}
                className="px-5 py-2.5 bg-[#c4683f] hover:bg-[#a9542e] text-white rounded-lg text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
              >
                <span>公募要領・詳細を確認する</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={getAssetUrl(activeGrant.guidelinesPdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#42573a] hover:bg-[#4d6643] text-white border border-[#5d7c52] rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                title="新しいタブで募集要領PDFを開く"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>募集要領 PDFを閲覧</span>
                <ExternalLink className="w-3 h-3 text-[#d1e5c8]" />
              </a>
              <a
                href={getAssetUrl(activeGrant.applicationFormPdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/25 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                title="新しいタブで申請書PDFを開く"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>申請書 PDFを閲覧</span>
                <ExternalLink className="w-3 h-3 text-stone-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News (お知らせ最新3件) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#e7e4dc]">
          <div>
            <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-1">
              INFORMATION
            </p>
            <h2 className="text-2xl font-bold text-[#22211e] tracking-tight">
              新着お知らせ
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentTab('news')}
            className="mt-3 sm:mt-0 text-xs font-bold text-[#47623d] hover:text-[#32452b] flex items-center gap-1 group"
          >
            <span>お知らせ一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="divide-y divide-[#ece9e1] bg-white rounded-xl border border-[#e7e4dc] shadow-xs overflow-hidden">
          {latestNews.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                setSelectedNewsId(item.id);
                setCurrentTab('news');
              }}
              className="p-5 sm:p-6 hover:bg-[#faf9f5] transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <div className="flex items-center gap-3 shrink-0 text-xs text-stone-500">
                <time dateTime={item.date} className="font-mono">{item.date}</time>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#47623d]">{item.category}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#47623d] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-stone-600 line-clamp-1">
                  {item.summary}
                </p>
              </div>
              <div className="hidden sm:block shrink-0">
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#47623d] group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
