"use client";

import { useLayoutEffect, useRef } from "react";

function toHalfWidthDigits(raw: string): string {
  const halfWidth = raw.replace(/[０-９]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xfee0)
  );
  return halfWidth.replace(/[^\d]/g, "");
}

function formatWithCommas(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 金額入力欄。保持する値・onChangeで渡す値はカンマなしの数字文字列
// （例: "30000000"）で統一し、表示だけをカンマ区切りにする。
// type="number"はカンマを受け付けないためtype="text"を使っており、
// 入力途中で桁のカンマが増減してもカーソル位置がずれないよう、
// 「カーソルより左にある数字の個数」を基準に位置を復元している。
export function AmountInput({
  value,
  onChange,
  className = "",
  required,
  id,
  name,
  placeholder,
  disabled,
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (digitsOnly: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaretDigits = useRef<number | null>(null);
  const displayValue = formatWithCommas(value);

  useLayoutEffect(() => {
    const digitsBeforeCaret = pendingCaretDigits.current;
    const input = inputRef.current;
    if (digitsBeforeCaret === null || !input) return;
    pendingCaretDigits.current = null;

    let seen = 0;
    let caretPos = displayValue.length;
    if (digitsBeforeCaret === 0) {
      caretPos = 0;
    } else {
      for (let i = 0; i < displayValue.length; i++) {
        if (/\d/.test(displayValue[i])) {
          seen++;
          if (seen === digitsBeforeCaret) {
            caretPos = i + 1;
            break;
          }
        }
      }
    }
    input.setSelectionRange(caretPos, caretPos);
  }, [displayValue]);

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      id={id}
      name={name}
      value={displayValue}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      aria-label={ariaLabel}
      onChange={(event) => {
        const raw = event.target.value;
        const caret = event.target.selectionStart ?? raw.length;
        pendingCaretDigits.current = toHalfWidthDigits(raw.slice(0, caret)).length;
        onChange(toHalfWidthDigits(raw));
      }}
      className={`text-right ${className}`}
    />
  );
}
