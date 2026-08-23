export const LoadingSpinner = ({ label = "Working…" }) => (
  <div className="flex items-center gap-3 text-ink-soft dark:text-[#AEB4C0]" role="status" aria-live="polite">
    <span className="relative flex h-4 w-4">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wire/50" />
      <span className="relative inline-flex h-4 w-4 rounded-full bg-wire" />
    </span>
    <span className="font-mono text-sm">{label}</span>
  </div>
);
