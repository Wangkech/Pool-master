import { VitePWA } from "vite-plugin-pwa";

export function pwaConfig() {
  return VitePWA({
    devOptions: {
      enabled: false,
    },
    registerType: "prompt",
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
    },
  });
}
