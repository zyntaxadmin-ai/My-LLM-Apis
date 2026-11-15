// Minimal service worker: makes the dashboard installable and caches the app
// shell. API traffic (/api, /v1, /mcp) is never cached, so keys, usage and
// model responses are always live.
const CACHE = 'shell-v1'
const SHELL = ['/', '/manifest.webmanifest', '/favicon.svg', '/icon-192.png']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})
self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== location.origin) return
  if (/^\/(api|v1|v1beta|mcp)(\/|$)/.test(url.pathname)) return
  // Pages: network first, fall back to the cached shell when offline.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('/')))
    return
  }
  // Static assets: cache first, refresh in the background.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()))
        return res
      }).catch(() => hit)
      return hit || net
    }),
  )
})
