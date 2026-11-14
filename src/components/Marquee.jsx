const items = [
  "Happy Birthday, Tweety",
  "05 · 12 · 2026",
  "Jaekel House · Lagos",
  "A violet hour",
];

function Group({ hidden = false }) {
  return (
    <div
      className="flex flex-none items-center gap-10 pr-10 max-[760px]:gap-7 max-[760px]:pr-7"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="whitespace-nowrap font-serif text-[1.05rem] tracking-[0.08em] max-[760px]:text-[0.92rem]">
            {item}
          </span>
          <i className="text-[0.65rem] not-italic text-lilac">✦</i>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative z-[3] overflow-hidden border-y border-lilac-pale/25 bg-plum py-[1.05rem] text-lilac-pale max-[760px]:py-3.5"
      aria-label="Happy Birthday Ijeoma, 5 December 2026, Jaekel House Lagos"
    >
      <div className="marquee-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
