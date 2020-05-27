import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { DeviceService } from './devices.service';
import { DeviceStore } from './devices.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DeviceComponent implements OnInit {

    constructor(
        private deviceService: DeviceService,
        private http: HttpClient,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.http.get(`${environment.apiUrl}/nodes`).subscribe(devices => {
            this.deviceService.setDevices(devices);
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
