import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.css']
})
export class NodeItemComponent implements OnInit {

  @Input() node;
  constructor() { }

  ngOnInit(): void {
  }
}
