import { useMemo, useState } from "react";
import { History as HistoryIcon, Search } from "lucide-react";
import { useLocalHistory } from "../context/LocalHistoryContext.jsx";
import { HistoryList } from "../components/HistoryList.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { useDebounce } from "../hooks/useDebounce.js";

const MODULE_FILTERS = ["all", "summarizer", "translator", "tts", "transcriber", "headlines", "social", "seo"];

export const HistoryPage = () => {
  const { entries, removeEntry, clearAll } = useLocalHistory();
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesModule = moduleFilter === "all" || e.module === moduleFilter;
      const matchesQuery =
        !debouncedQuery ||
        e.output?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        e.title?.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesModule && matchesQuery;
    });
  }, [entries, moduleFilter, debouncedQuery]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">History</h2>
          <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
            Saved locally in this browser — not yet synced to your account.
          </p>
        </div>
        {entries.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-md border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-wire/40 hover:text-wire dark:border-charcoal-border dark:text-[#AEB4C0]"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saved results…"
            className="w-full rounded-md border border-ink/15 bg-white/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
          />
        </div>
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="rounded-md border border-ink/15 bg-white/60 px-3 py-2 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
        >
          {MODULE_FILTERS.map((f) => (
            <option key={f} value={f}>
              {f === "all" ? "All modules" : f}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="Nothing here yet"
          description="Use Save on any result to keep it in your history."
        />
      ) : (
        <HistoryList entries={filtered} onRemove={removeEntry} />
      )}
    </div>
  );
};
