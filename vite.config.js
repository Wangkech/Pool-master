import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.svg",
        "favicon.png",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "favicon-180x180.png",
        "favicon-192x192.png",
      ],
      manifest: {
        name: "Pool Master",
        short_name: "Pool",
        description: "Offline-ready pool scoring app",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ttf}"],
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /\/.*\.(js|css|html|svg|png|ttf)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "app-static-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
