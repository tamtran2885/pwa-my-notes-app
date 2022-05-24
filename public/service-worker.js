// Scope of this service workers is the whole app
// Install and activate event are triggered by the browser
self.addEventListener("install", (event) => {
    console.log("[Service worker] Installing Service Worker...", event);
})

self.addEventListener("activate", (event) => {
    console.log("[Service worker] Activating Service Worker...", event);
    return self.clients.claim();
})

// Fetch is trigger by the application
self.addEventListener("fetch", (event) => {
    // console.log("[Service worker] Fetching Service Worker...", event)
    event.respondWith(fetch(event.request));
})

