import { Component, OnInit, Input } from '@angular/core';
import { FormatWidth } from '@angular/common';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.css']
})
export class CustomSpinnerComponent implements OnInit {

  @Input() width = '30%';

  size;

  borderWidth;

  constructor() { }

  ngOnInit(): void {
    this.size = {
      width: this.width,
      height: this.width
    }

    this.borderWidth = {
      border: this.width + ' solid black'
    }
  }

}
