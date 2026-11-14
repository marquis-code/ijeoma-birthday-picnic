import { useEffect, useRef } from "react";

const COLORS = ["#cba3de", "#e8d6f0", "#c79bc8", "#f8f3fa", "#f3c6d7", "#f3dfb0", "#8b5e9e"];

function makeParticle(width, height, initial = false) {
  const roll = Math.random();
  const shape = roll > 0.7 ? "heart" : roll > 0.4 ? "rect" : "circle";
  return {
    x: Math.random() * width,
    y: initial ? Math.random() * height : -20 - Math.random() * height * 0.35,
    vy: 0.28 + Math.random() * 0.65,
    vx: -0.12 + Math.random() * 0.24,
    gravity: 0,
    size: 3 + Math.random() * 6,
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
    const count = width < 761 ? 20 : 38;
    let particles = [];

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
