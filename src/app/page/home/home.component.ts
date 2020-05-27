import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../devices/devices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private deviceService: DeviceService) {
  }

  ngOnInit(): void {
  }

}
