import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * @param {string} text - min 50 chars (summarizerValidator.js), no max enforced by backend
 * @param {"en"|"ur"} lang
 * @returns {Promise<{originalLength:number, summaryLength:number, language:string, summary:string}>}
 */
export const summarizeText = async (text, lang = "en") => {
  const { data } = await apiClient.post(ENDPOINTS.summarize, { text, lang });
  return data.data;
};
