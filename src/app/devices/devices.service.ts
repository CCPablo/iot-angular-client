
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

    getDevices() {
        return this.deviceStore.getDevices();
    }

    getMockedDevices() : any {
        return this.deviceStore.getMockedDevices();
    }
}