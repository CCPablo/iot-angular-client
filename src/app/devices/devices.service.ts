
import { DeviceStore, mockedDevices } from './devices.store'
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

    getUnits(deviceId) {
      return this.deviceStore.getDeviceWithId(deviceId)
    }

    getMockedDevices() : any {
      return this.deviceStore.getMockedDevices();
    }
}
