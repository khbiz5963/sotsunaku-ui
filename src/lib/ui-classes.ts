// リンク・見出し・ラベル・補足文の標準のクラス名（設計書2026-10-10 設計A-2〜A-5）。
// iconActionClassName と同じく、クラス名の文字列を返す定数として提供する
// （Tailwind は、node_modules 内のこのファイルの文字列を @source で拾う）。

// 文中・表の中のリンク（画面の移動）。その場で状態を変える操作は、リンクでなくボタンにする。
export const textLinkClassName = "text-primary hover:underline";

// 画面のタイトル（h1）。
export const pageTitleClassName = "text-xl font-bold";

// 画面内の区画の見出し（h2）。フォームのグループ・設定の区切りに使う。
export const sectionHeadingClassName = "text-sm font-semibold text-gray-700";

// パネル・ダイアログ・タブのタイトル（h2）。区画の見出し（sectionHeadingClassName）より大きい。
export const panelTitleClassName = "text-lg font-bold";

// 入力欄のラベル（ラベルが入力欄の上に縦に並ぶ形）。
export const fieldLabelClassName = "flex flex-col gap-1 text-sm text-gray-700";

// チェックボックス・ラジオのラベル（横に並ぶ形）。
export const fieldLabelInlineClassName = "flex items-center gap-2 text-sm text-gray-700";

// 入力欄の下の補足文。
export const fieldHintClassName = "text-xs text-gray-500";
