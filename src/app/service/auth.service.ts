import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  constructor(public oauthService: OAuthService) {
    // this.configure();
    // console.log(this.getAccessToken());
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  logout() {
    // this.oauthService.revokeTokenAndLogout();
    localStorage.removeItem(this.ACCESS_TOKEN);
    window.location.reload();
  }

  private readonly ACCESS_TOKEN = 'access_token';

  getAccessToken() {
    // return this.oauthService.getAccessToken();
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  isAuth(): boolean {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    return token != null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  getUsername() {
      const token = this.getAccessToken();
      if (token) {
        return jwtDecode(token).sub;
      }
      return null;
  }
}
