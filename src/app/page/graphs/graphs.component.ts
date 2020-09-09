import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NodeService } from '../nodes/nodes.service';
import { autorun } from 'mobx';
import { FormGroup } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  unitsToPlot = [];

  constructor(private nodeService: NodeService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
    timer(1000).subscribe(() => {
      this.unitsToPlot = [{
        name: "oaquot",
        description: "me daigual",
        id: 1,
        nodeId: 1,
        graphColor: "red"
      },
      {
        name: "oaquot",
        description: "me daigual",
        id: 2,
        nodeId: 1,
        graphColor: "green"
      }];
      this.changeDetector.detectChanges();
    });
  }

  getNodes() {
    return this.nodeService.getNodes();
  }

  onFormChange(event : FormGroup) {
    this.changeDetector.detectChanges();
  }
}
