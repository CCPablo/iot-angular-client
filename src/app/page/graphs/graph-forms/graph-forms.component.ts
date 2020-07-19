import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeviceService } from '../../devices/devices.service';

@Component({
  selector: 'app-graph-forms',
  templateUrl: './graph-forms.component.html',
  styleUrls: ['./graph-forms.component.css']
})
export class GraphFormsComponent implements OnInit {

  public options: FormGroup;

  constructor(private deviceService: DeviceService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.options = this.formBuilder.group({});
  }

  getDevices() {
    return this.deviceService.getDevices();
  }

}
