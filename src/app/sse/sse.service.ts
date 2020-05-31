import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class SseService {

  constructor(private zone: NgZone) {
  }

  getServerSentEvent(url: string): Observable<MessageEvent> {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this.zone.runOutsideAngular(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this.zone.runOutsideAngular(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
