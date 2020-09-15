import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {

  menuItems = [
    {
      name: 'Home',
      routerLink: '/home'
    },
    {
      name: 'Gráficas',
      routerLink: '/graphs'
    }
  ];

  private toggleSidenavSubject= new Subject<void>();
  private logoutSubject= new Subject<void>();

  toggleSidenav$ = this.toggleSidenavSubject.asObservable();
  logout$ = this.logoutSubject.asObservable();

  toggleSidenav() {
    this.toggleSidenavSubject.next();
  }

  logout() {
    this.logoutSubject.next();
  }
}
