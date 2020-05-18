import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'main-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  nodeId: number = 4;
  unitId: number = 2;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onChange(event : Number) {
    this.sendPostRequest(event).subscribe(
        response => {
            console.log(response)
        },
        error => {
            console.log(error)
        });
    console.log(JSON.stringify(event));
  }

  sendPostRequest(data: Number): Observable<any> {
    let params = new HttpParams();
    params = params.append('value', data.toString());
    params = params.append('nodeId', this.nodeId.toString());
    params = params.append('unitId', this.unitId.toString());
    console.log(data);
    return this.httpClient.post<any>(`${environment.apiUrl}/unit/value`, null, {params: params});
  }
}
