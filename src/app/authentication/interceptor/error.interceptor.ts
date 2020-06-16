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
            console.log('event--->>>', event);
              if (event instanceof HttpResponse) {
                  console.log('event--->>>', event);
              }
              return event;
          }),catchError(err => {
          console.log('eeee:', err)
          console.log('errorIntercepted:', err)

            if (err.status === 401) {
                this.authenticationService.logout();
                alert('no permitido')
                location.reload(true);
            }

            if (err.status === 0) {
              this.authenticationService.logout();
              alert('servidor no da respuesta')
              location.reload(true);
          }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
