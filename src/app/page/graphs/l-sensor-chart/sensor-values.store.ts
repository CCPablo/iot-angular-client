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


    @action mockInit(nodeId, unitId) {
      mockedSensorValuesGet.forEach((unit) => {
        if(nodeId == unit.nodeId && unitId == unit.unitId) {
          this.sensorArrayValues.set(this.getKey(unit.nodeId, unit.unitId), unit.values);
        }
      })
    }

    @action mockInitAll() {
      mockedSensorValuesGet.forEach((unit) => {
        this.sensorArrayValues.set(this.getKey(unit.nodeId, unit.unitId), unit.values);
      })
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

    getArrayValue(nodeId, unitId) {
      return this.sensorArrayValues.get(this.getKey(nodeId, unitId));
    }

    getArrayValues() {
      return this.sensorArrayValues;
    }

    private getKey(nodeId: number, unitId: number) {
      return `${nodeId}-${unitId}`;
    }
}

export const mockedSensorValuesGet = [
  {
    unitId: 1,
    nodeId: 1,
    values: [
      {
        value:2,
        time: 1591313313
      },
      {
        value:4,
        time: 1591316313
      },
      {
        value:5,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:6,
        time: 1591314513
      },
      {
        value:8,
        time: 1591314813
      },
      {
        value:15,
        time: 1591315113
      },
      {
        value:14,
        time: 1591315313
      },
      {
        value:13,
        time: 1591315513
      },
      {
        value:10,
        time: 1591315813
      },
      {
        value:7,
        time: 1591313313
      },
      {
        value:24,
        time: 1591316313
      },
      {
        value:26,
        time: 1591319313
      },
      {
        value:27,
        time: 1591314213
      },
      {
        value:28,
        time: 1591314513
      },
      {
        value:28,
        time: 1591314813
      },
      {
        value:28,
        time: 1591315113
      },
      {
        value:31,
        time: 1591315313
      },
      {
        value:30,
        time: 1591315513
      },
      {
        value:34,
        time: 1591315813
      },
      {
        value:34,
        time: 1591313313
      },
      {
        value:37,
        time: 1591316313
      },
      {
        value:39,
        time: 1591319313
      },
      {
        value:34,
        time: 1591314213
      },
      {
        value:34,
        time: 1591314513
      },
      {
        value:34,
        time: 1591314813
      },
      {
        value:32,
        time: 1591315113
      },
      {
        value:32,
        time: 1591315313
      },
      {
        value:32,
        time: 1591315513
      },
      {
        value:32,
        time: 1591315813
      },
      {
        value:32,
        time: 1591313313
      },
      {
        value:32,
        time: 1591316313
      },
      {
        value:32,
        time: 1591319313
      },
      {
        value:32,
        time: 1591314213
      },
      {
        value:32,
        time: 1591314513
      },
      {
        value:32,
        time: 1591314813
      },
      {
        value:32,
        time: 1591315113
      },
      {
        value:32,
        time: 1591315313
      },
      {
        value:32,
        time: 1591315513
      },
      {
        value:32,
        time: 1591315813
      },      {
        value:32,
        time: 1591313313
      },
      {
        value:32,
        time: 1591316313
      },
      {
        value:32,
        time: 1591319313
      },
      {
        value:32,
        time: 1591314213
      },
      {
        value:32,
        time: 1591314513
      },
      {
        value:32,
        time: 1591314813
      },
      {
        value:32,
        time: 1591315113
      },
      {
        value:32,
        time: 1591315313
      },
      {
        value:32,
        time: 1591315513
      },
      {
        value:32,
        time: 1591315813
      },
    ]
  },
  {
    unitId: 3,
    nodeId: 1,
    values: [{
      value:100,
      time: 1591313313
    }]
  },
  {
    nodeId: 1,
    unitId: 2,
    values: [{
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    },
    {
      value:4,
      time: 1591313313
    },
    {
      value:100,
      time: 1591313313
    }]
  },
  {
    unitId: 2,
    nodeId: 2,
    values: [{
      value:100,
      time: 1591313313
    }]
  }
]
