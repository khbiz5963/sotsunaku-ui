import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { AmountInput } from "@/components/amount-input";
import { useConfirmDialog } from "@/components/use-confirm-dialog";
import { ActiveStatusPill } from "@/components/active-status-pill";
import { iconActionClassName, ICON_ACTION_SIZE } from "@/lib/icon-action-style";

function GenericComponentsPreview() {
  const [amount, setAmount] = useState("385000");
  const [active, setActive] = useState(true);
  const { confirm, dialog } = useConfirmDialog();

  return (
    <section className="flex flex-col gap-4 border-t p-6">
      <h2 className="text-sm font-semibold text-gray-500">移植した汎用コンポーネント</h2>

      <label className="flex flex-col gap-1 text-sm">
        金額
        <AmountInput
          value={amount}
          onChange={setAmount}
          className="w-40 rounded-md border px-2 py-1"
        />
      </label>

      <div className="flex items-center gap-3">
        <ActiveStatusPill isActive={active} onClick={() => setActive((v) => !v)} />
        <button
          type="button"
          className={iconActionClassName()}
          title="編集"
          aria-label="編集"
        >
          <Pencil size={ICON_ACTION_SIZE} />
        </button>
        <button
          type="button"
          className={iconActionClassName({ variant: "danger" })}
          title="削除"
          aria-label="削除"
          onClick={async () => {
            if (await confirm("この項目を削除します。よろしいですか？")) {
              alert("削除しました（プレビューのため実際には何も起きません）");
            }
          }}
        >
          <Trash2 size={ICON_ACTION_SIZE} />
        </button>
      </div>

      {dialog}
    </section>
  );
}

export function App() {
  return (
    <div className="flex flex-col min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">プロジェクトの準備ができました</h1>
          <p>コンポーネントを追加して開発を始められます。</p>
          <p>ボタンコンポーネントはあらかじめ追加済みです。</p>
          <Button className="mt-2">保存する</Button>
        </div>
      </div>
      <GenericComponentsPreview />
    </div>
  )
}

export default App
