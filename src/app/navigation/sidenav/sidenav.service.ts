import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav;
  private sideBarClosed = new Subject<void>();

  sideBarClosed$ = this.sideBarClosed.asObservable();

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenav.open();
  }

  public close() {
    this.sideBarClosed.next();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
