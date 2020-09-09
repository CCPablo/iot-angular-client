import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NodeService } from './nodes.service';
import { autorun } from 'mobx';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { UnitImageUploadComponent } from './unit-image-upload/unit-image-upload.component';
import { FormControl } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-nodes',
    templateUrl: './nodes.component.html',
    styleUrls: ['./nodes.component.css'],
    animations: [
      trigger('listStagger', [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(-20px)' }),
              stagger(
                '200ms',
                animate(
                  '550ms ease-out',
                  style({ opacity: 1, transform: 'translateY(0px)' })
                )
              )
            ],
            { optional: true }
          ),
          query(':leave', animate('500ms', style({ opacity: 0 })), {
            optional: true
          })
        ])
      ]),
      trigger('inOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('100ms', style({ opacity: 1 })),
        ]),
        transition(':leave', [
          animate('100ms', style({ opacity: 0 }))
        ])
      ]),
    ]

})
export class NodeComponent implements OnInit {

  breakpoint: number;

  editing = false;

  cardsSet = new FormControl();

  constructor(
      private nodeService: NodeService,
      private changeDetector: ChangeDetectorRef,
      private profileSheet: MatDialog
  ) { }

  ngOnInit() {
    autorun(() => {
      this.changeDetector.detectChanges();
    });
  }

  openProfileSheet() {
    const dialogRef = this.profileSheet.open(UnitImageUploadComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editContent( ) {
    this.editing = !this.editing;
  }

  getNodes() {
    return this.nodeService.getUnitsByLocation();
  }

  count() {
    console.count('HTML DEV: change in html')
  }
}
