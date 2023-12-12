/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Sse } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
@Controller({ path: 'realtime', version: '1' })
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}

  @Post()
  async updateRealtimeData(@Body('data') data: string) {
    this.realtimeService.update(data);
  }

  @Sse()
  getRealtimeData() {
    return this.realtimeService.data$;
  }
}
