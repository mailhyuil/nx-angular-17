import { REDIS_CLIENT, RedisClient, RedisProvider } from './redis.provider';
/*
https://docs.nestjs.com/modules
*/

import { Global, Inject, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClient) {}

  onModuleDestroy() {
    this.redis.quit();
  }
}
