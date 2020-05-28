import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked, HostListener } from '@angular/core';
import { DeviceService } from './devices.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { values } from 'mobx';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DeviceComponent implements OnInit {

  breakpoint: number;

    constructor(
        private deviceService: DeviceService,
        private http: HttpClient,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.http.get(`${environment.apiUrl}/nodes`).subscribe(devices => {
            //console.log(JSON.stringify(devices))
            //console.log(JSON.parse(JSON.stringify(devices)))

            this.deviceService.setDevices(JSON.parse(JSON.stringify(devices)));
            this.changeDetector.detectChanges();
        })
      }

    getDevices() {
      return this.deviceService.getDevices();
    }

    count() {
      console.count('HTML DEV: change in html')
    }
}
