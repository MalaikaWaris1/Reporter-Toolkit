import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * @param {string} text - max 3000 chars (validator.js)
 * @param {"en"|"ur"} targetLang - required
 * @returns {Promise<{originalText:string, translatedText:string, targetLang:string}>}
 */
export const translateText = async (text, targetLang) => {
  const { data } = await apiClient.post(ENDPOINTS.translate, { text, targetLang });
  return data.data;
};
