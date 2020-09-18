import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { sketch } from './sketch3';

import * as p5 from 'p5';

@Component({
  selector: 'iot-canvas',
  templateUrl: './background-canvas.component.html',
  styleUrls: ['./background-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundCanvasComponent implements OnInit {
  canvas;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    const myCanvas = document.getElementById('myCanvas');

    this.canvas = new p5(sketch, myCanvas);

    setInterval(()=> {
      this.canvas.updateSunLight(0.0025);
      this.canvas.updateCloudPercent(0.005);
    },50);
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
