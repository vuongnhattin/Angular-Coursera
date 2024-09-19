import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(OAuthService);
  
  const token = auth.getAccessToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token 
      }
    });
  }

  return next(req);
};
