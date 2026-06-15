import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  speed: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  flickerSpeed: number;
  phase: number;
}

const HeroStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const stars: Star[] = [];
    const particles: Particle[] = [];

    // Helper to generate a star
    const createStar = (x: number, y: number, size = Math.random() * 1.5 + 0.8): Star => ({
      x,
      y,
      size,
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2
    });

    // Initialize random background stars (some single, some in bunches)
    const initStars = () => {
      stars.length = 0;
      // Single stars
      const numSingleStars = Math.floor((width * height) / 14700); // density-based (increased 70%)
      for (let i = 0; i < numSingleStars; i++) {
        stars.push(createStar(Math.random() * width, Math.random() * height));
      }

      // Bunches of stars (clusters)
      const numBunches = Math.floor((width * height) / 58800); // density-based (increased 70%)
      for (let b = 0; b < numBunches; b++) {
        const centerX = Math.random() * width;
        const centerY = Math.random() * height;
        const bunchSize = Math.floor(Math.random() * 4) + 3; // 3 to 6 stars
        for (let i = 0; i < bunchSize; i++) {
          const offsetX = (Math.random() - 0.5) * 50; // scattered in a 50px radius
          const offsetY = (Math.random() - 0.5) * 50;
          stars.push(createStar(centerX + offsetX, centerY + offsetY, Math.random() * 1.4 + 0.6));
        }
      }
    };

    initStars();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Mouse/Touch Interaction handler
    const handleMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Spawn a cluster of trail particles
      const numToSpawn = Math.floor(Math.random() * 2) + 2; // 2 to 3 particles per movement frame
      for (let i = 0; i < numToSpawn; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 - 0.3, // slight upward float
          size: Math.random() * 2.5 + 0.8,
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015, // decay rate
          flickerSpeed: Math.random() * 0.15 + 0.05,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const heroSection = canvas.closest('.hero-section') as HTMLElement | null;
    if (heroSection) {
      heroSection.addEventListener('mousemove', onMouseMove);
      heroSection.addEventListener('touchmove', onTouchMove, { passive: true });
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and animate background stars
      for (const star of stars) {
        star.phase += star.speed;
        star.alpha = Math.sin(star.phase) * 0.5 + 0.5; // sine wave oscillation for smooth twinkle
        const displayAlpha = star.alpha * star.maxAlpha;

        ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross glow for slightly larger stars when they are bright
        if (star.size > 1.8 && displayAlpha > 0.6) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${displayAlpha * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      }

      // Draw and animate trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.phase += p.flickerSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Sparkling flicker effect
        const displayAlpha = p.alpha * (Math.sin(p.phase) * 0.3 + 0.7);

        ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring around the trail particles
        if (p.size > 1.5) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${displayAlpha * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', onMouseMove);
        heroSection.removeEventListener('touchmove', onTouchMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HeroStars;
