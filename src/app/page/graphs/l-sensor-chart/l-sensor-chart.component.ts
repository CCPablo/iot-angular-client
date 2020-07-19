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
export class LSensorChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() unitData: UnitData[];

  numberOfData;
  interval;
  meanValue;

  lineChartData: ChartDataSets[] = [{
    data: []
  }];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
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

  disposers: Disposer[] = [];
  currentDataSets = [];

  constructor(private sensorValuesService: SensorValuesService,
    private changeDetector: ChangeDetectorRef) {
   }

  ngOnInit(): void {

    this.addDataSet(this.unitData.nodeId, this.unitData.id);
    /*
    timer(5444).subscribe(() => {
      this.unitData.id=2;
      this.reactTo(this.unitData.nodeId, this.unitData.id);
      this.sensorValuesService.requestArrayValues(this.unitData.nodeId, this.unitData.id);
    });

    */
    timer(10444).subscribe(() => {
      this.unitData.id=2;
      this.addDataSet(this.unitData.nodeId, this.unitData.id);
      console.log(this.lineChartData)
    });
  }

  ngOnDestroy() {
    this.disposers.forEach(disposer => {
      disposer.disposer();
    })
  }

  /*
  unReact(nodeId, unitId) {
    this.disposers.forEach(disposer => {
      if(disposer.nodeId == nodeId && disposer.unitId == unitId) {
        disposer.disposer();
      }
    })
  }
  */

  addDataSet(nodeId, unitId) {
    this.initDataSet(nodeId, unitId);
    this.setReactions(nodeId, unitId, this.currentDataSets.length)
    this.sensorValuesService.requestArrayValues(nodeId, unitId);
  }

  initDataSet(nodeId, unitId) {
    this.currentDataSets = this.unitData;
    /*
    this.currentDataSets.push( {
      nodeId: nodeId,
      unitId: unitId
    });
    */
   if(this.unitData.length > 1) {
    this.lineChartData.splice(1, this.unitData.length-1);
   }
    this.lineChartData.push({
      data: []
    })
  }

  /*
  private getDataSetIndex(nodeId, unitId) {
    return this.currentDataSets.findIndex((dataset) => {
      dataset.nodeId == nodeId && dataset.unitId == unitId
    })
  }
  */

  setReactions(nodeId, unitId, dataSetIndex = 0) {
    this.disposers.push( this.reactionToDataChange(nodeId, unitId, dataSetIndex));
    this.disposers.push( this.reactionToMeanChange(nodeId, unitId));
  }

  reactionToMeanChange (nodeId, unitId) { return {
      disposer:reaction(
        () => this.sensorValuesService.getMeanValue(nodeId, unitId),
        (value) => {
          this.meanValue = value;
          this.changeDetector.detectChanges()
        }),
      nodeId: nodeId,
      unitId: unitId
    }
  }

  reactionToDataChange (nodeId, unitId, dataSetIndex) { return {
      disposer:reaction(
        () => this.sensorValuesService.getArrayValues(nodeId, unitId),
        (valueObj) => {
          this.updateData(valueObj, dataSetIndex);
          this.updateLabels(valueObj);
          (<any>this.chart).update();
          this.changeDetector.detectChanges()
        }),
      nodeId: nodeId,
      unitId: unitId
    }
  }

  private updateData( data, dataSetIndex) {
    this.lineChartData[dataSetIndex].data = [];
    data.forEach(element => {
      this.lineChartData[dataSetIndex].data.push(element.value);
    });
  }

  private updateLabels( data) {
    this.lineChartLabels = []
    data.forEach(element => {
      this.lineChartLabels.push(element.time)
    });
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
}
