import { Component, ViewChild, ChangeDetectorRef, Input, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartLineOptions, ChartPointOptions, ChartOptions } from 'chart.js';
import { reaction, IReactionDisposer, values } from 'mobx';
import { SensorValuesService } from './sensor-values.service';
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

  @Input() unitsToPlot: UnitData[] = [];

  @Input() interval = 14800000;

  @Input() numberOfValues = 50;

  @Input() legendVisible = true;

  readonly MONTH_TO_MS = 2592000000;

  readonly WEEK_TO_MS = 604800000;

  readonly DAY_TO_MS = 86400000;

  readonly HOUR_TO_MS = 3600000;

  getDateWithInWeek(valueMillis) {
    let valueDate = new Date(valueMillis);
    let now = new Date();

    let dayOfWeek = valueDate.getDay();
    let dayOfMonth = valueDate.getDate();
    let hour = valueDate.getHours();
    let minute = valueDate.getMinutes();

    if(dayOfMonth != now.getDate()) {
      return `${((hour < 10) ? "0"+hour : hour)}:${((minute < 10) ? "0"+minute : minute)} (${this.getDayOfWeek(dayOfWeek)})`
    }

    return ((hour < 10) ? "0"+hour : hour) + ":" + ((minute < 10) ? "0"+minute : minute);
  }

  getDateWithInMonth(valueMillis) {
    let valueDate = new Date(valueMillis);
    let now = new Date();

    let dayOfWeek = valueDate.getDay();
    let dayOfMonth = valueDate.getDate();
    let month = valueDate.getMonth();
    let hour = valueDate.getHours();
    let minute = valueDate.getMinutes();

    if(now.getTime() - valueMillis > this.WEEK_TO_MS) {
      return `${((hour < 10) ? "0"+hour : hour)}:${((minute < 10) ? "0"+minute : minute)} (${dayOfMonth} de ${this.getMonth(month)})`
    } else if (dayOfMonth != now.getDate()) {
      return `${((hour < 10) ? "0"+hour : hour)}:${((minute < 10) ? "0"+minute : minute)} (${this.getDayOfWeek(dayOfWeek)} ${dayOfMonth})`
    } else {
      return `${((hour < 10) ? "0"+hour : hour)}:${((minute < 10) ? "0"+minute : minute)}`
    }
  }

  getDayOfWeek(dayNumber: number) {
    switch(dayNumber) {
      case 0: return 'Domingo';
      case 1: return 'Lunes';
      case 2: return 'Martes';
      case 3: return 'Miércoles';
      case 4: return 'Jueves';
      case 5: return 'Viernes';
      case 6: return 'Sábado';
    }
  }

  getMonth(monthNumber: number) {
    switch(monthNumber) {
      case 0: return 'Enero';
      case 1: return 'Febrero';
      case 2: return 'Marzo';
      case 3: return 'Abril';
      case 4: return 'Mayo';
      case 5: return 'Junio';
      case 6: return 'Julio';
      case 7: return 'Agosto';
      case 8: return 'Septiembre';
      case 9: return 'Octubre';
      case 10: return 'Noviembre';
      case 11: return 'Diciembre';
    }
  }

  datasets: ChartDataSets[] = [{
    data: [],
    label: ''
  }];
  labels: Label[] = [];
  options: (ChartOptions & { annotation: any }) = {
    responsive: true,
    responsiveAnimationDuration:500,
    animation: {
      duration: 200,
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
          suggestedMin: 5,
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

  auxDatasets: ChartDataSets[] = [{
    data: [],
    label: ''
  }];;

  constructor(private sensorValuesService: SensorValuesService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnChanges() {
    this.init();
  }

  ngOnDestroy() {
  }


  init() {
    this.resetDataSets();
    this.resetChartConfigurations();
    this.requestInitialData();
    /*
    this.unitsToPlot.forEach((unit, index) => {
      this.reactionToDataChange(unit.nodeId, unit.id, index);
    })
    */
    setInterval(() => {
      this.auxDatasets.forEach((dataset,index) => {
        this.datasets[index].data.push(Math.random()*4-2 + <number>this.datasets[index].data[this.numberOfValues-1]);
        this.datasets[index].data.shift();
      })
      let currentMillis = new Date().getMilliseconds().toString();
      this.labels.push(currentMillis);
      this.labels.shift();
      (<any>this.chart).update();
      this.changeDetector.detectChanges()

    },this.interval);
  }

  resetDataSets() {
    if(this.unitsToPlot.length == 0) {
      this.datasets = [{
        data: []
      }];
      this.legend = false;
    } else {
      this.datasets = [];
      this.unitsToPlot.forEach((unit, index) => {
        this.datasets.push({
          data:[],
          radius: 0,
          yAxisID:index==0 ? 'temperature' : 'humidity',
          label: `${unit.name} (${unit.nodeId}-${unit.id})`,
          backgroundColor: Color(unit.graphColor!=null? unit.graphColor : 'black').alpha(0.2).toString(),
          borderColor: Color(unit.graphColor!=null? unit.graphColor : 'black').alpha(0.5).toString(),
          pointBackgroundColor: Color(unit.graphColor!=null? unit.graphColor : 'black').toString(),
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: Color(unit.graphColor).alpha(0.8).toString()
        });
      })
      this.legend = this.legendVisible;
    }
    this.auxDatasets = this.datasets;
  }

  resetChartConfigurations() {
    if(this.interval*this.numberOfValues < this.WEEK_TO_MS) {
      this.options.scales.xAxes[0].ticks.callback = (valueMillis) => this.getDateWithInWeek(valueMillis);
    } else if(this.interval*this.numberOfValues < this.MONTH_TO_MS) {
      this.options.scales.xAxes[0].ticks.callback = (valueMillis) => this.getDateWithInMonth(valueMillis);
    } else {
      this.options.scales.xAxes[0].ticks.callback = (valueMillis) => this.getDateWithInMonth(valueMillis);
    }
  }

  requestInitialData() {
    this.sensorValuesService.requestArraysValues(this.unitsToPlot, this.interval, this.numberOfValues)
    .subscribe((response) => {
      console.log(response);
      response.body.forEach((unitData, index) => {
        unitData.forEach(element => {
          this.datasets[index].data.push(element.second)
          if(index == 0) {
            this.labels.push(element.first)
          }
        });
      });
      (<any>this.chart).update();
      this.changeDetector.detectChanges()
    });
  }

  getDatasetIndex(name, nodeId, unitId) {
    let index1;
    this.datasets.forEach((dataset, index) => {
      if(dataset.label == `${name} (${nodeId}-${unitId})`) {
        index1 = index;
      }
    })
    return index1;
  }

  reactionToDataChange (nodeId, unitId, dataSetIndex) {
    return reaction(
        () => this.sensorValuesService.getArrayValues(nodeId, unitId),
        (valueObj, reaction) => {
          this.updateData(valueObj, dataSetIndex);
          if(dataSetIndex == 0) {
            this.updateLabels(valueObj);
          }
          this.changeDetector.detectChanges();
        })
  }

  private updateData(data, dataSetIndex) {
    this.auxDatasets[dataSetIndex].data = [];
    data.forEach(element => {
      this.auxDatasets[dataSetIndex].data.push(element.value);
    });

  }

  private updateLabels(data) {
    this.labels = []
    data.forEach(element => {
      this.labels.push(element.time)
    });
  }
}
