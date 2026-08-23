import { createContext, useContext, useEffect, useState } from "react";

// TEMPORARY: your backend has no history/Mongo persistence yet (no user
// model, no auth, no history routes were in the files you sent). Rather
// than inventing a fake account system, this stores recent activity in
// the browser's localStorage so the dashboard/History page aren't empty
// shells. It is NOT multi-device, NOT multi-user, and will be replaced
// wholesale by historyApi.js once real endpoints exist — swap the calls
// in this file for real API calls at that point and nothing else needs
// to change, since components only import addEntry/entries from here.
const STORAGE_KEY = "dispatch_local_history";
const LocalHistoryContext = createContext(null);

export const LocalHistoryProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 100)));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries((prev) => [
      { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry },
      ...prev,
    ]);
  };

  const removeEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const clearAll = () => setEntries([]);

  return (
    <LocalHistoryContext.Provider value={{ entries, addEntry, removeEntry, clearAll }}>
      {children}
    </LocalHistoryContext.Provider>
  );
};

export const useLocalHistory = () => useContext(LocalHistoryContext);
