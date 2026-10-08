import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// 標準のボタン（設計書2026-10-10 設計A-1）。種類は5つ：
//   default＝主（青の塗りつぶし）／outline＝副（白地・灰色の枠）／destructive＝危険（赤）／
//   ghost＝文字だけ（表の行の中など）／ai＝AI読み取り専用（紫）。
// 大きさは、default（高さ36px、フォーム下部・ヘッダーの操作）と sm（高さ28px、表の行の中）、
// および正方形の icon・icon-sm。ボタンの見た目のリンクは、
// <Button asChild><Link href="…">…</Link></Button> と書く。
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border-border bg-background text-gray-700 hover:bg-muted",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        ghost: "text-primary hover:bg-primary/10",
        ai: "bg-violet-600 text-white hover:bg-violet-700",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-7 px-2.5 text-xs",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
