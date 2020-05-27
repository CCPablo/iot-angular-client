import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {

  private toggleSidebarSubject= new Subject<void>();
  private logoutSubject= new Subject<void>();

  toggleSidebar$ = this.toggleSidebarSubject.asObservable();
  logout$ = this.logoutSubject.asObservable();

  toggleSidebar() {
    this.toggleSidebarSubject.next();
  }

  logout() {
    this.logoutSubject.next();
  }
}
