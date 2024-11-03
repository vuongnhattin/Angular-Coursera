import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';
import { ToastContainerComponent } from './toast-container.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ToastContainerComponent,
    BreadcrumbComponent,
  ],
  template: `
    <div class="container">
      <app-breadcrumb
        [data]="[
          { name: 'Trang chủ', url: '/' },
          { name: 'Thông tin cá nhân', url: '' }
        ]"
      >
      </app-breadcrumb>

      @if (userInfo) {

      <form #form="ngForm" (ngSubmit)="submit()">
      <div class="mb-3">
          <label for="username" class="form-label">Tên đăng nhập</label>
          <input
            type="text"
            class="form-control"
            id="username"
            disabled
            [value]="userInfo.username"
          />
        </div>
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="username"
            disabled
            [value]="userInfo.email"
          />
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">Họ</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            [(ngModel)]="userInfo.firstName"
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Tên</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="lastName"
            [(ngModel)]="userInfo.lastName"
          />
        </div>
        <button type="submit" class="btn btn-primary">Chỉnh sửa</button>
      </form>
      }
      <app-toast></app-toast>
    </div>
  `,
  styles: ``,
})
export class ProfilePageComponent implements OnInit {
  userInfo: User;
  http = inject(HttpClient);
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.http.get<User>(`${environment.apiUrl}/api/me`).subscribe((res) => {
      this.userInfo = res;
    });
  }

  submit() {
    this.http
      .put<any>(`${environment.apiUrl}/api/me`, {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
      })
      .subscribe(
        (res) => {
          // this.toastService.show('Chỉnh sửa thông tin thành công');
          window.location.reload();
        },
        (err) => {
          for (let obj in err.error) {
            this.toastService.show(err.error[obj], 'error');
          }
        }
      );
  }
}
