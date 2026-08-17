// export function registerServiceWorker() {
//   if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
//     return;
//   }

//   window.addEventListener("load", async () => {
//     try {
//       const registration = await navigator.serviceWorker.register("/sw.js");
//       console.log("Service Worker registered:", registration);
//     } catch (error) {
//       console.warn("Service Worker registration failed:", error);
//     }
//   });
// }
