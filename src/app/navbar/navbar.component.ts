import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../authentication/service/authentication.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { SidenavService } from './side-navbar.service';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public constructor (
    public toolbarService:ToolbarService,
    private router: Router,
    private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.toolbarService.toggleSidebar$.subscribe(()=>{
      this.sidenavService.toggle();
    })
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
