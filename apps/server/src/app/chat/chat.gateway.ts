/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway(8080, { transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  logger = new Logger(ChatGateway.name);
  @WebSocketServer()
  server: any;

  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string) {
    console.log('from Client : ', data);
    this.server.emit('chat', 'from WebSocket Server : Nice to meet you too!');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('User connected');
  }

  handleDisconnect(client: any) {
    this.logger.log('User disconnected');
  }

  afterInit(server: Server) {
    this.logger.log('Socket is live');
  }
}
