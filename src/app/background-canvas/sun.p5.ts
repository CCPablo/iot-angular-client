export class Sun {

  x: number;
  y = 0;
  radius: number;
  color = this.s.color(256, 256, 50);

  constructor (private s: any, radius, x) {
    this.x = x;
    this.radius = radius;
  }

  update = function() {
    this.color = this.s.day.getSunColorForCurrentPeriod();
    let sunDegreePercent = this.s.day.getSunDegreePercent();
    this.y =  this.s.map(this.getSunHeigth(sunDegreePercent),0, 1,this.s.height+this.radius, this.s.height*0.1);
  }

  display = function() {

    this.s.noStroke();
    this.s.strokeWeight(0);

    this.s.fill(this.color);
    this.s.circle(this.x, this.y,this.radius);

    //this.s.blendMode(this.s.ADD);
    for (let i = this.radius*1.45; i > this.radius; i -= this.radius*0.035){
      let solarCoronaAlpha = 0;

      let currentPeriod = this.s.day.getCurrentPeriodName();

      if(currentPeriod == 'DAY_RISING' || currentPeriod == 'DAY_FALLING') {
        solarCoronaAlpha = 27;
      } else if(currentPeriod == 'MORNING') {
        solarCoronaAlpha = this.s.day.mapValueForCurrentPeriod(0,27);
      } else if(currentPeriod == 'SUNSET') {
        solarCoronaAlpha = this.s.day.mapValueForCurrentPeriod(27,0);
      }

      const red = this.s.red(this.color);
      const green = this.s.green(this.color);
      const blue = this.s.green(this.color);

      this.s.fill(red,green,blue, solarCoronaAlpha*this.s.map(i, this.radius, this.radius*1.45, 1,0));
      this.s.circle(this.x, this.y, i);
    }

    this.s.blendMode(this.s.BLEND);
  }

  getSunHeigth = (sunDegreePercent) => {
    return this.s.sin(sunDegreePercent*this.s.TWO_PI);
  }

  public pixelIsSunded(x, y) {

    let distance = this.s.sqrt((x - this.x)*(x - this.x) + (y - this.y)*(y - this.y))

    if(distance > 7*this.radius) {
      return 0;
    } else if(distance < this.radius) {
      return 1;
    } else {
      return this.s.map(distance, this.radius, 7*this.radius, 1, 0);
    }
  }
}
