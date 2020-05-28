import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from './../devices/devices.service';
import { autorun } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    const disposer = autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getTemperatureDevices() {
    return this.deviceService.getTemperatureDevices();
  }

  count() {
    console.count('HTML TEMP: change in html')
  }
}
