const CACHE_VERSION = '1.0.6';
const CACHE_NAME = `vitabletech-cache-v${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/custom_script.js',
  '/icons-vitabletech/site.webmanifest',
  '/icons-vitabletech/web-app-manifest-192x192.png',
  '/icons-vitabletech/web-app-manifest-512x512.png'
];

self.addEventListener('install', event => {
  // DO NOT CALL skipWaiting() HERE
  // We want the user to trigger it via the "Update Now" button
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Precaching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Claim clients immediately so they use the new service worker
  event.waitUntil(clients.claim());
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('vitabletech-cache-') && cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Listen for message from frontend to trigger skipWaiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests and http/https schemes
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Don't cache version.json to ensure it always hits network
  if (url.pathname === '/version.json') {
    event.respondWith(fetch(request));
    return;
  }

  // Define strategy based on destination or file extension
  if (request.destination === 'document' || request.mode === 'navigate') {
    // Network First for HTML
    event.respondWith(networkFirst(request));
  } else if (request.destination === 'image') {
    // Cache First for Images
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    // Stale-While-Revalidate for CSS, JS, Fonts
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default to Network First
    event.respondWith(networkFirst(request));
  }
});

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(async networkResponse => {
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.warn('[Service Worker] fetch failed for stale-while-revalidate', error);
  });
  
  return cachedResponse || fetchPromise;
}
