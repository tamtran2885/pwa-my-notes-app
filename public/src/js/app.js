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

registerServiceWorker();