// Scope of this service workers is the whole app
let CACHE_STATIC_VERSION = "static-v3";
let CACHE_DYNAMIC_VERSION = "dynamic-v2"

/***** ADD RESOURCES WHEN INSTALLING SERVICE WORKER *******/

// Open a sub-cache inside Cache Storage , to cache app shell which contain static content
const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_STATIC_VERSION);
    await cache.addAll(resources);
};

// Install and activate event are triggered by the browser
self.addEventListener("install", (event) => {
    console.log("[Service worker] Installing Service Worker...", event);
    event.waitUntil(
        addResourcesToCache([
                "/",
                "/index.html",
                "/src/js/app.js",
                "/src/js/feed.js",
                "/src/js/promise.js",
                "/src/js/fetch.js",
                "/src/js/material.min.js",
                "/src/js/material.min.js.map",
                "/src/css/app.css",
                "/src/css/feed.css",
                "/src/images/main-page.jpg",
                "https://fonts.googleapis.com/css?family=Roboto:400,700",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.light_green-amber.min.css"
        ])
    );
});


/***** UPDATE RESOURCES AND VERSIONING WHEN ACTIVATING SERVICE WORKER *******/

// Delete cache
const deleteCache = async (key) => {
    await caches.delete(key);
}

const deleteOldCaches = async () => {
    const cacheStaticKeepList = [CACHE_STATIC_VERSION];
    const cachesDynamicKeepList = [CACHE_DYNAMIC_VERSION];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter(key => !cacheStaticKeepList.includes(key) && !cachesDynamicKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
}

// Integrate "cache versioning" here
self.addEventListener("activate", (event) => {
    console.log("[Service worker] Activating Service Worker...", event);
    event.waitUntil(
        deleteOldCaches()
    );
    return self.clients.claim();
})

/***** UPDATE RESOURCES IN CACHE WHEN FETCHING *******/

// Add resources to cache
// Open a sub-cache inside Cache Storage , to cache dynamic content
const putInCache = async (request, response) => {
    const cache = await caches.open(CACHE_DYNAMIC_VERSION);
    await cache.put(request, response);
}

// Check and get the url or path of dynamic content
const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    const responseFramework = await fetch(request);
    putInCache(responseFramework.clone());
    return responseFramework;
}

// Fetch is trigger by the application
self.addEventListener("fetch", (event) => {
    // console.log("[Service worker] Fetching Service Worker...", event)
    event.respondWith(
        cacheFirst(event.request)
    );
})

