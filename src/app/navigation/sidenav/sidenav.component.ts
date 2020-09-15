import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './sidenav.service';
import { ToolbarService } from '../toolbarb/toolbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public constructor (
    public toolbarService:ToolbarService,
    private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.toolbarService.toggleSidenav$.subscribe(()=>{
      this.sidenavService.toggle();
    })
  }

  closedStart() {
    this.sidenavService.close();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
