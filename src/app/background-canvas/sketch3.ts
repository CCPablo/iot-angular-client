import { Clouds } from './clouds.p5'
import { Stars } from './stars.p5'
import { Day } from './day.p5'
import { Sky } from './sky.p5'

export const sketch = (s) => {

  let Sun = function(radius = 150) {
    this.x = 3*s.width/5;
    this.radius = radius;
  };

  Sun.prototype.display = function() {
    s.colorMode(s.HSB);
    s.fill(45,100,s.map(sunDegreePercent, 0, 1, 70, 91));
    s.circle(this.x,
              s.map(s.getSunHeigth(),0, 1,s.height+this.radius, s.height*0.1)
                ,this.radius);
    s.colorMode(s.RGB);
  };

  s.getSunHeigth = () => {
    return s.sin(sunDegreePercent*s.TWO_PI);
  }

  let Moon = function() {
    this.radius = s.width/11.25;
    this.color = s.color(255);

    this.phase = 0;

    this.bg_color = s.color(0,25,25,0);
    this.light_color = s.color(255,255,75,255);

    this.color1 = s.color(0,25,25,0); //red
    this.color2 = s.color(0,25,25,0); //gray
    this.color3 = s.color(0,25,25,0); //blue
    this.color4 = s.color(0,25,25,0); //green
  }

  Moon.prototype.display = function() {
    s.noStroke();
    s.ellipseMode(s.CENTER);
    s.angleMode(s.RADIANS)

    this.phase-= 0.01;
    this.phase%= -2*s.TWO_PI;

    let positionX = s.width - s.width/3;
    let positionY = s.height / 2;

    s.fill(this.color1);
    s.arc(positionX, positionY, this.radius, this.radius, s.PI/2, 3*s.PI/2);
    s.fill(this.color2);
    s.arc(positionX, positionY, this.radius, this.radius, 3*s.PI/2, s.PI/2);

    let heightPhase = this.radius;
    let widthPhase = s.map(s.cos(this.phase), 0, 1, 0, this.radius);

    s.fill(this.color3);
    s.arc(positionX, positionY, widthPhase - 2, heightPhase + 1, s.PI/2, 3*s.PI/2);
    s.fill(this.color4);
    s.arc(positionX, positionY, widthPhase - 2, heightPhase + 1, 3*s.PI/2, s.PI/2);
  }

  Moon.prototype.setQuarter = function() {
    this.color1 = s.color(0,25,25,0); //red
    this.color2 = s.color(0,25,25,0); //gray
    this.color3 = s.color(0,25,25,0); //blue
    this.color4 = s.color(0,25,25,0); //green

    if (-s.PI/2 < this.phase && this.phase < 0) {
      this.color3 = this.light_color;
      this.color4 = this.light_color;
      this.color1 = this.light_color;
      this.color2 = this.bg_color;
    } else if (-s.PI < this.phase && this.phase < -s.PI/2) {
      this.color1 = this.light_color;
      this.color3 = this.bg_color;
      this.color4 = this.bg_color;
      this.color2 = this.bg_color;
    } else if (-3*s.PI/2 < this.phase && this.phase < -s.PI) {
      this.color4 = this.bg_color;
      this.color2 = this.light_color;
      this.color1 = this.bg_color;
      this.color3 = this.bg_color;
    } else if (-2*s.PI < this.phase && this.phase < -3*s.PI/2) {
      this.color4 = s.color(0,255,0,0);
      this.color3 = this.light_color;
      this.color1 = this.bg_color;
      this.color2 = this.light_color;
    }
  }

  s.day;
  let sky: Sky;
  let sunDegreePercent = 0.34;
  let sun;
  let moon;
  let clouds: Clouds;
  let stars: Stars;

  let cloudResolution = 4;
  let cloudPercent = 1;
  let windSpeedX = 0.1;
  let windSpeedY = 0;

  let img = s.loadImage('assets/rosa_vientos.png');

  s.needsUpdate = true;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.day = new Day(s, sunDegreePercent);
    sky = new Sky(s);
    sun = new Sun();
    moon = new Moon();
    stars = new Stars(s,50);
    clouds = new Clouds(s, s.windowHeight/4, cloudPercent, cloudResolution);
    s.frameRate(20);
  };

  s.draw = () => {
    if(clouds.update(cloudPercent, windSpeedX, windSpeedY, 0)) {
      s.needsUpdate = true;
    }
    if(s.needsUpdate) {
      s.day.update(sunDegreePercent);
      sky.update(cloudPercent, clouds.color);
      sky.display();

      stars.display();
      sun.display();
      moon.setQuarter();
     // moon.display();

      clouds.display();

      s.image(img, s.width - 250, 50);

      s.needsUpdate = false;
    }
  };

  s.update = () => {
    s.needsUpdate = true;
  }

  s.updateSunLight = (increment) => {
    sunDegreePercent = (sunDegreePercent + increment)%1;
  }

  s.updateCloudPercent = (increment) => {
    //cloudPercent = (cloudPercent + increment)%1;
  }

  s.mouseClicked = function() {
    cloudPercent = (cloudPercent + 0.05)%1;
    s.print('cloudpercent:' + cloudPercent.toString())
  }

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    clouds.reset(cloudPercent, s.windowWidth, s.windowHeight/4);
  }
}
