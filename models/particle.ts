export class Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  screenWidth: number;
  screenHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.screenWidth = canvasWidth;
    this.screenHeight = canvasHeight;
    this.x = Math.random() * this.screenWidth;
    this.y = Math.random() * this.screenHeight;
    this.radius = Math.random() * 2.5 + 1.5;
    this.speedX = random(-1, 1);
    this.speedY = random(1, 2);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > this.screenHeight) {
      this.y = -10;
      this.x = Math.random() * this.screenWidth * 1.5;
    }
  }
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min + 1);
}
