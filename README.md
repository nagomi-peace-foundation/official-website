# 一般財団法人なごみ平和財団 公式ウェブサイト

精神的な困難や孤立、生活上の課題を抱える方々の自立・回復・社会参加を支える民間支援活動への助成事業および基盤強化を行う、**一般財団法人なごみ平和財団**（Nagomi Peace Foundation）の公式ウェブサイトリポジトリです。

---

## 🌟 システム概要・アーキテクチャ

本ウェブサイトは、公的信頼性とアクセシビリティ、堅牢性を最優先に設計された静的シングルページアプリケーション（SPA）です。

- **フロントエンド**: React 19 / TypeScript / Vite 8 / Tailwind CSS v4 / Lucide React
- **ホスティング**: GitHub Pages（独自ドメイン `nagomi-zaidan.or.jp` および GitHub Pages 仮URLサブディレクトリの両方に対応）
- **公開仕様（Firebase認証不要）**: 一般公開サイトとして、閲覧者へのユーザー認証やログイン要求は一切行わず、すべての事業情報・公募要領・情報公開資料を安全に閲覧・取得できます。
- **外部APIキー不要（Gemini APIキー設定不要）**: 公式サイトのビルドおよび配信に `GEMINI_API_KEY` や有料APIキーの設定は一切不要です。
- **お問い合わせ窓口（GAS連携）**: Google Apps Script (GAS) Web App と連携し、Googleスプレッドシートへの受付台帳記録および公式事務局メール（`info@nagomi-zaidan.or.jp`）への自動通知を実施。

---

## 🚀 主な機能と設計仕様

### 1. お問い合わせ受付システム（GAS Web App連携）
- **RFC 4122 v4 UUIDによる冪等性制御**: ブラウザ側で生成したクライアントリクエストIDを用い、ネットワーク瞬断時の安全な再試行と二重登録防止を実現。
- **三層エラーハンドリング**:
  - **入力拒否（GASバリデーション）**: 必須項目不足、不正なカテゴリ、受付上限超過、スパム判定等を明確に通知し、入力修正を案内。
  - **UUID競合（CONFLICT_DIFF_PAYLOAD）**: 同一IDで前回と異なる内容を検知した場合、新規IDを自動再発行して再送信を促す。
  - **通信結果不明（ネットワーク切断・タイムアウト）**: 受付台帳へ届いている可能性を提示し、同一IDのまま安全に再確認・再試行できる動線とメール代替リンクを提供。
- **スパム・ボット対策**: ハニーポットフィールド（`hp_trap`）による自動巡回ボットの安全な無力化。

### 2. マルチ環境対応アセット & ルーティング
- **サブディレクトリ・独自ドメイン両対応**:
  - `getAssetUrl()` によるPDF・画像アセットパスの自動補正（`./` または指定サブディレクトリ）。
  - `public/404.html` によるSPAリダイレクトスクリプトが、GitHub Pages の `https://<org>.github.io/<repo>/` と本番独自ドメイン `https://nagomi-zaidan.or.jp/` の双方のダイレクトリンク・ブックマークを自動識別してハッシュルーティングに復元。

### 3. 公開文書・PDFプレビュー機能
- 定款【抜粋】、助成金募集要領、助成金申請書などの公式文書について、モーダル内埋め込みプレビュー（`<object>`）とダイレクトダウンロード、新規タブ閲覧をサポート。

---

## 📁 ディレクトリ構成

```text
├── .github/workflows/deploy.yml # GitHub Pages自動デプロイワークフロー
├── .env.example                 # 環境変数設定サンプル
├── index.html                   # HTMLエントリポイント（OGP・ファビコン相対パス対応）
├── metadata.json                # アプリケーションメタデータ
├── package.json                 # 依存関係・ビルドスクリプト
├── public/                      # 静的アセット
│   ├── 404.html                 # GitHub Pages用マルチ環境SPAリダイレクト
│   ├── assets/aistudio/         # ロゴ・画像・定款PDF
│   ├── documents/               # 助成金募集要領・申請書PDF
│   └── robots.txt               # クローラー設定
├── server.ts                    # ローカル開発・本番プレビュー用Expressサーバー
├── src/
│   ├── App.tsx                  # メインルーティング・タブ制御
│   ├── components/              # 共通コンポーネント（ヘッダー、フッター、モーダル、SEO）
│   ├── config/contact.ts        # お問い合わせ・GAS設定
│   ├── content/                 # お知らせ、助成、情報公開のJSON・ポリシーデータ
│   ├── context/                 # 財団情報コンテキスト
│   ├── pages/                   # 各ページ（Home, About, Grants, Disclosures, Contact等）
│   └── utils/assetPath.ts       # アセットパス解決ユーティリティ
├── tsconfig.json                # TypeScriptコンパイラ設定
└── vite.config.ts               # Viteビルド設定
```

---

## 🛠️ 開発・ビルド手順

### 動作要件
- Node.js 22 以上（GitHub Actionsデプロイは Node.js 24 を使用）
- npm 10 以上

### 1. 依存関係のインストール
```bash
npm ci
```

### 2. 環境変数の設定
`.env.example` をコピーして `.env.local` を作成します（必要に応じて設定）。

```bash
cp .env.example .env.local
```

設定項目:
- `VITE_CONTACT_GAS_URL`: お問い合わせ受信用GAS Web Appの実行エンドポイント（`https://script.google.com/macros/s/.../exec`）
- `VITE_BASE_PATH`: サブディレクトリ公開時のベースパス（独自ドメイン運用時は `./` のままで問題ありません）
※本ウェブサイトは一般公開静的サイトのため、`GEMINI_API_KEY` やFirebaseのAPIキー設定は不要です。

### 3. ローカル開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` にアクセスします。

### 4. 静的解析・型検査
```bash
npm run lint
```

### 5. 本番用静的ビルド
```bash
npm run build
```
ビルド結果は `dist/` ディレクトリに出力されます。

---

## 🚢 デプロイ（GitHub Pages）

`.github/workflows/deploy.yml` に定義されたGitHub Actionsワークフローにより、`main` ブランチへのプッシュ時に自動的に以下のステップが実行されます:

1. `npm ci` によるクリーンインストール
2. `VITE_CONTACT_GAS_URL` 環境変数の形式チェック
3. `npm run lint` による型検査
4. `npm run build` による静的サイト生成
5. 配布物（`dist`）の検証（テストツールの漏洩防止チェック含む）
6. GitHub Pages への安全なデプロイ

---

## 📜 法人概要

- **法人名**: 一般財団法人なごみ平和財団
- **主たる事務所**: 東京都千代田区大手町2-2-1 新大手町ビル702
- **設立**: 令和8年（2026年）8月29日
- **公式連絡先**: info@nagomi-zaidan.or.jp
