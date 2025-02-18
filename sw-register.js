if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(registration => {
        registration.onupdatefound = () => {
            const newWorker = registration.installing;
            newWorker.onstatechange = () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("New version available. Refreshing...");
                    window.location.reload(); // Forces refresh when a new service worker is installed
                }
            };
        };
    }).catch(error => console.log("Service Worker Registration Failed:", error));
}
