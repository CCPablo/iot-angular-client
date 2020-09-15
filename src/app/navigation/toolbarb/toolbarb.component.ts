import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../service/authentication.service';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbarb',
  templateUrl: './toolbarb.component.html',
  styleUrls: ['./toolbarb.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger(
              '100ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateX(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave',
        [
          style({ opacity: 1, transform: 'translateX(0px)' }),
          stagger(
            '-100ms',
            animate(
              '550ms ease-out',
              style({ opacity: 0, transform: 'translateX(-20px)' })
            )
          )
        ],
        {
          optional: true
        })
      ])
    ])
  ]
})
export class ToolbarbComponent implements OnInit {

  opened: boolean = false;

  profileSheet: any;

  constructor(private toolbarService: ToolbarService,
              private authenticationService: AuthenticationService,
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
  }

  getMenuItems() {
    return this.toolbarService.menuItems;
  }

  toggle(): void {
    this.opened = !this.opened;
    //if (!this.deviceService.isDesktop()) {
    if(false){
      this.toolbarService.toggleSidenav();
    }
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isDesktop() {
    return this.deviceService.isDesktop();
  }

  openProfileSheet() {
    /*
    const dialogRef = this.profileSheet.open(ProfileSheetComponent, {
      width: '250px',
      data: {user: this.authenticationService.getCurrentUser()}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
    */
  }

}
