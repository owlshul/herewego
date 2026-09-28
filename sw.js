// herewego. — minimal service worker for PWA installability
const CACHE = 'herewego-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=3',
  '/app.js?v=3',
  '/data.js?v=3',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for navigation, app script & styles so updates load instantly
  const url = e.request.url;
  const isDynamicAsset = e.request.mode === 'navigate' || url.includes('app.js') || url.includes('data.js') || url.includes('style.css');

  if (isDynamicAsset) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response && response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, resClone));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
