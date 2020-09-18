
export class Stars {

  starsNumber: number;
  positionX =  [];
  positionY = [];
  radius = [];

  constructor(private s: any, starsNumber: number) {
    this.starsNumber = starsNumber;

    for(let i = 0; i < starsNumber; i++) {
      this.positionX[i] = s.random(0, s.width);
      this.positionY[i] = s.random(0, s.height);
      if(s.random(1) < 1/s.float(starsNumber)) this.radius[i] = 3.5;
      else if(s.random(1) < 2/s.float(starsNumber)) this.radius[i] = 2.7;
      else this.radius[i] = s.random(1, 2);
    }
  }

  display() {
    this.s.noStroke();
    let alpha = 0;
    let periodOfDay = this.s.day.getCurrentPeriod();
    if( periodOfDay == 'DAY' ||
        periodOfDay == 'MORNING' ||
        periodOfDay == 'SUNSET') {
      alpha = 0;
    } else if (periodOfDay == 'SUNRISE') {
      alpha = 255*this.s.day.mapValueWithInPeriod(1, 0);
    } else if (periodOfDay == 'NIGHTFALL') {
      alpha = 255*this.s.day.mapValueWithInPeriod(0, 1);
    } else if (periodOfDay == 'NIGHT') {
      alpha = 255;
    }
    for(let i = 0; i < this.starsNumber; i++) {
      const heightIndex = 1 - this.positionY[i]/(10*this.s.height);
      alpha = heightIndex*alpha;
      this.s.fill(255, alpha);
      this.s.circle(this.positionX[i],this.positionY[i], this.radius[i]);
    }
  }
}
