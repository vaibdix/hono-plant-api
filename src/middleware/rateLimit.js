const store = new Map();

export function rateLimit(requests = 100, windowMs = 60000) {
  return async (c, next) => {
    const ip = c.req.header('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old requests
    store.forEach((value, key) => {
      if (value.timestamp < windowStart) {
        store.delete(key);
      }
    });

    const requestData = store.get(ip) || { count: 0, timestamp: now };
    
    if (requestData.timestamp < windowStart) {
      requestData.count = 0;
      requestData.timestamp = now;
    }

    if (requestData.count >= requests) {
      return c.json({ error: 'Too many requests' }, 429);
    }

    requestData.count++;
    store.set(ip, requestData);

    await next();
  };
}