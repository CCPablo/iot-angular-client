
import { DeviceStore } from './devices.store'
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class DeviceService implements OnInit{

    constructor(
      private deviceStore: DeviceStore,
      private http: HttpClient
    ) {
      this.http.get(`${environment.apiUrl}/nodes`).subscribe(devices => {
        this.setDevices(devices);
        console.log('received Devices:', devices)
      })
    }

    ngOnInit() {

    }


    setDevices(devices) {
      this.deviceStore.setDevices(devices);
    }

    getDeviceWithId(deviceId) {
      return this.deviceStore.getDeviceWithId(deviceId);
    }

    getDevices() {
      return this.deviceStore.getDevices();
    }

    getTemperatureDevices() {
      return this.deviceStore.temperatureDevices;
    }

    getMockedDevices() {
      return this.deviceStore.getMockedDevices();
    }

    getUnits(deviceId) {
      return this.deviceStore.getDeviceWithId(deviceId)
    }
}
