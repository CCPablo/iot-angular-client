import { Component, OnInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
  styleUrls: ['./graph-forms.component.scss']
})
export class GraphFormsComponent implements OnInit {

  intervalControl = new FormControl({hours:'1',minutes:'',seconds:'',milliseconds:''},Validators.required);
  unitControl = new FormControl([]);
  nValuesControl = new FormControl(24);

  submitForm = new FormGroup({
    intervalControl: this.intervalControl,
    unitControl: this.unitControl,
    nValuesControl: this.nValuesControl
  });

  devices: Device[] = [];
  allUnits: Unit[] = [];

  @Output() private onFormGroupChange = new EventEmitter<any>();

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

  submit() {
    this.onFormGroupChange.emit(this.submitForm)
  }
}
