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
  noiseLod = 11;
  noiseFalloff = 0.68;
  color;
  cloudBrihtness = 1;
  rainFactor = 0;

  width: number;
  height: number;

  lastColumnIndex: number;
  lastRowIndex: number;

  constructor(private s: any, height: number, cloudPercent: number, resolution: number) {
    this.color = this.s.color(255);
    this.resolution = resolution;
    this.width = s.width + 2*this.resolution;
    this.height = height + 2*this.resolution;
    this.lastColumnIndex = s.int(this.width/this.resolution);
    this.lastRowIndex = s.int(this.height/this.resolution);

    s.noiseDetail(this.noiseLod,this.noiseFalloff);
    for(let i = 0; i < this.lastColumnIndex; i++) {
      this.noiseXY[i] = [];
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[i][j] = this.getNoise(i,j, cloudPercent);
      }
    }
  }

  getNoise = function(x: number,y: number, cloudPercent: number) {
    if(cloudPercent == 0) {
      return 0;
    }
    let noise = this.s.noise(0.002*this.resolution*x,0.004*this.resolution*y);

      return this.s.map(
        this.s.map(noise*noise, 0.6 - cloudPercent*0.4, 1, cloudPercent*0.7, 1),
        0, 1,
        0, (0.4 + cloudPercent*0.6));
  }

  update = function(cloudPercent: number, windSpeedX: number, windSpeedY: number, rainFactor: number) {
    this.currentPositionX += windSpeedX;
    this.currentPositionY += windSpeedY;

    this.rainFactor = rainFactor;

    this.color = this.s.day.getCloudColorForCurrentPeriod();

    if(this.currentPositionX > 1) {
      this.advancedX += 1;
      for(let i = 1; i < this.lastColumnIndex; i++) {
        for(let j = 0; j < this.lastRowIndex; j++) {
          this.noiseXY[i-1][j] = this.noiseXY[i][j];
        }
      }
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[this.lastColumnIndex-1][j] = this.getNoise(this.lastColumnIndex+this.advancedX,j+this.advancedY, cloudPercent);
      }
      this.currentPositionX = 0;
    }
    if(this.currentPositionX < -1) {
      this.advancedX -= 1;
      for(let i = this.lastColumnIndex-2; i >= 0; i--) {
        for(let j = 0; j< this.lastRowIndex; j++) {
          this.noiseXY[i+1][j] = this.noiseXY[i][j];
        }
      }
      for(let j = 0; j < this.lastRowIndex; j++) {
        this.noiseXY[0][j] = this.getNoise(this.advancedX,j + this.advancedY, cloudPercent);
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
        this.noiseXY[i][this.lastRowIndex-1] = this.getNoise(i+this.advancedX,this.lastRowIndex+this.advancedY, cloudPercent);
      }
      this.currentPositionY = 0;
    }
    if(this.currentPositionY < -1) {
      this.advancedY -= 1;
      for(let i = 0; i < this.lastColumnIndex; i++) {
        for(let j = this.lastRowIndex-2; j >= 0; j--) {
          this.noiseXY[i][j+1] = this.noiseXY[i][j];
        }
      }
      for(let i = 0; i < this.lastColumnIndex; i++) {
        this.noiseXY[i][0] = this.getNoise(i + this.advancedX, this.advancedY, cloudPercent);
      }
      this.currentPositionY = 0;
    }

    this.offsetX = this.s.int(this.currentPositionX*this.resolution)
    this.offsetY = this.s.int(this.currentPositionY*this.resolution)

    return (this.lastOffsetX != this.offsetX || this.lastOffsetY != this.offsetY);
  }


  display = function() {
    this.s.noStroke();
    for(let i = 0; i < this.lastColumnIndex; i++) {
      for(let j = 0; j < this.lastRowIndex; j++) {
        let noise = this.noiseXY[i][j];
        if(noise > 0) {
          let depth = this.s.constrain(1.2 - 1.2*((j - this.currentPositionY)/this.lastRowIndex),0,1);

          let noiseColor = this.s.map(noise,0,1,0.5*this.cloudBrihtness,1);

          const red = noiseColor*this.s.red(this.color);
          const green =  noiseColor*this.s.green(this.color);
          const blue =  noiseColor*this.s.blue(this.color);
          const alpha =  255*depth*depth*noise;

          this.s.fill(red, green, blue, alpha);
          this.s.rect((i-1)*this.resolution - this.offsetX, (j-1)*this.resolution - this.offsetY, this.resolution, this.resolution);
        }
      }
    }
    this.lastOffsetX = this.offsetX;
    this.lastOffsetY = this.offsetY;
  }

  reset = function(cloudPercent: number, width: number, height: number) {
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
        this.noiseXY[i][j] = this.getNoise(i,j, cloudPercent);
      }
    }
  }
}
