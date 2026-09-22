"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabNavItem = {
  href: string;
  label: string;
};

function resolveActiveHref(pathname: string, items: TabNavItem[]): string | null {
  let best: { href: string; matchLength: number } | null = null;
  for (const item of items) {
    const matches = pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (matches && (!best || item.href.length > best.matchLength)) {
      best = { href: item.href, matchLength: item.href.length };
    }
  }
  return best?.href ?? null;
}

export function TabNav({
  items,
  variant = "underline",
}: {
  items: TabNavItem[];
  variant?: "underline" | "segmented";
}) {
  const pathname = usePathname();
  const activeHref = resolveActiveHref(pathname, items);

  if (variant === "segmented") {
    return (
      <nav className="flex gap-1 rounded-full border p-1 text-sm">
        {items.map((item) => {
          const active = item.href === activeHref;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1 ${
                active
                  ? "bg-blue-600 font-medium text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="mb-6 flex gap-1 border-b text-sm">
      {items.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`-mb-px border-b-2 px-3 py-2 ${
              active
                ? "border-blue-600 font-medium text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
