
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class WeatherService {
    readonly REALTIME_FOLDER: any = "/weather/realtime";

    constructor(
      private http: HttpClient
    ) { }

    requestRealtimeWeather() {
      return this.http.get<any>(`${environment.apiUrl}${this.REALTIME_FOLDER}`, {
        observe: 'response'
      })
    }
}
