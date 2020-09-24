import { Clouds } from './clouds.p5'
import { Stars } from './stars.p5'
import { Day } from './day.p5'
import { Sky } from './sky.p5'
import { Sun } from './sun.p5'
import { Moon } from './moon.p5'
import { Rain } from './rain.p5'

export const sketch = (s) => {
  s.day;
  let sky: Sky;
  let sun: Sun;
  let moon: Moon;
  let clouds: Clouds;
  let stars: Stars;
  let rain: Rain;

  let sunDegreePercent = 0.34;
  let cloudResolution = 3;
  let cloudCoverPercent = 0;
  let windSpeedX = 0;
  let windSpeedY = 0;

  let windRoseImage = s.loadImage('assets/rosa_vientos.png');

  s.needsUpdate = true;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.day = new Day(s, sunDegreePercent);
    sky = new Sky(s);
    sun = new Sun(s, s.windowHeight/18 + s.windowWidth/25, 2*s.width/3);
    moon = new Moon(s, s.windowHeight/9, 0);
    stars = new Stars(s,50);
    clouds = new Clouds(s, s.windowHeight, cloudCoverPercent, cloudResolution);
    rain = new Rain(s);
    s.day.update(sunDegreePercent);
    s.frameRate(20);
  };

  s.draw = () => {
    /*
    if(clouds.update(cloudCoverPercent, windSpeedX, windSpeedY, 0)) {
      s.needsUpdate = true;
    }
    */
    if(s.needsUpdate) {
      s.day.update(sunDegreePercent);
      sun.update();
      clouds.update(cloudCoverPercent, windSpeedX, windSpeedY, 0);
      sky.update(cloudCoverPercent, clouds.colorByPeriod);
      moon.update();
      for(let i=0; i<5; i++) {
        sky.display();
        sun.display();
      }
      stars.display();
      //moon.display();
      clouds.display(cloudCoverPercent);
      rain.display();

      s.image(windRoseImage, s.width - 150, 50);
      s.needsUpdate = false;
    }
  };

  s.pixelIsClouded = (x, y) =>  {
    return clouds.pixelIsClouded(x, y);
  }

  s.pixelIsSunded = (x, y) =>  {
    return sun.pixelIsSunded(x, y);
  }

  s.update = () => {
    s.needsUpdate = true;
  }

  s.setSunDegreePercent = (sunDegreePercent_) => {
    sunDegreePercent = sunDegreePercent_;
  }

  s.setCloudCoverPercent = (cloudCoverPercent_) => {
    cloudCoverPercent = cloudCoverPercent_;
  }

  s.mouseClicked = function() {

    sunDegreePercent = (sunDegreePercent + 0.01)%1;

    cloudCoverPercent = (cloudCoverPercent + 0.05)%1;
    //clouds.reset(cloudCoverPercent, s.windowWidth, s.windowHeight);
    s.print(cloudCoverPercent);
    s.update();
  }

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.update();
  }
}
