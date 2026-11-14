const art = {
  flower: (
    <>
      <g fill="currentColor">
        <ellipse cx="32" cy="17" rx="9" ry="14" />
        <ellipse cx="32" cy="47" rx="9" ry="14" />
        <ellipse cx="17" cy="32" rx="14" ry="9" />
        <ellipse cx="47" cy="32" rx="14" ry="9" />
        <ellipse cx="21" cy="21" rx="8" ry="12" transform="rotate(-45 21 21)" />
        <ellipse cx="43" cy="43" rx="8" ry="12" transform="rotate(-45 43 43)" />
        <ellipse cx="43" cy="21" rx="8" ry="12" transform="rotate(45 43 21)" />
        <ellipse cx="21" cy="43" rx="8" ry="12" transform="rotate(45 21 43)" />
      </g>
      <circle cx="32" cy="32" r="6" fill="#f3dfb0" />
      <circle cx="32" cy="32" r="2" fill="#f8f3fa" />
    </>
  ),
  cake: (
    <>
      <path d="M18 46h28v5H18z" fill="currentColor" opacity="0.55" />
      <path d="M20 34h24v12H20z" fill="currentColor" opacity="0.9" />
      <path d="M18 24h28v9H18z" fill="currentColor" opacity="0.72" />
      <path d="M32 23v-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 12c-3-2-2-5 0-7 2 2 3 5 0 7Z" fill="#f3dfb0" />
      <path
        d="M20 31c2 0 2.4-3 4.4-3s2.4 3 4.4 3 2.4-3 4.4-3 2.4 3 4.4 3 2.4-3 4.4-3 2.4 3 4.4 3"
        fill="none"
        stroke="#f3c6d7"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path d="M20 43c2 0 2.4-3 4.4-3s2.4 3 4.4 3 2.4-3 4.4-3 2.4 3 4.4 3 2.4-3 4.4-3 2.4 3 4.4 3" fill="none" stroke="#f8f3fa" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
    </>
  ),
  bow: (
    <>
      <path d="M32 32C23 19 7 21 8 32c-1 11 14 14 24 0Z" fill="currentColor" opacity="0.92" />
      <path d="M32 32c9-13 25-11 24 0 1 11-14 14-24 0Z" fill="currentColor" opacity="0.78" />
      <path d="M30 35 21 57M34 35l9 22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="32" r="4.5" fill="#f3dfb0" />
    </>
  ),
  sparkle: <path d="M32 3l5.5 21.5L59 30l-21.5 5.5L32 57l-5.5-21.5L5 30l21.5-5.5Z" fill="currentColor" />,
  petal: <path d="M16 2c8 7 13 12 13 19 0 7-5 11-13 11S3 28 3 21C3 14 8 9 16 2Z" fill="currentColor" />,
  spray: (
    <>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M32 94C33 72 40 54 51 38" />
        <path d="M52 64c13-2 20-10 21-21-12 1-20 9-21 21Z" fill="currentColor" stroke="none" opacity="0.45" />
        <path d="M45 68c-14 0-22-8-24-19 12 0 21 7 24 19Z" fill="currentColor" stroke="none" opacity="0.35" />
      </g>
      <g fill="currentColor">
        <g transform="translate(51 34)">
          <ellipse cx="0" cy="-13" rx="6" ry="11" />
          <ellipse cx="0" cy="13" rx="6" ry="11" />
          <ellipse cx="-13" cy="0" rx="11" ry="6" />
          <ellipse cx="13" cy="0" rx="11" ry="6" />
          <ellipse cx="-9" cy="-9" rx="6" ry="10" transform="rotate(-45 -9 -9)" />
          <ellipse cx="9" cy="9" rx="6" ry="10" transform="rotate(-45 9 9)" />
          <circle cx="0" cy="0" r="4.5" fill="#f3dfb0" />
        </g>
        <g transform="translate(73 18) scale(.62)">
          <ellipse cx="0" cy="-12" rx="5" ry="10" />
          <ellipse cx="0" cy="12" rx="5" ry="10" />
          <ellipse cx="-12" cy="0" rx="10" ry="5" />
          <ellipse cx="12" cy="0" rx="10" ry="5" />
          <circle cx="0" cy="0" r="4" fill="#f3dfb0" />
        </g>
        <g transform="translate(26 57) scale(.48)">
          <ellipse cx="0" cy="-12" rx="5" ry="10" />
          <ellipse cx="0" cy="12" rx="5" ry="10" />
          <ellipse cx="-12" cy="0" rx="10" ry="5" />
          <ellipse cx="12" cy="0" rx="10" ry="5" />
          <circle cx="0" cy="0" r="4" fill="#f3dfb0" />
        </g>
      </g>
    </>
  ),
};

export function Flower(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      {art.flower}
    </svg>
  );
}

export function Cake(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      {art.cake}
    </svg>
  );
}

export function Bow(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      {art.bow}
    </svg>
  );
}

export function Sparkle(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      {art.sparkle}
    </svg>
  );
}

export function Petal(props) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      {art.petal}
    </svg>
  );
}

export function Spray(props) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      {art.spray}
    </svg>
  );
}

const COMPONENTS = { flower: Flower, cake: Cake, bow: Bow, sparkle: Sparkle, spray: Spray };

const DECOR = {
  hero: [
    { art: "spray", className: "left-[0.5%] top-[14%] h-28 w-28 text-orchid/30", motion: "decor-sway", delay: "-1.4s", hide: true },
    { art: "bow", className: "right-[2.5%] top-[16%] h-14 w-14 text-blush/50", motion: "decor-sway", delay: "-3.6s", hide: true },
    { art: "cake", className: "left-[5%] bottom-[7%] h-14 w-14 text-orchid/40", motion: "decor-bob", delay: "-2.2s", hide: true },
    { art: "sparkle", className: "right-[7%] bottom-[18%] h-7 w-7 text-butter/70", motion: "decor-twinkle", delay: "-0.8s" },
  ],
  gate: [
    { art: "flower", className: "left-[8%] bottom-[20%] h-12 w-12 text-lilac/30", motion: "decor-sway", delay: "-1.4s" },
    { art: "cake", className: "right-[8%] bottom-[18%] h-12 w-12 text-blush/35", motion: "decor-bob", delay: "-2.8s" },
    { art: "bow", className: "left-[10%] top-[20%] h-11 w-11 text-lilac/25", motion: "decor-sway", delay: "-4s", hide: true },
    { art: "sparkle", className: "right-[11%] top-[30%] h-6 w-6 text-butter/55", motion: "decor-twinkle", delay: "-2s", hide: true },
  ],
  invitation: [
    { art: "spray", className: "left-[0.5%] top-[4%] h-24 w-24 text-orchid/30", motion: "decor-sway", delay: "-2s", hide: true },
    { art: "flower", className: "right-[1%] top-[1.5%] h-9 w-9 text-orchid/35 min-[761px]:hidden", motion: "decor-sway", delay: "-3.2s" },
    { art: "bow", className: "right-[2%] top-[7%] h-14 w-14 text-blush/55 max-[760px]:top-[1%] max-[760px]:h-10 max-[760px]:w-10", motion: "decor-sway", delay: "-4s" },
    { art: "cake", className: "right-[4%] bottom-[8%] h-14 w-14 text-orchid/35", motion: "decor-bob", delay: "-1.5s", hide: true },
    { art: "sparkle", className: "left-[4%] bottom-[17%] h-7 w-7 text-butter/70", motion: "decor-twinkle", delay: "-2.5s", hide: true },
  ],
  story: [
    { art: "spray", className: "left-[0.5%] top-[8%] h-24 w-24 text-orchid/30", motion: "decor-sway", delay: "-2.4s", hide: true },
    { art: "flower", className: "right-[1%] top-[1.5%] h-9 w-9 text-orchid/35 min-[761px]:hidden", motion: "decor-sway", delay: "-2.8s" },
    { art: "bow", className: "right-[2%] top-[8%] h-12 w-12 text-blush/45", motion: "decor-sway", delay: "-3s", hide: true },
    { art: "cake", className: "left-[3%] bottom-[10%] h-12 w-12 text-orchid/35", motion: "decor-bob", delay: "-2s", hide: true },
    { art: "sparkle", className: "right-[4%] bottom-[16%] h-7 w-7 text-butter/70", motion: "decor-twinkle", delay: "-1.2s" },
  ],
  wishlist: [
    { art: "spray", className: "left-[0.5%] top-[6%] h-20 w-20 text-lilac/30", motion: "decor-sway", delay: "-1.7s", hide: true },
    { art: "flower", className: "left-[1%] top-[11%] h-14 w-14 text-lilac/40 max-[760px]:top-[1.5%] max-[760px]:h-9 max-[760px]:w-9", motion: "decor-sway", delay: "-3.1s" },
    { art: "cake", className: "right-[2%] top-[12%] h-14 w-14 text-blush/40", motion: "decor-bob", delay: "-3.4s", hide: true },
    { art: "bow", className: "left-[2%] bottom-[26%] h-12 w-12 text-lilac/30", motion: "decor-sway", delay: "-4.8s", hide: true },
    { art: "sparkle", className: "right-[3%] bottom-[12%] h-7 w-7 text-butter/60", motion: "decor-twinkle", delay: "-1s" },
  ],
  venue: [
    { art: "flower", className: "right-[1.5%] top-[14%] h-14 w-14 text-lilac/40 max-[760px]:hidden", motion: "decor-sway", delay: "-2.5s" },
    { art: "cake", className: "left-[2%] bottom-[10%] h-12 w-12 text-blush/40 max-[760px]:hidden", motion: "decor-bob", delay: "-1.2s" },
    { art: "bow", className: "left-[2%] top-[12%] h-12 w-12 text-lilac/20", motion: "decor-sway", delay: "-4s", hide: true },
    { art: "sparkle", className: "right-[4%] bottom-[18%] h-7 w-7 text-butter/55", motion: "decor-twinkle", delay: "-2s" },
  ],
  rsvp: [
    { art: "bow", className: "right-[1.5%] top-[10%] h-14 w-14 text-blush/50", motion: "decor-sway", delay: "-2.2s" },
    { art: "cake", className: "left-[2%] bottom-[11%] h-12 w-12 text-orchid/35", motion: "decor-bob", delay: "-3s" },
    { art: "flower", className: "left-[2.5%] top-[20%] h-12 w-12 text-orchid/25", motion: "decor-sway", delay: "-1.4s", hide: true },
    { art: "sparkle", className: "right-[4%] bottom-[16%] h-7 w-7 text-butter/65", motion: "decor-twinkle", delay: "-2.7s" },
  ],
  footer: [
    { art: "flower", className: "left-[7%] top-[18%] h-12 w-12 text-lilac/40", motion: "decor-sway", delay: "-2s" },
    { art: "cake", className: "right-[7%] top-[24%] h-12 w-12 text-blush/40", motion: "decor-bob", delay: "-3.4s" },
    { art: "bow", className: "left-[13%] bottom-[16%] h-12 w-12 text-lilac/20", motion: "decor-sway", delay: "-1s", hide: true },
    { art: "sparkle", className: "right-[5%] bottom-[20%] h-7 w-7 text-butter/60", motion: "decor-twinkle", delay: "-2.2s", hide: true },
  ],
};

export function CelebrationDecor({ section }) {
  const items = DECOR[section] || [];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {items.map((item, index) => {
        const Art = COMPONENTS[item.art];
        return (
          <Art
            key={`${section}-${item.art}-${index}`}
            className={`absolute ${item.className} ${item.hide ? "max-[760px]:hidden" : ""} ${item.motion}`}
            style={{ animationDelay: item.delay }}
          />
        );
      })}
    </div>
  );
}

const AMBIENT = [
  { art: "flower", className: "left-[1%] top-[21%] h-12 w-12 text-orchid/25", motion: "decor-sway", delay: "-1s" },
  { art: "cake", className: "right-[1.5%] top-[33%] h-12 w-12 text-lilac/30", motion: "decor-bob", delay: "-2.8s" },
  { art: "bow", className: "left-[2%] top-[62%] h-12 w-12 text-blush/25", motion: "decor-sway", delay: "-4s" },
  { art: "flower", className: "right-[1%] top-[74%] h-10 w-10 text-lilac/25", motion: "decor-sway", delay: "-2.2s" },
  { art: "sparkle", className: "left-[3%] top-[44%] h-6 w-6 text-butter/60", motion: "decor-twinkle", delay: "-1.6s" },
];

const PETALS = [
  { left: "7%", size: "h-3 w-2", color: "text-lilac/40", delay: "0s", duration: "16s" },
  { left: "19%", size: "h-2 w-1.5", color: "text-blush/45", delay: "-5s", duration: "19s" },
  { left: "32%", size: "h-3 w-2", color: "text-butter/55", delay: "-9s", duration: "17s" },
  { left: "47%", size: "h-2 w-1.5", color: "text-lilac/35", delay: "-2s", duration: "21s" },
  { left: "61%", size: "h-3 w-2", color: "text-blush/40", delay: "-12s", duration: "18s" },
  { left: "74%", size: "h-2 w-1.5", color: "text-butter/50", delay: "-7s", duration: "20s" },
  { left: "86%", size: "h-3 w-2", color: "text-lilac/35", delay: "-3s", duration: "17s" },
  { left: "94%", size: "h-2 w-1.5", color: "text-blush/35", delay: "-10s", duration: "19s" },
];

export function AmbientCelebration() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[6] overflow-hidden">
      <div className="absolute inset-0 hidden min-[761px]:block">
        {AMBIENT.map((item, index) => {
          const Art = COMPONENTS[item.art];
          return (
            <Art
              key={`ambient-${item.art}-${index}`}
              className={`absolute ${item.className} ${item.motion}`}
              style={{ animationDelay: item.delay }}
            />
          );
        })}
      </div>
      {PETALS.map((petal, index) => (
        <Petal
          key={`petal-${index}`}
          className={`petal-fall absolute top-0 ${petal.size} ${petal.color}`}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}
    </div>
  );
}
