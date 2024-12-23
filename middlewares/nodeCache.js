const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 600 });

const checkCache = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData) {
    return res.json(cachedData);
  }

  const originalJson = res.json;
  res.json = (data) => {
    cache.set(key, data);
    return originalJson.call(res, data);
  };

  next();
};

module.exports = checkCache;
