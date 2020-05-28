import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';

@Injectable({
    providedIn: 'root'
  })
export class DeviceStore {

    @observable.shallow devices = [];

    getDevices() {
      return this.devices;
    }

    @action setDevices(devices) {
      this.devices = devices;
    }

    @computed get temperatureDevices() {
      let auxDevices = this.devices;
      auxDevices.forEach((device, deviceIndex) => device.units.forEach(
        (unit, unitIndex) => {
          if(unit.type != 'TEMPERATURE_SENSOR') {
            auxDevices[deviceIndex].units.splice(unitIndex, 1);
          }
        }));

      return auxDevices.filter(
        device =>
          device.units.length != 0
        );
    }

    getMockedDevices() {
      return mockedDevices;
    }

    getDeviceWithId(deviceId) {
      return this.devices[deviceId];
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
            type: 'ACTUATOR'
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
            type: 'ACTUATOR'
        },
        {
            unitId: 1,
            name: 'Actuador1',
            description: 'Rele de activación1',
            type: 'ACTUADOR'
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
            type: 'TEMPERATURE_SENSOR'
        },
        {
            unitId: 1,
            name: 'Sensor1',
            description: 'Sensor de temperatura2',
            type: 'SENSOR'
        }
    ]
    }
]
