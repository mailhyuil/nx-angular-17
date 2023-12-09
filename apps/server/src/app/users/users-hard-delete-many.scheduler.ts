import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './users.service';

@Injectable()
export class UsersHardDeleteManySchedulerService {
  constructor(private readonly userService: UserService) {}

  // 두 번째 달의 1일 0시 0분 0초마다 실행
  @Cron(CronExpression.EVERY_2ND_MONTH)
  async hardDelete() {
    console.log('매일 0시 0분 0초마다 실행됩니다.');
    return await this.userService.hardDeleteMany();
  }
}
