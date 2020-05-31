import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DeviceService } from './devices.service';
import { autorun } from 'mobx';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DeviceComponent implements OnInit {

  breakpoint: number;

  constructor(
      private deviceService: DeviceService,
      private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getDevices() {
    return this.deviceService.getDevices();
  }

  count() {
    console.count('HTML DEV: change in html')
  }
}
