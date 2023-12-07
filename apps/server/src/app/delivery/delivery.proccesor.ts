import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('delivery')
export class DeliveryProcessor {
  constructor() {}
  @Process({
    concurrency: 5,
    name: 'delivery',
  })
  async deliveryProcess(job: Job) {
    console.log('DeliveryProcessor');
    console.log(job.data);
    return {
      message: 'Delivery processed',
    };
  }
}
