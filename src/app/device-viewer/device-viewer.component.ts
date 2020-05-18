import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../devices/devices.service';

@Component({
  selector: 'app-device-viewer',
  templateUrl: './device-viewer.component.html',
  styleUrls: ['./device-viewer.component.css']
})
export class DeviceViewerComponent implements OnInit {

  device: any;

  @Input()
  deviceId: number;
  constructor(private deviceService: DeviceService) {
    this.device = deviceService.getDeviceWithId(this.deviceId);
  }

  ngOnInit(): void {
  }

}
