import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { pwaConfig } from "./src/pwa/pwaconfig.js";
export default defineConfig({
  plugins: [react(), tailwindcss(), pwaConfig()],
});
