function cachingMiddleware(req, res, next) {
  const cacheDuration = 5 * 60 * 1000;

  const cacheKey = req.originalUrl;

  const cachedResponse = getCachedResponse(cacheKey);

  if (cachedResponse) {
    res.status(200).json(cachedResponse);
  } else {
    next();
  }
}

const cacheStorage = new Map();

function getCachedResponse(key) {
  return cacheStorage.get(key);
}

function cacheResponse(key, response) {
  cacheStorage.set(key, response);
}
