export function iconActionClassName({
  variant = "default",
  disabled = false,
}: {
  variant?: "default" | "danger";
  disabled?: boolean;
} = {}): string {
  if (disabled) {
    return "inline-flex items-center justify-center rounded-md p-1.5 text-gray-300";
  }
  if (variant === "danger") {
    return "inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600";
  }
  return "inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600";
}

export const ICON_ACTION_SIZE = 16;
