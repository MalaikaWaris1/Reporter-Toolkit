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
  History,
} from "lucide-react";
import { ModuleCard } from "../components/ModuleCard.jsx";
import { EmptyState } from "../components/EmptyState.jsx";
import { useLocalHistory } from "../context/LocalHistoryContext.jsx";

// ToolFooter import
import ToolFooter from "../components/ToolFooter.jsx"; 

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
    <div className="flex flex-col gap-5 sm:gap-8 md:gap-10 w-[94%] sm:w-[92%] md:w-full max-w-full mx-auto overflow-hidden box-border py-2">
      
      {/* Top Bar with Go Back / Landing Page Link */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-3 sm:pb-4 dark:border-charcoal-border w-full">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-ink/15 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-ink transition hover:bg-ink/5 dark:border-charcoal-border dark:text-[#E7E4DC] dark:hover:bg-white/5"
        >
          <ArrowLeft size={14} /> Go to Landing Page
        </button>
      </div>

      {/* Greeting Header */}
      <div className="w-full">
        <p className="desk-stamp text-[10px] sm:text-xs uppercase tracking-widest text-wire">
          {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h2 className="mt-1 font-display text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
          {greeting()}, Reporter.
        </h2>
        <p className="mt-1 text-xs sm:text-base text-ink-faint dark:text-[#8A93A3]">
          Pick a desk to get started, or continue where you left off.
        </p>
      </div>

      {/* Recent Activity Section */}
      <div className="w-full">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-display text-base sm:text-xl font-semibold">Recent activity</h3>
          <Link to="/history" className="inline-flex items-center gap-1 text-xs sm:text-base text-press hover:underline whitespace-nowrap">
            View all <ArrowRight size={13} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="w-full">
            <EmptyState
              icon={History}
              title="No activity yet"
              description="Results you save from any module will show up here."
            />
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
            {recent.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-ink/10 bg-white/60 p-3.5 sm:p-4 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm w-full box-border"
              >
                <span className="desk-stamp text-[10px] uppercase text-press">{entry.module}</span>
                <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-ink-soft dark:text-[#AEB4C0]">{entry.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Desks Section */}
      <div className="w-full">
        <h3 className="mb-3 font-display text-base sm:text-xl font-semibold">All desks</h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {MODULES.map((m) => (
            <ModuleCard key={m.to} {...m} />
          ))}
        </div>
      </div>

      {/* Footer Component */}
     <div className="mt-2 sm:mt-6 w-full">
        <ToolFooter />
      </div>
      
    </div>
  );
};