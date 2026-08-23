import { Download } from "lucide-react";

export const AudioPlayer = ({ src, fileName = "dispatch-audio.mp3" }) => {
  if (!src) return null;
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-white/60 p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60">
      <audio controls src={src} className="w-full">
        Your browser does not support the audio element.
      </audio>
      <a
        href={src}
        download={fileName}
        className="inline-flex w-fit items-center gap-1.5 rounded-md border border-ink/15 px-2.5 py-1.5 text-xs font-medium text-ink-soft transition hover:border-ink/30 hover:text-ink dark:border-charcoal-border dark:text-[#AEB4C0] dark:hover:text-white"
      >
        <Download size={13} />
        Download audio
      </a>
    </div>
  );
};
