import { REDIS_CLIENT, RedisClient, redisProvider } from './redis.provider';
/*
https://docs.nestjs.com/modules
*/

import { Global, Inject, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClient) {}

  onModuleDestroy() {
    this.redis.quit();
  }
}
