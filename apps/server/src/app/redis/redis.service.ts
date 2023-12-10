/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis.provider';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: RedisClient
  ) {}

  get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: any, ttl?: number) {
    const res = await this.redis.set(key, value); /// 성공: OK, 실패: null
    this.redis.expire(key, ttl || 10); /// default 10 seconds /// expire는 set 이후에 실행되어야 함
    return res;
  }

  mget(keys: string[]) {
    return this.redis.mGet(keys);
  }

  mset(keyValues: string[]) {
    return this.redis.mSet(keyValues);
  }

  hget(key: string, field: string) {
    return this.redis.hGet(key, field);
  }

  hset(key: string, field: string, value: any) {
    return this.redis.hSet(key, field, value);
  }

  hdel(key: string, field: string) {
    return this.redis.hDel(key, field);
  }

  del(key: string) {
    return this.redis.del(key);
  }

  ping() {
    return this.redis.ping();
  }
}
