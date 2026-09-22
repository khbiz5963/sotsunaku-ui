# @sotsunaku/ui

ソツナク（請求書支払い管理アプリ）および将来の関連アプリで共通利用する、shadcn/ui（Radix UI + Tailwind CSS v4）ベースのUIコンポーネント集。

## 導入方法（消費側）

```json
{
  "dependencies": {
    "@sotsunaku/ui": "github:khbiz5963/sotsunaku-ui#v0.1.0"
  }
}
```

Next.jsの場合、`next.config.ts`に以下を追加する（node_modules内のTypeScript/JSXをそのままトランスパイルするため）。

```ts
const nextConfig: NextConfig = {
  transpilePackages: ["@sotsunaku/ui"],
};
```

CSS変数（トークン）を読み込むため、アプリのグローバルCSSで以下をインポートする。

```css
@import "@sotsunaku/ui/styles.css";
```

## デザイントークン

| 項目 | 値 |
|---|---|
| ベースカラー | neutral（グレースケール） |
| アクセントカラー | blue-600系（#2563eb） |
| 角丸 | 6px程度（`--radius: 0.375rem`） |
| 影 | 使わない。区切りは1pxの罫線（border）で表現する |
| タイポグラフィ | Tailwind標準スケール（text-xs/sm/base/lg/xl）をそのまま使う。独自スケールは作らない |
| フォント | `-apple-system, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif` |
| ダークモード | 非対応 |

## タイポグラフィの使い分け

- `text-xs`: 補足説明・キャプション・テーブルのラベル列見出し
- `text-sm`: 本文・フォーム入力欄・テーブルのセル
- `text-base`: 通常の見出し・ボタンラベル
- `text-lg` 〜 `text-xl`: 画面タイトル
- 金額など桁を揃えたい数字には`tabular-nums`を必ず併用する

## 含まれるもの

- shadcn/uiのRadixベースコンポーネント（Button, Input, Table, Badge, Dialog, Tabs, Card）をneutralベース・上記トークンでカスタマイズしたもの
- 汎用コンポーネント: `AmountInput`（カンマ区切り金額入力）, `useConfirmDialog`（確認ポップアップ）, `ActiveStatusPill`（有効/無効バッジ）, `TabNav`（セグメント/アンダーラインタブ、Next.js専用）, `iconActionClassName`（アイコン操作の共通スタイル）

## 含まれないもの

- 請求書・支払先など、特定アプリの業務ロジックに紐づくコンポーネント
- ダークモード
