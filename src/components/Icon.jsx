const paths = {
  arrow: <path d="M5 16h21M19 8.5 26.5 16 19 23.5" />,
  arrowUp: <path d="M16 26V6M8.5 13.5 16 6l7.5 7.5" />,
  calendar: (
    <>
      <rect x="4.5" y="7.5" width="23" height="20" rx="2" />
      <path d="M4.5 13.5h23M10.5 4.5v6M21.5 4.5v6M10 19h3M19 19h3M10 23.5h3" />
    </>
  ),
  pin: (
    <>
      <path d="M16 28s9-8.2 9-15a9 9 0 1 0-18 0c0 6.8 9 15 9 15Z" />
      <circle cx="16" cy="12.8" r="3.4" />
    </>
  ),
  heart: (
    <path d="M16 27S4.8 20.1 4.8 12.7a6.2 6.2 0 0 1 11.2-3.5 6.2 6.2 0 0 1 11.2 3.5C27.2 20.1 16 27 16 27Z" />
  ),
  music: (
    <>
      <path d="M12.5 24.5V8.8l11-2.1v14.5" />
      <circle cx="9.4" cy="24.5" r="3.4" />
      <circle cx="20.4" cy="21.2" r="3.4" />
    </>
  ),
  bird: (
    <>
      <path d="M2.5 17.5c5 1.4 9.4-.2 12.4-4.2 1.1 3.5 3.3 6 6.8 7.4-3.8.8-6.8.2-9.1-1.5-1.6 2.8-4.2 4.6-7.9 5.2 2.2-1.7 3.5-3.5 3.6-5.5-2 .2-4-.3-5.8-1.4Z" />
      <path d="M25.5 8.2c-2.4 1.5-3.8 3.3-4.3 5.5 1.6-.2 2.9-.9 4-2.1" />
    </>
  ),
  sparkle: (
    <path d="M16 2.5c.9 7.4 5.6 12.1 13 13-7.4.9-12.1 5.6-13 13-.9-7.4-5.6-12.1-13-13 7.4-.9 12.1-5.6 13-13Z" />
  ),
  laptop: (
    <>
      <rect x="6" y="6.5" width="20" height="14" rx="1.5" />
      <path d="M2.5 25h27M12.5 25v-4.5h7V25" />
    </>
  ),
  phone: (
    <>
      <rect x="9" y="3" width="14" height="26" rx="2.5" />
      <path d="M13 6h6M13.8 25.5h4.4" />
    </>
  ),
  oven: (
    <>
      <rect x="4" y="6" width="24" height="22" rx="2" />
      <path d="M4 12.5h24M8.5 9.2h.1M12.5 9.2h.1" />
      <rect x="8" y="16.5" width="16" height="7" rx="1" />
      <path d="M22 9.2h2.5" />
    </>
  ),
  bag: (
    <>
      <path d="M6.5 11.5h19L27.5 28h-23L6.5 11.5Z" />
      <path d="M12 11.5V8a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  dress: (
    <>
      <path d="M11.2 5.5 16 9.2l4.8-3.7 3.7 6.2-3.7 2.8 3.2 12H8l3.2-12-3.7-2.8 3.7-6.2Z" />
      <path d="M13 9.7c1.2 1.4 4.8 1.4 6 0" />
    </>
  ),
  hair: (
    <>
      <path d="M7 27c.2-7 2-12.3 5.5-16M12 28c-.5-7.2 1.1-14.2 4.8-20M17.2 28c.2-6.8 2.2-12.7 6-17.3M22.5 27c.8-5.2 2.4-9 4.7-11.7" />
      <path d="M23.8 7.2c.5-1.8 1.6-2.8 3.3-3.2-.2 1.8-1.2 3-3.3 3.2Z" />
    </>
  ),
  jeans: (
    <>
      <path d="M9 4.5h14l-1 23.5h-5l-1-13-1 13H9L9 4.5Z" />
      <path d="M9 8.7h14M16 4.5v10.5" />
    </>
  ),
  download: (
    <path d="M16 4v18M8.5 14.5 16 22l7.5-7.5M4 27h24" />
  ),
  money: (
    <>
      <rect x="3" y="8" width="26" height="16" rx="2" />
      <circle cx="16" cy="16" r="3.6" />
      <path d="M7 12h.1M25 20h.1" />
    </>
  ),
  whisk: (
    <>
      <path d="M16 3.5v7" />
      <path d="M16 10.5c-5.6 2.2-7.7 12.5-3.7 16.2 2.9 2.7 7.7 2.5 10.3-.6 3.2-3.9.9-13.4-4.4-15.6" />
      <path d="M16 10.5V27M12 12.7c-1.8 4.3-1.6 9.6.8 13.5M20 12.6c2 4.5 1.8 9.8-.7 13.7" />
    </>
  ),
  iphone: (
    <>
      <rect x="8" y="2.5" width="16" height="27" rx="3" />
      <path d="M12.5 6h7M13.8 25.6h4.5" />
      <rect x="11.5" y="9" width="4.5" height="4" rx="1" />
    </>
  ),
  perfume: (
    <>
      <rect x="10" y="12" width="12" height="17" rx="2" />
      <path d="M13 12V8h6v4M14 5h4v3M25 9h3M25 12h3M25 15h3" />
    </>
  ),
  sunscreen: (
    <>
      <rect x="10" y="11" width="12" height="18" rx="2" />
      <path d="M10 16h12M13 8h6v3" />
      <circle cx="16" cy="22" r="3.2" />
      <path d="M16 17.5v1M16 25.5v1M11.5 22h1M19.5 22h1" />
    </>
  ),
  skincare: (
    <>
      <rect x="10" y="12" width="12" height="17" rx="2" />
      <path d="M13 12V8h6v4M14 4h4v4" />
      <path d="M13 18h6M16 21v5M14 24h4" />
    </>
  ),
  makeup: (
    <>
      <rect x="7.5" y="17" width="8" height="12" rx="1" />
      <path d="M8.5 17v-5l5-6v11M8.5 21h6" />
      <path d="M20 8.5 24 12l-8.5 8.5L12 22l1.5-3.5L20 8.5Z" />
    </>
  ),
  jewellery: (
    <>
      <path d="M7 5c2.3 6.6 5.3 10 9 10s6.7-3.4 9-10" />
      <path d="M16 15v4" />
      <path d="M12.5 23.5 16 27l3.5-3.5L16 20l-3.5 3.5Z" />
    </>
  ),
  gift: (
    <>
      <rect x="5" y="12" width="22" height="16" rx="1" />
      <path d="M3 12h26v5H3zM16 12v16" />
      <path d="M16 12c-6.5 0-9-2.1-9-5.2A3.2 3.2 0 0 1 13.3 4c1.2 0 2.2.6 2.7 1.5C16.5 4.6 17.5 4 18.7 4A3.2 3.2 0 0 1 22 6.8c0 3.1-2.5 5.2-6 5.2Z" />
    </>
  ),
  picnic: (
    <>
      <path d="M4 15h24l-2 12H6L4 15Z" />
      <path d="M10 15v-3a6 6 0 0 1 12 0v3" />
      <path d="M8 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </>
  ),
  quote: (
    <path d="M0 40V23.5C0 10.5 6.2 2.6 18 0l2.6 5.4C14 8.1 10.6 12 10.2 18H20v22H0Zm28 0V23.5C28 10.5 34.2 2.6 46 0l2 5.4C42 8.1 38.6 12 38.2 18H48v22H28Z" />
  ),
};

const filledIcons = new Set(["bird", "quote"]);

export default function Icon({
  name,
  className = "h-5 w-5",
  filled = false,
  strokeWidth = 1.35,
}) {
  const isFilled = filled || filledIcons.has(name);
  return (
    <svg
      viewBox={name === "quote" ? "0 0 48 40" : "0 0 32 32"}
      className={className}
      aria-hidden="true"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
