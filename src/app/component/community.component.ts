import { Component, inject } from '@angular/core';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [],
  template: ` <button (click)="send()">Send</button> `,
  styles: ``,
})
export class CommunityComponent {
  webSocket = inject(WebSocketService);

  send() {
    this.webSocket.sendMessage('Hello');
  }
}
