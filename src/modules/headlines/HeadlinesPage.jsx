// import { useEffect, useState } from "react";
// import { Type, RefreshCw } from "lucide-react";
// import { generateHeadlines } from "../../api/headlineApi.js";
// import { useApi } from "../../hooks/useApi.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
// import { CharCounter } from "../../components/CharCounter.jsx";
// import { CopyButton } from "../../components/CopyButton.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// const MIN_CHARS = 30;

// export const HeadlinesPage = () => {
//   const { consumeDraft } = useWorkflow();
  
//   // Initialize state from sessionStorage if available to persist across tab/tool switches
//   const [text, setText] = useState(() => {
//     return sessionStorage.getItem("headlines_saved_text") || "";
//   });
  
//   const [lang, setLang] = useState(() => {
//     return sessionStorage.getItem("headlines_saved_lang") || "en";
//   });

//   const { status, data, error, run } = useApi((t, l) => generateHeadlines(t, l));

//   // Handle workflow draft consumption or initial mount
//   useEffect(() => {
//     const d = consumeDraft();
//     if (d?.text) {
//       setText(d.text);
//       sessionStorage.setItem("headlines_saved_text", d.text);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Save text to sessionStorage whenever it changes
//   const handleTextChange = (e) => {
//     const val = e.target.value;
//     setText(val);
//     sessionStorage.setItem("headlines_saved_text", val);
//   };

//   const handleLangChange = (e) => {
//     const val = e.target.value;
//     setLang(val);
//     sessionStorage.setItem("headlines_saved_lang", val);
//   };

//   const canSubmit = text.trim().length >= MIN_CHARS && status !== "loading";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;
//     run(text, lang);
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">Smart Headline Generator</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Generates 5 headline options in a range of styles from your article.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <textarea
//           value={text}
//           onChange={handleTextChange}
//           rows={8}
//           placeholder="Paste the article text…"
//           className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//         />
//         <CharCounter value={text} min={MIN_CHARS} />

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             <label htmlFor="hl-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
//               Language
//             </label>
//             <select
//               id="hl-lang"
//               value={lang}
//               onChange={handleLangChange}
//               className="rounded-md border border-ink/15 bg-white/60 px-2 py-1.5 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
//             >
//               <option value="en">English</option>
//               <option value="ur">Urdu</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             disabled={!canSubmit}
//             className="inline-flex items-center gap-1.5 rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             {status === "success" && <RefreshCw size={14} />}
//             {status === "loading" ? "Generating…" : status === "success" ? "Regenerate" : "Generate headlines"}
//           </button>
//         </div>
//       </form>

//       {status === "loading" && <LoadingSpinner label="Drafting headlines…" />}
//       <ErrorMessage message={error} />

//       {status === "success" && data && (
//         <div className="flex flex-col gap-3">
//           {data.headlines.map((headline, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white/60 px-4 py-3 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//             >
//               <p className="font-display text-base text-ink dark:text-[#E7E4DC]">{headline}</p>
//               <div className="flex shrink-0 items-center gap-2">
//                 <CopyButton text={headline} />
//                 <SaveButton module="headlines" title="Headline" input={text} output={headline} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {status === "idle" && (
//         <EmptyState icon={Type} title="No headlines yet" description="Five options will appear here once generated." />
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Type, RefreshCw } from "lucide-react";
import { generateHeadlines } from "../../api/headlineApi.js";
import { useApi } from "../../hooks/useApi.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import { CharCounter } from "../../components/CharCounter.jsx";
import { CopyButton } from "../../components/CopyButton.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";

const MIN_CHARS = 30;

export const HeadlinesPage = () => {
  const { consumeDraft } = useWorkflow();
  
  // Initialize state from sessionStorage to persist across tab/tool switches
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("headlines_saved_text") || "";
  });
  
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem("headlines_saved_lang") || "en";
  });

  const { status, data, error, run } = useApi((t, l) => generateHeadlines(t, l));

  // Persist generated headlines data and status to sessionStorage
  const [persistedData, setPersistedData] = useState(() => {
    const saved = sessionStorage.getItem("headlines_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("headlines_saved_status") || "idle";
  });

  // Handle workflow draft consumption or initial mount
  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setText(d.text);
      sessionStorage.setItem("headlines_saved_text", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && data) {
      setPersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("headlines_saved_data", JSON.stringify(data));
      sessionStorage.setItem("headlines_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("headlines_saved_status", "loading");
    }
  }, [status, data]);

  // Save text to sessionStorage whenever it changes
  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    sessionStorage.setItem("headlines_saved_text", val);
  };

  const handleLangChange = (e) => {
    const val = e.target.value;
    setLang(val);
    sessionStorage.setItem("headlines_saved_lang", val);
  };

  const canSubmit = text.trim().length >= MIN_CHARS && persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run(text, lang);
  };

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Smart Headline Generator</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Generates 5 headline options in a range of styles from your article.
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
            <label htmlFor="hl-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
              Language
            </label>
            <select
              id="hl-lang"
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
            className="inline-flex items-center gap-1.5 rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeStatus === "success" && <RefreshCw size={14} />}
            {activeStatus === "loading" ? "Generating…" : activeStatus === "success" ? "Regenerate" : "Generate headlines"}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Drafting headlines…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && activeData && (
        <div className="flex flex-col gap-3">
          {activeData.headlines.map((headline, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 bg-white/60 px-4 py-3 dark:border-charcoal-border dark:bg-charcoal-raised/60"
            >
              <p className="font-display text-base text-ink dark:text-[#E7E4DC]">{headline}</p>
              <div className="flex shrink-0 items-center gap-2">
                <CopyButton text={headline} />
                <SaveButton module="headlines" title="Headline" input={text} output={headline} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeStatus === "idle" && (
        <EmptyState icon={Type} title="No headlines yet" description="Five options will appear here once generated." />
      )}
    </div>
  );
};