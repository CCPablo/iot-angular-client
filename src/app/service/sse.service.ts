import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class SseService {

  readonly VALUES = "/sse/stream";

  readonly URL = `${environment.apiUrl}${this.VALUES}`;

  constructor(private zone: NgZone) {
  }

  getServerSentEvent(): Observable<MessageEvent> {
    return new Observable(observer => {
      const eventSource = this.getEventSource();
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

  private getEventSource(): EventSource {
    return new EventSource(this.URL);

  }
}
