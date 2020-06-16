import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { ObservableMap } from 'mobx';

@Injectable({
    providedIn: 'root'
  })
export class ValuesStore {

    @observable.shallow latestValues = new ObservableMap();

    @observable.shallow arrayValues = new ObservableMap();

    @action setInitialValues(values) {
      values.forEach((value) => {
        this.latestValues.set(this.getKey(value.nodeId, value.unitId),value.value)
      })
    }

    @action setValueArray(nodeId, unitId, values) {
      this.arrayValues.set(this.getKey(nodeId, unitId), [values.values])
    }

    @action mockInit() {
      mockedLatestValues.forEach((value) => {
        this.latestValues.set(this.getKey(value.nodeId, value.unitId),value.value)
      })
    }

    getArrayValue(nodeId, unitId) {
      return this.arrayValues.get(this.getKey(nodeId, unitId));
    }

    getArrayValues() {
      return this.arrayValues;
    }

    getLatestValue(nodeId, unitId) {
      return this.latestValues.get(this.getKey(nodeId, unitId));
    }

    getLatestValues() {
      return this.latestValues;
    }

    private getKey(nodeId: number, unitId: number) {
      return `${nodeId}-${unitId}`;
    }

}
export const mockedArrayValue = {
  unitId: 2,
  nodeId: 2,
  values: [
    {
      value: 13,
      time: 1591313313
    },
    {
      value: 13,
      time: 1591313250
    },
    {
      value: 200,
      time: 1591313100
    },
    {
      value: 13,
      time: 1591313000
    },
    {
      value: 13,
      time: 1591312970
    },
    {
      value: 13,
      time: 1591312900
    },
    {
      value: 13,
      time: 1591312800
    },
    {
      value: 13,
      time: 1591312700
    },
  ]
}


export const mockedLatestValues = [
    {
      unitId: 1,
      nodeId: 1,
      value: {
        value:2,
        time: 1591313313
      }
    },
    {
      unitId: 2,
      nodeId: 1,
      value: {
        value:100,
        time: 1591313313
      }
    },
    {
      unitId: 3,
      nodeId: 1,
      value: {
        value:40,
        time: 1591313313
      }
    },
    {
      unitId: 1,
      nodeId: 2,
      value: {
        value:13,
        time: 1591313313
      }
    },
    {
      unitId: 2,
      nodeId: 2,
      value: {
        value:44,
        time: 1591313313
      }
    }
]
