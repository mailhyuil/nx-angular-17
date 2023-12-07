import { DeliveryController } from './delivery.controller';
import { DeliveryProcessor } from './delivery.proccesor';
/*
https://docs.nestjs.com/modules
*/

import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'delivery',
    }),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryProcessor, DeliveryService],
  exports: [],
})
export class DeliveryModule {}
