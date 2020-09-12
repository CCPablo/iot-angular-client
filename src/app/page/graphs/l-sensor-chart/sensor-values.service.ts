
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SensorValuesStore } from './sensor-values.store';

@Injectable({
    providedIn: 'root'
  })
export class SensorValuesService {
    readonly VALUES_URL: any = "/values";

    constructor(
      private sensorValuesStore: SensorValuesStore,
      private http: HttpClient
    ) { }

    requestArrayValues(nodeId, unitId, period = 3600000, arrayLength = 24) {
      return this.http.get<any>(`${environment.apiUrl}${this.VALUES_URL}`, {
        params: {
          nodeId: nodeId,
          unitId: unitId,
          intervalDuration: period.toString(),
          numberOfValues: arrayLength.toString()
        },
        observe: 'response'
      })
    }

    requestArraysValues(unitsToPlot, period = 3600000, arrayLength = 24) {
      let requestedUnitKeys = [];
      unitsToPlot.forEach(unit => {
        requestedUnitKeys.push(`${unit.nodeId}:${unit.id}`);
      });
      return this.http.get<any>(`${environment.apiUrl}${this.VALUES_URL}/units`, {
        params: {
          unitKeys: requestedUnitKeys,
          intervalDuration: period.toString(),
          numberOfValues: arrayLength.toString()
        },
        observe: 'response'
      })
    }

    getArrayValues(nodeId, unitId) {
      return this.sensorValuesStore.getArrayValue(nodeId, unitId);
    }

    getMeanValue(nodeId, unitId) {
      return this.sensorValuesStore.getMeanOfUnit(nodeId, unitId);
    }
}
