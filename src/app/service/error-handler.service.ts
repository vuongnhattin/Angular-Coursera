import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { OAuthErrorEvent } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    if (error instanceof OAuthErrorEvent) {
      if (error.type === 'invalid_nonce_in_state') {
        window.location.reload();
      }
    }
    throw error;
  }
}
