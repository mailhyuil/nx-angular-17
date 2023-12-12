import { RealtimeController } from './realtime.controller';
import { RealtimeService } from './realtime.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [RealtimeController],
  providers: [RealtimeService],
})
export class RealtimeModule {}
