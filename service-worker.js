self.addEventListener("install", event => {
  event.waitUntil(
      caches.open("pwa-cache-v2").then(cache => {
          return cache.addAll(["/", "index.html", "manifest.json"]);
      })
  );
  self.skipWaiting(); // Forces the new service worker to take control immediately
});

self.addEventListener("activate", event => {
  event.waitUntil(
      caches.keys().then(keys => {
          return Promise.all(
              keys.map(key => {
                  if (key !== "pwa-cache-v2") {
                      return caches.delete(key); // Delete old cache versions
                  }
              })
          );
      })
  );
  self.clients.claim(); // Forces all pages to use the new service worker
});

self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
  );
});
