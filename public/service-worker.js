// Scope of this service workers is the whole app
self.addEventListener("install", (event) => {
    console.log("[Service worker] Installing Service Worker...", event);
})

self.addEventListener("activate", (event) => {
    console.log("[Service worker] Activating Service Worker...", event);
    return self.clients.claim();
})

self.addEventListener("fetch", (event) => {
    console.log("[Service worker] Fetching Service Worker...", event)
    event.respondWith(fetch(event.request));
})

