import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NodeService } from '../nodes/nodes.service';
import { autorun } from 'mobx';
import { FormGroup } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
  animations: [
    trigger('slideInOut', [
      state('notLoaded', style({
        opacity: 0
      })),
      state('loaded', style({
        opacity: 1
      })),
      transition('notLoaded => loaded', animate('350ms ease-in-out'))
    ])
  ]
})
export class GraphsComponent implements OnInit {

  unitsToPlot = [];

  interval: number;

  numberOfValues: number;

  realTime: boolean;

  loaded = false;

  readonly DAY_TO_MS = 86400000;

  readonly HOUR_TO_MS = 3600000;

  readonly MIN_TO_MS = 60000;

  readonly SEC_TO_MS = 1000;

  constructor(private nodeService: NodeService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  chartLoaded(loaded) {
    this.loaded = loaded;
    console.log(loaded);
    this.changeDetector.detectChanges();
  }

  getNodes() {
    return this.nodeService.getNodes();
  }

  onFormSubmit(event : FormGroup) {
    this.interval = this.toMS(event.value.interval);
    this.numberOfValues = event.value.numberOfValues;
    this.unitsToPlot = event.value.unitsSelected;
    this.realTime = event.value.realTime;
    this.changeDetector.detectChanges();
  }

  toMS(intervalControl) {
    return intervalControl.days*this.DAY_TO_MS +
            intervalControl.hours*this.HOUR_TO_MS +
            intervalControl.minutes*this.MIN_TO_MS +
            intervalControl.seconds*this.SEC_TO_MS + 1;
  }
}
