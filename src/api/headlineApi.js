import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * @param {string} text - min 30 chars (headlineValidator.js)
 * @param {"en"|"ur"} lang
 * @returns {Promise<{language:string, totalHeadlines:number, headlines:string[]}>}
 */
export const generateHeadlines = async (text, lang = "en") => {
  const { data } = await apiClient.post(ENDPOINTS.headlines, { text, lang });
  return data.data;
};
