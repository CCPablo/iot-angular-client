
export const sketch = (s) => {
    let system;
    let wind;
    let blackPoint = 2;
    let redPetal = 3;
    let img;
    let iteration = -2;

    s.preload= () => {
      img = s.loadImage('assets/symbol.png');
    }

    s.setup = () => {
      s.createCanvas(s.windowWidth, s.windowHeight);
      s.noStroke();
      img.loadPixels();
      system = new ParticleSystem();
      let i =0;
      while(i<300) {
        let position = s.createVector(img.width * s.random(0, 1), img.height * s.random(0, 1), 0);
        let pix = img.get(position.x, position.y);
        if ((s.red(pix) < 250 && s.alpha(pix)>128)) {
          if(s.red(pix) > 60 && s.random(2)<1)
            continue;
          system.addParticle(position, pix);
          i++;
        }
      }
      s.noLoop();
      wind = s.randomGaussian(0.005, 0.002);
    }

    s.draw = () => {
        s.background(230);
        if (iteration < 30) {
          if(iteration > 10)
            s.tint(255, s.map(iteration, 15, 30, 255, 0));
          s.image(img, 0, 0);
          iteration++;
        }
        system.run();
    }

    s.windowResized = () => {
      s.resizeCanvas(s.windowWidth, s.windowHeight);
    }

    s.createRandomShape = (radius, numberOfVertex) =>  {
        let shape = [];
        let angle = s.radians(360 / numberOfVertex);
        let previous = s.createVector(s.random(-radius, radius), s.random(-radius, radius));
        for (var i = 0; i < numberOfVertex; i++) {
          previous.x = previous.x + s.random(-radius/3,radius/3);
          previous.y = previous.y + s.random(-radius/3,radius/3);
          let x = s.cos(angle * i) * radius;
          let y = s.sin(angle * i) * radius;
          let v = s.createVector(x, y).add(previous);
          shape.push(v);
        }
        return shape;
    }

    let drawShape = function(shape, position, radious) {
        s.beginShape();
        radious *= s.map(position.z, 0, 30, 1, 1.1);
        s.curveVertex((shape[shape.length-1].x)*radious + position.x, (shape[shape.length-1].y)*radious + position.y);
        for (var i = 0; i < shape.length; i++){
            s.curveVertex((shape[i].x)*radious + position.x, (shape[i].y)*radious + position.y);
        }
        s.curveVertex((shape[0].x )*radious+ position.x, (shape[0].y)*radious + position.y);
        s.endShape(s.CLOSE);
    }

    let ParticleSystem = function() {
      this.particles = [];
    };

    let Particle = function(position, pix) {
      this.position = position.copy();
      this.initialPosition = this.position.copy();
      this.radio = 0;
      if(s.red(pix) > 50 ){
        this.radioEnd = redPetal;
      } else {
        this.radioEnd = blackPoint;
      }
      this.pix = pix;
      if(s.red(pix) > 80) {
        this.acceleration = s.createVector(0, s.randomGaussian(0.007, 0.002), s.randomGaussian(0, 0.002));
      } else {
        this.acceleration = s.createVector(0, s.randomGaussian(0.012, 0.003), s.randomGaussian(0, 0.002));
      }
      this.velocity = s.createVector(s.randomGaussian(0, 0.004), s.randomGaussian(-0.1, 0.1), s.randomGaussian(-0.01, 0.01));
      this.lifespan = 2000;
      this.shape = s.createRandomShape(this.radioEnd, 6);
    };

    Particle.prototype.run = function(iteration) {
      this.update();
      this.display(iteration);
    };

    Particle.prototype.update = function() {
      this.velocity.add(this.acceleration);
      if(s.random(3) < 2 && s.red(this.pix) > 80) {
        this.velocity.x += s.randomGaussian(wind, 0.03);
        this.velocity.y += s.randomGaussian(0, 0.001);
        this.velocity.z += s.randomGaussian(0, 0.03);

      } else {
        this.velocity.x += s.randomGaussian(wind/2.5, 0.01);
        this.velocity.y += s.randomGaussian(0, 0.001);
        this.velocity.y += s.randomGaussian(0, 0.03);
      }
      this.position.add(this.velocity);
      this.lifespan -= 2;
    };

    Particle.prototype.display = function(iteration) {
      s.fill(this.pix);
      if(iteration < 20) {
       if(iteration < 7) {
          this.radio = s.map(iteration, 0, 7, 0, this.radioEnd*0.2);
        } else if(iteration < 14) {
          this.radio = s.map(iteration, 7, 13, this.radioEnd*0.2, this.radioEnd*0.7);
        } else {
          this.radio = s.map(iteration, 13, 17, this.radioEnd*0.7, this.radioEnd);
        }
      }
     drawShape(this.shape, this.position, this.radio/this.radioEnd);

    };

    Particle.prototype.isDead = function() {
      return this.lifespan < 0;
    };

    ParticleSystem.prototype.addParticle = function(position, pix) {
      this.particles.push(new Particle(position, pix));
    };

    ParticleSystem.prototype.run = function() {
      for (let i = this.particles.length-1; i >= 0; i--) {
        let p = this.particles[i];
        p.run(iteration);
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    };
  }
