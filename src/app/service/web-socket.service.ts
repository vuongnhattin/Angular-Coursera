import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, retryWhen, delay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MessageSend } from '../model/message-send.model';
import { MessageReceive } from '../model/message-receive.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;
  private stompClient;

  private messageSource = new Subject<MessageReceive>();
  message$ = this.messageSource.asObservable();

  constructor(private auth: AuthService) {
    this.socket = new SockJS('http://localhost:8080/ws');
    console.log('SockJS initialized:', this.socket);

    const token = this.auth.getAccessToken();

    this.stompClient = Stomp.over(this.socket);
  
    console.log('STOMP client initialized:', this.stompClient);

    this.stompClient.connect({ Authorization: 'Bearer ' + token }, (frame: any) => {  
      // Subscribe to a topic
      this.stompClient.subscribe('/user/queue/messages', (response: any) => {
        console.log('Received message:', JSON.parse(response.body));
        this.messageSource.next(JSON.parse(response.body));
        // this.onMessageReceived(message);
      });
    }, (error: any) => {
      console.error('Connection error:', error);  // Log any connection errors
    });

    // this.stompClient.connect({ Authorization: 'Bearer ' + token }, this.onConnected, this.onError);
   }

  sendMessage(message: MessageSend) {
    this.stompClient.send('/app/send', {}, JSON.stringify(message));
    console.log(message);
  }
}
