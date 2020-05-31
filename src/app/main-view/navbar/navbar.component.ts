import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
