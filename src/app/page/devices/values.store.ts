import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { ObservableMap } from 'mobx';

@Injectable({
    providedIn: 'root'
  })
export class ValuesStore {

    @observable latestValues = new ObservableMap();

    @observable arrayValues = new ObservableMap();

    @action mockInit() {
      mockedLatestValues.forEach((value) => {
        this.latestValues.set(this.getKey(value.nodeId, value.unitId),
        {
          value:Math.floor((Math.random() * (100 )) + 1),
          timestamp:value.value.time
        });
      })

      mockedArrayValue.forEach((value) => {
        this.arrayValues.set(this.getKey(value.nodeId, value.unitId),value.values);
      })
    }

    @action setValueArray(nodeId, unitId, value) {
      const currentArray = this.getArrayValue(nodeId, unitId).splice();
      currentArray.unshift(value);
      currentArray.pop();
      this.arrayValues.set(this.getKey(nodeId, unitId), currentArray)
    }

    @action mock() {
      mockedLatestValues.forEach((value) => {
        this.latestValues.set(this.getKey(value.nodeId, value.unitId),{
          value:Math.floor((Math.random() * (100 )) + 1),
          timestamp:value.value.time
        });
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
export const mockedArrayValue = [
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
        value:55,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:56,
        time: 1591314513
      },
      {
        value:44,
        time: 1591314813
      },
      {
        value:33,
        time: 1591315113
      },
      {
        value:2,
        time: 1591315313
      },
      {
        value:55,
        time: 1591315513
      },
      {
        value:77,
        time: 1591315813
      },
      {
        value:2,
        time: 1591313313
      },
      {
        value:4,
        time: 1591316313
      },
      {
        value:55,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:56,
        time: 1591314513
      },
      {
        value:44,
        time: 1591314813
      },
      {
        value:33,
        time: 1591315113
      },
      {
        value:2,
        time: 1591315313
      },
      {
        value:55,
        time: 1591315513
      },
      {
        value:77,
        time: 1591315813
      },
      {
        value:2,
        time: 1591313313
      },
      {
        value:4,
        time: 1591316313
      },
      {
        value:55,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:56,
        time: 1591314513
      },
      {
        value:44,
        time: 1591314813
      },
      {
        value:33,
        time: 1591315113
      },
      {
        value:2,
        time: 1591315313
      },
      {
        value:55,
        time: 1591315513
      },
      {
        value:77,
        time: 1591315813
      },
      {
        value:2,
        time: 1591313313
      },
      {
        value:4,
        time: 1591316313
      },
      {
        value:55,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:56,
        time: 1591314513
      },
      {
        value:44,
        time: 1591314813
      },
      {
        value:33,
        time: 1591315113
      },
      {
        value:2,
        time: 1591315313
      },
      {
        value:55,
        time: 1591315513
      },
      {
        value:77,
        time: 1591315813
      },      {
        value:2,
        time: 1591313313
      },
      {
        value:4,
        time: 1591316313
      },
      {
        value:55,
        time: 1591319313
      },
      {
        value:3,
        time: 1591314213
      },
      {
        value:56,
        time: 1591314513
      },
      {
        value:44,
        time: 1591314813
      },
      {
        value:33,
        time: 1591315113
      },
      {
        value:2,
        time: 1591315313
      },
      {
        value:55,
        time: 1591315513
      },
      {
        value:77,
        time: 1591315813
      },
    ]
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
