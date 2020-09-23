import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MainCardComponent implements OnInit {

  expanded = false;

  @Input() packedUnits;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  expandUnits() {
    this.expanded=!this.expanded;
    this.changeDetector.detectChanges();
  }

  getPlottableUnits() {
    return this.packedUnits.units.filter(unit => unit.type == "SENSOR");
  }

  getLights() {
    return this.packedUnits.units.filter(unit => unit.type == "DIMMER");
  }
}
