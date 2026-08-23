import { X } from "lucide-react";

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-lg border border-ink/10 bg-paper p-5 shadow-card dark:border-charcoal-border dark:bg-charcoal-raised">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-ink-faint hover:bg-ink/5 hover:text-ink dark:hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
