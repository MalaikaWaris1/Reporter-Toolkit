import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useLocalHistory } from "../context/LocalHistoryContext.jsx";

// Saves to the local (browser-only) history stand-in — see
// LocalHistoryContext.jsx for why this isn't a real backend call yet.
export const SaveButton = ({ module, title, input, output }) => {
  const { addEntry } = useLocalHistory();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    addEntry({ module, title, input, output });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className="inline-flex items-center gap-1.5 rounded-md border border-ink/15 px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink dark:border-charcoal-border dark:text-[#AEB4C0] dark:hover:border-[#3A4257] dark:hover:text-white"
    >
      {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
      {saved ? "Saved" : "Save"}
    </button>
  );
};
