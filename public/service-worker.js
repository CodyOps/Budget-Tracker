const FILES_TO_CACHE = [
  "/",
  "/db.js",
  "/index.html",
  "/index.js",
  "/styles.css",
  "/manifest.json",
];

const Cache_Name = "static-cache-v2";
const Data_Cache_Name = "data-cache-v1";

//Install
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(Cache_Name).then((cache) => {
      //return to the console if the files were cached
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
