import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.css']
})
export class NodeItemComponent implements OnInit {

  endEditing: Subject<boolean> = new Subject<boolean>();

  editing = false;

  @Input() device;
  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.editing = true;
  }

  nameChanged(text: string) {
    console.log('title has changed to ', text);
  }

  descriptionChanged(text: string) {
    console.log('description has changed to ', text);
  }

  saveEdit() {
    this.endEditing.next(true);
    this.editing = false;
  }

  discardEdit() {
    this.endEditing.next(false);
    this.editing = false;
  }
}
