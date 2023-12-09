import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
