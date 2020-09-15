import { Component, OnInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output, ElementRef, AfterViewInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NodeService } from '../../../service/nodes.service';
import { autorun } from 'mobx';
import { MatOptionSelectionChange, MatOption, MatOptgroup } from '@angular/material/core';
import { MatChip } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface Unit {
  name: string;
  nodeId: number;
  id: number;
  graphColor: string;
}

export interface Node {
  name: string;
  units: Unit[];
  location: string;
}

@Component({
  selector: 'app-graph-forms',
  templateUrl: './graph-forms.component.html',
  styleUrls: ['./graph-forms.component.scss']
})
export class GraphFormsComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatChip) chips: QueryList<MatChip>;
  @ViewChildren(MatOption) options: QueryList<MatOption>;

  intervalControl = new FormControl({days:null, hours:1, minutes:null, seconds:null},Validators.required);
  unitsSelectedControl = new FormControl([]);
  numberOfValuesControl = new FormControl(24);
  realTimeControl = new FormControl(true);

  submitForm = new FormGroup({
    interval: this.intervalControl,
    unitsSelected: this.unitsSelectedControl,
    numberOfValues: this.numberOfValuesControl,
    realTime: this.realTimeControl
  });

  nodes: Node[] = [];

  @Output() private onFormGroupSubmit = new EventEmitter<any>();

  constructor(
    private nodeService: NodeService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    autorun(() => {
      this.nodes = this.nodeService.getNodes();

    });
  }

  ngAfterViewInit() {
    this.chips.changes.subscribe(_ => {
      this.chips.toArray().forEach((chip,index) => {
        this.renderer.setStyle(chip._elementRef.nativeElement, "background-color", this.unitsSelectedControl.value[index].graphColor, RendererStyleFlags2.DashCase | RendererStyleFlags2.Important);
      })
    });
  }

  public onRemoveUnit(event, unit) {
    const selectedUnits = this.unitsSelectedControl.value;
    this.removeFirst(selectedUnits, unit);
    this.unitsSelectedControl.setValue(selectedUnits);

    this.options.forEach((option) => {
      if (option.value === unit) {
        option.deselect();
      }
    });
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  submit() {
    this.onFormGroupSubmit.emit(this.submitForm)
  }
}
