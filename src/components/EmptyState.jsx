export const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink/15 px-6 py-14 text-center dark:border-charcoal-border">
    {Icon && <Icon size={22} className="mb-1 text-ink-faint dark:text-[#6E7688]" />}
    <p className="font-display text-base text-ink dark:text-[#E7E4DC]">{title}</p>
    {description && <p className="max-w-sm text-sm text-ink-faint dark:text-[#8A93A3]">{description}</p>}
  </div>
);
