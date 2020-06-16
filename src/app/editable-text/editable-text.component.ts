import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent implements OnInit {

  editedText = '';

  editing: boolean = false;

  /*
  private beginEditSub: Subscription;
  private resolveEditSub: Subscription;

  @Input() resolveEdit: Observable<boolean>;
  @Input() beginEdit: Observable<void>;
  */

  @Output()
  onTextChanged = new EventEmitter<string>();

  @Input()
  text: string = 'add text....';
  constructor() {}

  ngOnInit() {
    this.editedText = this.text;
    /*
    this.beginEditSub = this.beginEdit.subscribe((save) => this.onBeginEdit());
    this.resolveEditSub = this.resolveEdit.subscribe((save) => this.onEditResolution(save));
    */
  }
/*
  ngOnDestroy() {
    this.beginEditSub.unsubscribe();
    this.resolveEditSub.unsubscribe();
  }
  */

  onBeginEdit() {
    this.editing = true;
  }

  onEditResolution(save: boolean) {
    if(save == true && this.text !== this.editedText) {
      this.text = this.editedText;
      this.onTextChanged.emit(this.text);
    }
    this.editedText = this.text;
    this.editing = false;
  }
}
