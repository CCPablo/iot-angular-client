export class Moon {

  color1 = this.s.color(0,25,25,0); //red
  color2 = this.s.color(0,25,25,0); //gray
  color3 = this.s.color(0,25,25,0); //blue
  color4 = this.s.color(0,25,25,0); //green

  backgroundColor = this.s.color(0,0);
  moonColor = this.s.color(255,255,75,255);

  radius;
  color;
  phase;

  constructor(private s: any, radius, phase) {
    this.radius = radius;
    this.color = s.color(255);
    this.phase = phase;
  }

  update = () => {
    this.color1 = this.s.color(0,25,25,0); //red
    this.color2 = this.s.color(0,25,25,0); //gray
    this.color3 = this.s.color(0,25,25,0); //blue
    this.color4 = this.s.color(0,25,25,0); //green

    if (-this.s.PI/2 < this.phase && this.phase < 0) {
      this.color3 = this.moonColor;
      this.color4 = this.moonColor;
      this.color1 = this.moonColor;
      this.color2 = this.backgroundColor;
    } else if (-this.s.PI < this.phase && this.phase < -this.s.PI/2) {
      this.color1 = this.moonColor;
      this.color3 = this.backgroundColor;
      this.color4 = this.backgroundColor;
      this.color2 = this.backgroundColor;
    } else if (-3*this.s.PI/2 < this.phase && this.phase < -this.s.PI) {
      this.color4 = this.backgroundColor;
      this.color2 = this.moonColor;
      this.color1 = this.backgroundColor;
      this.color3 = this.backgroundColor;
    } else if (-2*this.s.PI < this.phase && this.phase < -3*this.s.PI/2) {
      this.color4 = this.s.color(0,255,0,0);
      this.color3 = this.moonColor;
      this.color1 = this.backgroundColor;
      this.color2 = this.moonColor;
    }
  }

  display = () => {
    //this.s.blendMode(this.s.ADD);
    this.s.noStroke();
    this.s.ellipseMode(this.s.CENTER);
    this.s.angleMode(this.s.RADIANS)

    this.phase-= 0.01;
    this.phase%= -2*this.s.TWO_PI;

    let positionX = this.s.width - this.s.width/3;
    let positionY = this.s.height / 2;

    this.s.fill(this.color1);
    this.s.arc(positionX, positionY, this.radius, this.radius, this.s.PI/2, 3*this.s.PI/2);
    this.s.fill(this.color2);
    this.s.arc(positionX, positionY, this.radius, this.radius, 3*this.s.PI/2, this.s.PI/2);

    let heightPhase = this.radius;
    let widthPhase = this.s.map(this.s.cos(this.phase), 0, 1, 0, this.radius);

    this.s.fill(this.color3);
    this.s.arc(positionX, positionY, widthPhase - 2, heightPhase + 1, this.s.PI/2, 3*this.s.PI/2);
    this.s.fill(this.color4);
    this.s.arc(positionX, positionY, widthPhase - 2, heightPhase + 1, 3*this.s.PI/2, this.s.PI/2);

    //this.s.blendMode(this.s.BLEND);
  }
}
