import { Trash2 } from "lucide-react";
import { CopyButton } from "./CopyButton.jsx";

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const HistoryItem = ({ entry, onRemove }) => (
  <div className="rounded-lg border border-ink/10 bg-white/60 p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60">
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="desk-stamp rounded bg-press/10 px-1.5 py-0.5 text-[10px] uppercase text-press dark:bg-press/15 dark:text-press-soft">
          {entry.module}
        </span>
        <span className="text-xs text-ink-faint dark:text-[#6E7688]">{formatDate(entry.createdAt)}</span>
      </div>
      <div className="flex items-center gap-2">
        <CopyButton text={entry.output} />
        <button
          onClick={() => onRemove(entry.id)}
          aria-label="Delete entry"
          className="rounded-md p-1.5 text-ink-faint hover:bg-wire/10 hover:text-wire dark:hover:bg-wire/10"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
    {entry.title && <p className="mb-1 font-display text-sm text-ink dark:text-[#E7E4DC]">{entry.title}</p>}
    <p className="line-clamp-3 text-sm text-ink-soft dark:text-[#AEB4C0]">{entry.output}</p>
  </div>
);

export const HistoryList = ({ entries, onRemove }) => (
  <div className="flex flex-col gap-3">
    {entries.map((entry) => (
      <HistoryItem key={entry.id} entry={entry} onRemove={onRemove} />
    ))}
  </div>
);
