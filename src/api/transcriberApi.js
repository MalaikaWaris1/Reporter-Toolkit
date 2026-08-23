import { apiClient } from "./client.js";
import { ENDPOINTS } from "./endpoints.js";

/**
 * multipart/form-data upload, matching multer's upload.single('audio')
 * in stt.routes.js.
 * @param {File} file
 * @param {string} language - default 'ur' per stt.routes.js
 * @param {(percent:number)=>void} onProgress
 * @returns {Promise<{text:string}>}
 */
export const transcribeAudio = async (file, language = "ur", onProgress) => {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("language", language);

  const { data } = await apiClient.post(ENDPOINTS.transcribe, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded / evt.total) * 100));
      }
    },
  });
  return { text: data.text };
};
