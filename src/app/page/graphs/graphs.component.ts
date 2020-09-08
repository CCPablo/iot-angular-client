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

  unitData = [   {
    name: "oaquot",
    description: "me daigual",
    id: 1,
    nodeId: 1,
    graphColor: "red"
  },
  {
    name: "oaquot",
    description: "me daigual",
    id: 2,
    nodeId: 1,
    graphColor: "green"
  }];

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
    this.changeDetector.detectChanges();
  }
}
