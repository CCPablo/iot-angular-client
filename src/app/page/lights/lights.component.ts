import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { NodeService } from '../nodes/nodes.service';
import { autorun } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private nodeService: NodeService,
  ) { }

  ngOnInit() {
    const disposer = autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getLightUnits() {
    return this.nodeService.getLightUnits();
  }

  count() {
    console.count('HTML LIGHTSD: change in html')
  }
}
