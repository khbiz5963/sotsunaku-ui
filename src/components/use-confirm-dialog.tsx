"use client";

import { useCallback, useRef, useState } from "react";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

// アプリ全体で「確認ダイアログはブラウザ標準のwindow.confirmではなく、
// 見た目を統一した自前のポップアップで表示する」という方針に合わせるための
// 共通フック。window.confirmと同じ「await confirm(...)がtrue/falseを返す」
// 感覚で使えるようにPromiseで実装している。
export function useConfirmDialog() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((result: boolean) => void) | null>(null);

  const confirm = useCallback((input: ConfirmOptions | string) => {
    const nextOptions = typeof input === "string" ? { message: input } : input;
    setOptions(nextOptions);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  function close(result: boolean) {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setOptions(null);
  }

  const dialog = options ? (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 p-4"
      onClick={() => close(false)}
    >
      <div
        className="w-full max-w-sm rounded-md border bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        {options.title && (
          <h2 className="mb-1 text-lg font-bold">{options.title}</h2>
        )}
        <p className="whitespace-pre-line text-sm text-gray-600">
          {options.message}
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => close(false)}
            className="rounded-md px-4 py-2 text-sm text-gray-500 hover:underline"
          >
            {options.cancelLabel ?? "キャンセル"}
          </button>
          <button
            type="button"
            onClick={() => close(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {options.confirmLabel ?? "OK"}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return { confirm, dialog };
}
