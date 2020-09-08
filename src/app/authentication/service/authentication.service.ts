import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Session } from "../model/session.model";
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/main-view/toolbar/toolbar.service';
import { Subscription, Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {

    private currentSession : Session;
    authUrl = '/login';

    private logoutSubscription : Subscription;

    constructor(
        private http: HttpClient,
        private router: Router,
        private toolbarService: ToolbarService
        ) {
      this.currentSession = this.loadSessionData();
      this.logoutSubscription = this.toolbarService.logout$.subscribe(()=>{
        this.logout();
      });
    }

    ngOnDestroy() {
      this.logoutSubscription.unsubscribe();
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

    private removeCurrentSession(): void {
      localStorage.removeItem('currentSession');
      this.currentSession = null;
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
