'use client';
import React, { useEffect, useRef } from 'react';
import { Particle } from '../models/particle';
const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const count = 40;
    let particles: Particle[] = [];

    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
          particle.draw(ctx);
          particle.update();
        });
        window.requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Snowfall;
