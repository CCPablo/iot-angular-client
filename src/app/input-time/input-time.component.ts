import { Component, Input, OnDestroy, HostBinding, Self, Optional, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';


class TimeInput {
  constructor(public hours: string, public minutes: string, public seconds: string, public milliseconds: string) {
  }
}

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: TimeInput}],
})
export class InputTimeComponent implements OnDestroy,MatFormFieldControl<TimeInput> {
  parts: FormGroup;

  stateChanges = new Subject<void>();

  static nextId = 0;
  @HostBinding() id = `app-input-time-${InputTimeComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  focused = false;

  get empty() {
    let n = this.parts.value;
    return !n.area && !n.exchange && !n.subscriber;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  errorState = false;

  controlType = 'app-input-time';

  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  @Input()
  get value(): TimeInput | null {
    let time = this.parts.value;
    if (time.hours.length || time.minutes.length || time.seconds.length || time.milliseconds.length ) {
      return new TimeInput(time.hours, time.minutes, time.seconds, time.milliseconds);
    }
    return null;
  }

  set value(time: TimeInput | null) {
    time = time || new TimeInput('', '', '','');
    this.parts.setValue({hours: time.hours, minutes: time.minutes, seconds: time.seconds, milliseconds: time.milliseconds});
    this.stateChanges.next();
  }

  constructor(fb: FormBuilder, @Optional() @Self() public ngControl: NgControl, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
      this.parts =  fb.group({
      'hours': '',
      'minutes': '',
      'seconds': '',
      'milliseconds': ''
    });
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    /*
      // Replace the provider from above with this.
      if (this.ngControl != null) {
        // Setting the value accessor directly (instead of using
        // the providers) to avoid running into a circular import.
        this.ngControl.valueAccessor = this;
      }
    }
    */
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }


}
/*class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}

@Component({
  selector: 'example-tel-input',
  template: `
    <div [formGroup]="parts">
      <input class="area" formControlName="area" maxlength="3">
      <span>&ndash;</span>
      <input class="exchange" formControlName="exchange" maxlength="3">
      <span>&ndash;</span>
      <input class="subscriber" formControlName="subscriber" maxlength="4">
    </div>
  `,
  styles: [`
    div {
      display: flex;
    }
    input {
      border: none;
      background: none;
      padding: 0;
      outline: none;
      font: inherit;
      text-align: center;
    }
  `],
})
class MyTelInput {
  parts: FormGroup;

  @Input()
  get value(): MyTel | null {
    let n = this.parts.value;
    if (n.area.length == 3 && n.exchange.length == 3 && n.subscriber.length == 4) {
      return new MyTel(n.area, n.exchange, n.subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.parts.setValue({area: tel.area, exchange: tel.exchange, subscriber: tel.subscriber});
  }

  constructor(fb: FormBuilder) {
    this.parts =  fb.group({
      'area': '',
      'exchange': '',
      'subscriber': '',
    });
  }
}*/
