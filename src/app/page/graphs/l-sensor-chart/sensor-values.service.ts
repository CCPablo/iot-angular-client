
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, timer } from 'rxjs';
import { SensorValuesStore, mockedSensorValuesGet } from './sensor-values.store';

@Injectable({
    providedIn: 'root'
  })
export class SensorValuesService {

    constructor(
      private sensorValuesStore: SensorValuesStore,
      private http: HttpClient
    ) {
      setInterval(() => {
        this.sensorValuesStore.setNewValue(1,1, {
          value: this.generateNumber(),
          time: 400
        });
        this.sensorValuesStore.setNewValue(1,2, {
          value: this.generateNumber(),
          time: 400
        });
        this.sensorValuesStore.setNewValue(2,2, {
          value: this.generateNumber(),
          time: 400
        })
        timer(1500).subscribe(() => {
          this.sensorValuesStore.removeFirstValue(1,1);
          this.sensorValuesStore.removeFirstValue(1,2);
          this.sensorValuesStore.removeFirstValue(2,2);
        })
        },3000)
    }


    requestArrayValues(nodeId, unitId, period = 50, arrayLength = 50){
        timer(300).subscribe(() => {
          this.sensorValuesStore.mockInit(nodeId, unitId);
          /*
          this.sensorValuesStore.setNewValue(nodeId,unitId, {
            value: this.generateNumber(),
            time: 400
          });
          */
        });
    }

    getArrayValues(nodeId, unitId) {
      return this.sensorValuesStore.getArrayValue(nodeId, unitId);
    }

    getMeanValue(nodeId, unitId) {
      return this.sensorValuesStore.getMeanOfUnit(nodeId, unitId);
    }

    private generateNumber() {
      return Math.floor((Math.random() *10) + 1);
    }

}
