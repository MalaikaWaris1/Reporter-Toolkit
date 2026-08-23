import { useState, useEffect } from "react";
import { Moon, Sun, Trash2, User, LogOut, Lock, Mail, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLocalHistory } from "../context/LocalHistoryContext.jsx";
import { apiClient, ENDPOINTS, extractErrorMessage } from "../api/client.js";

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { clearAll } = useLocalHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.me);
      setUser(response.data.data.user);
      setIsLoggedIn(true);
    } catch (err) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      let response;
      if (isRegistering) {
        response = await apiClient.post(ENDPOINTS.register, { name, email, password });
      } else {
        response = await apiClient.post(ENDPOINTS.login, { email, password });
      }

      const { user, token } = response.data.data;
      localStorage.setItem("token", token);

      setUser(user);
      setIsLoggedIn(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setErrorMessage(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto pb-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Settings</h2>

      {/* Appearance Section */}
      <section className="rounded-xl border border-ink/10 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-charcoal-border dark:bg-charcoal-raised/60">
        <h3 className="mb-3 font-display text-base font-medium">Appearance</h3>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-2.5 rounded-lg border border-ink/15 px-4 py-2.5 text-sm font-medium transition-all hover:bg-ink/5 dark:border-charcoal-border dark:hover:bg-white/5"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          Switch to {theme === "dark" ? "light" : "dark"} mode
        </button>
      </section>

      {/* Local Data Section */}
      <section className="rounded-xl border border-ink/10 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-charcoal-border dark:bg-charcoal-raised/60">
        <h3 className="mb-2 font-display text-base font-medium">Local data</h3>
        <p className="mb-4 text-sm text-ink-faint dark:text-[#8A93A3]">
          Your saved results and analysis history are currently stored only in this browser.
        </p>
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-500/10 dark:text-red-400"
        >
          <Trash2 size={16} />
          Clear all local history
        </button>
      </section>

      {/* Account Section */}
      <section className="rounded-xl border border-ink/10 bg-white/60 p-6 shadow-sm backdrop-blur-md dark:border-charcoal-border dark:bg-charcoal-raised/60">
        <h3 className="mb-4 font-display text-base font-medium">Account</h3>

        {isLoggedIn ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 rounded-lg border border-ink/5 bg-ink/5 p-4 dark:border-charcoal-border dark:bg-black/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wire/20 text-wire font-bold text-lg dark:bg-wire/30 dark:text-wire-soft">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-semibold capitalize text-ink dark:text-white">{user?.name}</p>
                <p className="text-xs text-ink-faint dark:text-[#8A93A3] truncate">{user?.email}</p>
                <span className="mt-1 inline-block rounded bg-wire/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-wire">
                  Role: {user?.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Log out from account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink dark:text-white">
                {isRegistering ? "Create a new account" : "Sign in to your toolkit"}
              </span>
            </div>

            {/* Stylish Alert Box for Errors */}
            {errorMessage && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400 animate-fadeIn">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {isRegistering && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-faint dark:text-[#8A93A3]">
                  Full Name
                </label>
                <div className="flex items-center gap-2.5 rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 transition-all focus-within:border-wire dark:border-charcoal-border dark:bg-charcoal">
                  <User size={16} className="text-ink-faint" />
                  <input
                    type="text"
                    required={isRegistering}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ink-faint dark:text-[#8A93A3]">
                Email Address
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 transition-all focus-within:border-wire dark:border-charcoal-border dark:bg-charcoal">
                <Mail size={16} className="text-ink-faint" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-ink-faint dark:text-[#8A93A3]">
                Password <span className="text-[10px] text-ink-faint">(min 8 characters)</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 transition-all focus-within:border-wire dark:border-charcoal-border dark:bg-charcoal">
                <Lock size={16} className="text-ink-faint" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-ink py-3 text-sm font-medium text-white transition-all hover:opacity-90 dark:bg-white dark:text-ink disabled:opacity-50 shadow-sm"
            >
              {loading ? "Processing..." : isRegistering ? "Create Account" : "Log In"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMessage("");
                }}
                className="text-xs font-medium text-wire hover:underline"
              >
                {isRegistering
                  ? "Already have an account? Log in here"
                  : "Don't have an account yet? Sign up"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};