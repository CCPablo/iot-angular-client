import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, OnChanges, DoCheck, IterableDiffer, KeyValueDiffer, KeyValueDiffers, IterableDiffers, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { ValuesService } from '../../nodes/values.service';
import { reaction, IReactionDisposer } from 'mobx';
import { SensorValuesService } from './sensor-values.service';
import { Observable, timer } from 'rxjs';
import * as Color from 'color';

interface UnitData {
  name: string;
  description: string;
  id: number,
  nodeId: number,
  graphColor: string,
  type: string;
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
export class LSensorChartComponent implements OnDestroy, OnChanges {
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() unitData: UnitData[] = [];

  @Input() interval;

  @Input() numberOfValues;

  @Input() legendVisible = true;

  toTimeFormat(millis) {
    let valueDate = new Date(millis);
    let now = new Date();
    if(valueDate.getTime() > (now.getTime() - 5)) {

    }

    let hour = Math.floor(valueDate.getHours());
    let minute = Math.floor(valueDate.getMinutes())

    return ((hour < 10) ? "0"+hour : hour) + ":" + ((minute < 10) ? "0"+minute : minute);
  }

  datasets: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  labels: Label[] = [];
  options: (ChartOptions & { annotation: any }) = {
    responsive: true,
    responsiveAnimationDuration:4000,
    animation: {
      duration: 1500,
      easing: 'linear'
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var datasetLabel = data.datasets[item.datasetIndex].label || "";
          var dataPoint = item.yLabel;
          if(data.datasets[item.datasetIndex].yAxisID=="temperature") {
            return datasetLabel + ": " + dataPoint + " ºC";
          }
          return datasetLabel + ": " + dataPoint + " %";
        }
      }
    },
    scales: {
      xAxes: [{
        id: 'x-axis-0',
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
          callback: (millis) => this.toTimeFormat(millis),
          suggestedMin: 0,
          suggestedMax: 50
        }
      }],
      yAxes: [
        {
          id: 'temperature',
          position: 'left',
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            callback: function(item) {
              return item + ' ºC';
            },
            suggestedMin: 0,
            suggestedMax: 50,
          }
        },
        {
          id: 'humidity',
          position: 'right',
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          ticks: {
            callback: function(item) {
              return item + ' %';
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ],
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
  chartType = 'line';
  legend = false;

  disposers: Disposer[] = [];

  constructor(private sensorValuesService: SensorValuesService,
    private changeDetector: ChangeDetectorRef) {
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
    this.resetDataSets();
    this.resetReactions();
    this.requestInitialData(this.interval, this.numberOfValues);
    this.requestNewValues(this.interval)
  }

  requestNewValues(interval) {
    this.unitData.forEach((unitData) => {
      this.sensorValuesService.requestArrayValues(unitData.nodeId, unitData.id, interval);
    })
  }

  resetDataSets() {
    if(this.unitData.length == 0) {
      this.datasets = [{
        data: []
      }];
      this.legend = false;
    } else {
      this.datasets = [];
      this.legend = this.legendVisible;
    }
    this.unitData.forEach((unit, index) => {
      this.datasets.push({
        data:[],
        radius: 0,
        yAxisID:index==0 ? 'temperature' : 'humidity',
        label:unit.name,
        backgroundColor: Color(unit.graphColor!=null? unit.graphColor : 'black').alpha(0.2).toString(),
        borderColor: Color(unit.graphColor!=null? unit.graphColor : 'black').alpha(0.5).toString(),
        pointBackgroundColor: Color(unit.graphColor!=null? unit.graphColor : 'black').toString(),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: Color(unit.graphColor).alpha(0.8).toString()
      });
    })
  }

  requestInitialData(interval, numberOfValues) {
    this.unitData.forEach((unitData) => {
      this.sensorValuesService.requestArrayValues(unitData.nodeId, unitData.id, interval, numberOfValues);
    })
  }

  resetReactions() {
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
