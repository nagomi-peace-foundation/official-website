import { getAssetUrl } from '../utils/assetPath';

// src/data/foundation.ts — 正データ。サイト内でこれ以外に法人情報を直書きしないこと
export const STATUS: "general" = "general"; // 一般財団法人

export const foundation = {
  nameCore: "なごみ平和財団",
  legalForm: { general: "一般財団法人", public_interest: "一般財団法人" },
  corporateNumber: "5040005023277",         // 法人番号（国税庁指定・13桁）
  corporateNumber13: "5040005023277",       // 法人番号（13桁）
  address: "〒100-0004\n東京都千代田区大手町2-2-1　新大手町ビル702\n（移転手続き中）",
  establishedDate: "2026-08-29", // 令和8年8月29日 法人成立
  establishedDateJp: "令和8年8月29日",
  grantOffice: {
    name: "助成事業事務局（公募・応募相談窓口）",
    contactPerson: "數見（かずみ）",
    address: "〒100-0004 東京都千代田区大手町2-2-1 新大手町ビル702",
    email: "info@nagomi-zaidan.or.jp",
    website: "nagomi-zaidan.or.jp"
  },
  articlesDate: "2026-07-30",    // 令和8年7月30日 定款作成
  articlesPdf: getAssetUrl("/assets/aistudio/nagomi_teikan_public_final_b6e5d043.pdf"),
  articlesPdfClean: getAssetUrl("/assets/aistudio/nagomi_teikan_public_final_b6e5d043.pdf"),
  articlesFileName: "一般財団法人なごみ平和財団_定款【抜粋】.pdf",
  fiscalYear: "毎年4月1日〜翌年3月31日",
  firstFiscalYear: "令和8年8月29日〜令和9年3月31日",
  founder: "株式会社ミッキー・パートナーズ",
  contributedAssets: "現金 100,000,000円",
  basicEndowment: "現金 3,000,000円",
  publicNoticeMethod: "主たる事務所の公衆の見やすい場所に掲示する方法により行う。",
  activityArea: "日本全国",

  purpose: "当法人は、精神的、身体的、経済的又は社会的な困難により、日常生活、学習、就労又は社会参加に支援を必要とする者に対し、生活支援、教育支援、就労支援、社会参加支援その他これらに関連する支援を行う個人、法人又は団体への助成その他の支援を行うことにより、困難な状況にある者の自立、回復及び社会参加を促進するとともに、支援活動の担い手の育成及び支援基盤の充実を図り、もって支援を必要とする者の福祉の向上及び社会参加の促進に寄与することを目的とする。",

  businesses: [
    "生活支援、教育支援、就労支援又は社会参加支援を行う個人、法人又は団体に対する助成事業",
    "前号の支援活動を行う個人、法人又は団体に対する人材育成、研修、相談、情報提供その他の支援事業",
    "困難な状況にある者に対する支援活動に関する調査研究、情報収集、成果評価及び情報発信事業",
    "困難な状況にある者への理解促進及び支援活動の普及啓発を目的とする講演会、研修会、セミナー等の開催事業",
    "行政機関、医療機関、福祉機関、教育機関、企業、非営利団体その他関係機関との連携及びネットワーク形成事業",
    "その他当法人の目的を達成するために必要な事業",
  ],

  officers: [ // 住所は掲載しない
    { role: "代表理事（理事長）", name: "清水 樹郎" },
    { role: "理事", name: "尾崎 弘之" },   // 登記2頁目で要照合
    { role: "理事", name: "福浦 裕介" },   // 登記2頁目で要照合
    { role: "監事", name: "田中 稔" },     // 登記2頁目で要照合
  ],
  councilors: [
    { role: "評議員", name: "數見 謙一" }, // 字体を登記で要照合
    { role: "評議員", name: "里野 泰則" },
    { role: "評議員", name: "三浦 智康" },
  ],
};

export const fullName = (statusOverride?: "general" | "public_interest") => {
  const currentStatus = statusOverride ?? STATUS;
  return foundation.legalForm[currentStatus] + foundation.nameCore;
};

export const LOGO_PATH = getAssetUrl("/assets/aistudio/01_logo_full_vertical_transparent_24e86763.png");

