
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SensorValuesStore } from '../store/sensor-values.store';
import { NodeService } from './nodes.service';

@Injectable({
    providedIn: 'root'
  })
export class SensorValuesService {
    readonly VALUES_URL: any = "/value";

    constructor(
      private sensorValuesStore: SensorValuesStore,
      private http: HttpClient,
      private nodeService: NodeService
    ) {
      setInterval(() => {
        nodeService.getNodes().forEach((node) => {
          node.units.forEach(unit => {
            sensorValuesStore.setNewValue(unit.nodeId, unit.id, {
              value: (Math.random()*20-2).toFixed(1),
              time: new Date().toString()
            })
          });
        })
      },1500);
    }

    requestArrayValues(nodeId, unitId, period = 3600000, arrayLength = 24) {
      let request = this.http.get<any>(`${environment.apiUrl}${this.VALUES_URL}`, {
        params: {
          nodeId: nodeId,
          unitId: unitId,
          intervalDuration: period.toString(),
          numberOfValues: arrayLength.toString()
        },
        observe: 'response'
      })

      request.subscribe((response) => {
      })
      return request;

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

      let request = this.http.get<any>(`${environment.apiUrl}${this.VALUES_URL}/units`, {
        params: {
          unitKeys: requestedUnitKeys,
          intervalDuration: period.toString(),
          numberOfValues: arrayLength.toString()
        },
        observe: 'response'
      });

      request.subscribe((response) => {
        response.body.forEach((array,index) => {
          this.sensorValuesStore.setArray(unitsToPlot[index].nodeId, unitsToPlot[index].id,array);
        });
      })
      return request;


      return this.http.get<any>(`${environment.apiUrl}${this.VALUES_URL}/units`, {
        params: {
          unitKeys: requestedUnitKeys,
          intervalDuration: period.toString(),
          numberOfValues: arrayLength.toString()
        },
        observe: 'response'
      })
    }

    getLatestValue(nodeId, unitId) {
      return this.sensorValuesStore.getLatestValue(nodeId, unitId);
    }

    getArrayValues(nodeId, unitId) {
      return this.sensorValuesStore.getArrayValue(nodeId, unitId);
    }

    getMeanValue(nodeId, unitId) {
      return this.sensorValuesStore.getMeanOfUnit(nodeId, unitId);
    }
}
