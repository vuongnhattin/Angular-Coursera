import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retryWhen, delay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;
  private stompClient;

  constructor(private auth: AuthService) {
    this.socket = new SockJS('http://localhost:8080/ws');
    console.log('SockJS initialized:', this.socket);

    const token = this.auth.getAccessToken();

    this.stompClient = Stomp.over(this.socket);
  
    console.log('STOMP client initialized:', this.stompClient);

    this.stompClient.connect({ Authorization: 'Bearer ' + token }, (frame: any) => {
      console.log('Connected:', frame);  // Log the full frame object
  
      // Subscribe to a topic
      this.stompClient.subscribe('/user/queue/messages', (message: any) => {
        console.log('Received message:', message);
        // this.onMessageReceived(message);
      });
    }, (error: any) => {
      console.error('Connection error:', error);  // Log any connection errors
    });

    // this.stompClient.connect({ Authorization: 'Bearer ' + token }, this.onConnected, this.onError);
   }
  
   onConnected(frame: any) {
    console.log('Connected: ', frame);
    console.log('StompClient:', this.stompClient);
    this.stompClient.subscribe('/topic/public', (message: any) => {
      console.log('Message: ' + message);
    });
  }

  onError(error: any) {
    console.log('Error: ' + error);
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/send', {}, message);
  }
}
