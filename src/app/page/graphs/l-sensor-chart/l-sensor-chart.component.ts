import { Component, ViewChild, ChangeDetectorRef, Input, OnChanges, OnDestroy, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { BaseChartDirective, Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { Chart, ChartDataSets, ChartLineOptions, ChartPointOptions, ChartOptions, PluginServiceGlobalRegistration } from 'chart.js';
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
export class LSensorChartComponent implements OnChanges, OnInit {

  readonly MONTH_TO_MS = 2592000000;

  readonly WEEK_TO_MS = 604800000;

  readonly DAY_TO_MS = 86400000;

  readonly HOUR_TO_MS = 3600000;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() unitsToPlot: UnitData[] = [];

  @Input() interval = this.HOUR_TO_MS;

  @Input() numberOfValues = 50;

  @Input() realTime = false;

  @Input() legendVisible = true;

  @Output() firstDataReceived = new EventEmitter<boolean>();

  getDateWithInWeek(valueMillis) {
    let valueDate = new Date(valueMillis);
    let now = new Date();

    let dayOfWeek = valueDate.getDay();
    let dayOfMonth = valueDate.getDate();
    let hour = valueDate.getHours();
    let minute = valueDate.getMinutes();

    if(dayOfMonth != now.getDate() && dayOfWeek != now.getDay()) {
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
  rtPlugin: PluginServiceGlobalRegistrationAndOptions = {
    id: 'rtplugin',
    afterDatasetsUpdate:(chart : any) => {
      chart.data.datasets.forEach((dataset) => {
        let offset = -20; //set that suits the best
        for (let i = 0; i < dataset.data.length; i++) {
            let model = dataset._meta[chart.id].data[i]._model;
            model.x += offset;
            model.controlPointNextX += offset;
            model.controlPointPreviousX += offset;
        }
      })
    }
  };
  labels: Label[] = [];
  options: (ChartOptions & { annotation: any }) = {
    responsive: true,
    responsiveAnimationDuration:500,
    animation: {
      easing: 'linear'
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    tooltips: {
      enabled: true,
      mode: 'point',
      intersect: false,
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
        scaleLabel: {
          fontSize: 18,
          padding: 30
        },
        ticks: {
          padding: -5,
          suggestedMin: 5,
          suggestedMax: 50,
          source: 'auto'
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
            suggestedMin: -10,
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
            suggestedMin: -10,
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
  ngOnInit(): void {
    //Chart.pluginService.register(this.rtPlugin);
  }

  ngOnChanges() {
    this.init();
  }

  intervalTimer;

  init() {
    console.log('init')
    this.resetDataSets();
    this.labels = [];
    clearInterval(this.intervalTimer);
    this.resetChartConfigurations();
    this.firstDataReceived.emit(false);
    this.requestInitialData();

    /*
    this.unitsToPlot.forEach((unit, index) => {
      this.reactionToDataChange(unit.nodeId, unit.id, index);
    })
    */
   if(this.realTime) {
      this.intervalTimer = setInterval(() => {
        this.datasets.forEach((dataset,index) => {
          dataset.data.push(Math.random()*4-2 + <number>this.datasets[index].data[this.numberOfValues-1]);
          dataset.data.shift();
        })
        let currentMillis = new Date().toString();
        this.labels.push(currentMillis);
        this.labels.shift();
        (<any>this.chart).update();
      },this.interval);
    }
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
          radius: 3,
          fill: false,
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
    if(this.realTime) {
      this.options.animation.duration = this.interval;
      this.options.tooltips.enabled = false;
      this.options.hover.mode = 'single';
    } else {
      this.options.animation.duration = 100;
      this.options.tooltips.enabled = true;
      this.options.hover.mode = 'point';
    }
    (<any>this.chart).refresh();
    (<any>this.chart).update();
  }

  requestInitialData() {
    this.sensorValuesService.requestArraysValues(this.unitsToPlot, this.interval, this.numberOfValues)
    .subscribe((response) => {
      response.body.forEach((unitData, index) => {
        unitData.forEach(element => {
          this.datasets[index].data.push(element.second)
          if(index == 0) {
            this.labels.push(new Date(element.first).toString())
          }
        });
      });
      this.firstDataReceived.emit(true);
      (<any>this.chart).update();
    });
  }
}
