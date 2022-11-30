const redis = require('redis');

export const client = redis.createClient({
  url: process.env.REDIS_URL || '',
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  password: process.env.REDIS_PASSWORD || ''
});
