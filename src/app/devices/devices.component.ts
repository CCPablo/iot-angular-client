import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DeviceService } from './devices.service';
import { DeviceStore } from './devices.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'device-component',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})
export class DeviceComponent implements OnInit {

    constructor(
        private deviceService: DeviceService,
        private deviceStore: DeviceStore,
        private http: HttpClient,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.http.get(`${environment.apiUrl}/devices`)
        .subscribe(devices => {
            this.deviceStore.setDevices(devices);
            this.changeDetector.detectChanges();
        })
    }

    getDevices() {
        return this.deviceService.getDevices();
    }
}
