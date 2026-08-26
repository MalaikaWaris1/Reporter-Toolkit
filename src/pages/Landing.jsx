import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Languages,
  AudioLines,
  Mic2,
  Type,
  Share2,
  Tags,
  ArrowRight,
  Radio,
  Plus,
  Minus,
  ShieldCheck,
  X,
  Quote,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle.jsx";
import { apiClient, ENDPOINTS } from "../api/client.js";

const MODULES = [
  { icon: Mic2, label: "Transcriber", desc: "Convert speech to clear text instantly." },
  { icon: FileText, label: "Summarizer", desc: "Condense long reports and articles." },
  { icon: Languages, label: "Translator", desc: "Localize content for target regions." },
  { icon: Type, label: "Headlines", desc: "Generate catchy and SEO-friendly titles." },
  { icon: Tags, label: "SEO Extractor", desc: "Pull keywords and metadata effortlessly." },
  { icon: Share2, label: "Social Maker", desc: "Draft engaging social media posts." },
  { icon: AudioLines, label: "TTS Studio", desc: "Produce natural-sounding voiceovers." },
];

const TICKER_ITEMS = [
  "RECORD",
  "TRANSCRIBE",
  "SUMMARIZE",
  "TRANSLATE",
  "HEADLINE",
  "EXTRACT SEO",
  "PUBLISH SOCIAL",
  "VOICE",
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617715545172-06ef44b61cc8?q=80&w=1331&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?q=80&w=1220&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
];

const TESTIMONIALS = [
  {
    quote: "Reporter Toolkit has cut my post-interview transcription and summary time by more than half. It's an absolute essential desk tool.",
    author: "Sarah Jenkins",
    role: "Senior Investigative Reporter"
  },
  {
    quote: "The multi-language translation and headline generation features have completely transformed how fast we push local news updates.",
    author: "Aiden Vance",
    role: "Newsroom Editor"
  }
];

const FAQ_ITEMS = [
  {
    q: "How is my data stored and secured?",
    a: "Your data and generated results are stored securely directly in your browser's local storage and backend session token. We prioritize absolute user data privacy."
  },
  {
    q: "Do I need to install any external software?",
    a: "No! Reporter Toolkit is a fully web-based platform. You can access all tools directly from your browser without installing anything."
  },
  {
    q: "How do I use the transcription and translation tools?",
    a: "Simply navigate to the respective tool from your dashboard workspace, input your text or audio file, and let our AI handle the rest within seconds."
  },
  {
    q: "Is there a limit to how much history I can save?",
    a: "Your local history depends on your browser storage capacity, allowing you to manage and clear your session records anytime from the settings."
  },
  {
    q: "Can I use Reporter Toolkit on mobile devices?",
    a: "Yes, the platform is fully responsive and optimized for mobile, tablet, and desktop screens."
  }
];

export const Landing = () => {
  const [user, setUser] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient
        .get(ENDPOINTS.me)
        .then((res) => setUser(res.data.data.user))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = () => {
    return user?.name ? user.name.slice(0, 2).toUpperCase() : "U";
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-charcoal dark:text-[#E7E4DC]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10 border-b border-ink/10 dark:border-charcoal-border bg-paper dark:bg-charcoal">
        <div className="flex items-center gap-2">
          <Radio size={19} className="text-wire" />
          <span className="font-display text-xl tracking-tight font-semibold">
            Reporter Toolkit
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <Link
              to="/settings"
              className="flex items-center gap-2 rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium transition hover:bg-ink/5 dark:border-charcoal-border"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-wire/20 text-[10px] font-bold text-wire">
                {getInitials()}
              </div>
              <span className="hidden md:inline">{user.name}</span>
            </Link>
          ) : (
            <Link
              to="/settings"
              className="text-sm font-medium text-ink hover:opacity-80 dark:text-[#E7E4DC] px-2"
            >
              Log in / Sign up
            </Link>
          )}

          <Link
            to="/dashboard"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-ink-soft dark:bg-paper dark:text-charcoal dark:hover:bg-[#D8D4C8]"
          >
            Start Reporting
          </Link>
        </div>
      </header>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-ink/10 bg-ink text-paper dark:border-charcoal-border dark:bg-charcoal-raised">
        <div className="flex whitespace-nowrap py-2 ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="desk-stamp mx-4 text-xs tracking-widest text-paper/70">
              {item} <span className="text-wire">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-10 md:py-28 overflow-hidden bg-black">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-90" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${img}')`,
              transitionProperty: "opacity",
              transitionDuration: "1.5s",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />

        <div className="mx-auto max-w-3xl relative z-10 text-white">
          <p className="desk-stamp mb-4 text-xs uppercase tracking-widest text-wire">
            Field-to-file, in one workspace
          </p>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight md:text-6xl text-white">
            Your AI-powered newsroom assistant.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
            Transcribe an interview, summarize a document, translate it for a local
            audience, generate headlines, pull SEO metadata, draft social posts, and
            produce a voiceover — all from one desk, without leaving your notebook.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-wire px-5 py-3 text-sm font-medium text-white transition hover:bg-wire-soft shadow-lg"
            >
              Start Reporting <ArrowRight size={15} />
            </Link>
            <a
              href="#how-to-use"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-black/20 backdrop-blur-sm px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              How to Use
            </a>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="px-6 py-20 md:px-10 border-b border-ink/10 dark:border-charcoal-border bg-paper dark:bg-charcoal">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="desk-stamp text-xs uppercase tracking-widest text-wire mb-2">Step-by-step guide</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink dark:text-white">How to Use Reporter Toolkit</h2>
            <p className="mt-3 text-ink-faint dark:text-[#8A93A3] max-w-xl mx-auto text-sm">
              Follow these simple instructions to streamline your daily journalism workflow. Watch the demo video below to get started instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-xl border border-ink/10 p-6 bg-white/60 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm">
              <span className="text-wire font-bold text-lg">01</span>
              <h3 className="font-display text-lg mt-2 mb-1 text-ink dark:text-white">Create an Account</h3>
              <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">
                Sign up securely or log in from the settings page to sync your workspace profile and preferences.
              </p>
            </div>
            <div className="rounded-xl border border-ink/10 p-6 bg-white/60 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm">
              <span className="text-wire font-bold text-lg">02</span>
              <h3 className="font-display text-lg mt-2 mb-1 text-ink dark:text-white">Choose Your Tool</h3>
              <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">
                Select from Transcriber, Summarizer, Translator, or TTS Studio depending on your immediate reporting task.
              </p>
            </div>
            <div className="rounded-xl border border-ink/10 p-6 bg-white/60 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm">
              <span className="text-wire font-bold text-lg">03</span>
              <h3 className="font-display text-lg mt-2 mb-1 text-ink dark:text-white">Process & Export</h3>
              <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">
                Execute your workflow instantly. Your output results are saved locally in your browser storage for easy future access.
              </p>
            </div>
          </div>

          {/* Video Player */}
          {/* Video Player */}
<div className="relative rounded-2xl overflow-hidden border border-ink/15 dark:border-charcoal-border shadow-xl bg-black">
  <video
    controls
    className="w-full h-auto block"
    poster="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop"
  >
    <source src="/demo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
        </div>
      </section>

      {/* Security & Browser Storage Note with Web Image Background */}
      <section 
        className="relative px-6 py-16 border-b border-ink/10 dark:border-charcoal-border overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop')`
        }}
      >
        <div className="mx-auto max-w-4xl relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left text-white">
          <div className="p-4 rounded-2xl bg-wire/20 text-wire shrink-0 backdrop-blur-sm">
            <ShieldCheck size={36} />
          </div>
          <div>
            <h3 className="font-display text-lg mb-1 text-white">Secure Local Data Storage</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your workflow inputs and analysis results are securely stored directly within your browser's local environment. No data leaks, complete client-side control, and maximum privacy guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Grid with Top Hover Line Effect */}
      <section id="modules" className="px-6 py-20 md:px-10 border-b border-ink/10 dark:border-charcoal-border bg-paper dark:bg-charcoal">
        <div className="mx-auto max-w-6xl">
          <p className="desk-stamp mb-8 text-xs uppercase tracking-widest text-ink-faint dark:text-[#8A93A3]">
            Seven desks, one workflow
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {MODULES.map((m, i) => (
              <div
                key={m.label}
                className="group relative overflow-hidden flex flex-col gap-3 rounded-xl border border-ink/10 p-5 dark:border-charcoal-border bg-white/60 dark:bg-charcoal-raised/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* Glowing top line effect on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-wire scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />

                <span className="desk-stamp text-[10px] text-ink-faint dark:text-[#8A93A3]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <m.icon size={22} className="text-wire transition-transform group-hover:scale-110" />
                <span className="font-display text-base font-semibold text-ink dark:text-white">{m.label}</span>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Banner (Red-Brown Gradient) */}
      <section className="px-6 py-20 md:px-10 bg-gradient-to-r from-[#991b1b] via-[#7c2d12] to-[#451a03] text-center text-white shadow-2xl">
        <div className="mx-auto max-w-3xl">
          <p className="desk-stamp mb-3 text-xs uppercase tracking-widest text-amber-200">
            Accelerate Your Desk
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-4 text-white">
            Ready to speed up your newsroom workflow?
          </h2>
          <p className="text-sm md:text-base text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Join reporters and editors who use Reporter Toolkit to manage audio transcripts, summaries, and translations seamlessly.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-red-950 transition hover:bg-gray-100 shadow-xl"
          >
            Start Reporting Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 md:px-10 border-b border-ink/10 dark:border-charcoal-border bg-paper dark:bg-charcoal">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="desk-stamp text-xs uppercase tracking-widest text-wire mb-2">Trusted by journalists</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink dark:text-white">What Reporters Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-xl border border-ink/15 p-6 bg-white/60 dark:border-charcoal-border dark:bg-charcoal-raised/60 shadow-sm">
                <Quote size={28} className="text-wire/40 mb-3" />
                <p className="text-sm italic text-ink-soft dark:text-[#AEB4C0] leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-white">{t.author}</p>
                  <p className="text-xs text-ink-faint dark:text-[#8A93A3]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 md:px-10 bg-gradient-to-b from-[#0a1128] to-[#030712] text-white">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <p className="text-xs uppercase tracking-widest text-wire mb-2">Help Center</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              Got questions about features, accounts, or local data safety? Find quick answers right here.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-white/10 pb-3 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-3 text-left font-medium text-sm md:text-base hover:text-wire transition text-white"
                >
                  <span>{faq.q}</span>
                  <span className="p-1 rounded-full bg-white/10 text-white">
                    {openFaq === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-gray-300 pb-3 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-6 py-10 text-sm text-ink-faint dark:border-charcoal-border dark:text-[#6E7688] md:px-10 bg-paper dark:bg-charcoal">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p>Built for reporters, not for demos. © {new Date().getFullYear()} Reporter Toolkit.</p>
          <div className="flex items-center gap-6 text-xs font-medium">
            <button onClick={() => setModalContent("terms")} className="hover:text-ink dark:hover:text-white transition">
              Terms of Service
            </button>
            <button onClick={() => setModalContent("privacy")} className="hover:text-ink dark:hover:text-white transition">
              Privacy Policy
            </button>
            <button onClick={() => setModalContent("faq")} className="hover:text-ink dark:hover:text-white transition">
              FAQ Modal
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Popup Component */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-paper p-6 text-ink dark:bg-charcoal dark:text-white border border-ink/10 dark:border-charcoal-border shadow-2xl animate-scaleUp">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-ink/5 dark:bg-white/5 hover:bg-ink/10 transition"
            >
              <X size={18} />
            </button>

            {modalContent === "terms" && (
              <div>
                <h3 className="font-display text-xl mb-3">Terms of Service</h3>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed mb-3">
                  Welcome to Reporter Toolkit. By accessing or using our platform, you agree to comply with and be bound by these terms. Our tools are designed to assist journalists, editors, and newsroom professionals with AI-powered automation.
                </p>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">
                  Users are responsible for verifying generated text, translations, summaries, and transcripts before publication in official media channels.
                </p>
              </div>
            )}

            {modalContent === "privacy" && (
              <div>
                <h3 className="font-display text-xl mb-3">Privacy Policy</h3>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed mb-3">
                  Your privacy is our primary concern. All analysis results, user histories, and text outputs are stored locally within your web browser. 
                </p>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed">
                  We do not harvest or sell personal data. Authentication tokens are securely verified via encrypted backend protocols.
                </p>
              </div>
            )}

            {modalContent === "faq" && (
              <div>
                <h3 className="font-display text-xl mb-3">Quick FAQ Support</h3>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] leading-relaxed mb-3">
                  Need immediate help? Reach out to support or check our main FAQ section on the landing page for full details regarding transcription limits and account login.
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="rounded-md bg-ink px-4 py-2 text-xs font-medium text-white dark:bg-white dark:text-ink"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};