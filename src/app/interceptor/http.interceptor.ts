import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // const auth = inject(OAuthService);
  const auth = inject(AuthService);
  const token = auth.getAccessToken();

  if (req.headers.get('skipAuth')) {
    // If `skipAuth` is present, forward the request without modifying
    const clonedReq = req.clone({
      headers: req.headers.delete('skipAuth')
    });
    return next(clonedReq);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  return next(req);
};
