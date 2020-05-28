import { Component, OnInit, Input } from '@angular/core';

export interface UnitData {
  name: string;
  description: string;
  type: string;
}

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.css']
})
export class UnitItemComponent implements OnInit {

  iconName: string;

  @Input('item') unitData: UnitData;
  constructor() {
  }

  ngOnInit(): void {
    switch(this.unitData.type) {
      case 'SENSOR':
        this.iconName = 'wb_incandescent';
    }
  }

}
