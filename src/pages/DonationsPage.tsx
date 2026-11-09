import React from 'react';
import { useFoundation } from '../context/FoundationContext';
import {
  Heart,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface DonationsPageProps {
  setCurrentTab: (tab: string) => void;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({ setCurrentTab }) => {
  const { currentFullName } = useFoundation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="border-b border-[#e7e4dc] pb-8">
        <p className="text-xs font-semibold text-[#47623d] uppercase tracking-wider mb-2">
          SUPPORT & DONATIONS
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#22211e] tracking-tight font-serif">
          ご支援のお願い（寄附）
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          <span className="inline-block">{currentFullName}の活動趣旨にご賛同いただき、</span>
          <span className="inline-block">困難を抱える方々の自立と社会参加を支える民間活動の発展に向けた</span>
          <span className="inline-block">温かいご支援をお願い申し上げます。</span>
        </p>
      </div>

      {/* Tax Exemption Status Banner */}
      <section>
        <div className="bg-[#fdf8f0] border border-[#fae5be] rounded-xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2.5 text-[#735118] font-bold text-base sm:text-lg">
            <AlertCircle className="w-5 h-5 text-[#c49641] shrink-0" />
            <h2>税制上の優遇措置（寄附金控除）に関するご案内</h2>
          </div>
          <div className="text-sm font-bold text-[#805e1e] bg-white p-3.5 rounded border border-[#fae5be]">
            現在、当財団への寄附は税制上の優遇措置（寄附金控除等）の対象ではありません。
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            当法人は一般財団法人として事業を展開しております。当財団へのご寄附につきましては、個人の寄附金控除（所得控除・税額控除）および法人の特別損金算入の対象外（法人の一般の損金算入限度額の範囲内）となりますので、あらかじめご了承のほどお願い申し上げます。
          </p>
        </div>
      </section>

      {/* Purpose of Donations */}
      <section className="bg-white rounded-xl border border-[#e7e4dc] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#c4683f]" />
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">
            ご寄附の使途と理念
          </h2>
        </div>

        <p className="text-sm text-stone-700 leading-relaxed">
          <span className="inline-block">皆様からお寄せいただいた貴重なご寄附は、定款第3条に掲げる目的を達成するため、</span>
          <span className="inline-block">困難な状況にある方々を直接支える民間活動への助成事業に厳正かつ大切に充当させていただきます。</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700 pt-2">
          <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e7e4dc] space-y-1.5">
            <span className="font-bold text-[#47623d] block text-sm">1. 助成金としての還元</span>
            <p className="text-stone-600">生活支援、教育支援、就労支援、社会参加支援に取り組む個人、法人又は団体への助成原資として大切に活用します。</p>
          </div>
          <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e7e4dc] space-y-1.5">
            <span className="font-bold text-[#c4683f] block text-sm">2. 支援者の基盤強化</span>
            <p className="text-stone-600">助成先団体が実施する支援スタッフの研修や組織基盤の充実、持続的な活動環境の改善に役立てます。</p>
          </div>
          <div className="p-4 bg-[#faf9f5] rounded-lg border border-[#e7e4dc] space-y-1.5">
            <span className="font-bold text-[#c49641] block text-sm">3. 透明性の高い会計報告</span>
            <p className="text-stone-600">寄附金の受入および使途実績は、毎年度の事業報告書および収支計算書において明確に公表いたします。</p>
          </div>
        </div>
      </section>

      {/* Donation Inquiries / Application Process */}
      <section className="bg-[#f5f4ef] rounded-xl p-6 sm:p-8 border border-[#e7e4dc] space-y-4">
        <h2 className="text-lg font-bold text-stone-900">
          ご寄附のお申し出・ご相談
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          個人の皆さま、法人の皆さまからのご寄附のお申し出、遺贈寄附や冠助成プログラムに関するご相談は、下記のお問い合わせフォームより事務局までご連絡ください。
        </p>
        <div>
          <button
            type="button"
            onClick={() => setCurrentTab('contact')}
            className="px-5 py-2.5 bg-[#47623d] hover:bg-[#374d2e] text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>お問い合わせフォームへ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
