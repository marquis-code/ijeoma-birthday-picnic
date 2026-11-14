import { useRef } from "react";
import Icon from "./Icon";
import { image } from "../lib/assets";

function FadeUp({ as: Tag = "div", ready, delay = 0, className = "", children }) {
  return (
    <Tag
      className={`transition-all duration-[1100ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
        ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Seal() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[-1rem] top-[7%] z-[4] aspect-square w-[5.6rem] rounded-full border border-orchid/65 bg-paper/80 shadow-[0_10px_30px_rgba(40,24,46,0.12)] backdrop-blur-sm min-[901px]:right-[-1.4rem] min-[901px]:top-[9%] min-[901px]:w-[6.3rem] min-[1180px]:right-[-2.8rem] min-[1180px]:top-[12%] min-[1180px]:w-[clamp(6.4rem,9vw,8.6rem)]"
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] animate-spin [animation-duration:34s]"
      >
        <defs>
          <path
            id="sealPath"
            d="M100,100 m-77,0 a77,77 0 1,1 154,0 a77,77 0 1,1 -154,0"
          />
        </defs>
        <text className="fill-plum font-sans text-[8px] tracking-[0.12em]">
          <textPath
            href="#sealPath"
            startOffset="0"
            textLength="482"
            lengthAdjust="spacing"
          >
            05 · 12 · 2026 · LAGOS · NIGERIA ·
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-plum">
        <Icon name="bird" className="h-6 w-6" />
        <small className="text-[0.62rem] tracking-[0.18em] text-orchid-dark">
          05.12
        </small>
      </span>
    </div>
  );
}

function Botanical() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-8 -left-4 z-0 h-auto w-[11rem] text-orchid opacity-30 min-[761px]:w-[clamp(13rem,22vw,20rem)] min-[761px]:opacity-40"
      viewBox="0 0 300 420"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M-10 420C55 345 73 260 58 166c-3-21-1-42 8-64" />
        <path d="M58 166c-30-1-48-15-56-40 29 2 48 15 56 40Z" />
        <path d="M62 209c31-7 51-25 56-53-31 7-50 25-56 53Z" />
        <path d="M49 280c-29-3-47-17-54-41 28 3 46 17 54 41Z" />
        <path d="M43 334c30-9 48-29 50-57-30 10-47 29-50 57Z" />
        <path d="M39 385c-27-1-45-14-53-36 27 1 44 14 53 36Z" />
        <path d="M92 420c7-42 28-70 63-85" />
        <path d="M111 382c-19-9-29-26-28-48 20 9 30 26 28 48Z" />
        <path d="M132 351c18-13 36-14 55-2-19 13-37 14-55 2Z" />
      </g>
    </svg>
  );
}

export default function Hero({ ready }) {
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const frameRef = useRef(null);
  const letters = ["I", "j", "e", "o", "m", "a"];

  const onPointerMove = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    hero.style.setProperty("--mx", `${x}px`);
    hero.style.setProperty("--my", `${y}px`);
    if (frameRef.current) {
      frameRef.current = window.cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = window.requestAnimationFrame(() => {
      if (!portraitRef.current) return;
      const moveX = (x / rect.width - 0.5) * 9;
      const moveY = (y / rect.height - 0.5) * 9;
      portraitRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  };

  const onPointerLeave = () => {
    if (portraitRef.current) {
      portraitRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <section
      ref={heroRef}
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-surface relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-[7.2rem] min-[761px]:pb-20 min-[901px]:pt-32 min-[1180px]:pt-[clamp(7.5rem,13vh,10.5rem)]"
    >
      <div className="hero-glow pointer-events-none absolute inset-0 z-0" />
      <div className="hero-sun pointer-events-none absolute right-[-8%] top-[38%] z-0 aspect-square w-[clamp(19rem,36vw,34rem)] rounded-full opacity-70 min-[901px]:right-[3%] min-[901px]:top-[11%]" />
      <div className="pointer-events-none absolute right-[-8%] top-[8%] z-0 aspect-[4/5] w-[min(720px,58vw)] rotate-[-12deg] rounded-full border border-orchid/25" />
      <Botanical />
      <div className="pointer-events-none absolute inset-[1.1rem] z-[6] hidden border border-orchid/25 min-[761px]:block" />

      <div className="container-page relative z-[2] grid grid-cols-1 items-center gap-16 min-[901px]:grid-cols-[1.08fr_0.92fr] min-[901px]:gap-[clamp(2rem,5vw,5rem)]">
        <div className="relative z-[3] max-w-[650px]">
          <FadeUp
            as="p"
            ready={ready}
            delay={50}
            className="mb-[clamp(1.5rem,3vh,2.4rem)] flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-ink-soft"
          >
            <span className="block h-px w-[2.2rem] bg-orchid" />
            <span className="whitespace-nowrap text-ink">Ijeoma’s Birthday Picnic</span>
            <span className="text-[0.65rem] text-orchid max-[380px]:hidden">✦</span>
          </FadeUp>

          <div className="relative">
            <h1
              aria-label="Ijeoma"
              className="hero-name-size -ml-[0.075em] flex items-end font-serif font-medium leading-[0.76] tracking-[-0.025em] text-ink"
            >
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="inline-block overflow-hidden pb-[0.16em] -mb-[0.15em]"
                  aria-hidden="true"
                >
                  <span
                    className={`inline-block transition-transform duration-[1250ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
                      ready ? "translate-y-0" : "translate-y-[115%]"
                    }`}
                    style={{ transitionDelay: `${80 + index * 80}ms` }}
                  >
                    {letter}
                  </span>
                </span>
              ))}
              <span
                aria-hidden="true"
                className={`inline-block pb-[0.13em] text-[0.16em] leading-none text-orchid transition-all duration-700 ${
                  ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                .
              </span>
            </h1>

            <FadeUp
              ready={ready}
              delay={480}
              className="mt-[0.35rem] ml-[2.3rem] flex items-baseline gap-3 font-script text-[clamp(2.3rem,9vw,3.4rem)] leading-none text-plum min-[381px]:gap-4 min-[761px]:text-[clamp(2.5rem,4.6vw,4.5rem)] min-[901px]:ml-[50%]"
            >
              <span className="font-sans text-[0.65rem] not-italic uppercase tracking-[0.22em] text-orchid-dark min-[761px]:text-[0.7rem]">
                a.k.a.
              </span>
              <em className="not-italic">Tweety</em>
            </FadeUp>
          </div>

          <FadeUp
            as="p"
            ready={ready}
            delay={580}
            className="mt-[clamp(1.8rem,3.5vh,2.7rem)] max-w-[470px] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.78] text-ink-soft"
          >
            An afternoon in violet for the woman who makes ordinary days feel like
            something worth remembering. Come help us make her day as radiant as
            she is.
          </FadeUp>

          <FadeUp
            ready={ready}
            delay={680}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#invitation"
              className="inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-full border border-ink bg-ink px-6 py-[0.95rem] text-[0.78rem] uppercase tracking-[0.19em] text-cream transition hover:border-plum hover:bg-plum max-[520px]:w-full"
            >
              Open the invitation
              <Icon name="arrow" className="h-[17px] w-[17px]" />
            </a>
            <a
              href="#wishlist"
              className="inline-flex min-h-[3.2rem] items-center gap-2 px-1 text-[0.78rem] uppercase tracking-[0.19em] text-ink transition hover:text-plum max-[520px]:w-fit"
            >
              Her wish list <span className="h-1 w-1 rounded-full bg-orchid" />
            </a>
          </FadeUp>

          <FadeUp
            ready={ready}
            delay={780}
            className="mt-[clamp(2.3rem,4.5vh,3.4rem)] grid max-w-[540px] grid-cols-2 gap-4 border-t border-ink/15 pt-5 max-[380px]:grid-cols-1 min-[521px]:grid-cols-3"
          >
            {[
              ["The day", "Saturday", "5 December 2026"],
              ["The hour", "1:30 PM", "arrival"],
              ["The place", "Jaekel House", "Ebute Metta, Lagos"],
            ].map(([label, line1, line2], index) => (
              <div
                key={label}
                className={index === 2 ? "col-span-2 max-[380px]:col-span-1 min-[521px]:col-span-1" : ""}
              >
                <span className="mb-1.5 block text-[0.7rem] uppercase tracking-[0.22em] text-orchid-dark">
                  {label}
                </span>
                <p className="font-serif text-[0.96rem] leading-[1.55] text-ink-soft">
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            ))}
          </FadeUp>

        </div>

        <FadeUp
          ready={ready}
          delay={300}
          className="relative z-[2] w-[88%] justify-self-center min-[521px]:w-[84%] min-[761px]:w-[78%] min-[901px]:w-[min(100%,455px)] min-[901px]:justify-self-end"
        >
          <div className="pointer-events-none absolute inset-1.5 -right-1.5 -bottom-1.5 rotate-[1.4deg] rounded-t-full rounded-b-[3px] border border-orchid/50 bg-mauve/10" />
          <figure
            ref={portraitRef}
            className="relative z-[2] rounded-t-full rounded-b-[3px] bg-paper p-[9px] shadow-portrait transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)]"
          >
            <span className="pointer-events-none absolute -inset-[13px] rounded-t-full rounded-b-[3px] border border-orchid/55" />
            <div className="overflow-hidden rounded-t-full rounded-b-[1px] bg-cream-deep">
              <img
                src={image("ijeoma-garden.jpg")}
                alt="Ijeoma smiling in a champagne satin dress in a lush Lagos garden, surrounded by greenery and string lights"
                className="aspect-[3/4.03] w-full object-cover object-[50%_22%] transition-transform duration-[1200ms] hover:scale-[1.025]"
              />
            </div>
            <figcaption className="flex justify-end px-2 pb-1 pt-3 text-[0.68rem] uppercase tracking-[0.18em] text-orchid-dark">
              Lagos · 2026
            </figcaption>
          </figure>
          <Seal />
        </FadeUp>
      </div>

      <a
        href="#invitation"
        aria-label="Scroll to the invitation"
        className="absolute bottom-7 left-1/2 z-[4] hidden -translate-x-1/2 flex-col items-center gap-2.5 text-[0.66rem] uppercase tracking-[0.24em] text-ink-soft min-[901px]:flex"
      >
        <span>Scroll to celebrate</span>
        <i className="scroll-cue-line" />
      </a>
    </section>
  );
}
