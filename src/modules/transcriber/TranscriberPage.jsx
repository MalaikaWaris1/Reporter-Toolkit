// import { useState } from "react";
// import { Mic2, ArrowRight } from "lucide-react";
// import { transcribeAudio } from "../../api/transcriberApi.js";
// import { extractErrorMessage } from "../../api/client.js";
// import { useWorkflow } from "../../context/WorkflowContext.jsx";
// import { ErrorMessage } from "../../components/ErrorMessage.jsx";
// import { ResultCard } from "../../components/ResultCard.jsx";
// import { CopyButton } from "../../components/CopyButton.jsx";
// import { SaveButton } from "../../components/SaveButton.jsx";
// import { FileUploader } from "../../components/FileUploader.jsx";
// import { EmptyState } from "../../components/EmptyState.jsx";

// // idle -> uploading -> processing -> completed / error
// export const TranscriberPage = () => {
//   const { sendTo } = useWorkflow();
//   const [file, setFile] = useState(null);
//   const [language, setLanguage] = useState("ur");
//   const [state, setState] = useState("idle");
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState("");
//   const [text, setText] = useState("");

//   const handleTranscribe = async () => {
//     if (!file) return;
//     setState("uploading");
//     setError("");
//     setProgress(0);
//     try {
//       const result = await transcribeAudio(file, language, (pct) => {
//         setProgress(pct);
//         if (pct >= 100) setState("processing");
//       });
//       setText(result.text);
//       setState("completed");
//     } catch (err) {
//       setError(extractErrorMessage(err));
//       setState("error");
//     }
//   };

//   const isBusy = state === "uploading" || state === "processing";

//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h2 className="font-display text-2xl">Interview Transcriber</h2>
//         <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
//           Upload a recording — interview, press conference, or speech.
//         </p>
//       </div>

//       <FileUploader
//         onFileSelect={(f) => {
//           setFile(f);
//           setState("idle");
//           setText("");
//         }}
//         disabled={isBusy}
//       />

//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div className="flex items-center gap-2">
//           <label htmlFor="stt-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
//             Spoken language
//           </label>
//           <select
//             id="stt-lang"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             disabled={isBusy}
//             className="rounded-md border border-ink/15 bg-white/60 px-2 py-1.5 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
//           >
//             <option value="ur">Urdu</option>
//             <option value="en">English</option>
//           </select>
//         </div>
//         <button
//           onClick={handleTranscribe}
//           disabled={!file || isBusy}
//           className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
//         >
//           {state === "uploading" ? `Uploading… ${progress}%` : state === "processing" ? "Transcribing…" : "Transcribe"}
//         </button>
//       </div>

//       {isBusy && (
//         <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-charcoal-border">
//           <div
//             className="h-full bg-wire transition-all"
//             style={{ width: state === "processing" ? "100%" : `${progress}%` }}
//           />
//         </div>
//       )}

//       <ErrorMessage message={error} />

//       {state === "completed" && (
//         <ResultCard
//           eyebrow="Transcript"
//           actions={
//             <>
//               <CopyButton text={text} />
//               <SaveButton module="transcriber" title="Transcript" input={file?.name} output={text} />
//             </>
//           }
//         >
//           <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">{text}</p>
//           <button
//             onClick={() => sendTo("/summarizer", text, "transcriber")}
//             className="mt-4 inline-flex items-center gap-1.5 text-sm text-press hover:underline"
//           >
//             Send to Summarizer <ArrowRight size={14} />
//           </button>
//         </ResultCard>
//       )}

//       {state === "idle" && !file && (
//         <EmptyState icon={Mic2} title="No recording yet" description="Drop an audio file to begin." />
//       )}
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import { Mic2, ArrowRight } from "lucide-react";
import { transcribeAudio } from "../../api/transcriberApi.js";
import { extractErrorMessage } from "../../api/client.js";
import { useWorkflow } from "../../context/WorkflowContext.jsx";
import { ErrorMessage } from "../../components/ErrorMessage.jsx";
import { ResultCard } from "../../components/ResultCard.jsx";
import { CopyButton } from "../../components/CopyButton.jsx";
import { SaveButton } from "../../components/SaveButton.jsx";
import { FileUploader } from "../../components/FileUploader.jsx";
import { EmptyState } from "../../components/EmptyState.jsx";

// idle -> uploading -> processing -> completed / error
export const TranscriberPage = () => {
  const { sendTo } = useWorkflow();
  
  const [file, setFile] = useState(null);
  
  const [language, setLanguage] = useState(() => {
    return sessionStorage.getItem("transcriber_saved_lang") || "ur";
  });
  
  const [state, setState] = useState(() => {
    return sessionStorage.getItem("transcriber_saved_state") || "idle";
  });
  
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  
  const [text, setText] = useState(() => {
    return sessionStorage.getItem("transcriber_saved_text") || "";
  });

  const [fileName, setFileName] = useState(() => {
    return sessionStorage.getItem("transcriber_saved_filename") || "";
  });

  // Save states to sessionStorage whenever they update
  useEffect(() => {
    sessionStorage.setItem("transcriber_saved_lang", language);
  }, [language]);

  useEffect(() => {
    sessionStorage.setItem("transcriber_saved_state", state);
  }, [state]);

  useEffect(() => {
    sessionStorage.setItem("transcriber_saved_text", text);
  }, [text]);

  useEffect(() => {
    if (fileName) {
      sessionStorage.setItem("transcriber_saved_filename", fileName);
    }
  }, [fileName]);

  const handleTranscribe = async () => {
    if (!file && !text) return;
    setState("uploading");
    setError("");
    setProgress(0);
    try {
      const result = await transcribeAudio(file, language, (pct) => {
        setProgress(pct);
        if (pct >= 100) setState("processing");
      });
      setText(result.text);
      setState("completed");
    } catch (err) {
      setError(extractErrorMessage(err));
      setState("error");
    }
  };

  const isBusy = state === "uploading" || state === "processing";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl">Interview Transcriber</h2>
        <p className="text-sm text-ink-faint dark:text-[#8A93A3]">
          Upload a recording — interview, press conference, or speech.
        </p>
      </div>

      <FileUploader
        onFileSelect={(f) => {
          setFile(f);
          setFileName(f?.name || "");
          sessionStorage.setItem("transcriber_saved_filename", f?.name || "");
          setState("idle");
          setText("");
          sessionStorage.removeItem("transcriber_saved_text");
          sessionStorage.setItem("transcriber_saved_state", "idle");
        }}
        disabled={isBusy}
      />

      {fileName && state === "idle" && !text && (
        <p className="text-xs text-ink-faint dark:text-[#8A93A3]">
          Selected file: <span className="font-medium text-ink dark:text-white">{fileName}</span>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="stt-lang" className="text-sm text-ink-soft dark:text-[#AEB4C0]">
            Spoken language
          </label>
          <select
            id="stt-lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isBusy}
            className="rounded-md border border-ink/15 bg-white/60 px-2 py-1.5 text-sm dark:border-charcoal-border dark:bg-charcoal-raised/60"
          >
            <option value="ur">Urdu</option>
            <option value="en">English</option>
          </select>
        </div>
        <button
          onClick={handleTranscribe}
          disabled={(!file && !text) || isBusy}
          className="rounded-md bg-wire px-5 py-2.5 text-sm font-medium text-white transition hover:bg-wire-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === "uploading" ? `Uploading… ${progress}%` : state === "processing" ? "Transcribing…" : "Transcribe"}
        </button>
      </div>

      {isBusy && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-charcoal-border">
          <div
            className="h-full bg-wire transition-all"
            style={{ width: state === "processing" ? "100%" : `${progress}%` }}
          />
        </div>
      )}

      <ErrorMessage message={error} />

      {state === "completed" && text && (
        <ResultCard
          eyebrow="Transcript"
          actions={
            <>
              <CopyButton text={text} />
              <SaveButton module="transcriber" title="Transcript" input={fileName || "Audio File"} output={text} />
            </>
          }
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink dark:text-[#E7E4DC]">{text}</p>
          <button
            onClick={() => sendTo("/summarizer", text, "transcriber")}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-press hover:underline"
          >
            Send to Summarizer <ArrowRight size={14} />
          </button>
        </ResultCard>
      )}

      {state === "idle" && !text && (
        <EmptyState icon={Mic2} title="No recording yet" description="Drop an audio file to begin." />
      )}
    </div>
  );
};