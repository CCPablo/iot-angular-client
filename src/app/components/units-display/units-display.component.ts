import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NodeService } from '../../service/nodes.service'
import { autorun } from 'mobx';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-units-display',
    templateUrl: './units-display.component.html',
    styleUrls: ['./units-display.component.css'],
    animations: [
      trigger('listStagger', [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(-20px)' }),
              stagger(
                '100ms',
                animate(
                  '550ms ease-out',
                  style({ opacity: 1, transform: 'translateY(0px)' })
                )
              )
            ],
            { optional: true }
          )
        ])
      ])
    ]
})
export class UnitsDisplayComponent implements OnInit {

  breakpoint: number;

  cardsDisposalControl = 'localizacion';

  units;

  constructor(
      private nodeService: NodeService,
      private changeDetector: ChangeDetectorRef,
      private deviceService: DeviceDetectorService  ) {
  }

  ngOnInit() {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  isDesktop() {
    return this.deviceService.isDesktop();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.nodeService.getUnitsByLocation(), event.previousIndex, event.currentIndex);
  }

  getNodes() {
    return this.nodeService.getNodes();
  }

  getUnitsByLocation() {
    return this.nodeService.getUnitsByLocation();
  }
}
