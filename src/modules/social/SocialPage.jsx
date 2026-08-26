import { useEffect, useState } from "react";
import { Share2, Linkedin, Twitter, Music2, Youtube, Instagram } from "lucide-react";
import { generateSocialContent, SOCIAL_PLATFORMS, SOCIAL_LANGUAGES } from "../../api/socialApi.js";
import { useApi } from "../../hooks/useApi.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import { CharCounter } from "../../components/CharCounter.jsx";
import { ResultCard } from "../../components/ResultCard.jsx";
import { CopyButton } from "../../components/CopyButton.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";
import HowToUse from "../../components/HowToUse.jsx";

// Backend limits: transcript 10–10,000 chars, custom_guidelines max 2000 chars
// (contentMakerValidator.js). Platforms/languages come straight from
// contentMaker.config.js — no Facebook, since the backend doesn't support it.
const MIN_CHARS = 10;
const MAX_CHARS = 10000;
const MAX_GUIDELINES = 2000;

const PLATFORM_META = {
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  twitter: { icon: Twitter, label: "X / Twitter" },
  tiktok: { icon: Music2, label: "TikTok" },
  youtube: { icon: Youtube, label: "YouTube" },
  instagram: { icon: Instagram, label: "Instagram" },
};

export const SocialPage = () => {
  const { consumeDraft } = useWorkflow();
  
  // Initialize state from sessionStorage to keep values across tab switches
  const [transcript, setTranscript] = useState(() => {
    return sessionStorage.getItem("social_saved_transcript") || "";
  });
  
  const [platform, setPlatform] = useState(() => {
    return sessionStorage.getItem("social_saved_platform") || "linkedin";
  });
  
  const [targetLanguage, setTargetLanguage] = useState(() => {
    return sessionStorage.getItem("social_saved_lang") || "auto";
  });
  
  const [customGuidelines, setCustomGuidelines] = useState(() => {
    return sessionStorage.getItem("social_saved_guidelines") || "";
  });

  const { status, data, error, run } = useApi((args) => generateSocialContent(args));

  const [persistedData, setPersistedData] = useState(() => {
    const saved = sessionStorage.getItem("social_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("social_saved_status") || "idle";
  });

  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setTranscript(d.text);
      sessionStorage.setItem("social_saved_transcript", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && data) {
      setPersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("social_saved_data", JSON.stringify(data));
      sessionStorage.setItem("social_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("social_saved_status", "loading");
    }
  }, [status, data]);

  const handleTranscriptChange = (e) => {
    const val = e.target.value;
    setTranscript(val);
    sessionStorage.setItem("social_saved_transcript", val);
  };

  const handlePlatformChange = (p) => {
    setPlatform(p);
    sessionStorage.setItem("social_saved_platform", p);
  };

  const handleLangChange = (e) => {
    const val = e.target.value;
    setTargetLanguage(val);
    sessionStorage.setItem("social_saved_lang", val);
  };

  const handleGuidelinesChange = (e) => {
    const val = e.target.value;
    setCustomGuidelines(val);
    sessionStorage.setItem("social_saved_guidelines", val);
  };

  const canSubmit =
    transcript.trim().length >= MIN_CHARS &&
    transcript.length <= MAX_CHARS &&
    customGuidelines.length <= MAX_GUIDELINES &&
    persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run({ transcript, platform, targetLanguage, customGuidelines });
  };

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  const Icon = PLATFORM_META[platform]?.icon || Linkedin;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Social Media Content Maker</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Convert an article or transcript into platform-ready copy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {SOCIAL_PLATFORMS.map((p) => {
            const meta = PLATFORM_META[p];
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePlatformChange(p)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                  platform === p
                    ? "border-wire bg-wire/10 text-wire"
                    : "border-ink/15 text-ink-soft dark:border-charcoal-border dark:text-[#AEB4C0]"
                }`}
              >
                <meta.icon size={13} />
                {meta.label}
              </button>
            );
          })}
        </div>

        <textarea
          value={transcript}
          onChange={handleTranscriptChange}
          rows={8}
          placeholder="Paste the source transcript or article…"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
        />
        <CharCounter value={transcript} min={MIN_CHARS} max={MAX_CHARS} />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sm-lang" className="mb-1 block text-sm text-ink-soft dark:text-[#AEB4C0]">
              Output language
            </label>
            <select
              id="sm-lang"
              value={targetLanguage}
              onChange={handleLangChange}
              className="w-full rounded-md border border-ink/15 bg-white/60 px-2 py-2 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
            >
              {SOCIAL_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l === "auto" ? "Match source language" : l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sm-guidelines" className="mb-1 block text-sm text-ink-soft dark:text-[#AEB4C0]">
              Style guidance (optional)
            </label>
            <input
              id="sm-guidelines"
              value={customGuidelines}
              onChange={handleGuidelinesChange}
              placeholder="e.g. more casual tone"
              className="w-full rounded-md border border-ink/15 bg-white/60 px-2 py-2 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeStatus === "loading" ? "Drafting…" : `Generate ${PLATFORM_META[platform]?.label || "Content"} content`}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Writing platform copy…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && activeData && (
        <ResultCard
          eyebrow={`${activeData.language_used} · ${activeData.word_count} words · ${activeData.character_count} chars`}
          title={
            <span className="inline-flex items-center gap-1.5">
              <Icon size={15} /> {PLATFORM_META[platform]?.label}
            </span>
          }
          actions={
            <>
              <CopyButton text={activeData.generated_content} />
              <SaveButton module="social" title={PLATFORM_META[platform]?.label} input={transcript} output={activeData.generated_content} />
            </>
          }
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">
            {activeData.generated_content}
          </p>
          {activeData.tweets && (
            <div className="mt-4 border-t border-ink/10 pt-3 dark:border-charcoal-border">
              <p className="mb-2 text-xs font-medium text-ink-faint dark:text-[#6E7688]">
                Thread breakdown ({activeData.thread_count} tweets)
              </p>
              <div className="flex flex-col gap-1.5">
                {activeData.tweets.map((t) => (
                  <div key={t.tweet_number} className="flex items-center justify-between text-xs">
                    <span className="text-ink-soft dark:text-[#AEB4C0]">Tweet {t.tweet_number}</span>
                    <span
                      className={`font-mono ${t.character_count > 280 ? "text-wire" : "text-ink-faint dark:text-[#6E7688]"}`}
                    >
                      {t.character_count} / 280
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ResultCard>
      )}

      {activeStatus === "idle" && (
        <EmptyState icon={Share2} title="No content yet" description="Choose a platform and generate to see results." />
      )}
      <div className="mt-12">
        <HowToUse toolName="social" />
      </div>
      <div className="max-w-[1400px] mx-auto mt-24 mb-16 px-4 md:px-8">
        <div className="bg-gradient-to-br from-[#ea580c] to-[#dc2626] rounded-[24px] px-8 py-10 md:px-16 md:py-12 flex flex-col md:flex-row gap-8 md:gap-16 items-center shadow-xl">

          {/* Left Side: Bold Heading */}
          <div className="w-full md:w-4/12">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Completely free to use
            </h2>
          </div>

          {/* Right Side: Professional English Description */}
          <div className="w-full md:w-8/12">
            <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium">
              Experience the full power of Reporter Toolkit without any restrictions. All our AI-driven tools are <strong>100% free to use</strong> for your newsroom workflows. Generate unlimited summaries, accurate wire translations, and SEO-friendly headlines—no API limits, no daily caps.
            </p>
          </div>

        </div>
      </div> 
    </div>
  );
};