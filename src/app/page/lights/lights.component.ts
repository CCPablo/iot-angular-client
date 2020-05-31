import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from '../devices/devices.service';
import { autorun } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class Light implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    const disposer = autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getLightUnits() {
    return this.deviceService.getTemperatureDevices();
  }

  count() {
    console.count('HTML TEMP: change in html')
  }
}