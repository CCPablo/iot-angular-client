import { Component, OnInit } from '@angular/core';
import { sketch } from './sketch';

import * as p5 from 'p5';
import { AuthenticationService } from '../authentication/service/authentication.service';

@Component({
  selector: 'iot-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  private canvas;
  public loggedIn : Boolean;

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
    if(!this.authenticationService.isAuthenticated()) {
      this.createCanvas();
    }
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
}
