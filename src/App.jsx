import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LocalHistoryProvider } from "./context/LocalHistoryContext.jsx";
import { WorkflowProvider } from "./context/WorkflowContext.jsx";
import { ToastProvider } from "./components/Toast.jsx";
import { Layout } from "./components/Layout.jsx";

import { Landing } from "./pages/Landing.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { HistoryPage } from "./pages/HistoryPage.jsx";
import { Settings } from "./pages/Settings.jsx";

import { SummarizerPage } from "./modules/summarizer/SummarizerPage.jsx";
import { TranslatorPage } from "./modules/translator/TranslatorPage.jsx";
import { TTSPage } from "./modules/tts/TTSPage.jsx";
import { TranscriberPage } from "./modules/transcriber/TranscriberPage.jsx";
import { HeadlinesPage } from "./modules/headlines/HeadlinesPage.jsx";
import { SocialPage } from "./modules/social/SocialPage.jsx";
import { SeoPage } from "./modules/seo/SeoPage.jsx";

// NOTE ON AUTH: your backend has no register/login/JWT routes in the files
// you sent, so there is no <ProtectedRoute> gating these paths yet. Every
// route below is public. Once auth endpoints exist, wrap the Layout route
// in a ProtectedRoute component that checks AuthContext and redirects to
// /login — the folder structure already has a spot for authApi.js.
function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <WorkflowRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

// WorkflowProvider needs Router context (it calls useNavigate), so it's
// nested inside BrowserRouter rather than wrapping it.
function WorkflowRoutes() {
  return (
    <WorkflowProvider>
      <LocalHistoryProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/summarizer" element={<SummarizerPage />} />
            <Route path="/translator" element={<TranslatorPage />} />
            <Route path="/tts" element={<TTSPage />} />
            <Route path="/transcriber" element={<TranscriberPage />} />
            <Route path="/headlines" element={<HeadlinesPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/seo" element={<SeoPage />} />
          </Route>
        </Routes>
      </LocalHistoryProvider>
    </WorkflowProvider>
  );
}

export default App;
