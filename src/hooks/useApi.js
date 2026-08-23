import { useCallback, useState } from "react";
import { extractErrorMessage } from "../api/client.js";

export const useApi = (apiFn) => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const run = useCallback(
    async (...args) => {
      setStatus("loading");
      setError("");
      try {
        const result = await apiFn(...args);
        setData(result);
        setStatus("success");
        return result;
      } catch (err) {
        setError(extractErrorMessage(err));
        setStatus("error");
        return null;
      }
    },
    [apiFn]
  );

  const reset = () => {
    setStatus("idle");
    setData(null);
    setError("");
  };

  return { status, data, error, run, reset, isLoading: status === "loading" };
};
