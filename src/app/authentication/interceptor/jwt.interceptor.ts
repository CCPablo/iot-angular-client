import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsb2NhcmF2YWNhY2Fsdm9AZ21haWwuY29tIiwianRpIjoiODMzNjk2MjItODA5ZC00NzU0LTg2ZjItM2I4ZTE4MTZiODM2IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1OTA1MzQ1NTUsInVzZXJJZCI6IjgzMzY5NjIyLTgwOWQtNDc1NC04NmYyLTNiOGUxODE2YjgzNiIsInJvbGUiOiIifQ.mQ4LKeK-Q_7AIYNambs-ANfu-GSFI5miAF4ayh3iFKM';

    constructor(
        private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentSession = this.authenticationService.getCurrentSession();
        if (currentSession && currentSession.token) {
          if(!request.url.startsWith('https://opendata.aemet.es')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentSession.token}`
                }
            });
          } else {
            request = request.clone({
              setHeaders: {
                  'api_key': this.apiKey
              }
          });
          }
        }

        return next.handle(request);
    }
}
