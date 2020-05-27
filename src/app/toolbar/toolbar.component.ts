import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication/service/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { SidenavService } from '../navbar/side-navbar.service';
import { Subject, Subscription } from 'rxjs';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title: string = 'El internet de las cosas';

  constructor(
    private toolbarService: ToolbarService,
    private authenticationService: AuthenticationService) {  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }

  toggleSidebar(): void {
    this.toolbarService.toggleSidebar();
  }
}
