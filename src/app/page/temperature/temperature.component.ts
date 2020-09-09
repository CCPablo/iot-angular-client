import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, ChangeDetectionStrategy } from '@angular/core';
import { NodeService } from './../nodes/nodes.service';
import { autorun } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private nodeService: NodeService,
  ) { }

  ngOnInit() {
    const disposer = autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  getTemperatureNodes() {
    return this.nodeService.getTemperatureNodes();
  }

  count() {
    console.count('HTML TEMP: change in html')
  }
}
