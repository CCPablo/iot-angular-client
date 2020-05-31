
import { ValuesStore } from './values.store'
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ValuesService implements OnInit {

    constructor(
      private valuesStore: ValuesStore,
      private http: HttpClient
    ) { }

    ngOnInit() {
      this.http.get(`${environment.apiUrl}/values`).subscribe(values => {
        this.setInitialValues(values);
      })
    }

    setInitialValues(values) {
      this.valuesStore.setInitialValues(values);
    }

    getAllValues() {
      return this.valuesStore.getAllValues();
    }
}
