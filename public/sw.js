// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 1;
const CURRENT_CACHE = `bmi-${CACHE_VERSION}`;

// these are the routes we are going to cache for offline support
const cacheFiles = [];

// on activation we clean up the previously registered service workers
self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);

// on install we download the routes we want to cache for offline
self.addEventListener("install", (evt) =>
  evt.waitUntil(
    caches
      .open(CURRENT_CACHE)
      .then((cache) => {
        return cache.addAll(cacheFiles);
      })
      .then(() => self.skipWaiting())
  )
);

// Network-first strategy: try network first, fall back to cache
async function networkFirst(request) {
  try {
    // First, try to get the resource from the network
    const networkResponse = await fetch(request);
    
    // If the network request succeeds, clone the response before caching
    if (networkResponse.ok) {
      const clone = networkResponse.clone();
      await updateCache(request, clone);
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, try to get from cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If cache fails, throw error
    throw error;
  }
}

// cache the current page to make it available for offline
const updateCache = (request, response) => {
  if (request.method !== "GET" || /^\w+\-+extension/ig.test(request.url)) return;
  
  return caches
    .open(CURRENT_CACHE)
    .then((cache) => cache.put(request, response));
};

// Network-first fetch event handler
self.addEventListener("fetch", (evt) => {
  evt.respondWith(networkFirst(evt.request));
});