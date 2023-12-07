/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller({ path: 'payments', version: '1' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  create() {
    console.log('PaymentController');
    return this.paymentService.create();
  }
}
