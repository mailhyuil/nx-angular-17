import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MethodDecorator } from '../../decorators/method.decorator';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [],
})
export default class ChatComponent implements OnInit {
  constructor(private readonly socket: Socket) {}
  ngOnInit() {
    this.socket.on('chat', (data: string) => {
      console.log(data);
    });
  }
  @MethodDecorator()
  send() {
    console.log('send');
    this.socket.emit('chat', 'Hello World!');
  }
}
