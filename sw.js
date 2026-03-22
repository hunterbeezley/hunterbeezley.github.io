// Service Worker for Hunter Beezley Portfolio PWA
const CACHE_NAME = 'hb-portfolio-v1';
const RUNTIME_CACHE = 'hb-runtime';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/contact.html',
  '/visuals_1/index.html',
  '/visuals_1/hydra/index.html',
  '/styles.css',
  '/sketch.js',
  '/contact.js',
  '/visuals_1/styles.css',
  '/visuals_1/scripts.js',
  '/visuals_1/hydra/styles.css',
  '/visuals_1/hydra/script.js',
  '/manifest.json'
];

// External CDN resources to cache
const CDN_CACHE = [
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js',
  'https://unpkg.com/hydra-synth',
  'https://cdnjs.cloudflare.com/ajax/libs/RecordRTC/5.6.2/RecordRTC.min.js'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching assets');
      // Cache local assets
      cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.warn('[Service Worker] Precache failed for some assets:', err);
      });
      // Cache CDN resources
      return cache.addAll(CDN_CACHE).catch(err => {
        console.warn('[Service Worker] CDN cache failed:', err);
      });
    }).then(() => {
      // Force the waiting service worker to become active
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old caches
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Skip New Relic tracking requests
  if (url.hostname.includes('nr-data.net')) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Strategy: Stale-While-Revalidate
      // Return cached response immediately, but also fetch fresh version

      if (cachedResponse) {
        // Found in cache - return it
        console.log('[Service Worker] Serving from cache:', url.pathname);

        // Fetch fresh version in background for next time
        fetchAndCache(request);

        return cachedResponse;
      }

      // Not in cache - fetch from network
      console.log('[Service Worker] Fetching from network:', url.pathname);
      return fetchAndCache(request);
    }).catch((error) => {
      console.error('[Service Worker] Fetch failed:', error);

      // If we're offline and requesting an HTML page, return a custom offline page
      if (request.headers.get('accept').includes('text/html')) {
        return caches.match('/index.html').then(response => {
          return response || new Response(
            '<html><body><h1>Offline</h1><p>You are currently offline. Please check your connection.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      }

      return new Response('Network error', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
      });
    })
  );
});

// Helper function to fetch and cache
function fetchAndCache(request) {
  return fetch(request).then((response) => {
    // Don't cache if not a valid response
    if (!response || response.status !== 200 || response.type === 'error') {
      return response;
    }

    // Clone the response (can only be consumed once)
    const responseToCache = response.clone();

    // Add to runtime cache
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.put(request, responseToCache);
    });

    return response;
  });
}

// Listen for messages from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.addAll(urls);
    });
  }
});
