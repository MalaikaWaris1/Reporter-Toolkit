// import { useEffect, useState } from "react";
// import { AudioLines } from "lucide-react";
// import { generateSpeech } from "../../api/ttsApi.js";
// import { useApi } from "../../hooks/useApi.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
// import { ResultCard } from "../../components/ResultCard.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { AudioPlayer } from "../../components/AudioPlayer.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// export const TTSPage = () => {
//   const { consumeDraft } = useWorkflow();
//   const [text, setText] = useState("");
//   const [targetLang, setTargetLang] = useState("ur"); // Default Urdu
//   const [voiceStyle, setVoiceStyle] = useState("normal_ai"); // Default Normal AI

//   const { status, data, error, run } = useApi(({ text, targetLang, voiceStyle }) => 
//     generateSpeech(text, targetLang, voiceStyle)
//   );

//   useEffect(() => {
//     const d = consumeDraft();
//     if (d?.text) setText(d.text);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const canSubmit = text.trim().length > 0 && status !== "loading";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;
//     run({ text, targetLang, voiceStyle });
//   };

//   const getAudioSource = () => {
//     if (!data) return null;
//     if (typeof data === "string") return data;
//     return data.audioUrl || (data.audio_base64 ? `data:audio/mp3;base64,${data.audio_base64}` : null);
//   };

//   const audioSource = getAudioSource();

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">Neural TTS Studio</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Turn your script into newscast, human, or AI audio. Choose your language and voice style below.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={8}
//           placeholder="Write or paste the script to voice…"
//           className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60 dark:text-white"
//         />

//         <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center gap-4">
            
//             {/* Language Selector */}
//             <div className="flex items-center gap-2">
//               <label htmlFor="language-select" className="text-sm font-medium text-ink-faint dark:text-[#8A93A3]">
//                 Language:
//               </label>
//               <select
//                 id="language-select"
//                 value={targetLang}
//                 onChange={(e) => setTargetLang(e.target.value)}
//                 className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised dark:text-white cursor-pointer"
//               >
//                 <option value="ur">Urdu (اردو)</option>
//                 <option value="en">English</option>
//                 <option value="hi">Hindi (हिंदी)</option>
//               </select>
//             </div>

//             {/* Voice Style Selector (Backend Supported Values) */}
//             <div className="flex items-center gap-2">
//               <label htmlFor="voice-style-select" className="text-sm font-medium text-ink-faint dark:text-[#8A93A3]">
//                 Voice Style:
//               </label>
//               <select
//                 id="voice-style-select"
//                 value={voiceStyle}
//                 onChange={(e) => setVoiceStyle(e.target.value)}
//                 className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised dark:text-white cursor-pointer"
//               >
//                 <option value="normal_ai">🤖 Normal AI (نارمل اے آئی)</option>
//                 <option value="real_human">🎙️ Real Human (حقیقی انسانی آواز)</option>
//                 <option value="news_anchor">📰 News Anchor (نیوز اینکر)</option>
//               </select>
//             </div>

//           </div>

//           <button
//             type="submit"
//             disabled={!canSubmit}
//             className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             {status === "loading" ? "Generating audio…" : "Generate voice"}
//           </button>
//         </div>
//       </form>

//       {status === "loading" && <LoadingSpinner label="Synthesizing audio…" />}
//       <ErrorMessage message={error} />

//       {status === "success" && data && (
//         <ResultCard
//           eyebrow={`Language: ${data.detectedLang || (targetLang === 'ur' ? 'Urdu' : 'English')}`}
//           title="Generated audio"
//           actions={<SaveButton module="tts" title="Voice clip" input={text} output={audioSource} />}
//         >
//           {audioSource ? (
//             <AudioPlayer src={audioSource} />
//           ) : (
//             <div className="p-4 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 rounded-md">
//               Audio data received, but source format could not be parsed. Check browser console for details.
//             </div>
//           )}
//         </ResultCard>
//       )}

//       {status === "idle" && (
//         <EmptyState icon={AudioLines} title="No audio yet" description="Your generated voiceover will appear here." />
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { AudioLines } from "lucide-react";
import { generateSpeech } from "../../api/ttsApi.js";
import { useApi } from "../../hooks/useApi.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { LoadingSpinner } from "../../components/LoadingSpinner.jsx";
import { ResultCard } from "../../components/ResultCard.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { AudioPlayer } from "../../components/AudioPlayer.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";

export const TTSPage = () => {
  const { consumeDraft } = useWorkflow();
  
  // Initialize state from sessionStorage to keep values across tab switches
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("tts_saved_text") || "";
  });
  
  const [targetLang, setTargetLang] = useState(() => {
    return sessionStorage.getItem("tts_saved_lang") || "ur";
  });
  
  const [voiceStyle, setVoiceStyle] = useState(() => {
    return sessionStorage.getItem("tts_saved_style") || "normal_ai";
  });

  const { status, data, error, run } = useApi(({ text, targetLang, voiceStyle }) => 
    generateSpeech(text, targetLang, voiceStyle)
  );

  const [persistedData, setPersistedData] = useState(() => {
    const saved = sessionStorage.getItem("tts_saved_data");
    return saved ? JSON.parse(saved) : null;
  });

  const [persistedStatus, setPersistedStatus] = useState(() => {
    return sessionStorage.getItem("tts_saved_status") || "idle";
  });

  useEffect(() => {
    const d = consumeDraft();
    if (d?.text) {
      setText(d.text);
      sessionStorage.setItem("tts_saved_text", d.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success" && data) {
      setPersistedData(data);
      setPersistedStatus("success");
      sessionStorage.setItem("tts_saved_data", JSON.stringify(data));
      sessionStorage.setItem("tts_saved_status", "success");
    } else if (status === "loading") {
      setPersistedStatus("loading");
      sessionStorage.setItem("tts_saved_status", "loading");
    }
  }, [status, data]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    sessionStorage.setItem("tts_saved_text", val);
  };

  const handleLangChange = (e) => {
    const val = e.target.value;
    setTargetLang(val);
    sessionStorage.setItem("tts_saved_lang", val);
  };

  const handleStyleChange = (e) => {
    const val = e.target.value;
    setVoiceStyle(val);
    sessionStorage.setItem("tts_saved_style", val);
  };

  const canSubmit = text.trim().length > 0 && persistedStatus !== "loading";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    run({ text, targetLang, voiceStyle });
  };

  const activeStatus = status === "loading" ? "loading" : persistedStatus;
  const activeData = data || persistedData;

  const getAudioSource = () => {
    if (!activeData) return null;
    if (typeof activeData === "string") return activeData;
    return activeData.audioUrl || (activeData.audio_base64 ? `data:audio/mp3;base64,${activeData.audio_base64}` : null);
  };

  const audioSource = getAudioSource();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Neural TTS Studio</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Turn your script into newscast, human, or AI audio. Choose your language and voice style below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Write or paste the script to voice…"
          className="w-full resize-y rounded-lg border border-ink/15 bg-white/60 p-4 text-sm leading-relaxed outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised/60 dark:text-white"
        />

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="language-select" className="text-sm font-medium text-ink-faint dark:text-[#8A93A3]">
                Language:
              </label>
              <select
                id="language-select"
                value={targetLang}
                onChange={handleLangChange}
                className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised dark:text-white cursor-pointer"
              >
                <option value="ur">Urdu (اردو)</option>
                <option value="en">English</option>
                <option value="hi">Hindi (हिंदी)</option>
              </select>
            </div>

            {/* Voice Style Selector (Backend Supported Values) */}
            <div className="flex items-center gap-2">
              <label htmlFor="voice-style-select" className="text-sm font-medium text-ink-faint dark:text-[#8A93A3]">
                Voice Style:
              </label>
              <select
                id="voice-style-select"
                value={voiceStyle}
                onChange={handleStyleChange}
                className="rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-wire/50 dark:border-charcoal-border dark:bg-charcoal-raised dark:text-white cursor-pointer"
              >
                <option value="normal_ai">🤖 Normal AI (نارمل اے آئی)</option>
                <option value="real_human">🎙️ Real Human (حقیقی انسانی آواز)</option>
                <option value="news_anchor">📰 News Anchor (نیوز اینکر)</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeStatus === "loading" ? "Generating audio…" : "Generate voice"}
          </button>
        </div>
      </form>

      {activeStatus === "loading" && <LoadingSpinner label="Synthesizing audio…" />}
      <ErrorMessage message={error} />

      {activeStatus === "success" && activeData && (
        <ResultCard
          eyebrow={`Language: ${activeData.detectedLang || (targetLang === 'ur' ? 'Urdu' : 'English')}`}
          title="Generated audio"
          actions={<SaveButton module="tts" title="Voice clip" input={text} output={audioSource} />}
        >
          {audioSource ? (
            <AudioPlayer src={audioSource} />
          ) : (
            <div className="p-4 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/30 rounded-md">
              Audio data received, but source format could not be parsed. Check browser console for details.
            </div>
          )}
        </ResultCard>
      )}

      {activeStatus === "idle" && (
        <EmptyState icon={AudioLines} title="No audio yet" description="Your generated voiceover will appear here." />
      )}
    </div>
  );
};