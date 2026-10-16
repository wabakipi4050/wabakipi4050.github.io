/* CryptoCal Px 1.2.0 — offline copy of the page. Cache name carries the page hash, so a new build replaces the old copy. */
const CACHE = 'cryptocal-px-d167d5b5cadf';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './manifest.webmanifest', './icon-512.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('cryptocal-px-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin) return;                    // market data and AI endpoints: straight to the network, never cached
  const key = e.request.mode === 'navigate' ? './' : e.request;
  e.respondWith(caches.match(key).then((hit) => {
    const net = fetch(e.request).then((res) => { if (res.ok) caches.open(CACHE).then((c) => c.put(key, res.clone())); return res; }).catch(() => hit);
    return hit || net;
  }));
});
