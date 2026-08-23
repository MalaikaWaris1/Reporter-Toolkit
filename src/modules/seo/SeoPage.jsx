// import { useEffect, useState } from "react";
// import { Tags } from "lucide-react";
// import { extractSeoData } from "../../api/seoApi.js";
// import { useApi } from "../../hooks/useApi.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
// import { CharCounter } from "../../components/CharCounter.jsx";
// import { ResultCard } from "../../components/ResultCard.jsx";
// import { CopyButton } from "../../components/CopyButton.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// // Backend limit: min 50 chars (seoValidator.js). No max enforced.
// const MIN_CHARS = 50;

// // Only the groups the backend actually returns: primaryKeywords,
// // secondaryKeywords, tags, metaTitle, metaDescription. No People/
// // Organizations/Locations groups — seoService.js's prompt never asks the
// // model to extract named entities, so that data doesn't exist server-side.
// const KeywordGroup = ({ label, items, fullText }) => {
//   if (!items || items.length === 0) return null;
//   return (
//     <div>
//       <div className="mb-2 flex items-center justify-between">
//         <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">{label}</p>
//         <CopyButton text={items.join(", ")} label="Copy all" />
//       </div>
//       <div className="flex flex-wrap gap-1.5">
//         {items.map((item, i) => (
//           <span
//             key={i}
//             className="rounded-full border border-ink/15 bg-white/60 px-2.5 py-1 text-xs text-ink-soft dark:border-charcoal-border dark:bg-charcoal-raised/60 dark:text-[#AEB4C0]"
//           >
//             {fullText ? item : `#${item.replace(/^#/, "").replace(/\s+/g, "")}`}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export const SeoPage = () => {
//   const { consumeDraft } = useWorkflow();
//   const [text, setText] = useState("");
//   const [lang, setLang] = useState("en");
//   const { status, data, error, run } = useApi((t, l) => extractSeoData(t, l));

//   useEffect(() => {
//     const d = consumeDraft();
//     if (d?.text) setText(d.text);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const canSubmit = text.trim().length >= MIN_CHARS && status !== "loading";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;
//     run(text, lang);
//   };

//   const seo = data?.seo;
//   const allTagsText = seo
//     ? [...(seo.primaryKeywords || []), ...(seo.secondaryKeywords || []), ...(seo.tags || [])].join(", ")
//     : "";

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">SEO Tags & Keyword Extractor</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Pulls a meta title, meta description, keywords, and tags from your article.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={8}
//           placeholder="Paste the article text…"
//           className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//         />
//         <CharCounter value={text} min={MIN_CHARS} />

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             <label htmlFor="seo-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
//               Language
//             </label>
//             <select
//               id="seo-lang"
//               value={lang}
//               onChange={(e) => setLang(e.target.value)}
//               className="rounded-md border border-ink/15 bg-white/60 px-2 py-1.5 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
//             >
//               <option value="en">English</option>
//               <option value="ur">Urdu</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             disabled={!canSubmit}
//             className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             {status === "loading" ? "Extracting…" : "Extract SEO data"}
//           </button>
//         </div>
//       </form>

//       {status === "loading" && <LoadingSpinner label="Pulling keywords and metadata…" />}
//       <ErrorMessage message={error} />

//       {status === "success" && seo && (
//         <ResultCard
//           eyebrow={data.language}
//           title="SEO metadata"
//           actions={
//             <>
//               <CopyButton text={allTagsText} label="Copy all tags" />
//               <SaveButton module="seo" title="SEO metadata" input={text} output={JSON.stringify(seo)} />
//             </>
//           }
//         >
//           <div className="flex flex-col gap-5">
//             <div>
//               <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">
//                 Meta title
//               </p>
//               <p className="mt-1 font-display text-base text-ink dark:text-[#E7E4DC]">{seo.metaTitle}</p>
//             </div>
//             <div>
//               <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">
//                 Meta description
//               </p>
//               <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-[#AEB4C0]">{seo.metaDescription}</p>
//             </div>
//             <KeywordGroup label="Primary keywords" items={seo.primaryKeywords} fullText />
//             <KeywordGroup label="Secondary keywords" items={seo.secondaryKeywords} fullText />
//             <KeywordGroup label="Tags / hashtags" items={seo.tags} />
//           </div>
//         </ResultCard>
//       )}

//       {status === "idle" && (
//         <EmptyState icon={Tags} title="No metadata yet" description="Extracted keywords and tags will appear here." />
//       )}
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { Tags } from "lucide-react";
import { extractSeoData } from "../../api/seoApi.js";
import { useApi } from "../../hooks/useApi.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import { CharCounter } from "../../components/CharCounter.jsx";
import { ResultCard } from "../../components/ResultCard.jsx";
import { CopyButton } from "../../components/CopyButton.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";

// Backend limit: min 50 chars (seoValidator.js). No max enforced.
const MIN_CHARS = 50;

const KeywordGroup = ({ label, items, fullText }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">{label}</p>
        <CopyButton text={items.join(", ")} label="Copy all" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span
            key={i}
            className="rounded-full border border-ink/15 bg-white/60 px-2.5 py-1 text-xs text-ink-soft dark:border-charcoal-border dark:bg-charcoal-raised/60 dark:text-[#AEB4C0]"
          >
            {fullText ? item : `#${item.replace(/^#/, "").replace(/\s+/g, "")}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SeoPage = () => {
  const { consumeDraft } = useWorkflow();
  
  // State initialization from sessionStorage to persist input text, language, and results
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("seo_saved_text") || "";
  });
  
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem("seo_saved_lang") || "en";
  });

  const { status, data, error, run } = useApi((t, l) => extractSeoData(t, l));

  // Also store and restore status and data via sessionStorage so output remains visible
  const [persistedData, setpersistedData] = useState(() => {
    const saved = sessionStorage.getItem("seo_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("seo_saved_status") || "idle";
  });

  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setText(d.text);
      sessionStorage.setItem("seo_saved_text", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever api run succeeds, save data and status to sessionStorage
  useEffect(() => {
    if (status === "success" && data) {
      setpersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("seo_saved_data", JSON.stringify(data));
      sessionStorage.setItem("seo_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("seo_saved_status", "loading");
    }
  }, [status, data]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    sessionStorage.setItem("seo_saved_text", val);
  };

  const handleLangChange = (e) => {
    const val = e.target.value;
    setLang(val);
    sessionStorage.setItem("seo_saved_lang", val);
  };

  const canSubmit = text.trim().length >= MIN_CHARS && persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run(text, lang);
  };

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  const seo = activeData?.seo;
  const allTagsText = seo
    ? [...(seo.primaryKeywords || []), ...(seo.secondaryKeywords || []), ...(seo.tags || [])].join(", ")
    : "";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">SEO Tags & Keyword Extractor</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Pulls a meta title, meta description, keywords, and tags from your article.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Paste the article text…"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
        />
        <CharCounter value={text} min={MIN_CHARS} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="seo-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
              Language
            </label>
            <select
              id="seo-lang"
              value={lang}
              onChange={handleLangChange}
              className="rounded-md border border-ink/15 bg-white/60 px-2 py-1.5 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
            >
              <option value="en">English</option>
              <option value="ur">Urdu</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeStatus === "loading" ? "Extracting…" : "Extract SEO data"}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Pulling keywords and metadata…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && seo && (
        <ResultCard
          eyebrow={activeData.language}
          title="SEO metadata"
          actions={
            <>
              <CopyButton text={allTagsText} label="Copy all tags" />
              <SaveButton module="seo" title="SEO metadata" input={text} output={JSON.stringify(seo)} />
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">
                Meta title
              </p>
              <p className="mt-1 font-display text-base text-ink dark:text-[#E7E4DC]">{seo.metaTitle}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint dark:text-[#6E7688]">
                Meta description
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft dark:text-[#AEB4C0]">{seo.metaDescription}</p>
            </div>
            <KeywordGroup label="Primary keywords" items={seo.primaryKeywords} fullText />
            <KeywordGroup label="Secondary keywords" items={seo.secondaryKeywords} fullText />
            <KeywordGroup label="Tags / hashtags" items={seo.tags} />
          </div>
        </ResultCard>
      )}

      {activeStatus === "idle" && (
        <EmptyState icon={Tags} title="No metadata yet" description="Extracted keywords and tags will appear here." />
      )}
    </div>
  );
};