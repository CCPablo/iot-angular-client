import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, OnChanges, DoCheck, IterableDiffer, KeyValueDiffer, KeyValueDiffers, IterableDiffers, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BaseChartDirective, Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ValuesService } from '../../devices/values.service';
import { reaction, IReactionDisposer } from 'mobx';
import { SensorValuesService } from './sensor-values.service';
import { Observable, timer } from 'rxjs';

interface UnitData {
  name: string;
  description: string;
  id: number,
  nodeId: number
}

interface Disposer {
  disposer: IReactionDisposer,
  nodeId: number,
  unitId: number
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-l-sensor-chart',
  templateUrl: './l-sensor-chart.component.html',
  styleUrls: ['./l-sensor-chart.component.css']
})
export class LSensorChartComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() unitData: UnitData[] = [];

  @Input() interval;

  @Input() numberOfValues;

  @Input() legendVisible = true;

  datasets: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  labels: Label[] = [];
  options: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        id: 'x-axis-0',
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 50
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 88
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
  colors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(2,83,96,0.2)',
      borderColor: 'rgba(2,83,96,1)',
      pointBackgroundColor: 'rgba(2,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  chartType = 'line';
  legend = false;

  disposers: Disposer[] = [];

  constructor(private sensorValuesService: SensorValuesService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.init();
    /*
    timer(5444).subscribe(() => {
      this.unitData.id=2;
      this.reactTo(this.unitData.nodeId, this.unitData.id);
      this.sensorValuesService.requestArrayValues(this.unitData.nodeId, this.unitData.id);
    });
    */
  }

  ngOnChanges() {
    this.init();
  }

  ngOnDestroy() {
    this.disposers.forEach(disposer => {
      disposer.disposer();
    })
    this.disposers = [];
  }

  init() {
    this.initDataSet();
    this.initReactions();
    this.requestData();
  }

  initDataSet() {
    if(this.unitData.length == 0) {
      this.datasets = [{
        data: []
      }];
      this.legend = false;
    } else {
      this.datasets = [];
      this.legend = this.legendVisible;
    }
    this.unitData.forEach(unit => {
      this.datasets.push({
        data:[],
        label:unit.name
      });
    })
  }

  requestData() {
    this.unitData.forEach((unitData) => {
      this.sensorValuesService.requestArrayValues(unitData.nodeId, unitData.id);
    })
  }

 initReactions() {
    this.disposers.forEach(disposer => {
      disposer.disposer();
    })
    this.disposers = [];
    this.unitData.forEach((unitData, index) => {
      this.disposers.push( this.reactionToDataChange(unitData.nodeId, unitData.id, index));
    })
  }

  reactionToDataChange (nodeId, unitId, dataSetIndex) { return {
      disposer:reaction(
        () => this.sensorValuesService.getArrayValues(nodeId, unitId),
        (valueObj) => {
          this.updateData(valueObj, dataSetIndex);
          if(dataSetIndex == 0)
            this.updateLabels(valueObj);
          (<any>this.chart).update();
          this.changeDetector.detectChanges()
        }),
      nodeId: nodeId,
      unitId: unitId
    }
  }

  private updateData(data, dataSetIndex) {
    this.datasets[dataSetIndex].data = [];
    data.forEach(element => {
      this.datasets[dataSetIndex].data.push(element.value);
    });
  }

  private updateLabels(data) {
    this.labels = []
    data.forEach(element => {
      this.labels.push(element.time)
    });
  }
}
