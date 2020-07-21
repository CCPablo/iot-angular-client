import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DeviceService } from './devices.service';
import { autorun } from 'mobx';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css'],
    animations: [
      trigger('listStagger', [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(-20px)' }),
              stagger(
                '200ms',
                animate(
                  '550ms ease-out',
                  style({ opacity: 1, transform: 'translateY(0px)' })
                )
              )
            ],
            { optional: true }
          ),
          query(':leave', animate('500ms', style({ opacity: 0 })), {
            optional: true
          })
        ])
      ])
    ]

})
export class DeviceComponent implements OnInit {

  breakpoint: number;

  editing = false;

  constructor(
      private deviceService: DeviceService,
      private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  editContent( ) {
    this.editing = !this.editing;
  }

  getDevices() {
    return this.deviceService.getDevices();
  }

  count() {
    console.count('HTML DEV: change in html')
  }
}
