import { useState } from "react";
import { Copy, Check } from "lucide-react";

export const CopyButton = ({ text, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-ink/15 px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink dark:border-charcoal-border dark:text-[#AEB4C0] dark:hover:border-[#3A4257] dark:hover:text-white"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
};
