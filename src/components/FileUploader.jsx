import { useRef, useState } from "react";
import { UploadCloud, FileAudio, X } from "lucide-react";

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
};

// acceptedTypes/maxSizeMb are left permissive by default because the
// backend's multer config wasn't included in what you sent — no size
// or mimetype limit was enforced in stt.routes.js. Tighten these props
// once you confirm the real multer limits.
export const FileUploader = ({
  onFileSelect,
  acceptedTypes = ".mp3,.wav,.m4a,.mp4",
  maxSizeMb = null,
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const validateAndSet = (f) => {
    setError("");
    if (!f) return;
    if (maxSizeMb && f.size > maxSizeMb * 1024 * 1024) {
      setError(`File exceeds the ${maxSizeMb}MB limit.`);
      return;
    }
    setFile(f);
    onFileSelect(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    validateAndSet(e.dataTransfer.files?.[0]);
  };

  const clearFile = () => {
    setFile(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-ink/15 bg-white/60 px-4 py-3 dark:border-charcoal-border dark:bg-charcoal-raised/60">
        <div className="flex items-center gap-3">
          <FileAudio size={18} className="text-press" />
          <div>
            <p className="text-sm font-medium text-ink dark:text-[#E7E4DC]">{file.name}</p>
            <p className="text-xs text-ink-faint dark:text-[#8A93A3]">
              {formatBytes(file.size)} · {file.type || "unknown type"}
            </p>
          </div>
        </div>
        {!disabled && (
          <button
            onClick={clearFile}
            aria-label="Remove file"
            className="rounded-md p-1.5 text-ink-faint hover:bg-ink/5 hover:text-wire dark:hover:bg-white/5"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition ${
          dragOver ? "border-wire bg-wire/[0.04]" : "border-ink/20 dark:border-charcoal-border"
        } ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-ink/35"}`}
      >
        <UploadCloud size={22} className="text-ink-faint dark:text-[#6E7688]" />
        <p className="text-sm text-ink dark:text-[#E7E4DC]">
          Drag an audio file here, or <span className="text-press underline">browse</span>
        </p>
        <p className="text-xs text-ink-faint dark:text-[#6E7688]">
          Supports {acceptedTypes.replaceAll(".", "").toUpperCase()}
          {maxSizeMb ? ` · up to ${maxSizeMb}MB` : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes}
          className="hidden"
          disabled={disabled}
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-2 text-xs text-wire">{error}</p>}
    </div>
  );
};
