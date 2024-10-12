import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  constructor(public oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  getUserId() {
    return this.oauthService.getIdentityClaims()['sub'];
  }
}
