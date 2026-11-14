import { useEffect, useRef } from "react";

const COLORS = ["#cba3de", "#e8d6f0", "#c79bc8", "#f8f3fa", "#7a528c", "#62336f"];

export default function Effects() {
  const confettiRef = useRef(null);
  const dustRef = useRef(null);

  useEffect(() => {
    const canvas = confettiRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    let particles = [];
    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter((p) => {
        p.vy += p.gravity;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.life -= p.decay;
        if (p.life <= 0) return false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.48, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        }
        ctx.restore();
        return true;
      });

      if (particles.length) {
        raf = window.requestAnimationFrame(draw);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onConfetti = (event) => {
      if (reduce) return;
      const { x, y, count = 60 } = event.detail || {};
      size();
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 7;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.2,
          gravity: 0.11 + Math.random() * 0.06,
          size: 4 + Math.random() * 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.25,
          life: 1,
          decay: 0.006 + Math.random() * 0.01,
          shape: Math.random() > 0.45 ? "rect" : "circle",
        });
      }
      if (!raf) raf = window.requestAnimationFrame(draw);
    };

    size();
    window.addEventListener("resize", size);
    window.addEventListener("ijeoma:confetti", onConfetti);
    return () => {
      window.removeEventListener("resize", size);
      window.removeEventListener("ijeoma:confetti", onConfetti);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = dustRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 760) {
      canvas.style.display = "none";
      return undefined;
    }

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let particles = [];

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: 28 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 0.6 + Math.random() * 1.8,
        drift: (Math.random() - 0.5) * 0.18,
        speed: 0.06 + Math.random() * 0.22,
        alpha: 0.12 + Math.random() * 0.33,
        hue: Math.random() > 0.7 ? "mauve" : "lilac",
        wobble: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.y -= p.speed;
        p.wobble += 0.01;
        p.x += p.drift + Math.sin(p.wobble) * 0.08;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "mauve"
            ? `rgba(199, 155, 200, ${p.alpha * 0.8})`
            : `rgba(155, 108, 174, ${p.alpha})`;
        ctx.fill();
      });
      raf = window.requestAnimationFrame(draw);
    };

    size();
    seed();
    draw();
    window.addEventListener("resize", size);
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
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas
        ref={dustRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] h-full w-full opacity-70"
      />
      <canvas
        ref={confettiRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[300] h-full w-full"
      />
    </>
  );
}
