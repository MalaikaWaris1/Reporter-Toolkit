// Endpoint paths, built from the route FILES you sent (contentMaker.routes.js,
// headline.routes.js, seo.routes.js, stt.routes.js, summarizer.routes.js,
// translation.routes.js, tts.routes.js).
//
// IMPORTANT: none of these route files show how they're mounted in your main
// server.js/app.js (e.g. `app.use("/api/summarizer", summarizerRouter)`).
// The prefixes below are the most likely convention based on each router's
// filename and internal path — verify them against your actual app.js and
// adjust in ONE place here if any differ.
export const ENDPOINTS = {
  summarize: "/api/summarizer/summarize", // summarizer.routes.js -> router.post("/summarize", ...)
  translate: "/api/translation/translate", // translation.routes.js -> router.post("/translate", ...)
  tts: "/api/tts/ttsRouter", // tts.routes.js -> router.post("/ttsRouter", ...)  (kept exact, unusual name)
  transcribe: "/api/stt/transcribe", // stt.routes.js -> router.post("/transcribe", ...)
  headlines: "/api/headline/generate", // headline.routes.js -> router.post("/generate", ...)
  social: "/api/content-maker/generate", // contentMaker.routes.js -> router.post("/generate", ...)
  seo: "/api/seo/extract", // seo.routes.js -> router.post("/extract", ...)
};
