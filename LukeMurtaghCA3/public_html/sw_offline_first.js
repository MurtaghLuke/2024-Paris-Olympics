//  service worker


const cacheName = 'offline_pwa_example_version_1.0'

const filesToCache =
            ['json/manifest.json',
            'index.html',
            'offline_message.html',
            'css/styles.css',
            'icons/icon-192x192.png',
            'icons/icon-256x256.png',
            'icons/icon-384x384.png'
            ];


// Install the service worker and cache the files in the array filesToCache[] 
self.addEventListener('install', e =>
{
    e.waitUntil(caches.open(cacheName)
            .then(cache =>
            {
                cache.addAll(filesToCache)
                return true
            }))
})


// Delete old versions of the cache when a new version is first loaded 
self.addEventListener('activate', event =>
{
    event.waitUntil(caches.keys()
            .then(keys => Promise.all(keys.map(key =>
                {
                    if (!cacheName.includes(key))
                    {
                        return caches.delete(key)
                    }
                }))))
})


// Fetch offline cached first, then online, then offline error page 
self.addEventListener('fetch', function (e)
{
    e.respondWith(caches.match(e.request)
            .then(function (response)
            {
                if (response) // file found in cache
                {
                    return response
                } 
                else // file found online
                {
                    return fetch(e.request)
                }
            })
            .catch(function (e)
            {
                // offline and not in cache
                return caches.match('offline_message.html')
            })
            )
})
