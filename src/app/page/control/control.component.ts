import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event : Number) {
    console.log(event);
  }
}
