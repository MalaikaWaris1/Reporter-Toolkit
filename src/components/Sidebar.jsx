import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Languages,
  AudioLines,
  Mic2,
  Type,
  Share2,
  Tags,
  History,
  Settings,
  X,
  Radio,
  LogOut,
} from "lucide-react";
import { apiClient, ENDPOINTS } from "../api/client.js";

const WORKSPACE = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/history", label: "History", icon: History },
];

const TOOLS = [
  { to: "/summarizer", label: "Summarizer", icon: FileText },
  { to: "/translator", label: "Translator", icon: Languages },
  { to: "/tts", label: "TTS Studio", icon: AudioLines },
  { to: "/transcriber", label: "Transcriber", icon: Mic2 },
  { to: "/headlines", label: "Headlines", icon: Type },
  { to: "/social", label: "Social Maker", icon: Share2 },
  { to: "/seo", label: "SEO Extractor", icon: Tags },
];

const ACCOUNT = [{ to: "/settings", label: "Settings", icon: Settings }];

const NavGroup = ({ label, items, onNavigate }) => (
  <div className="mb-6">
    <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-ink-faint dark:text-[#5C6474]">
      {label}
    </p>
    <div className="flex flex-col gap-0.5">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
              isActive
                ? "bg-wire/15 font-medium text-wire dark:bg-wire/20 dark:text-wire-soft"
                : "text-ink-soft hover:bg-ink/5 dark:text-[#AEB4C0] dark:hover:bg-white/5"
            }`
          }
        >
          <item.icon size={16} />
          {item.label}
        </NavLink>
      ))}
    </div>
  </div>
);

export const Sidebar = ({ open, onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await apiClient.get(ENDPOINTS.me);
        setUser(res.data.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink/15 bg-[#F3EFE6] px-3 py-4 transition-transform dark:border-charcoal-border dark:bg-[#0D1117] md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          {/* Brand Name & Landing Link */}
          <Link to="/" className="flex items-center gap-2 group">
            <Radio size={18} className="text-wire transition group-hover:scale-110" />
            <span className="font-display text-base tracking-tight font-bold text-ink dark:text-white">
              Reporter Toolkit
            </span>
          </Link>
          <button onClick={onClose} className="rounded-md p-1 md:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin">
          <NavGroup label="Workspace" items={WORKSPACE} onNavigate={onClose} />
          <NavGroup label="Tools" items={TOOLS} onNavigate={onClose} />
          <NavGroup label="Account" items={ACCOUNT} onNavigate={onClose} />
        </nav>

        {/* Footer: Always shows user profile/initials when logged in, instead of the text link */}
        <div className="border-t border-ink/10 pt-3 dark:border-charcoal-border">
          {user ? (
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-wire/20 text-xs font-bold text-wire dark:bg-wire/30 dark:text-wire-soft">
                  {getInitials()}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-xs font-medium text-ink dark:text-white">
                    {user.name || user.email}
                  </p>
                  <p className="truncate text-[10px] text-ink-faint dark:text-[#5C6474]">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="rounded p-1.5 text-ink-faint hover:bg-red-500/10 hover:text-red-500 dark:text-[#5C6474]"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              to="/"
              className="block px-3 py-2 text-xs font-medium text-wire hover:underline"
            >
              ← Return to Landing Page
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};