import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgbNavModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './component/header.component';
import { AuthService } from './service/auth.service';
import { ToastService } from './service/toast.service';
import { WebSocketService } from './service/web-socket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavModule, HeaderComponent, NgbToastModule],
  template: `
    <app-header></app-header>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-coursera';
}
