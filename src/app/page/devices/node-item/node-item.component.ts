import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.css']
})
export class NodeItemComponent implements OnInit {

  @Input() device;
  constructor() { }

  ngOnInit(): void {
  }

  nameChanged(text: string) {
    console.log('title has changed to ', text);
  }

  descriptionChanged(text: string) {
    console.log('description has changed to ', text);
  }
}
