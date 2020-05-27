
import { DeviceStore } from './devices.store'
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class DeviceService {

    constructor(
      private deviceStore: DeviceStore
    ) { }

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
