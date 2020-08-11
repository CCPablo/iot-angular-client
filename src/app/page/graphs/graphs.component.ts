import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DeviceService } from '../devices/devices.service';
import { autorun } from 'mobx';
import { FormGroup } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  unitData = [];

  constructor(private deviceService: DeviceService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getDevices() {
    return this.deviceService.getDevices();
  }

  onFormChange(event : FormGroup) {
    console.log(event);
    console.log(event.value.unitControl);
    this.changeDetector.detectChanges();
  }
}
