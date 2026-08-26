import { Trash2 } from "lucide-react";
import { CopyButton } from "./CopyButton.jsx";
import { Copy } from "lucide-react";

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



export const HistoryList = ({ entries, onRemove }) => {
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => {
        // Check karein agar output audio base64 data hai
        const isAudio = entry.module === "tts" || entry.output?.startsWith("data:audio");

        return (
          <div
            key={entry.id}
            className="rounded-lg border border-ink/10 bg-white/60 p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="desk-stamp text-[10px] uppercase font-semibold text-press">
                  {entry.module}
                </span>
                <span className="text-xs text-ink-faint">
                  {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!isAudio && (
                  <button
                    onClick={() => navigator.clipboard.writeText(entry.output)}
                    className="inline-flex items-center gap-1 rounded border border-ink/10 px-2 py-1 text-xs text-ink-soft hover:bg-ink/5 dark:border-charcoal-border dark:text-[#AEB4C0]"
                  >
                    <Copy size={12} /> Copy
                  </button>
                )}
                <button
                  onClick={() => onRemove(entry.id)}
                  className="text-ink-faint hover:text-red-500 p-1 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h4 className="font-medium text-sm text-ink dark:text-[#E7E4DC] mb-1">
              {entry.title || (isAudio ? "Voice clip" : "Result")}
            </h4>

            {/* Content Display Logic */}
            {isAudio ? (
              <div className="mt-2 w-full">
                <audio controls className="w-full h-10 rounded-md">
                  <source src={entry.output} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <p className="text-sm text-ink-soft dark:text-[#AEB4C0] whitespace-pre-wrap">
                {entry.output}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
