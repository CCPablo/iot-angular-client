import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb2NhcmF2YWNhY2Fsdm9AZ21haWwuY29tIiwianRpIjoiODMzNjk2MjItODA5ZC00NzU0LTg2ZjItM2I4ZTE4MTZiODM2IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1OTA1MzQ1NTUsInVzZXJJZCI6IjgzMzY5NjIyLTgwOWQtNDc1NC04NmYyLTNiOGUxODE2YjgzNiIsInJvbGUiOiIifQ.mQ4LKeK-Q_7AIYNambs-ANfu-GSFI5miAF4ayh3iFKM';

    constructor(
        private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentSession = this.authenticationService.getCurrentSession();
        if(request.url.startsWith('https://opendata.aemet.es')) {
          request = request.clone({
            setHeaders: {
                'api_key': this.apiKey
            }
            });
          }
        if (currentSession && currentSession.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentSession.token}`
              }
          });
        }
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                  console.log('event--->>>', event);
              }
              return event;
          }),catchError(err => {
          if(request.url.startsWith('https://opendata.aemet.es')) {
            return;
          }
          console.log('errorIntercepted:', err)

          if (err.status === 401) {
              alert('no existe ese usuario y contraseña')

          }
          else if (err.status === 500) {
            alert(err.error.message)
            this.authenticationService.logout();
            location.reload(true);
          }


          if (err.status === 0) {
            //this.authenticationService.logout();
            alert('servidor inactivo')
            //location.reload(true);
          }

          const error = err.error.message || err.statusText;
          return throwError(error);
        }))
    }
}
