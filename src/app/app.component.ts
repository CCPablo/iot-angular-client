import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor (
    private authService : AuthenticationService) {}

  ngOnInit(): void {
  }

  public isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
