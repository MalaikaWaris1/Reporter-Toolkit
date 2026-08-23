import { AlertTriangle } from "lucide-react";

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-wire/30 bg-wire/[0.06] px-3 py-2.5 text-sm text-wire dark:border-wire-soft/40 dark:bg-wire/10 dark:text-wire-soft"
    >
      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
