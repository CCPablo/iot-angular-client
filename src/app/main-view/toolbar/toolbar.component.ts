import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/service/authentication.service';
import { ToolbarService } from './toolbar.service';
import { ProfileSheetComponent } from './profile-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { SidenavService } from '../navbar/side-navbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title: string = 'El internet de las cosas';

  opened: boolean = false;

  constructor(
    private toolbarService: ToolbarService,
    private authenticationService: AuthenticationService,
    private profileSheet: MatDialog,
    private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.sideBarClosed$.subscribe(()=>{
      console.log("eee")
      this.opened = false;
    })
  }

  logout(): void {
    this.authenticationService.logout();
  }

  openProfileSheet() {
    const dialogRef = this.profileSheet.open(ProfileSheetComponent, {
      width: '250px',
      data: {user: this.authenticationService.getCurrentUser()}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  toggleSidebar(): void {
    this.opened = !this.opened;
    this.toolbarService.toggleSidebar();
  }
}
