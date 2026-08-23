export const ResultCard = ({ eyebrow, title, actions, children }) => (
  <div className="rounded-lg border border-ink/10 bg-white/70 shadow-card dark:border-charcoal-border dark:bg-charcoal-raised/70">
    <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 dark:border-charcoal-border">
      <div>
        {eyebrow && (
          <p className="desk-stamp text-[10px] uppercase tracking-wider text-ink-faint dark:text-[#6E7688]">
            {eyebrow}
          </p>
        )}
        {title && <p className="font-display text-base text-ink dark:text-[#E7E4DC]">{title}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    <div className="p-4">{children}</div>
  </div>
);
