export function ActiveStatusPill({
  isActive,
  onClick,
  activeLabel = "有効",
  inactiveLabel = "無効",
}: {
  isActive: boolean;
  onClick?: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
}) {
  const label = isActive ? activeLabel : inactiveLabel;
  const className = `rounded-md px-2 py-0.5 text-xs font-medium ${
    isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
  }`;

  if (!onClick) {
    return <span className={className}>{label}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={isActive ? `クリックで${inactiveLabel}に変更` : `クリックで${activeLabel}に変更`}
      className={`${className} inline-flex items-center gap-1 ring-1 ring-inset ring-black/10 transition hover:opacity-75`}
    >
      {label}
      <span className="text-[10px] opacity-60">▾</span>
    </button>
  );
}
