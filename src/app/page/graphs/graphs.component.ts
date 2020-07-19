import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from '../devices/devices.service';
import { autorun } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor(private deviceService: DeviceService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getDevices() {
    return this.deviceService.getDevices();
  }
}
