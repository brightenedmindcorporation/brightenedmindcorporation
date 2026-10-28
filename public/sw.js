// BM service worker: keeps the site installable and fast, and shows a friendly page when there is no connection.
// It never stores pages, API answers or the audio clips (the lessons manage their own audio cache).
const VERSION = "bm-pwa-v1";
const STATIC = VERSION + "-static";
const OFFLINE = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION + "-shell")
      .then((cache) => cache.add(OFFLINE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      // only this worker's own old caches are removed; the audio cache belongs to the lessons
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("bm-pwa-") && !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/audio/")) return;

  // Pages: always the live site; the offline page only when the network fails.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => (await caches.match(OFFLINE)) || new Response("Hors ligne", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }))
    );
    return;
  }

  // Built files carry a hash in their name and never change: keep them.
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.open(STATIC).then(async (cache) => {
        const hit = await cache.match(request);
        if (hit) return hit;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      })
    );
  }
});
