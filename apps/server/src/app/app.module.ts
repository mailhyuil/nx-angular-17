import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { ChatModule } from './chat/chat.module';
import { DeliveryModule } from './delivery/delivery.module';
import { FileModule } from './file/file.module';
import { PaymentModule } from './payment/payment.module';
import { RedisModule } from './redis/redis.module';

import { BullModule } from '@nestjs/bull';
import { APP_GUARD, APP_INTERCEPTOR, DiscoveryModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    AddressModule,
    RedisModule,
    ChatModule,
    DeliveryModule,
    PaymentModule,
    FileModule,
    PrismaModule,
    UsersModule,
    DiscoveryModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ThrottlerModule.forRoot([
      {
        // default
        ttl: 60000,
        limit: 10,
      },
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 100000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: FileInterceptor('file', {
        storage: diskStorage({
          destination: (request, file, callback) => {
            const uploadPath: string = 'public';
            if (!existsSync(uploadPath)) {
              // public 폴더가 존재하지 않을시, 생성
              mkdirSync(uploadPath);
            }

            callback(null, uploadPath);
          },

          filename: (request, file, callback) => {
            callback(null, 'hi.png'); // filename uuid로 변환해서 지정하기
          },
        }),
      }),
    },
  ],
})
export class AppModule {}
