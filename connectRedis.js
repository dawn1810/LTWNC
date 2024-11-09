import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

//check for connection
redisClient.on('connect', function () {
    console.log('Kết nối thành Redis công');
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

export const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'WTFChat:',
    ttl: 30 * 24 * 60 * 60, // 30 days (for "remember me")
});

export default redisClient;
