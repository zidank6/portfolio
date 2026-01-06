'use client';

import { useEffect, useRef, useState } from 'react';

const STAR_COUNT = 120;
const SHOOTING_STAR_CHANCE = 0.004;

export const ShootingStarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handleChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.4 + 0.2,
      drift: Math.random() * 0.15 + 0.05
    }));

    const shootingStars: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }[] = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(255,255,255,0.2)';

      stars.forEach((star) => {
        star.y += star.drift;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }
        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${star.alpha})`;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      if (Math.random() < SHOOTING_STAR_CHANCE) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.4,
          vx: -(Math.random() * 6 + 4),
          vy: Math.random() * 2 + 1,
          life: 0
        });
      }

      shootingStars.forEach((star, index) => {
        star.x += star.vx;
        star.y += star.vy;
        star.life += 1;
        const alpha = Math.max(0, 0.5 - star.life * 0.02);
        context.strokeStyle = `rgba(255,255,255,${alpha})`;
        context.lineWidth = 1.2;
        context.beginPath();
        context.moveTo(star.x, star.y);
        context.lineTo(star.x - star.vx * 2.5, star.y - star.vy * 2.5);
        context.stroke();
        if (star.life > 40) {
          shootingStars.splice(index, 1);
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60" />;
};
