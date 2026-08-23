// import { useEffect, useState } from "react";
// import { FileText, ArrowRight } from "lucide-react";
// import { summarizeText } from "../../api/summarizerApi.js";
// import { useApi } from "../../hooks/useApi.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
// import { CharCounter } from "../../components/CharCounter.jsx";
// import { ResultCard } from "../../components/ResultCard.jsx";
// import { CopyButton } from "../../components/CopyButton.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// // Backend limit: min 50 chars (summarizerValidator.js). No max is enforced
// // server-side, so none is imposed here either.
// const MIN_CHARS = 50;

// export const SummarizerPage = () => {
//   const { draft, consumeDraft } = useWorkflow();
//   const [text, setText] = useState("");
//   const [lang, setLang] = useState("en");
//   const { status, data, error, run } = useApi((t, l) => summarizeText(t, l));

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

//   const { sendTo } = useWorkflow();

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">Summarization Engine</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Paste a press release, court document, or transcript to get a clean summary.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={10}
//           placeholder="Paste the source text here…"
//           className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//         />
//         <CharCounter value={text} min={MIN_CHARS} />

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             <label htmlFor="lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
//               Language
//             </label>
//             <select
//               id="lang"
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
//             {status === "loading" ? "Summarizing…" : "Generate summary"}
//           </button>
//         </div>
//       </form>

//       {status === "loading" && <LoadingSpinner label="Generating summary…" />}
//       <ErrorMessage message={error} />

//       {status === "success" && data && (
//         <ResultCard
//           eyebrow={`${data.language} · ${data.summaryLength} chars`}
//           title="Summary"
//           actions={
//             <>
//               <CopyButton text={data.summary} />
//               <SaveButton module="summarizer" title="Summary" input={text} output={data.summary} />
//             </>
//           }
//         >
//           <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">
//             {data.summary}
//           </p>
//           <button
//             onClick={() => sendTo("/translator", data.summary, "summarizer")}
//             className="mt-4 inline-flex items-center gap-1.5 text-sm text-press hover:underline"
//           >
//             Translate this <ArrowRight size={14} />
//           </button>
//         </ResultCard>
//       )}

//       {status === "idle" && (
//         <EmptyState
//           icon={FileText}
//           title="No summary yet"
//           description="Your generated summary will appear here."
//         />
//       )}
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { summarizeText } from "../../api/summarizerApi.js";
import { useApi } from "../../hooks/useApi.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import { CharCounter } from "../../components/CharCounter.jsx";
import { ResultCard } from "../../components/ResultCard.jsx";
import { CopyButton } from "../../components/CopyButton.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";

// Backend limit: min 50 chars (summarizerValidator.js). No max is enforced
// server-side, so none is imposed here either.
const MIN_CHARS = 50;

export const SummarizerPage = () => {
  const { draft, consumeDraft } = useWorkflow();
  
  // Initialize state from sessionStorage to persist input text and language
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("summarizer_saved_text") || "";
  });
  
  const [lang, setLang] = useState(() => {
    return sessionStorage.getItem("summarizer_saved_lang") || "en";
  });

  const { status, data, error, run } = useApi((t, l) => summarizeText(t, l));

  // Persist status and data so summary output remains visible across tab changes
  const [persistedData, setPersistedData] = useState(() => {
    const saved = sessionStorage.getItem("summarizer_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("summarizer_saved_status") || "idle";
  });

  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setText(d.text);
      sessionStorage.setItem("summarizer_saved_text", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && data) {
      setPersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("summarizer_saved_data", JSON.stringify(data));
      sessionStorage.setItem("summarizer_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("summarizer_saved_status", "loading");
    }
  }, [status, data]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    sessionStorage.setItem("summarizer_saved_text", val);
  };

  const handleLangChange = (e) => {
    const val = e.target.value;
    setLang(val);
    sessionStorage.setItem("summarizer_saved_lang", val);
  };

  const canSubmit = text.trim().length >= MIN_CHARS && persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run(text, lang);
  };

  const { sendTo } = useWorkflow();

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Summarization Engine</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Paste a press release, court document, or transcript to get a clean summary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={10}
          placeholder="Paste the source text here…"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
        />
        <CharCounter value={text} min={MIN_CHARS} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
              Language
            </label>
            <select
              id="lang"
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
            {activeStatus === "loading" ? "Summarizing…" : "Generate summary"}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Generating summary…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && activeData && (
        <ResultCard
          eyebrow={`${activeData.language} · ${activeData.summaryLength} chars`}
          title="Summary"
          actions={
            <>
              <CopyButton text={activeData.summary} />
              <SaveButton module="summarizer" title="Summary" input={text} output={activeData.summary} />
            </>
          }
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">
            {activeData.summary}
          </p>
          <button
            onClick={() => sendTo("/translator", activeData.summary, "summarizer")}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-press hover:underline"
          >
            Translate this <ArrowRight size={14} />
          </button>
        </ResultCard>
      )}

      {activeStatus === "idle" && (
        <EmptyState
          icon={FileText}
          title="No summary yet"
          description="Your generated summary will appear here."
        />
      )}
    </div>
  );
};