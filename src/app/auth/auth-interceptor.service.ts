import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          const modifiedReq = req.clone({
            headers: new HttpHeaders().set('Content-Type', 'application/json')
          });
          return next.handle(modifiedReq);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Content-Type', 'application/json').set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
