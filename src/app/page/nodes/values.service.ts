
import { ValuesStore } from './values.store'
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ValuesService {

    constructor(
      private valuesStore: ValuesStore,
      private http: HttpClient
    ) {
      /*
      this.http.get(`${environment.apiUrl}/values`).subscribe(values => {
        this.setInitialValues(values);
      })
      */
      timer(1).subscribe(() => {
        this.valuesStore.mockInit();
      });

      timer(2000,1000).subscribe(() => {
        this.valuesStore.mock();
        this.valuesStore.setValueArray(1,1,20);
      });
    }

    getArrayValue(nodeId: number, unitId: number) {
      return this.valuesStore.getArrayValue(nodeId, unitId);
    }

    getLatestValues() {
      return this.valuesStore.getLatestValues();
    }

    getLatestValue(nodeId: number, unitId: number) {
      return this.valuesStore.getLatestValue(nodeId, unitId);
    }

}
