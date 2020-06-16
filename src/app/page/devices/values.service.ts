
import { ValuesStore } from './values.store'
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs/internal/observable/timer';
import { Subject } from 'rxjs';

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
      timer(1000).subscribe(() => {
        this.valuesStore.mockInit();
      });
    }

    setInitialValues(values) {
      this.valuesStore.setInitialValues(values);
    }

    getUnitValues() {
      return this.valuesStore.getLatestValues();
    }

    getLatestValue(nodeId: number, unitId: number) {
      return this.valuesStore.getLatestValue(nodeId, unitId);
    }

}
