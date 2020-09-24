export class Day {

  currentPeriod;
  sunDegreePercent;

  periodsOfDay = [
    {
      name: 'SUNRISE',
      skyUpColor: this.s.color(0,102,153),
      skyDownColor: this.s.color(179,98,36),
      cloudsColor: this.s.color(250,214,165),
      sunColor: this.s.color(230,220,30),
      initialPercent: 0.95,
      endPercent: 1
    },
    {
      name: 'MORNING',
      skyUpColor: this.s.color(70,170,215,160),
      skyDownColor: this.s.color(153, 204, 255),
      cloudsColor: this.s.color(255),
      sunColor: this.s.color(256, 256, 60),
      initialPercent: 0,
      endPercent: 0.1
    },
    {
      name:'DAY_RISING',
      skyUpColor: this.s.color(70,170,215),
      skyDownColor: this.s.color(153, 204, 255),
      cloudsColor: this.s.color(255),
      sunColor: this.s.color(256, 256, 60),
      initialPercent: 0.1,
      endPercent: 0.3
    },
    {
      name:'DAY_FALLING',
      skyUpColor: this.s.color(70,170,215),
      skyDownColor: this.s.color(153, 204, 255),
      cloudsColor: this.s.color(255),
      sunColor: this.s.color(256, 256, 60),
      initialPercent: 0.3,
      endPercent: 0.43
    },
    {
      name:'SUNSET',
      skyUpColor: this.s.color(70,170,215),
      skyDownColor: this.s.color(179*1.3,98*1.3,36*1.3),
      cloudsColor: this.s.color(170, 123, 98),
      sunColor: this.s.color(230,170,33),
      initialPercent: 0.43,
      endPercent: 0.5
    },
    {
      name:'NIGHTFALL',
      skyUpColor: this.s.color(2,20,24),
      skyDownColor: this.s.color(2,20,24),
      cloudsColor: this.s.color(80),
      sunColor: this.s.color(0),
      initialPercent: 0.5,
      endPercent: 0.6
    },
    {
      name:'NIGHT',
      skyUpColor: this.s.color(2,20,24),
      skyDownColor: this.s.color(2,20,24),
      cloudsColor: this.s.color(40),
      sunColor: this.s.color(0),
      initialPercent: 0.6,
      endPercent: 0.95
    }
  ];

  constructor(private s: any, sunDegreePercent) {
    this.update(sunDegreePercent)
  }

  update = (sunDegreePercent: number) => {
    this.sunDegreePercent = sunDegreePercent;
    this.periodsOfDay.forEach((currentPeriod) => {
      if(sunDegreePercent >= currentPeriod.initialPercent && sunDegreePercent < currentPeriod.endPercent) {
        this.currentPeriod = currentPeriod;
        return;
      }
    });
  }

  getCurrentPeriodName = () => {
    return this.currentPeriod.name;
  }

  getSunColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().sunColor, this.currentPeriod.sunColor, this.mapValueForCurrentPeriod());
  }

  getCloudColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().cloudsColor, this.currentPeriod.cloudsColor, this.mapValueForCurrentPeriod());
  }

  getSkyUpColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().skyUpColor, this.currentPeriod.skyUpColor, this.mapValueForCurrentPeriod());
  }

  getSkyDownColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().skyDownColor, this.currentPeriod.skyDownColor, this.mapValueForCurrentPeriod());
  }

  getPreviousPeriod() {
    let currentIndex = this.periodsOfDay.indexOf(this.currentPeriod);
    if(currentIndex == 0) {
      return this.periodsOfDay[this.periodsOfDay.length-1]
    } else {
      return this.periodsOfDay[currentIndex-1];
    }
  }

  getSunDegreePercent() {
    return this.sunDegreePercent;
  }

  mapValueForCurrentPeriod(lowValue = 0, highValue = 1) {
    return this.s.map(this.sunDegreePercent, this.currentPeriod.initialPercent, this.currentPeriod.endPercent, lowValue, highValue);
  }
}
