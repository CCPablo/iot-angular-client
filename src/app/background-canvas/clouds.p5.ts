import { first } from 'rxjs/operators';

export class Clouds {
  noiseXY = [];

  currentPositionX = 0;
  currentPositionY = 0;
  advancedX = 0;
  advancedY = 0;
  offsetX = 0;
  offsetY = 0;
  lastOffsetX = 0;
  lastOffsetY = 0;

  resolution;
  noiseLod = 10;
  noiseFalloff = 0.68;
  defaultColor = this.s.color(200);
  colorByPeriod;
  rainFactor = 0;

  width: number;
  height: number;

  lastColumnIndex: number;
  lastRowIndex: number;

  constructor(private s: any, height: number, cloudCoverPercent: number, resolution: number) {
    this.resolution = resolution;
    this.width = s.width + 2*this.resolution;
    this.height = height + 2*this.resolution;
    this.lastColumnIndex = s.int(this.width/this.resolution);
    this.lastRowIndex = s.int(this.height/this.resolution);

    s.noiseDetail(this.noiseLod,this.noiseFalloff);
    /*
    for(let i = 0; i < this.lastColumnIndex; i++) {
      this.noiseXY[i] = [];
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[i][j] = this.getNoise(i,j, cloudCoverPercent);
      }
    }
    */
  }

  private getNoise = function(i: number,j: number, cloudCoverPercent: number) {

    if (cloudCoverPercent < 0.001) return 0;

    const inLowRange = 0.6 - cloudCoverPercent*0.4;
    const inHighRange = 1;

    const outLowRange = cloudCoverPercent*0.6;
    const outHighRange = 0.6 + cloudCoverPercent*0.4;

    let x = (i-1)*this.resolution;
    let y = (j-1)*this.resolution;

    let nearNoise = this.s.noise(0.0008*x, 0.003*y);
    let farNoise = this.s.noise(0.001*x + 30,0.0000045*(y+100)*(y+100) + 30);

    if ((nearNoise + farNoise)/2 < inLowRange) return 0;

    let nearContribution = this.s.map(nearNoise, inLowRange, inHighRange, outLowRange, outHighRange, true);
    let farContribution = this.s.map(farNoise, inLowRange, inHighRange, outLowRange, outHighRange, true);4
    /*
    nearContribution = this.s.map(nearContribution, 0, 1, 0, this.s.map(y/this.height, 0, 1, 1, 0.2));
    farContribution = this.s.map(farContribution, 0, 1, 0, this.s.map(y/this.height, 0, 1, 0.2, 1));
    */
    /*
    let contribution = (nearNoise + farNoise)/2;
    if (contribution < inLowRange) return 0;
    */
    let contribution = (nearContribution + farContribution)/2;

    //let finalNoise = this.s.map(contribution, inLowRange, inHighRange, outLowRange, outHighRange, true);
    let finalNoise = contribution;

    if(finalNoise < 0.6) {
      finalNoise = this.s.map(finalNoise, 0.5, 0.6, 0.3, 0.5);
    } else if(finalNoise < 0.7) {
      finalNoise = this.s.map(finalNoise, 0.6, 0.7, 0.5, 0.65);
    } else if(finalNoise < 0.8) {
      finalNoise = this.s.map(finalNoise, 0.7, 0.8, 0.65, 0.8);
    }

    return finalNoise;
  }

  update = function(cloudCoverPercent: number, windSpeedX: number, windSpeedY: number, rainFactor: number) {
    this.rainFactor = rainFactor;
    this.colorByPeriod = this.s.day.getCloudColorForCurrentPeriod();
    this.updateCloudsPosition(cloudCoverPercent, windSpeedX, windSpeedY);
    return (this.lastOffsetX != this.offsetX || this.lastOffsetY != this.offsetY);
  }

  display = function(cloudCoverPercent) {
    this.s.noStroke();
    this.noiseXY = []
    for(let i = 0; i < this.lastColumnIndex; i++) {
      this.noiseXY[i] = []
      for(let j = 0; j < this.lastRowIndex; j++) {
        const noise = this.getNoise(i, j, cloudCoverPercent);
        this.displayPixels(i, j, noise, cloudCoverPercent);
      }
    }
    this.lastOffsetX = this.offsetX;
    this.lastOffsetY = this.offsetY;
  }

  private displayPixels = (i, j, noise, cloudCoverPercent) => {
    if(noise > 0) {

      let x = (i-1)*this.resolution;
      let y = (j-1)*this.resolution;
      let depth = y/this.width;

      const affectedBySun = this.s.pixelIsSunded(x, y);
      const sunedColor = this.s.lerpColor(this.defaultColor, this.s.color(255), affectedBySun);
      //const colorByPeriodAndDepth = this.s.lerpColor(sunedColor, this.colorByPeriod, depth); //high color

      const cloudBrightness = noise*cloudCoverPercent + (1-cloudCoverPercent);

      const red = cloudBrightness*this.s.red(sunedColor);
      const green =  cloudBrightness*this.s.green(sunedColor);
      const blue =  cloudBrightness*this.s.blue(sunedColor);
      const alpha = noise*255;

      this.s.fill(red, green, blue, alpha);
      this.s.rect(x - this.offsetX, y - this.offsetY, this.resolution, this.resolution);
    }
  }

  private updateCloudsPosition = (cloudCoverPercent, windSpeedX, windSpeedY) => {
    this.currentPositionX += windSpeedX;
    this.currentPositionY += windSpeedY;

    if(this.currentPositionX > 1) {
      this.advancedX += 1;
      for(let i = 1; i < this.lastColumnIndex; i++) {
        for(let j = 0; j < this.lastRowIndex; j++) {
          this.noiseXY[i-1][j] = this.noiseXY[i][j];
        }
      }
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[this.lastColumnIndex-1][j] = this.getNoise(this.lastColumnIndex+this.advancedX,j+this.advancedY, cloudCoverPercent);
      }
      this.currentPositionX = 0;
    }else if(this.currentPositionX < -1) {
      this.advancedX -= 1;
      for(let i = this.lastColumnIndex-2; i >= 0; i--) {
        for(let j = 0; j< this.lastRowIndex; j++) {
          this.noiseXY[i+1][j] = this.noiseXY[i][j];
        }
      }
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[0][j] = this.getNoise(this.advancedX,j + this.advancedY, cloudCoverPercent);
      }
      this.currentPositionX = 0;
    }
    if(this.currentPositionY > 1) {
      this.advancedY += 1;
      for(let j = 1; j < this.lastRowIndex; j++) {
        for(let i = 0; i < this.lastColumnIndex; i++) {
          this.noiseXY[i][j-1] = this.noiseXY[i][j];
        }
      }
      for(let i = 0; i < this.lastColumnIndex; i++) {
        this.noiseXY[i][this.lastRowIndex-1] = this.getNoise(i+this.advancedX,this.lastRowIndex+this.advancedY, cloudCoverPercent);
      }
      this.currentPositionY = 0;
    }else if(this.currentPositionY < -1) {
      this.advancedY -= 1;
      for(let i = 0; i < this.lastColumnIndex; i++) {
        for(let j = this.lastRowIndex-2; j >= 0; j--) {
          this.noiseXY[i][j+1] = this.noiseXY[i][j];
        }
      }
      for(let i = 0; i < this.lastColumnIndex; i++) {
        this.noiseXY[i][0] = this.getNoise(i + this.advancedX, this.advancedY, cloudCoverPercent);
      }
      this.currentPositionY = 0;
    }

    this.offsetX = this.s.int(this.currentPositionX*this.resolution)
    this.offsetY = this.s.int(this.currentPositionY*this.resolution)
  }

  reset = function(cloudCoverPercent: number, width: number, height: number) {
    this.width = width + 2*this.resolution;
    this.height = height + 2*this.resolution;
    this.lastColumnIndex = this.s.int(this.width/this.resolution);
    this.lastRowIndex = this.s.int(this.height/this.resolution);

    this.currentPositionX = 0;
    this.currentPositionY = 0;
    this.advancedX = 0;
    this.advancedY = 0;

    this.noiseXY = [];
    for(let i = 0; i < this.lastColumnIndex; i++) {
      this.noiseXY[i] = [];
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[i][j] = this.getNoise(i,j, cloudCoverPercent);
      }
    }
  }

  pixelIsClouded(x, y) {
    return this.noiseXY[this.s.int((x-1)/this.resolution)][this.s.int((y-1)/this.resolution)] > 0.6;
  }
}
