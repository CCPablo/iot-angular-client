import { Day } from './day.p5';

export class Sky {

  currentUpSky;
  currentDownSky;

  constructor(private s: any) {}

  update = (cloudCoverPercent, cloudsColor) => {
    this.currentUpSky = this.s.day.getSkyUpColorForCurrentPeriod();
    this.currentDownSky = this.s.day.getSkyDownColorForCurrentPeriod();
  }

  display = () => {
    this.s.noFill();
    this.s.strokeWeight(1);
    for (let i = 0; i <= this.s.height; i++) {
      let inter = this.s.map(i, 0, this.s.height, 0, 1);
      let c = this.s.lerpColor(this.currentUpSky, this.currentDownSky, inter);
      this.s.stroke(c);
      this. s.line(0, i, this.s.width, i);
    }
  }




}
