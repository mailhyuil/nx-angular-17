/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DeliveryService } from './delivery.service';
@Controller()
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @OnEvent('payment.created')
  handlePaymentCreatedEvent(event) {
    console.log('DeliveryController');
    this.deliveryService.create(event);
  }
}
