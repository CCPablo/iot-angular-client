import { Component, OnInit, ViewChildren, QueryList, ViewChild, EventEmitter, Output, ElementRef, AfterViewInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NodeService } from '../../nodes/nodes.service';
import { autorun } from 'mobx';
import { MatOptionSelectionChange, MatOption } from '@angular/material/core';
import { MatChip } from '@angular/material/chips';

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

  intervalControl = new FormControl({days:null, hours:1, minutes:null,seconds:null},Validators.required);
  unitControl = new FormControl([]);
  nValuesControl = new FormControl(24);

  submitForm = new FormGroup({
    intervalControl: this.intervalControl,
    unitControl: this.unitControl,
    nValuesControl: this.nValuesControl
  });

  nodes: Node[] = [];
  allUnits: Unit[] = [];

  @Output() private onFormGroupChange = new EventEmitter<any>();

  constructor(private nodeService: NodeService,
      private renderer: Renderer2) { }

  ngOnInit(): void {
    autorun(() => {
      this.nodes = this.nodeService.getNodes();
      console.log('nodes', this.nodes);
      this.nodes.forEach(node => {
        node.units.forEach(unit => {
          this.allUnits.push(unit);
        });
      })
    });
  }

  ngAfterViewInit() {
    this.chips.changes.subscribe(_ => {
      this.chips.toArray().forEach((chip,index) => {
        console.log(chip._elementRef.nativeElement)
        console.log( this.unitControl.value[index])
        this.renderer.setStyle(chip._elementRef.nativeElement, "background-color", this.unitControl.value[index].graphColor, RendererStyleFlags2.DashCase | RendererStyleFlags2.Important);
      })
    });
  }

  onChipListChanged(unitsSelected : Unit[]) {
    this.chips.toArray().forEach((chip,index) => {
      console.log(chip._elementRef.nativeElement)
      this.renderer.setStyle(chip._elementRef.nativeElement, "background-color", "blue", RendererStyleFlags2.DashCase | RendererStyleFlags2.Important);
    })
  }

  public onRemoveUnit(unit: string) {
    const units = this.unitControl.value as string[];
    this.removeFirst(units, unit);
    this.unitControl.setValue(units);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  submit() {
    this.onFormGroupChange.emit(this.submitForm)
  }
}
