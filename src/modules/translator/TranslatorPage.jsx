// import { useEffect, useState } from "react";
// import { Languages, ArrowRight, ArrowLeftRight } from "lucide-react";
// import { translateText } from "../../api/translatorApi.js";
// import { useApi } from "../../hooks/useApi.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
// import { CharCounter } from "../../components/CharCounter.jsx";
// import { ResultCard } from "../../components/ResultCard.jsx";
// import { CopyButton } from "../../components/CopyButton.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// // Backend limit: max 3000 chars (validator.js). targetLang required, 'en'|'ur'.
// const MAX_CHARS = 3000;

// export const TranslatorPage = () => {
//   const { consumeDraft, sendTo } = useWorkflow();
//   const [text, setText] = useState("");
//   const [targetLang, setTargetLang] = useState("ur");
//   const { status, data, error, run } = useApi((t, l) => translateText(t, l));

//   useEffect(() => {
//     const d = consumeDraft();
//     if (d?.text) setText(d.text);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const canSubmit = text.trim().length > 0 && text.length <= MAX_CHARS && status !== "loading";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;
//     run(text, targetLang);
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">Multilingual Wire Translator</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Turn international copy into publication-ready Urdu or English.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <div className="flex items-center gap-3">
//           <span className="text-sm text-ink-soft dark:text-[#AEB4C0]">Translate to</span>
//           <div className="inline-flex rounded-md border border-ink/15 p-0.5 dark:border-charcoal-border">
//             {["en", "ur"].map((l) => (
//               <button
//                 key={l}
//                 type="button"
//                 onClick={() => setTargetLang(l)}
//                 className={`rounded px-3 py-1.5 text-xs font-medium transition ${
//                   targetLang === l
//                     ? "bg-wire text-white"
//                     : "text-ink-soft dark:text-[#AEB4C0]"
//                 }`}
//               >
//                 {l === "en" ? "English" : "Urdu"}
//               </button>
//             ))}
//           </div>
//           <ArrowLeftRight size={14} className="text-ink-faint" />
//         </div>

//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={8}
//           placeholder="Paste the article to translate…"
//           className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
//         />
//         <CharCounter value={text} max={MAX_CHARS} />

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={!canSubmit}
//             className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             {status === "loading" ? "Translating…" : "Translate"}
//           </button>
//         </div>
//       </form>

//       {status === "loading" && <LoadingSpinner label="Translating article…" />}
//       <ErrorMessage message={error} />

//       {status === "success" && data && (
//         <ResultCard
//           eyebrow={`Target: ${data.targetLang === "ur" ? "Urdu" : "English"}`}
//           title="Translation"
//           actions={
//             <>
//               <CopyButton text={data.translatedText} />
//               <SaveButton module="translator" title="Translation" input={text} output={data.translatedText} />
//             </>
//           }
//         >
//           <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">
//             {data.translatedText}
//           </p>
//           <div className="mt-4 flex flex-wrap gap-4">
//             <button
//               onClick={() => sendTo("/headlines", data.translatedText, "translator")}
//               className="inline-flex items-center gap-1.5 text-sm text-press hover:underline"
//             >
//               Generate headlines <ArrowRight size={14} />
//             </button>
//             <button
//               onClick={() => sendTo("/social", data.translatedText, "translator")}
//               className="inline-flex items-center gap-1.5 text-sm text-press hover:underline"
//             >
//               Create social posts <ArrowRight size={14} />
//             </button>
//           </div>
//         </ResultCard>
//       )}

//       {status === "idle" && (
//         <EmptyState icon={Languages} title="No translation yet" description="Your translated copy will appear here." />
//       )}
//     </div>
//   );
// };
import { useEffect, useState } from "react";
import { Languages, ArrowRight, ArrowLeftRight } from "lucide-react";
import { translateText } from "../../api/translatorApi.js";
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

// Backend limit: max 3000 chars (validator.js). targetLang required, 'en'|'ur'.
const MAX_CHARS = 3000;

export const TranslatorPage = () => {
  const { consumeDraft, sendTo } = useWorkflow();
  
  // Initialize state from sessionStorage to keep values across tab switches
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("translator_saved_text") || "";
  });
  
  const [targetLang, setTargetLang] = useState(() => {
    return sessionStorage.getItem("translator_saved_lang") || "ur";
  });

  const { status, data, error, run } = useApi((t, l) => translateText(t, l));

  const [persistedData, setPersistedData] = useState(() => {
    const saved = sessionStorage.getItem("translator_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("translator_saved_status") || "idle";
  });

  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setText(d.text);
      sessionStorage.setItem("translator_saved_text", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && data) {
      setPersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("translator_saved_data", JSON.stringify(data));
      sessionStorage.setItem("translator_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("translator_saved_status", "loading");
    }
  }, [status, data]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    sessionStorage.setItem("translator_saved_text", val);
  };

  const handleLangChange = (l) => {
    setTargetLang(l);
    sessionStorage.setItem("translator_saved_lang", l);
  };

  const canSubmit = text.trim().length > 0 && text.length <= MAX_CHARS && persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run(text, targetLang);
  };

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Multilingual Wire Translator</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Turn international copy into publication-ready Urdu or English.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-soft dark:text-[#AEB4C0]">Translate to</span>
          <div className="inline-flex rounded-md border border-ink/15 p-0.5 dark:border-charcoal-border">
            {["en", "ur"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleLangChange(l)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  targetLang === l
                    ? "bg-wire text-white"
                    : "text-ink-soft dark:text-[#AEB4C0]"
                }`}
              >
                {l === "en" ? "English" : "Urdu"}
              </button>
            ))}
          </div>
          <ArrowLeftRight size={14} className="text-ink-faint" />
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Paste the article to translate…"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60"
        />
        <CharCounter value={text} max={MAX_CHARS} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeStatus === "loading" ? "Translating…" : "Translate"}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Translating article…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && activeData && (
        <ResultCard
          eyebrow={`Target: ${activeData.targetLang === "ur" ? "Urdu" : "English"}`}
          title="Translation"
          actions={
            <>
              <CopyButton text={activeData.translatedText} />
              <SaveButton module="translator" title="Translation" input={text} output={activeData.translatedText} />
            </>
          }
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">
            {activeData.translatedText}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={() => sendTo("/headlines", activeData.translatedText, "translator")}
              className="inline-flex items-center gap-1.5 text-sm text-press hover:underline"
            >
              Generate headlines <ArrowRight size={14} />
            </button>
            <button
              onClick={() => sendTo("/social", activeData.translatedText, "translator")}
              className="inline-flex items-center gap-1.5 text-sm text-press hover:underline"
            >
              Create social posts <ArrowRight size={14} />
            </button>
          </div>
        </ResultCard>
      )}

      {activeStatus === "idle" && (
        <EmptyState icon={Languages} title="No translation yet" description="Your translated copy will appear here." />
      )}
      <div className="mt-12">
        <HowToUse toolName="translator" />
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