import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/service/authentication.service';
import { NavbarComponent } from './main-view/navbar/navbar.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor (
    private authService : AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
  }

  count() {
    console.count('approot')
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
