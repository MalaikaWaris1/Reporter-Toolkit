import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

// Backend-supported platforms only — no Facebook (contentMaker.config.js
// SUPPORTED_PLATFORMS: linkedin, twitter, tiktok, youtube, instagram).
export const SOCIAL_PLATFORMS = ["linkedin", "twitter", "tiktok", "youtube", "instagram"];
export const SOCIAL_LANGUAGES = ["auto", "english", "urdu", "roman urdu"];

/**
 * @param {object} params
 * @param {string} params.transcript - 10 to 10,000 chars
 * @param {string} params.platform - one of SOCIAL_PLATFORMS
 * @param {string} [params.targetLanguage] - one of SOCIAL_LANGUAGES, default "auto"
 * @param {string} [params.customGuidelines] - max 2000 chars
 */
export const generateSocialContent = async ({
  transcript,
  platform,
  targetLanguage = "auto",
  customGuidelines = "",
}) => {
  const { data } = await apiClient.post(ENDPOINTS.social, {
    transcript,
    platform,
    target_language: targetLanguage,
    custom_guidelines: customGuidelines || undefined,
  });
  return data; // status, generated_content, tweets, word_count, character_count, thread_count, etc.
};
