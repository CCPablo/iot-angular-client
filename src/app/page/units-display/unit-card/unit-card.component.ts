import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, NgZone, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { SensorValuesService } from '../../../service/sensor-values.service';
import { reaction, IReactionDisposer, values } from 'mobx';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as Color from 'color';

export interface UnitData {
  name: string;
  description: string;
  type: string;
  id: number,
  nodeId: number
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.css'],
  animations: [
    trigger('flipCard', [
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      state('front', style({
        transform: 'rotateY(0)'
      })),
      transition('back => front', animate('500ms ease-out')),
      transition('front => back', animate('500ms ease-in'))
    ])
  ]
})
export class UniCardComponent implements OnInit, OnDestroy {

  iconName: string;
  iconMaxColor: Color = Color('white');
  iconMinColor: Color = Color('white');
  iconIntensity: number = 0;

  @Input() unitData: UnitData;

  @Input() reversable: boolean = false;

  @Input() plottable: boolean = false;

  value;

  disposers: IReactionDisposer[] = [];

  flip: string = 'front';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private valueService: SensorValuesService) {
  }

  ngOnInit(): void {
    if(this.unitData.type=='SENSOR') {
      this.iconMaxColor = Color('red');
      this.iconMinColor = Color('blue');
    } else {
      this.iconMaxColor = Color('yellow');
      this.iconMinColor = Color('black')
    }

    this.disposers.push(reaction(
      () => this.valueService.getLatestValue(this.unitData.nodeId, this.unitData.id),
      (value) => {
        this.value = value.value;
        this.changeDetector.detectChanges()
      }
    ));
  }

  ngOnDestroy(): void {
    this.disposers.forEach(disposer => {
      disposer();
    });
  }

  toggleEdit() {
  }

  toggleFlip() {
    if(this.reversable) {
      this.flip = (this.flip == 'front') ? 'back' : 'front';
    }
  }

  /*
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

  onMouseLeavePopUp() {
    this.mouseInPopUp = false;
    if(this.subscription && !this.subscription.closed) {
      this.timerReset$.next();
    }
  }
  */
}
