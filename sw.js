self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/icon1.png', // Make sure to add the updated icon here
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-cache-v1']; // Update cache version here
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  