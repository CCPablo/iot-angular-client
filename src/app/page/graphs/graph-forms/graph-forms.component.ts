import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { DeviceService } from '../../devices/devices.service';
import { autorun } from 'mobx';
import { MatOptionSelectionChange, MatOption } from '@angular/material/core';

export interface Unit {
  name: string;
  nodeId: number;
  id: number;
}

export interface Device {
  name: string;
  units: Unit[];
  location: string;
}

@Component({
  selector: 'app-graph-forms',
  templateUrl: './graph-forms.component.html',
  styleUrls: ['./graph-forms.component.css']
})
export class GraphFormsComponent implements OnInit {

  timeControl = new FormControl(null,Validators.required);

  unitControl = new FormControl([]);

  devices: Device[] = [];

  allUnits: Unit[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    autorun(() => {
      this.devices = this.deviceService.getDevices();
      console.log('devices', this.devices);
      this.devices.forEach(device => {
        device.units.forEach(unit => {
          this.allUnits.push(unit);
        });
      })
    });
  }

  public onRemoveUnit(unit: string) {
    const units = this.unitControl.value as string[];
    this.removeFirst(units, unit);
    this.unitControl.setValue(units); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
