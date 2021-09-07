// On Install - the application shell cached
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw-cache').then(function (cache) {
            // static files that make up the app shell are cached
            return cache.add('index.html', 'assets/js/main.js', 'assets/css/styles.css');
        })
    )
});

// with request network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // try the cache
        caches.match(event.request).then(function(response) {
            // return if response or fetch again
            return response || fetch(event.request);
        })
    )
});