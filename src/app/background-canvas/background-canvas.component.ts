import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { sketch } from './sketch3';
import { WeatherService } from 'src/app/service/weather.service'

import * as p5 from 'p5';
import { now } from 'mobx-utils';

@Component({
  selector: 'iot-canvas',
  templateUrl: './background-canvas.component.html',
  styleUrls: ['./background-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundCanvasComponent implements OnInit {
  canvas;

  constructor(private weatherService: WeatherService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.weatherService.requestRealtimeWeather().subscribe( (response: any) => {
      const myCanvas = document.getElementById('myCanvas');
      this.canvas = new p5(sketch, myCanvas);
      let bodyResponse = response.body;
      let cloudCoverPercent = bodyResponse.cloud_cover.value/100;
      this.canvas.setCloudCoverPercent(cloudCoverPercent);
      let sunDegreePercent = this.obtainSunDegreePercent(bodyResponse);
      this.canvas.setSunDegreePercent(0.3);
      this.canvas.update();
      console.log(bodyResponse)
    })


    setInterval(()=> {
      this.weatherService.requestRealtimeWeather().subscribe( (response: any) => {
        let bodyResponse = response.body;
        console.log('updated cloud percent at '+ new Date().toString() + '.\n VALUE: ' + bodyResponse.cloud_cover.value/100);
        this.canvas.setCloudCoverPercent(bodyResponse.cloud_cover.value/100);

        let sunDegreePercent = this.obtainSunDegreePercent(bodyResponse);
        console.log('updated sun percent at '+ new Date().toString() + '.\n VALUE:' + sunDegreePercent);
        this.canvas.setSunDegreePercent(sunDegreePercent);
        this.canvas.update();
      })
    },60000);
  }

  obtainSunDegreePercent(bodyResponse: any) {
    let now = Date.now();
    let sunrise = Date.parse(bodyResponse.sunrise.value);
    let sunset = Date.parse(bodyResponse.sunset.value);

    let yesterdaySunset = new Date(sunset);
    yesterdaySunset.setHours(yesterdaySunset.getHours() - 24);

    let tomorrowSunrise = new Date(sunrise);
    tomorrowSunrise.setHours(tomorrowSunrise.getHours() + 24);

    if (now > sunrise && now <= sunset) {
      return (0.5*(now - sunrise))/ (sunset - sunrise);
    } else if (now <= sunrise) {
      return 0.5 + (0.5*(now - yesterdaySunset.getTime()))/ (sunrise - yesterdaySunset.getTime());
    } else if (now > sunset) {
      return 0.5 + (0.5*(now - sunset))/ (tomorrowSunrise.getTime() - sunset);
    }
  }

  /*
  ngOnInit() {
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
  }

  public animationInit = () => {
    const mydiv = document.getElementById('mydiv');
    let event = new Event("animateEvent", {bubbles : true});
    mydiv.dispatchEvent(event);
  }

  public animate = () =>  {
    this.canvas.loop();
    this.loggedIn = true;
  }

  public reset = () =>  {
    const mydiv = document.getElementById('mydiv');
    let event = new Event("resetEvent", {bubbles : true});
    mydiv.dispatchEvent(event);
  }

  public resetCanvas = () => {
    this.destroyCanvas()
    this.createCanvas();
  }

  private createCanvas = () => {
    const myCanvas = document.getElementById('mainCanvas');

    this.canvas = new p5(sketch.bind(this) , myCanvas);
    this.loggedIn = false;
  }

  private destroyCanvas = () => {
    this.canvas.noCanvas();
    this.loggedIn = false;
  }
  */
}
