export class Day {

  currentPeriod;
  sunDegreePercent;

  periodsOfDay = [
    {
      name: 'SUNRISE',
      skyUpColor: this.s.color(0,102,153),
      skyDownColor: this.s.color(179,98,36),
      cloudsColor: this.s.color(250, 214, 165),
      cloudsAffectSkyColor: 0.2,
      initialPercent: 0.9,
      endPercent: 1
    },
    {
      name: 'MORNING',
      skyUpColor: this.s.color(70,170,215,160),
      skyDownColor: this.s.color(153, 204, 255,160),
      cloudsColor: this.s.color(255),
      cloudsAffectSkyColor: 0.3,
      initialPercent: 0,
      endPercent: 0.1
    },
    {
      name:'DAY',
      skyUpColor: this.s.color(70,170,215,160),
      skyDownColor: this.s.color(153, 204, 255,160),
      cloudsColor: this.s.color(255),
      initialPercent: 0.1,
      cloudsAffectSkyColor: 0.4,
      endPercent: 0.4
    },
    {
      name:'SUNSET',
      skyUpColor: this.s.color(70,170,215,160),
      skyDownColor: this.s.color(179,98,36),
      cloudsColor: this.s.color(250, 214, 165),
      cloudsAffectSkyColor: 0.55,
      initialPercent: 0.4,
      endPercent: 0.5
    },
    {
      name:'NIGHTFALL',
      skyUpColor: this.s.color(2,20,24),
      skyDownColor: this.s.color(2,20,24),
      cloudsColor: this.s.color(80),
      cloudsAffectSkyColor: 0.4,
      initialPercent: 0.5,
      endPercent: 0.6
    },
    {
      name:'NIGHT',
      skyUpColor: this.s.color(2,20,24),
      skyDownColor: this.s.color(2,20,24),
      cloudsColor: this.s.color(80),
      cloudsAffectSkyColor: 0.3,
      initialPercent: 0.6,
      endPercent: 0.9
    }
  ];

  constructor(private s: any, sunDegreePercent) {
    this.update(sunDegreePercent)
  }

  getCurrentPeriod = () => {
    return this.currentPeriod.name;
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

  getCloudAffectSkyForCurrentPeriod() {
    return this.mapValueWithInPeriod(this.getPreviousPeriod().cloudsAffectSkyColor, this.currentPeriod.cloudsAffectSkyColor);
  }

  getCloudColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().cloudsColor, this.currentPeriod.cloudsColor, this.mapValueWithInPeriod(0, 1));
  }

  getSkyUpColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().skyUpColor, this.currentPeriod.skyUpColor, this.mapValueWithInPeriod(0, 1));
  }

  getSkyDownColorForCurrentPeriod() {
    return this.s.lerpColor(this.getPreviousPeriod().skyDownColor, this.currentPeriod.skyDownColor, this.mapValueWithInPeriod(0, 1));
  }

  getPreviousPeriod() {
    let currentIndex = this.periodsOfDay.indexOf(this.currentPeriod);
    if(currentIndex == 0) {
      return this.periodsOfDay[this.periodsOfDay.length-1]
    } else {
      return this.periodsOfDay[currentIndex-1];
    }
  }

  mapValueWithInPeriod(lowValue: number, highValue: number) {
    return this.s.map(this.sunDegreePercent, this.currentPeriod.initialPercent, this.currentPeriod.endPercent, lowValue, highValue);
  }
}
