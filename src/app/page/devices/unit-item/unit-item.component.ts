import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, NgZone, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { interval, Observable, Subscription, Subject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ValuesService } from '../values.service';
import { HttpClient } from '@angular/common/http';
import { autorun } from 'mobx';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface UnitData {
  name: string;
  description: string;
  type: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.css'],
  animations: [
    trigger('flipCard', [
      state('back', style({
        transform: 'rotateY(180deg)',
        width: '200px'
      })),
      state('front', style({
        transform: 'rotateY(0)',
        width: '120px'
      })),
      transition('back => front', animate('500ms ease-out')),
      transition('front => back', animate('500ms ease-in'))
    ])
  ]
})
export class UnitItemComponent implements OnInit {

  iconName: string;
  iconColor: string;

  timer: Observable<any> = interval(600);
  timerReset$ = new Subject();
  subscription: Subscription;
  mouseInIcon: boolean = false;
  mouseInPopUp: boolean = false;
  popUpVisible: boolean = false;

  @Input('item') unitData: UnitData;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private valueService: ValuesService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  flip: string = 'front';

  toggleFlip() {
    this.flip = (this.flip == 'front') ? 'back' : 'front';
  }

  toggleEdit() {
    let eee= 3;
  }

  public setBulbIntensity(intensity: number) {
    this.iconColor = `rgb(${intensity}, ${intensity}, 33)`;
  }

  count() {
    console.count('unit');
  }

  onMouseEnterIcon() {
    if(this.unitData.type!='DIMMER') {
      return;
    }
    this.mouseInIcon = true;
    if(this.subscription && !this.subscription.closed) {
      return;
    }
    this.popUpVisible = true;    this.subscription = this.timerReset$.pipe(switchMap(() => this.timer)).subscribe(this.timerCallback);
    this.timerReset$.next();
  }

  onMouseLeaveIcon() {
    this.mouseInIcon = false;
    if(this.subscription && !this.subscription.closed) {
      this.timerReset$.next();
    }
  }

  onMouseEnterPopUp() {
    this.mouseInPopUp = true;
  }

  onMouseLeavePopUp() {
    this.mouseInPopUp = false;
    if(this.subscription && !this.subscription.closed) {
      this.timerReset$.next();
    }
  }

  timerCallback = () => {
    if(!(this.mouseInPopUp || this.mouseInIcon)) {
      this.popUpVisible = false;
      this.subscription.unsubscribe();
      this.changeDetector.detectChanges();
    }
  };
}
