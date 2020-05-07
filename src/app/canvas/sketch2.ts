
export const sketch2 = (s2) => {
  let system;
  let wind;
  let smallPoint = 3;
  let largePoint = 5;
  let img;
  let iteration = -2;

  s2.preload= () => {
    img = s2.loadImage('assets/symbol.png');
  }

  s2.setup = () => {
    s2.createCanvas(s2.windowWidth, s2.windowHeight);
    s2.noStroke();
    img.loadPixels();
    system = new ParticleSystem();
    let i =0;
    while(i<1300) {
      let position = s2.createVector(img.width * s2.random(0, 1), img.height * s2.random(0, 1));
      let pix = img.get(position.x + 200, position.y + 200);
      if ((s2.red(pix) < 250 && s2.alpha(pix)>128)) {
        system.addParticle(position, pix);
        i++;
      }
    }
    s2.noLoop();
    wind = s2.randomGaussian(0.008, 0.002);
  }

  s2.draw = () => {
      s2.background(230);
      if (iteration < 30) {
        if(iteration > 10)
          s2.tint(255, s2.map(iteration, 15, 30, 255, 0));
        s2.image(img, 200, 200);
        iteration++;
      }
      system.run();
  }

  s2.windowResized = () => {
    s2.resizeCanvas(s2.windowWidth, s2.windowHeight);
  }

  let ParticleSystem = function() {
    this.particles = [];
  };

  let Particle = function(position, pix) {
    this.position = position.copy();
    this.initialPosition = this.position.copy();
    this.radio = 0;
    this.radioEnd = s2.random(smallPoint, largePoint);
    this.pix = pix;
    this.acceleration = s2.createVector(0, (this.radioEnd/s2.map(s2.red(pix), 0, 255, 3, 15))*s2.randomGaussian(0.02, 0.006));
    this.velocity = s2.createVector(s2.randomGaussian(0, 0.004), s2.randomGaussian(-0.1, 0.1));
    this.lifespan = 3000;
  };

  Particle.prototype.run = function(iteration) {
    this.update();
    this.display(iteration);
  };

  Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if(s2.random(3) <1) {
      this.velocity.x += s2.randomGaussian(wind, 0.02);
      this.velocity.y += s2.randomGaussian(0, 0.001);
    }
    this.lifespan -= 2;
  };

  Particle.prototype.display = function(iteration) {
    s2.fill(this.pix);
    if(iteration < 20) {
     if(iteration < 7) {
        this.radio = s2.map(iteration, 0, 7, 0, this.radioEnd*0.2);
      } else if(iteration < 14) {
        this.radio = s2.map(iteration, 7, 13, this.radioEnd*0.2, this.radioEnd*0.7);
      } else {
        this.radio = s2.map(iteration, 13, 17, this.radioEnd*0.7, this.radioEnd);
      }
    }
    s2.ellipse(this.position.x, this.position.y, this.radio, this.radio);

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
