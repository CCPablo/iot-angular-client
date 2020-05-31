import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DeviceService } from '../devices/devices.service';
import { SseService } from 'src/app/sse/sse.service';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  sseData: any;

  sseSubscription: Subscription;

  constructor(
    private sseService: SseService,
    private changeDetector: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.sseSubscription = this.sseService.getServerSentEvent("http://localhost:8080/sse").subscribe(serverEvent => {
      this.sseData = JSON.parse(serverEvent.data).integer;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.sseSubscription.unsubscribe();
  }

}
