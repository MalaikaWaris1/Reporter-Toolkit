import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { Topbar } from "./Topbar.jsx";

const TITLES = {
  "/dashboard": "Dashboard",
  "/history": "History",
  "/summarizer": "Summarization Engine",
  "/translator": "Multilingual Wire Translator",
  "/tts": "Neural TTS Studio",
  "/transcriber": "Interview Transcriber",
  "/headlines": "Smart Headline Generator",
  "/social": "Social Media Content Maker",
  "/seo": "SEO Tags & Keyword Extractor",
  "/settings": "Settings",
};

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const title = TITLES[location.pathname] || "Dispatch";

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setOpen(true)} title={title} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
