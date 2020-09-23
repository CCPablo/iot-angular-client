export class Sun {

  x: number;
  y = 0;
  radius: number;

  constructor (private s: any, radius, x) {
    this.x = x;
    this.radius = radius;
  }

  display = function() {

    let sunDegreePercent = this.s.day.getSunDegreePercent();
    this.y =  this.s.map(this.getSunHeigth(sunDegreePercent),0, 1,this.s.height+this.radius, this.s.height*0.1);


    this.s.noStroke();
    this.s.strokeWeight(0);

    this.s.fill(179*1.9, 134*1.9, 0);
    this.s.circle(this.x, this.y,this.radius);


    //this.s.blendMode(this.s.ADD);
    for (let i = this.radius*1.35; i > this.radius; i -= this.radius*0.035){
      let solarCoronaAlpha = 0;

      if(this.s.day.getCurrentPeriod() == 'DAY') {
        solarCoronaAlpha = 27;
      } else if(this.s.day.getCurrentPeriod() == 'MORNING') {
        solarCoronaAlpha = this.s.day.mapValueForCurrentPeriod(0,27);
      } else if(this.s.day.getCurrentPeriod() == 'SUNSET') {
        solarCoronaAlpha = this.s.day.mapValueForCurrentPeriod(27,0);
      }

      this.s.fill(179*1.9, 134*1.9, 0, solarCoronaAlpha*this.s.map(i, this.radius, this.radius*1.35, 1,0));
      this.s.circle(this.x, this.y, i);
    }

    //this.s.fill(45,100,this.s.map(sunDegreePercent, 0, 1, 70, 91));
    //this.s.circle(this.x, y,this.radius);
    this.s.blendMode(this.s.BLEND);

    /*    this.s.blendMode(this.s.BLEND);

  this.s.blendMode(this.s.ADD);

  let sunDegreePercent = this.s.day.getSunDegreePercent();
  let y =  this.s.map(this.getSunHeigth(sunDegreePercent),0, 1,this.s.height+this.radius, this.s.height*0.1);


  this.s.colorMode(this.s.HSB);
  this.s.fill(41,100,this.s.map(sunDegreePercent, 0, 1, 1, 50));
  this.s.circle(this.x,
                y
                ,this.radius);

  this.s.colorMode(this.s.RGB);
  this.s.blendMode(this.s.BLEND);

  */
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
