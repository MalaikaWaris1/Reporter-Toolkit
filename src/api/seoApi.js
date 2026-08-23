import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * @param {string} text - min 50 chars (seoValidator.js)
 * @param {"en"|"ur"} lang
 * @returns {Promise<{language:string, seo:{metaTitle:string, metaDescription:string,
 *   primaryKeywords:string[], secondaryKeywords:string[], tags:string[]}}>}
 */
export const extractSeoData = async (text, lang = "en") => {
  const { data } = await apiClient.post(ENDPOINTS.seo, { text, lang });
  return data.data;
};
