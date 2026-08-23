import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Carries a piece of working text from one module to the next when a
// reporter clicks a "Send to Translator" / "Generate Headlines" style
// handoff button. Lives only in memory for the session — nothing here is
// persisted, since there's no backend endpoint to persist a draft yet.
const WorkflowContext = createContext(null);

export const WorkflowProvider = ({ children }) => {
  const [draft, setDraft] = useState({ text: "", sourceModule: null });
  const navigate = useNavigate();

  const sendTo = (path, text, sourceModule) => {
    setDraft({ text, sourceModule });
    navigate(path);
  };

  const consumeDraft = () => {
    const current = draft;
    return current;
  };

  return (
    <WorkflowContext.Provider value={{ draft, sendTo, consumeDraft }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
