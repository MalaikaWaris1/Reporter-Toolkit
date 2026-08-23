# Dispatch — Reporter Toolkit (Frontend)

A React + Vite frontend for your existing Node/Express AI Reporter Toolkit
backend. This does **not** replace or duplicate your backend — it's a
client for the 7 modules you already built.

## Running it

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to your backend's URL
npm run dev
```

Requires your backend running separately (CORS-enabled) at the URL you set
in `.env`.

## What's implemented

- **7 modules**, each wired to the exact request/response shape of the
  service + validator you sent: Summarizer, Translator, TTS Studio,
  Interview Transcriber, Headline Generator, Social Media Maker, SEO
  Extractor.
- **Workflow handoffs** ("Send to Translator", "Generate headlines", etc.)
  that carry text between modules via `WorkflowContext` — session-only,
  not persisted.
- **Light/dark mode**, saved to `localStorage`, respects system preference
  on first visit.
- **Responsive layout** — sidebar becomes a mobile drawer under `md`.
- **Local history** (`LocalHistoryContext`) — a `localStorage` stand-in for
  a real history feature, since no backend history/Mongo model exists yet.
  Clearly commented as temporary in the code.

## What's intentionally NOT implemented

Your backend files didn't include an auth system (no register/login/JWT
routes, no User model) or any history/Mongo persistence layer. Rather than
inventing an incompatible fake version of either, I left them out:

- No `/login`, `/register`, or `<ProtectedRoute>` — every route is
  currently public.
- No real per-user history — see `LocalHistoryContext.jsx`, which is
  designed to be swapped for `historyApi.js` calls with no changes needed
  in the components that use it.
- `Settings.jsx` has an "Account" section that plainly states auth isn't
  connected yet, rather than showing fake profile fields.

## Endpoint mapping (verify this against your actual server.js)

None of the route files you sent showed how they're mounted
(`app.use("/api/x", router)`), so these prefixes are inferred from each
router's filename/internal paths. **Check `src/api/endpoints.js` against
your real server.js and fix any that differ — it's the only file that
needs to change.**

| Module | Endpoint (as inferred) | Method | Body |
|---|---|---|---|
| Summarizer | `POST /api/summarizer/summarize` | POST | `{ text, lang }` |
| Translator | `POST /api/translation/translate` | POST | `{ text, targetLang }` |
| TTS | `POST /api/tts/ttsRouter` | POST | `{ text }` |
| Transcriber | `POST /api/stt/transcribe` | POST (multipart) | `audio` file + `language` |
| Headlines | `POST /api/headline/generate` | POST | `{ text, lang }` |
| Social Maker | `POST /api/content-maker/generate` | POST | `{ transcript, platform, target_language, custom_guidelines }` |
| SEO Extractor | `POST /api/seo/extract` | POST | `{ text, lang }` |

## Input limits (pulled from your actual validators, not guessed)

| Module | Limit | Source |
|---|---|---|
| Summarizer | min 50 chars, no max | `summarizerValidator.js` |
| Translator | max 3000 chars | `validator.js` |
| TTS | not defined in backend | `tts.routes.js` uses an unseen `validateText` |
| Transcriber | not defined in backend | no multer limits in `stt.routes.js` |
| Headlines | min 30 chars, no max | `headlineValidator.js` |
| Social Maker | transcript 10–10,000 chars, guidelines max 2000 | `contentMakerValidator.js` |
| SEO Extractor | min 50 chars, no max | `seoValidator.js` |

## Missing backend pieces (blockers for §3/§4/§6 of the original brief)

1. Auth: `/register`, `/login`, `/logout`, JWT middleware, `User` model.
2. History: Mongo models + CRUD routes scoped to `req.user.id` for each
   module's results.
3. `ttsService.js` — referenced by `tts.routes.js` but never sent; needed
   to confirm the real TTS text limit and Azure/Cloudinary flow.
4. Clarify whether `tts.routes.js`'s `validateText` middleware is the same
   file as `validator.js` (translation validator) or a separate,
   unsent file — they share an import path but different shapes.
5. Your main `server.js`/`app.js` — to confirm exact route mount prefixes
   in the table above.

Send those over and I'll wire up real auth, protected routes, and
Mongo-backed history — the frontend is structured so that's a contained
change (`AuthContext` + `historyApi.js` + a `ProtectedRoute` wrapper),
not a rewrite.
