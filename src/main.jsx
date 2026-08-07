import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GameProvider } from "./context/GameProvider.jsx";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
);
