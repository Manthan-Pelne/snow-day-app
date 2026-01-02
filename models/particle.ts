export class Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    // Slightly smaller particles for a more delicate look
    this.radius = Math.random() * 1 + 2; 
    // Reduced speeds for a "slow motion" feel
    this.speedX = random(-0.5, 0.5); 
    this.speedY = random(0.2, 0.8); 
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // Use a slight transparency (0.7) so they look soft
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
    ctx.closePath();
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > canvasHeight) {
      this.y = -5;
      this.x = Math.random() * canvasWidth;
    }

    if (this.x > canvasWidth) this.x = 0;
    else if (this.x < 0) this.x = canvasWidth;
  }
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}