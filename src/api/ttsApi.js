import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

export const generateSpeech = async (text, targetLang = "ur", voiceStyle = "normal_ai") => {
  const { data } = await apiClient.post(ENDPOINTS.tts, {
    text,
    targetLang,
    voice_style: voiceStyle, // ✅ Backend req.body.voice_style expect kar raha hai
  });

  const rawAudio =
    data?.audio_base64 ||
    data?.audioUrl ||
    data?.audio_url ||
    data?.base64;

  let formattedAudioUrl = null;
  if (rawAudio && typeof rawAudio === "string") {
    formattedAudioUrl = rawAudio.startsWith("data:")
      ? rawAudio
      : `data:audio/mp3;base64,${rawAudio}`;
  }

  return {
    audioUrl: formattedAudioUrl,
    detectedLang: data?.metadata?.detected_language || (targetLang === "ur" ? "Urdu" : "English"),
  };
};