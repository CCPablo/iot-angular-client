import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { ObservableMap } from 'mobx';
import { computedFn } from 'mobx-utils'

@Injectable({
    providedIn: 'root'
  })
export class SensorValuesStore {

    @observable sensorArrayValues = new ObservableMap();

    getMeanOfUnit = computedFn(function getMeanOfUnit(nodeId, unitId) {
      if(!this.sensorArrayValues.get(this.getKey(nodeId,unitId))) {
        return;
      }

      let mean = 0;
      let numberOfElements = 0;
      this.sensorArrayValues.get(this.getKey(nodeId,unitId)).forEach(element => {
        mean += element.value;
        numberOfElements++;
      });
      mean /= numberOfElements;
      return mean;
    })

    @action setArray(nodeId, unitId, array) {

      let arrayEnd = [];
      array.forEach(element => {
        arrayEnd.push({
          value:element.second,
          time:element.first
        })
      });
      this.sensorArrayValues.set(this.getKey(nodeId, unitId),arrayEnd);
    }

    @action setNewValue(nodeId, unitId, value) {
      if(!this.sensorArrayValues.get(this.getKey(nodeId,unitId))) {
        this.sensorArrayValues.set(this.getKey(nodeId,unitId),[{value:0, time:0}]);
        return;
      }
      const currentArray = this.sensorArrayValues.get(this.getKey(nodeId, unitId)).toJS();
      currentArray.push(value);

      this.sensorArrayValues.set(this.getKey(nodeId, unitId), currentArray);
    }

    @action removeFirstValue(nodeId, unitId) {
      if(!this.sensorArrayValues.get(this.getKey(nodeId,unitId))) {
        this.sensorArrayValues.set(this.getKey(nodeId,unitId),[{value:0, time:0}]);
        return;
      }
      const currentArray = this.sensorArrayValues.get(this.getKey(nodeId, unitId)).toJS();
      currentArray.shift();
      this.sensorArrayValues.set(this.getKey(nodeId, unitId), currentArray);
    }

    getLatestValue = computedFn(function getLatestValue(nodeId, unitId) {
      if(!this.sensorArrayValues.get(this.getKey(nodeId,unitId))) {
        return;
      }
      return this.sensorArrayValues.get(this.getKey(nodeId, unitId)).slice(-1).pop();
    })

    getArrayValue(nodeId, unitId) {
      return this.sensorArrayValues.get(this.getKey(nodeId, unitId));
    }

    getArrayValues() {
      return this.sensorArrayValues;
    }

    private getKey(nodeId: number, unitId: number) {
      return `${nodeId}:${unitId}`;
    }
}
