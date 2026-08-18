/* import { updateServiceWorker } from "./updateServiceWoker.js";
let registration;

export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", async () => {
    try {
      registration = await navigator.serviceWorker.register("/sw.js");
      setInterval(() => {
        checkForUpdate(registration);
      }, 3000);
    } catch (error) {
      console.warn("Service Worker registration failed:", error);
    }
  });
}

async function checkConnection() {
  try {
    const response = await fetch("/", {
      method: "HEAD",
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

async function checkForUpdate(reg) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const connection = await checkConnection();
    if (!connection) {
      console.log("cannot reach the server...");
      return;
    }

    await reg.update();

    if (reg.update()) {
      console.log("updateFound");
    }
    console.log("Update Successful: ", reg);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
/* 
 console.log(navigator.onLine);
      registration.update().then(() => {
        console.log("update: ", registration.update());
        setInterval(() => registration.update(), 3000);
      });
*/
