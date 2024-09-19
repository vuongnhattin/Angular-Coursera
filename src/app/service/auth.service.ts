import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
