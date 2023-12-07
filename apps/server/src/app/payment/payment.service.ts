/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentService {
  constructor(private readonly event: EventEmitter2) {}
  create() {
    const res = {
      id: '12345',
      message: 'Payment created',
      timestamp: new Date(),
    };
    console.log('PaymentService', res);
    this.event.emit('payment.created', res);
  }
}
