import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from './../devices/devices.service';
import { autorun } from 'mobx';
import { DeviceStore } from '../devices/devices.store';

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
    private deviceStore: DeviceStore
  ) { }

  ngOnInit() {
    const disposer = autorun(() => {
      console.log('reaction', this.deviceService.getDevices());
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
