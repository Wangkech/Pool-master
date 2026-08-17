import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GameProvider } from "./context/GameProvider.jsx";
import { DialogProvider } from "./context/DialogContext.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <GameProvider>
      <DialogProvider>
        <App />
      </DialogProvider>
    </GameProvider>
  </StrictMode>,
);
