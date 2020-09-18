import { Day } from './day.p5';

export class Sky {

  currentUpSky;
  currentDownSky;

  constructor(private s: any) {}

  update = (cloudPercent, cloudsColor) => {
    this.currentUpSky = this.s.day.getSkyUpColorForCurrentPeriod();
    this.currentDownSky = this.s.day.getSkyDownColorForCurrentPeriod();
    this.applyCloudColorFilter(cloudPercent, cloudsColor);
  }

  private applyCloudColorFilter = (cloudPercent, cloudsColor) => {
    this.currentUpSky = this.s.lerpColor(this.s.color(this.s.brightness(cloudsColor)), this.currentUpSky, 1 - cloudPercent*this.s.day.getCloudAffectSkyForCurrentPeriod());
    this.currentDownSky = this.s.lerpColor(this.s.color(this.s.brightness(cloudsColor)), this.currentDownSky, 1.2 - cloudPercent*this.s.day.getCloudAffectSkyForCurrentPeriod());
  }

  display = () => {
    this.s.noFill();
    for (let i = 0; i <= this.s.height; i++) {
      let inter = this.s.map(i, 0, this.s.height, 0, 1);
      let c = this.s.lerpColor(this.currentUpSky, this.currentDownSky, inter);
      this.s.stroke(c);
      this. s.line(0, i, this.s.width, i);
    }
  }




}
