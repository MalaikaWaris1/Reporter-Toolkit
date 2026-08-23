// import { Link, useNavigate } from "react-router-dom";
// import {
//   FileText,
//   Languages,
//   AudioLines,
//   Mic2,
//   Type,
//   Share2,
//   Tags,
//   ArrowRight,
//   ArrowLeft,
// } from "lucide-react";
// import { ModuleCard } from "../components/ModuleCard.jsx";
// import { EmptyState } from "../components/EmptyState.jsx";
// import { useLocalHistory } from "../context/LocalHistoryContext.jsx";
// import { History } from "lucide-react";

// const MODULES = [
//   { deskNumber: "01", icon: Mic2, title: "Interview Transcriber", description: "Turn a recording into text.", to: "/transcriber" },
//   { deskNumber: "02", icon: FileText, title: "Summarization Engine", description: "Short, medium, or detailed summaries.", to: "/summarizer" },
//   { deskNumber: "03", icon: Languages, title: "Wire Translator", description: "English ↔ Urdu, journalist-grade.", to: "/translator" },
//   { deskNumber: "04", icon: Type, title: "Headline Generator", description: "Five headline styles per article.", to: "/headlines" },
//   { deskNumber: "05", icon: Tags, title: "SEO Extractor", description: "Keywords, tags, meta description.", to: "/seo" },
//   { deskNumber: "06", icon: Share2, title: "Social Media Maker", description: "LinkedIn, X, TikTok, YouTube, IG.", to: "/social" },
//   { deskNumber: "07", icon: AudioLines, title: "TTS Studio", description: "Script to newscast-style audio.", to: "/tts" },
// ];

// const greeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "Good morning";
//   if (hour < 18) return "Good afternoon";
//   return "Good evening";
// };

// export const Dashboard = () => {
//   const { entries } = useLocalHistory();
//   const recent = entries.slice(0, 3);
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col gap-10">
//       {/* Top Bar with Go Back / Back Button */}
//       <div className="flex items-center justify-between border-b border-ink/10 pb-4 dark:border-charcoal-border">
//         <button
//           onClick={() => navigate(-1)}
//           className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-ink/5 dark:border-charcoal-border dark:text-[#E7E4DC] dark:hover:bg-white/5"
//         >
//           <ArrowLeft size={14} /> Go Back
//         </button>
//       </div>

//       <div>
//         <p className="desk-stamp text-xs uppercase tracking-widest text-wire">
//           {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
//         </p>
//         <h2 className="mt-1 font-display text-2xl md:text-3xl">{greeting()}, Reporter.</h2>
//         <p className="mt-1 text-sm text-ink-faint dark:text-[#8A93A3]">
//           Pick a desk to get started, or continue where you left off.
//         </p>
//       </div>

//       <div>
//         <div className="mb-3 flex items-center justify-between">
//           <h3 className="font-display text-lg">Recent activity</h3>
//           <Link to="/history" className="inline-flex items-center gap-1 text-sm text-press hover:underline">
//             View all <ArrowRight size={13} />
//           </Link>
//         </div>
//         {recent.length === 0 ? (
//           <EmptyState
//             icon={History}
//             title="No activity yet"
//             description="Results you save from any module will show up here."
//           />
//         ) : (
//           <div className="grid gap-3 md:grid-cols-3">
//             {recent.map((entry) => (
//               <div
//                 key={entry.id}
//                 className="rounded-lg border border-ink/10 bg-white/60 p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//               >
//                 <span className="desk-stamp text-[10px] uppercase text-press">{entry.module}</span>
//                 <p className="mt-1 line-clamp-2 text-sm text-ink-soft dark:text-[#AEB4C0]">{entry.output}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div>
//         <h3 className="mb-3 font-display text-lg">All desks</h3>
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {MODULES.map((m) => (
//             <ModuleCard key={m.to} {...m} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Languages,
  AudioLines,
  Mic2,
  Type,
  Share2,
  Tags,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { ModuleCard } from "../components/ModuleCard.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { useLocalHistory } from "../context/LocalHistoryContext.jsx";
import { History } from "lucide-react";

const MODULES = [
  { deskNumber: "01", icon: Mic2, title: "Interview Transcriber", description: "Turn a recording into text.", to: "/transcriber" },
  { deskNumber: "02", icon: FileText, title: "Summarization Engine", description: "Short, medium, or detailed summaries.", to: "/summarizer" },
  { deskNumber: "03", icon: Languages, title: "Wire Translator", description: "English ↔ Urdu, journalist-grade.", to: "/translator" },
  { deskNumber: "04", icon: Type, title: "Headline Generator", description: "Five headline styles per article.", to: "/headlines" },
  { deskNumber: "05", icon: Tags, title: "SEO Extractor", description: "Keywords, tags, meta description.", to: "/seo" },
  { deskNumber: "06", icon: Share2, title: "Social Media Maker", description: "LinkedIn, X, TikTok, YouTube, IG.", to: "/social" },
  { deskNumber: "07", icon: AudioLines, title: "TTS Studio", description: "Script to newscast-style audio.", to: "/tts" },
];

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export const Dashboard = () => {
  const { entries } = useLocalHistory();
  const recent = entries.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10">
      {/* Top Bar with Go Back / Landing Page Link */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-4 dark:border-charcoal-border">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-ink/5 dark:border-charcoal-border dark:text-[#E7E4DC] dark:hover:bg-white/5"
        >
          <ArrowLeft size={14} /> Go to Landing Page
        </button>
      </div>

      <div>
        <p className="desk-stamp text-xs uppercase tracking-widest text-wire">
          {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h2 className="mt-1 font-display text-2xl md:text-3xl">{greeting()}, Reporter.</h2>
        <p className="mt-1 text-sm text-ink-faint dark:text-[#8A93A3]">
          Pick a desk to get started, or continue where you left off.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg">Recent activity</h3>
          <Link to="/history" className="inline-flex items-center gap-1 text-sm text-press hover:underline">
            View all <ArrowRight size={13} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <EmptyState
            icon={History}
            title="No activity yet"
            description="Results you save from any module will show up here."
          />
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {recent.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-ink/10 bg-white/60 p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60"
              >
                <span className="desk-stamp text-[10px] uppercase text-press">{entry.module}</span>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft dark:text-[#AEB4C0]">{entry.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg">All desks</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <ModuleCard key={m.to} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
};