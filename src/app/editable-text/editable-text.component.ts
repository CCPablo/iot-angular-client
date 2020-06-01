import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent implements OnInit {

  editText = '';

  private endEditSubscription: Subscription;

  @Input()
  endEditEvent: Observable<boolean>;

  @Output()
  onTextChanged = new EventEmitter<string>();

  @Input()
  editing = false;

  @Input()
  text: string = 'add text....';

  constructor() {}

  ngOnInit() {
    this.editText = this.text;
    this.endEditSubscription = this.endEditEvent.subscribe((save) => this.onResolution(save));
  }

  ngOnDestroy() {
    this.endEditSubscription.unsubscribe();
  }

  edit() {
    this.editing = true;
  }

  onResolution(save: boolean) {
    if(save == true && this.text !== this.editText) {
      this.text = this.editText;
      this.onTextChanged.emit(this.text);
    }
    this.editText = this.text;
  }
}
