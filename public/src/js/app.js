let deferredPrompt;

if (!window.Promise) {
    window.Promise = Promise;
}

// check if service worker feature is available in the browser
const registerServiceWorker = async () => {   
    if ("serviceWorker" in navigator) {
        try {
            const reg = await navigator.serviceWorker.register("/service-worker.js");
            console.log("Service worker registered", reg);
        } catch (err) {
            console.log('😥 Service worker registration failed: ', err);
        }
    }
}

window.addEventListener("beforeinstallprompt", (event) => {
    console.log("Before firing install banner");
    event.preventDefault();
    deferredPrompt = event;
    return false;
})

registerServiceWorker();