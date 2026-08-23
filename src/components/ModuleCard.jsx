import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const ModuleCard = ({ deskNumber, icon: Icon, title, description, to }) => (
  <Link
    to={to}
    className="group relative flex flex-col justify-between rounded-lg border border-ink/10 bg-white/60 p-5 shadow-card transition hover:-translate-y-0.5 hover:border-wire/40 hover:shadow-lg dark:border-charcoal-border dark:bg-charcoal-raised/60"
  >
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="desk-stamp text-[11px] text-ink-faint dark:text-[#6E7688]">
          DESK {deskNumber}
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-faint opacity-0 transition group-hover:opacity-100 group-hover:text-wire"
        />
      </div>
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-press/10 text-press dark:bg-press/15 dark:text-press-soft">
        <Icon size={18} />
      </div>
      <h3 className="font-display text-lg leading-snug text-ink dark:text-[#E7E4DC]">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-faint dark:text-[#8A93A3]">{description}</p>
    </div>
  </Link>
);
