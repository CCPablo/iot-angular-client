import { Injectable } from "@angular/core";
import { HttpClient, HttpResponseBase, HttpParams } from "@angular/common/http";
import { LoginObject } from "../model/login-object.model";
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Session } from "../model/session.model";
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentSession : Session = null;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.currentSession = this.loadSessionData();
    }

    private authUrl = '/login';
    private logoutPath = '/logout';

    login(loginObj: LoginObject) {
        let params = new HttpParams();
        params = params.append('username', loginObj.username);
        params = params.append('password', loginObj.password);
        return this.http.post<any>(`${environment.apiUrl}${this.authUrl}`, null, {params: params, observe: 'response'})
            .pipe(map(res => {
              return res.headers.get('Authorization');
        }));
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        localStorage.setItem('currentSession', JSON.stringify(session));
    }

    setCurrentSessionWithToken(token: string): void {
      let session = new Session(token, '');
      this.currentSession = session;
      localStorage.setItem('currentSession', JSON.stringify(session));
    }

    loadSessionData(): Session {
        var sessionStr = localStorage.getItem('currentSession');
        return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        localStorage.removeItem('currentSession');
        this.currentSession = null;
    }

    getCurrentUser(): string {
        var session: Session = this.getCurrentSession();
        return (session && session.user) ? session.user : null;
    };

    public isAuthenticated(): boolean {
        return  (this.getCurrentToken() != null) ? true : false;
    };

    getCurrentToken(): string {
        var session = this.getCurrentSession();
        return (session && session.token) ? session.token : null;
    };

    logout(): void{
        this.removeCurrentSession();
        this.router.navigate(['/login']);
    }

    /*
    logout() {
        return this.http.post<any>(`${environment.apiUrl}${this.logoutPath}`, Boolean)
            .pipe(map(bool => {
                this.storageService.logout();
                return bool;
        }));
    }
    */
}
