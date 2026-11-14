import { useEffect, useRef } from "react";

const COLORS = ["#cba3de", "#e8d6f0", "#c79bc8", "#f8f3fa", "#f3c6d7", "#f3dfb0", "#8b5e9e"];

function makeParticle(width, height, initial = false) {
  const roll = Math.random();
  const shape = roll > 0.58 ? "ribbon" : roll > 0.38 ? "heart" : roll > 0.18 ? "rect" : "circle";
  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : -20 - Math.random() * height * 0.35,
    vy: 0.28 + Math.random() * 0.65,
    vx: -0.12 + Math.random() * 0.24,
    gravity: 0,
    size: shape === "ribbon" ? 7 + Math.random() * 9 : 3 + Math.random() * 6,
    rotation: Math.random() * Math.PI * 2,
    spin: -0.015 + Math.random() * 0.03,
    wobble: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape,
    alpha: 0.34 + Math.random() * 0.42,
  };
}

export default function CelebrationRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      canvas.style.display = "none";
      return undefined;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const count = width < 761 ? 34 : 68;
    let particles = [];
    let bursts = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: count }, () => makeParticle(width, height, true));
    };

    const ribbonBurst = () => {
      const amount = width < 761 ? 12 : 24;
      const origin = Math.random() * width;
      for (let i = 0; i < amount; i += 1) {
        const p = makeParticle(width, height, false);
        p.x = origin + (Math.random() - 0.5) * 110;
        p.y = -12 - Math.random() * 30;
        p.shape = "ribbon";
        p.size = 7 + Math.random() * 9;
        p.vy = 1.2 + Math.random() * 2.8;
        p.vx = (Math.random() - 0.5) * 2.4;
        p.gravity = 0.035 + Math.random() * 0.025;
        p.alpha = 0.45 + Math.random() * 0.35;
        particles.push(p);
      }
      bursts.push(window.setTimeout(ribbonBurst, 5000 + Math.random() * 3000));
    };

    const drawHeart = (size) => {
      ctx.beginPath();
      ctx.moveTo(0, size * 0.28);
      ctx.bezierCurveTo(0, 0, -size * 0.5, 0, -size * 0.5, size * 0.34);
      ctx.bezierCurveTo(-size * 0.5, size * 0.74, 0, size, 0, size * 1.15);
      ctx.bezierCurveTo(0, size, size * 0.5, size * 0.74, size * 0.5, size * 0.34);
      ctx.bezierCurveTo(size * 0.5, 0, 0, 0, 0, size * 0.28);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, index) => {
        p.vy += p.gravity || 0;
        p.y += p.vy;
        p.wobble += 0.012;
        p.x += p.vx + Math.sin(p.wobble) * 0.08;
        p.rotation += p.spin;

        if (p.y > height + 24 || p.x < -28 || p.x > width + 28) {
          particles[index] = makeParticle(width, height, false);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.42, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "heart") {
          drawHeart(p.size);
        } else if (p.shape === "ribbon") {
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(-s * 0.7, -s * 0.15);
          ctx.bezierCurveTo(-s * 0.2, -s * 0.8, s * 0.2, s * 0.8, s * 0.7, s * 0.15);
          ctx.lineTo(s * 0.7, s * 0.42);
          ctx.bezierCurveTo(s * 0.2, s * 1.05, -s * 0.2, -s * 0.5, -s * 0.7, s * 0.15);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.62);
        }
        ctx.restore();
      });
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    seed();
    draw();
    const firstBurst = window.setTimeout(ribbonBurst, 500);
    window.addEventListener("resize", resize);

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        draw();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(firstBurst);
      bursts.forEach((timer) => window.clearTimeout(timer));
      bursts = [];
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1000] h-full w-full"
    />
  );
}
