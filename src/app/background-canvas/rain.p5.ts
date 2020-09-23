export class Rain {

  rainPercent;

  constructor(private s: any, rainPercent = 0) {
    this.rainPercent = rainPercent;
  }


  display = () => {

    for(let i = 0; i < this.s.width; i++) {
      for(let j = 0; j < this.rainPercent*10; j++) {
        this.s.strokeWeight(1.6 + this.s.random(1));
        let yStart = this.s.random(2*this.s.height/3);
        if(this.s.pixelIsClouded(i, yStart)) {
          this.s.stroke(156 + this.s.random(56), 2 + this.s.random(1.5));
          this.s.line(i, yStart, i + 10 + this.s.random(7), this.s.height);
        }
      }
    }
  }

}
