const FILES_TO_CACHE = [
  "/",
  "/db.js",
  "/index.html",
  "/index.js",
  "/styles.css",
  "/manifest.json",
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

//Install Section
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      //return to the console if the files were cached
      console.log("Your files were successfully pre-cached!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

//Activate Section
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            //return to the console of old cache removal
            console.log("Removing old cache!", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//Fetch Section
self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              //if we receive a good response, copy the info and store in cache
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch((err) => {
              //If request failed, check the cache
              return cache.match(event.request);
            });
        })
        .catch((err) => {
          console.log(err);
        })
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request);
      });
    })
  );
});
