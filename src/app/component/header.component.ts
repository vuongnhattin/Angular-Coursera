import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { catchError, debounceTime, Observable, retry } from 'rxjs';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule, RouterLink],
  template: `
    <nav class="navbar bg-body-tertiary py-3 mb-4 sticky-top">
      <div class="container">
        <a class="navbar-brand" routerLink="">
          <img
            [width]="160"
            src="assets/coursera-logo.png"
            alt="Bootstrap"
            width="30"
            height="24"
          />
        </a>
        @if (userInfo) {
          <div class="d-flex" ngbDropdown>
              <button class="btn btn-link text-black" ngbDropdownToggle>{{userInfo.firstName + ' ' + userInfo.lastName}} &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i></button>
            <div ngbDropdownMenu>
              <button ngbDropdownItem routerLink="/profile">Thông tin</button>
              <div class="dropdown-divider"></div>
              <button ngbDropdownItem (click)="auth.logout()">Đăng xuất</button>
            </div>
          </div>
        }
      </div>
    </nav>
  `,
  styles: ``,
})
export class HeaderComponent implements OnInit {
  public auth = inject(AuthService);
  http = inject(HttpClient);
  userInfo: User;
  collapsed = true;

  ngOnInit(): void {
    this.http.get<User>(`${environment.apiUrl}/api/me`)
    .subscribe((res) => {
      this.userInfo = res;
    },
    (error) => {
      // alert(error);
      console.log(error);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 200);
      // window.location.reload();
    });
  }
}
