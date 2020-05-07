import { Injectable } from '@angular/core';
import { observable, action } from 'mobx-angular';

@Injectable({
    providedIn: 'root'
  })
export class DeviceStore {

    @observable private devices = [];

    @action setDevices(devices) {
        this.devices = devices;
    }

    getDevices() {
        return this.devices;
    }

    getMockedDevices() {
        return mockedDevices;
    }
}

export const mockedDevices = [
    {
      name: 'Device1',
      description: 'Lampara de la mesa negra',
      deviceId: 1,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 1,
            name: 'Relé',
            description: 'Relé de activación',
            unitType: 'ACTUATOR'
        },
        {
            unitId: 1,
            name: 'Sensor1',
            description: 'Sensor de temperatura',
            unitType: 'SENSOR'
        }
    ]
    },
    {
      name: 'Device2',
      description: 'Lampara de la mesa negra',
      deviceId: 2,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 2,
            name: 'Actuador2',
            description: 'Relé de activación2',
            unitType: 'ACTUATOR'
        },
        {
            unitId: 1,
            name: 'Actuador1',
            description: 'Rele de activación1',
            unitType: 'ACTUADOR'
        }
    ]  
    },
    {
      name: 'Device3',
      description: 'Lampara de la mesa negra',
      deviceId: 3,
      connectedSince: 1111122222,
      units: [
        {
            unitId: 2,
            name: 'Sensor2',
            description: 'Sensor de humedad',
            unitType: 'SENSOR'
        },
        {
            unitId: 1,
            name: 'Sensor1',
            description: 'Sensor de temperatura2',
            unitType: 'SENSOR'
        }
    ]
    }
]