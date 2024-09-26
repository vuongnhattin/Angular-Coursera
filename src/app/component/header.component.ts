import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

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
        <div class="d-flex" ngbDropdown>
          <button class="btn btn-link text-black" ngbDropdownToggle>{{userInfo?.name}} &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i></button>
          <div ngbDropdownMenu>
            <button ngbDropdownItem routerLink="/profile">Thông tin</button>
            <div class="dropdown-divider"></div>
            <button ngbDropdownItem (click)="auth.logout()">Đăng xuất</button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
})
export class HeaderComponent implements OnInit {
  public auth = inject(AuthService);
  oauth = inject(OAuthService);
  userInfo: any;
  collapsed = true;

  ngOnInit(): void {
    this.userInfo = this.oauth.getIdentityClaims();
  }
}
