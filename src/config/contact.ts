/**
 * お問い合わせフォーム（Google Apps Script Web App 連携）設定
 *
 * 一般財団法人なごみ平和財団 公式ホームページ
 */

export const FOUNDATION_INFO_EMAIL = 'info@nagomi-zaidan.or.jp';

/**
 * 本番用GAS (Code.gs) の ALLOWED_CATEGORIES と完全同期した定義
 */
export const GAS_ALLOWED_CATEGORIES = [
  '助成事業について',
  '法人・ガバナンスについて',
  'ご支援・ご寄附・協働のご相談',
  '取材・広報に関するお問い合わせ',
  'その他',
] as const;

export type GasContactCategory = (typeof GAS_ALLOWED_CATEGORIES)[number];

export interface ContactCategoryItem {
  value: GasContactCategory;
  label: string;
}

export const CONTACT_CATEGORY_OPTIONS: ContactCategoryItem[] = [
  { value: '助成事業について', label: '助成事業について（公募・選考等）' },
  { value: '法人・ガバナンスについて', label: '法人・ガバナンス・情報公開について' },
  { value: 'ご支援・ご寄附・協働のご相談', label: 'ご支援・ご寄附・協働のご相談' },
  { value: '取材・広報に関するお問い合わせ', label: '取材・広報に関するお問い合わせ' },
  { value: 'その他', label: 'その他のお問い合わせ' },
];

/**
 * 有効なGAS Web AppエンドポイントURLを取得する
 * - 正式公開版（本番環境）: 必ず環境変数 VITE_CONTACT_GAS_URL を使用し、localStorage は一切参照しない。
 * - 開発・検証環境（DEVモードのみ）: 未設定時のフォールバックとして localStorage を許容。
 */
export function getContactGasEndpoint(): string {
  const envUrl = import.meta.env.VITE_CONTACT_GAS_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('https://script.google.com/macros/s/')) {
    return envUrl.trim();
  }

  // 正式公開版（本番環境）では環境変数が必須。localStorage は使用しない
  if (import.meta.env.PROD) {
    return '';
  }

  // 開発・検証環境（AI Studio開発モード）のみ検証用URLの参照を許容
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedUrl = window.localStorage.getItem('nagomi_contact_gas_url');
    if (savedUrl && savedUrl.startsWith('https://script.google.com/macros/s/')) {
      return savedUrl.trim();
    }
  }

  return '';
}

/**
 * 開発・検証環境向け：localStorageにGAS Web App URLを保存する（Phase 2検証ツール等用）
 */
export function saveContactGasEndpoint(url: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('nagomi_contact_gas_url', url.trim());
  }
}

/**
 * 本番エンドポイントが有効に設定されているか検証
 */
export function isConfiguredGasEndpoint(url: string): boolean {
  return Boolean(
    url &&
    url.startsWith('https://script.google.com/macros/s/')
  );
}
