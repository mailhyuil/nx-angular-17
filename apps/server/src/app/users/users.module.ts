import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserController } from './users.controller';
import { UserService } from './users.service';
@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
