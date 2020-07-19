import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, OnChanges, DoCheck, IterableDiffer, KeyValueDiffer, KeyValueDiffers, IterableDiffers, OnDestroy } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ValuesService } from '../../values.service';
import { IReactionDisposer, reaction } from 'mobx';

interface UnitData {
  name: string;
  description: string;
  type: string;
  id: number,
  nodeId: number
}

@Component({
  selector: 'app-sensor-chart',
  templateUrl: './sensor-chart.component.html',
  styleUrls: ['./sensor-chart.component.css']
})
export class SensorChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() unitData: UnitData;

  valueArray = new Array<number>(40);
  labelArray = new Array<string>(40);

  lineChartData: ChartDataSets[] = [
    { data: this.valueArray }
  ];
  lineChartLabels: Label[] = this.labelArray;
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        id: 'x-axis-0',
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
      }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';

  disposers: IReactionDisposer[] = [];


  constructor(private valueService: ValuesService,
    private changeDetector: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.disposers.push(reaction(
      () => this.valueService.getArrayValue(this.unitData.nodeId, this.unitData.id),
      (valueObj) => {
        console.log('changed');
        this.changeDetector.detectChanges()
      }
    ));
  }

  ngOnDestroy() {
    this.disposers.forEach(disposer => {
      disposer();
    })
  }

  changeValues() {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  /*    this.lineChartOptions.scales.yAxes.push(
      {
        id: 'y-axis-1',
        position: 'right',
        gridLines: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          fontColor: 'red',
        }
      }
    );
    (<any>this.chart).refresh()
    this.changeDetector.detectChanges();*/
}
