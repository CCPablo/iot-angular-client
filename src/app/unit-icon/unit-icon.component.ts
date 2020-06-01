import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.css']
})
export class UnitIconComponent implements OnInit {

  @Input() color: string = 'black';
  @Input() unitType: string;
  @Input() iconName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
