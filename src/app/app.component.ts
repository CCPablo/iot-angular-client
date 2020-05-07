import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public _opened: boolean = false;
  public _positionNum: number = 0;
  public _dock: boolean = false;
  public _closeOnClickOutside: boolean = true;
  public _showBackdrop: boolean = false;
  public _animate: boolean = true;

  public constructor (private authService : AuthenticationService, private router: Router) {}

  public _toggleOpened(): void {
    if(this.authService.isAuthenticated()) {
      this._opened = !this._opened;
    }
  }

  public _toggleLogout(): void {
    if(this.authService.isAuthenticated()) {
      this.authService.removeCurrentSession();
      this.router.navigate(['/login']);
    }
  }

  public _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  public _onOpened(): void {
    console.info('Sidebar opened');
  }

  public _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  public _onClosed(): void {
    console.info('Sidebar closed');
  }

  public _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  public _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }
}
