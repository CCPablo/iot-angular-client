import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
              }
              return event;
          }),catchError(err => {
            if (err.status === 401) {
              alert('no permitido')
            } else if (err.status === 0) {
              alert('servidor no da respuesta')
            }

            this.authenticationService.logout();
            location.reload(true);

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
