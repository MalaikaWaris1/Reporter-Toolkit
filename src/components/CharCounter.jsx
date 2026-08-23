export const CharCounter = ({ value, min, max }) => {
  const len = value.length;
  const overMax = max != null && len > max;
  const underMin = min != null && len > 0 && len < min;

  return (
    <div className="flex items-center justify-between text-xs font-mono">
      <span className={underMin ? "text-wire" : "text-ink-faint dark:text-[#6E7688]"}>
        {min != null && len < min ? `${min - len} more needed (min ${min})` : ""}
      </span>
      <span className={overMax ? "text-wire" : "text-ink-faint dark:text-[#6E7688]"}>
        {len.toLocaleString()}
        {max != null ? ` / ${max.toLocaleString()}` : ""}
      </span>
    </div>
  );
};
