import { Button } from "@/components/ui/button"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">プロジェクトの準備ができました</h1>
          <p>コンポーネントを追加して開発を始められます。</p>
          <p>ボタンコンポーネントはあらかじめ追加済みです。</p>
          <Button className="mt-2">保存する</Button>
        </div>
      </div>
    </div>
  )
}

export default App
