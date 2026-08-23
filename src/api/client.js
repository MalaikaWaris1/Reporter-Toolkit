import axios from "axios";

// Base URL configuration
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Token Key ko "token" kar diya hai (jis name se hum Login par save kar rahe hain)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalized Error Handler
export const extractErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.message) return data.message;
  if (!error?.response) return "Could not reach the server. Check your connection and try again.";
  return "Something went wrong. Please try again.";
};

// Endpoints mapped accurately to your backend app.js routes
export const ENDPOINTS = {
  // Existing AI Tools Routes
  summarize: "/api/summarizer/summarize",
  translate: "/api/translation/translate",
  tts: "/api/tts/speak",                  // Corrected: matched app.use("/api/tts/speak")
  transcribe: "/api/stt/transcribe",
  headlines: "/api/headlines/generate",   // Corrected: "headlines" (plural) matched app.js
  social: "/api/content/generate",        // Corrected: "/api/content" matched app.js
  seo: "/api/seo/extract",

  // Auth & History Routes (Newly Added)
  login: "/api/auth/login",
  register: "/api/auth/register",
  me: "/api/auth/me",
  history: "/api/history",
};