import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebSocketService } from '../service/web-socket.service';
import { MessageSend } from '../model/message-send.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MessageReceive } from '../model/message-receive.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import {environment} from "../environment/environment";

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [BreadcrumbComponent, FormsModule],
  template: `
    <app-breadcrumb
      [data]="[
        { name: 'Trang chủ', url: '/' },
        { name: 'Thảo luận', url: '' }
      ]"
    ></app-breadcrumb>

    <main class="content">
      <div class="container p-0">
        <!-- <h1 class="h3 mb-3">Messages</h1> -->
        <div class="card">
          <div class="row g-0">
            <div class="col-12 col-lg-5 col-xl-3 border-right">
              <hr class="d-block d-lg-none mt-1 mb-0"/>
            </div>
            <div class="col-12 ">
              <div class="position-relative">
                <div class="chat-messages p-4" #chatMessages>
                  @if (loadingMessage === true) {
                    <div class="col-12 text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                  @for (message of messages; track $index) {
                    <div
                      class="pb-4"
                      [class.chat-message-left]="message.sender !== username"
                      [class.chat-message-right]="message.sender === username"
                    >
                      <div>
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar3.png"
                          class="rounded-circle"
                          alt="Sharon Lessman"
                          width="40"
                          height="40"
                        />
                        <div class="text-muted small text-nowrap mt-2">
                          2:34 am
                        </div>
                      </div>
                      <div
                        class="flex-shrink-1 rounded py-2 px-3 ml-3 mx-2"
                        style="width: 10rem;"
                        [class.bg-primary]="message.sender === username"
                        [class.bg-light]="message.sender !== username"
                        [class.text-light]="message.sender === username"
                      >
                        <div class="fw-bold mb-1 small">
                          {{ message.senderName }}
                        </div>
                        {{ message.content }}
                      </div>
                    </div>
                  }
                </div>
              </div>

              <form
                #form="ngForm"
                class="flex-grow-0 py-3 px-4 border-top"
                (ngSubmit)="send()"
                autocomplete="off"
              >
                <div class="input-group">
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control"
                    placeholder="Type your message"
                    name="input"
                    [(ngModel)]="input"
                  />
                  <button class="btn btn-primary">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: `
  body{margin-top:20px;}

.chat-online {
    color: #34ce57
}

.chat-offline {
    color: #e4606d
}

.chat-messages {
    display: flex;
    flex-direction: column;
    height: 450px;
    overflow-y: scroll
}

.chat-message-left,
.chat-message-right {
    display: flex;
    flex-shrink: 0
}

.chat-message-left {
    margin-right: auto
}

.chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.flex-grow-0 {
    flex-grow: 0!important;
}
.border-top {
    border-top: 1px solid #dee2e6!important;
}
  `,
})
export class CommunityComponent implements OnInit, AfterViewInit {
  webSocket = inject(WebSocketService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  auth = inject(AuthService);
  http = inject(HttpClient);

  courseId: number;

  input = '';

  username: any;

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  messages: MessageReceive[] = [];
  loadingMessage = true;

  isReceived(message: MessageReceive): boolean {
    return message.sender !== this.username;
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chatMessages.nativeElement.scrollTop =
        this.chatMessages.nativeElement.scrollHeight;
    }, 30);
  }

  ngOnInit(): void {
    this.username = this.auth.getUsername();

    this.courseId = Number(
      this.route.parent?.parent?.snapshot.paramMap.get('courseId')
    );

    this.webSocket.message$.subscribe((message) => {
      if (message.roomId === this.courseId) {
        this.messages.push(message);
        this.scrollToBottom();
      }
    });

    this.http
      .get<MessageReceive[]>(
        `${environment.apiUrl}/api/courses/${this.courseId}/chat-messages`
      )
      .subscribe((res) => {
        this.loadingMessage = false;
        this.messages = res;
        this.scrollToBottom();
      });
  }

  send() {
    const chatMessage: MessageSend = {
      roomId: this.courseId,
      content: this.input,
    };

    this.webSocket.sendMessage(chatMessage);
    this.input = '';

    this.scrollToBottom();
  }
}
