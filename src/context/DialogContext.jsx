import { createContext, useState, useCallback, useEffect } from "react";
import DialogRenderer from "../components/Dialog/DialogRenderer";

export const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentDialog, setCurrentDialog] = useState(null);

  // Show next dialog in queue
  useEffect(() => {
    if (queue.length > 0 && !currentDialog) {
      setCurrentDialog(queue[0]);
    }
  }, [queue, currentDialog]);

  const showDialog = useCallback((config) => {
    return new Promise((resolve) => {
      const dialogConfig = {
        ...config,
        resolve,
      };
      setQueue((prev) => [...prev, dialogConfig]);
    });
  }, []);

  const closeDialog = useCallback(() => {
    setQueue((prev) => {
      if (prev.length === 0) return prev;
      const current = prev[0];
      // Don't resolve here - let the component handle it
      return prev.slice(1);
    });
    setCurrentDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {currentDialog && (
        <DialogRenderer dialog={currentDialog} onClose={closeDialog} />
      )}
    </DialogContext.Provider>
  );
}
