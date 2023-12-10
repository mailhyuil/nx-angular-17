import { createClient } from 'redis';
export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
export type RedisClient = ReturnType<typeof createClient>;
export const redisProvider = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const client = createClient({
      url: 'redis://localhost:6379',
    });
    await client.connect();
    return client;
  },
};
