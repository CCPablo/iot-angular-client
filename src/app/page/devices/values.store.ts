import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';

@Injectable({
    providedIn: 'root'
  })
export class ValuesStore {

    @observable.shallow values = [];

    getAllValues() {
      return this.values;
    }

    @action setInitialValues(values) {
      this.values = values;
    }
}

export const mockedValues = [
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
