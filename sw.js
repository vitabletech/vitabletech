const CACHE_NAME = 'vitabletech-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/icons-vitabletech/site.webmanifest',
  '/icons-vitabletech/web-app-manifest-192x192.png',
  '/icons-vitabletech/web-app-manifest-512x512.png'
];

self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Claim clients immediately so they use the new service worker without requiring a reload.
  event.waitUntil(clients.claim());
  
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network First, fall back to cache strategy
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            // Check if request URL starts with http to avoid caching unsupported schemes like chrome-extension
            if (event.request.url.startsWith('http')) {
               cache.put(event.request, responseToCache);
            }
          });
        return response;
      })
      .catch(() => {
        // If network fails, try to get it from the cache
        return caches.match(event.request);
      })
  );
});
