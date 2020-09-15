import { Component, Input, OnDestroy, HostBinding, Self, Optional, ElementRef, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class InputTime {
  constructor( public days: Number = null, public hours: Number = null, public minutes: Number = null, public seconds: Number = null) {}
}

@Component({
  selector: 'app-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: InputTimeComponent}],
})
export class InputTimeComponent implements OnDestroy,MatFormFieldControl<InputTime>,ControlValueAccessor {

  daysFocused = false;
  hourFocused = false;
  minutesFocused = false;
  secondsFocused = false;

  resetForm() {
    this.parts.reset();
  }

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
    let time = this.parts.value;
    return !(time.days || time.hours || time.minutes || time.seconds);
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
  get value(): InputTime | null {
    let time = this.parts.value;
    if ( time.days || time.hours || time.minutes || time.seconds) {
      return new InputTime(time.days, time.hours, time.minutes, time.seconds);
    }
    return null;
  }

  set value(time: InputTime | null) {
    time = time || new InputTime();
    this.parts.setValue({ days: time.days, hours: time.hours, minutes: time.minutes, seconds: time.seconds});
    this.stateChanges.next();
  }

  constructor(fb: FormBuilder, @Optional() @Self() public ngControl: NgControl | null, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
      this.parts =  fb.group({
      'days': '',
      'hours': '',
      'minutes': '',
      'seconds': ''
    });
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    if (ngControl) {
      // Set the value accessor directly (instead of providing
      // NG_VALUE_ACCESSOR) to avoid running into a circular import
      this.ngControl.valueAccessor = this;
      ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  onTouched(): void {}

  private destroy: Subject<void> = new Subject();

  registerOnChange(onChange: (value: InputTime | null) => void): void {
    this.parts.valueChanges.pipe(
      takeUntil(this.destroy),
    ).subscribe(onChange);
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(shouldDisable: boolean): void {
    if (shouldDisable) {
      this.parts.disable();
    } else {
      this.parts.enable();
    }

    this.disabled = shouldDisable;
  }

  writeValue(value: InputTime | null): void {
    value = value || new InputTime();

    this.parts.setValue(value, { emitEvent: false });
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
