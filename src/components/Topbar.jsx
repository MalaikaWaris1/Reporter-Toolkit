import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle.jsx";

export const Topbar = ({ onMenuClick, title }) => (
  <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-4 py-3 backdrop-blur dark:border-charcoal-border dark:bg-charcoal/90 md:px-6">
    <div className="flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="rounded-md p-1.5 text-ink-soft hover:bg-ink/5 dark:text-[#AEB4C0] dark:hover:bg-white/5 md:hidden"
        aria-label="Open menu"
      >
        <Menu size={19} />
      </button>
      <h1 className="font-display text-lg text-ink dark:text-[#E7E4DC]">{title}</h1>
    </div>
    <ThemeToggle />
  </header>
);
