import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import * as Color from 'color';

@Component({
  selector: 'app-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.css']
})
export class UnitIconComponent implements OnInit, OnChanges {

  color: Color = Color('rgb(0, 0, 0)');

  @Input() minColor: Color = Color('rgb(255, 255, 255)');
  @Input() maxColor: Color = Color('rgb(255, 255, 255)');
  @Input() maxIntensity: number = 100;
  @Input() intensity: number = 0;
  @Input() unitType: string;
  @Input() iconName: string;
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.interpolate();
  }

  interpolate() {
    this.color = this.color.red((this.maxColor.red()-this.minColor.red()) * (this.intensity/this.maxIntensity) + this.minColor.red())
    .green((this.maxColor.green()-this.minColor.green()) * (this.intensity/this.maxIntensity) + this.minColor.green())
    .blue((this.maxColor.blue()-this.minColor.blue()) * (this.intensity/this.maxIntensity) + this.minColor.blue());
  }

  value() {
  }

  count() {
  }

}
