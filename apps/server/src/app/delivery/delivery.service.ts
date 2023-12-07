/*
https://docs.nestjs.com/providers#services
*/

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class DeliveryService {
  constructor(@InjectQueue('delivery') private readonly deliveryQueue: Queue) {}

  create(message: any) {
    console.log('DeliveryService');
    this.deliveryQueue.add('delivery', message);
  }
}
