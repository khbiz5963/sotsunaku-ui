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
| タイポグラフィ | Tailwind標準スケール（text-xs/sm/xl）をそのまま使う。独自スケールは作らない（下の表を参照） |
| フォント | `-apple-system, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif` |
| ダークモード | 非対応 |

## タイポグラフィの使い分け

| 用途 | クラス |
|---|---|
| 画面のタイトル | `text-xl font-bold`（`pageTitleClassName`） |
| パネル・ダイアログ・タブのタイトル | `text-lg font-bold`（`panelTitleClassName`） |
| 区画の見出し | `text-sm font-semibold text-gray-700`（`sectionHeadingClassName`） |
| 本文・ラベル・表の中身 | `text-sm` |
| 補足・注釈・表の見出し・バッジ | `text-xs` |

金額など桁を揃えたい数字には`tabular-nums`を必ず併用する。

## 標準の見た目（ボタン・リンク・ラベル）

### ボタン

`Button` は次の5種類（`variant`）と4つの大きさ（`size`）に絞っている。これ以外の種類・大きさは作らない。

| variant | 意味 | 使う場面 |
|---|---|---|
| `default` | 主（青の塗りつぶし） | 画面の中で最も主な操作（登録・保存など） |
| `outline` | 副（白地・灰色の枠） | 主でない操作（キャンセル・戻る・補助的な操作） |
| `destructive` | 危険（赤） | 削除・取り消しなど、元に戻しにくい操作 |
| `ghost` | 文字だけ（青文字） | 表の行の中など、目立たせたくない操作 |
| `ai` | AI読み取り専用（紫） | AIで読み取る・自動入力する操作 |

| size | 高さ | 使う場面 |
|---|---|---|
| `default` | 36px | フォーム下部・ヘッダーの操作 |
| `sm` | 28px | 表の行の中 |
| `icon` | 36px 四方 | アイコンだけのボタン |
| `icon-sm` | 28px 四方 | 表の行の中などのアイコンだけのボタン |

### 画面の移動はリンク、その場で状態を変える操作はボタン

- 別の画面へ移るだけのもの → リンク（文中・表の中は `textLinkClassName`）
- その場でデータや状態を変えるもの → ボタン

ボタンの見た目のリンクは、`asChild` で包んで書く。

```tsx
<Button asChild>
  <Link href="/payees/new">支払先を登録する</Link>
</Button>
```

### クラス名の定数

クラス名の文字列を返す定数として提供する（`iconActionClassName` と同じ。Tailwind は `@source` でこのパッケージ内の文字列を拾う）。

| 定数 | 用途 | クラス |
|---|---|---|
| `textLinkClassName` | 文中・表の中のリンク | `text-primary hover:underline` |
| `pageTitleClassName` | 画面のタイトル（h1） | `text-xl font-bold` |
| `panelTitleClassName` | パネル・ダイアログ・タブのタイトル（h2） | `text-lg font-bold` |
| `sectionHeadingClassName` | 区画の見出し（h2） | `text-sm font-semibold text-gray-700` |
| `fieldLabelClassName` | 入力欄のラベル（縦に並ぶ形） | `flex flex-col gap-1 text-sm text-gray-700` |
| `fieldLabelInlineClassName` | チェックボックス・ラジオのラベル（横に並ぶ形） | `flex items-center gap-2 text-sm text-gray-700` |
| `fieldHintClassName` | 入力欄の下の補足文 | `text-xs text-gray-500` |
| `formMaxWidthClassName` | フォームの枠の最大幅（1,024px）。入力欄が画面いっぱいに伸びないようにする（左寄せのまま） | `max-w-5xl` |

## 含まれるもの

- shadcn/uiのRadixベースコンポーネント（Button, Input, Table, Badge, Dialog, Tabs, Card）をneutralベース・上記トークンでカスタマイズしたもの。Buttonは標準の5種類×4サイズに絞っている
- 汎用コンポーネント: `AmountInput`（カンマ区切り金額入力）, `useConfirmDialog`（確認ポップアップ）, `ActiveStatusPill`（有効/無効バッジ）, `TabNav`（セグメント/アンダーラインタブ、Next.js専用）, `iconActionClassName`（アイコン操作の共通スタイル）
- クラス名の定数: `textLinkClassName`, `pageTitleClassName`, `panelTitleClassName`, `sectionHeadingClassName`, `fieldLabelClassName`, `fieldLabelInlineClassName`, `fieldHintClassName`, `formMaxWidthClassName`

## 含まれないもの

- 請求書・支払先など、特定アプリの業務ロジックに紐づくコンポーネント
- ダークモード
