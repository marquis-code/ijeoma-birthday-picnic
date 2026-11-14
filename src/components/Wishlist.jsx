import { useEffect, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { wishes } from "../data/wishes";
import { celebrate } from "../lib/celebrate";
import { readJSON, writeJSON } from "../lib/storage";

const STORAGE_KEY = "ijeoma-birthday-picnic-wishes-v1";

export default function Wishlist() {
  const [reserved, setReserved] = useState(() => {
    const stored = readJSON(STORAGE_KEY, []);
    const valid = new Set(wishes.map((wish) => wish.id));
    return new Set(Array.isArray(stored) ? stored.filter((id) => valid.has(id)) : []);
  });

  useEffect(() => {
    writeJSON(STORAGE_KEY, Array.from(reserved));
  }, [reserved]);

  const count = reserved.size;
  const total = wishes.length;
  const percent = Math.round((count / total) * 100);

  const toggle = (event, wish) => {
    const next = new Set(reserved);
    if (next.has(wish.id)) {
      next.delete(wish.id);
    } else {
      next.add(wish.id);
      celebrate(event.currentTarget, 30);
    }
    setReserved(next);
  };

  return (
    <section
      id="wishlist"
      className="wishlist-surface relative overflow-hidden py-24 text-cream min-[761px]:py-32"
    >
      <span className="pointer-events-none absolute inset-[1.3rem] border border-lilac-pale/[0.14] max-[760px]:inset-[0.7rem]" />
      <span className="pointer-events-none absolute -right-8 top-8 -rotate-6 select-none font-script text-[clamp(10rem,24vw,23rem)] leading-none text-lilac-pale/[0.04]">
        wish
      </span>
      <span className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(232,214,240,0.2)_0.6px,transparent_0.6px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />

      <div className="container-page relative z-[2] grid items-start gap-14 xl:grid-cols-[minmax(280px,385px)_1fr] xl:gap-24">
        <aside className="xl:sticky xl:top-28">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">
              <span className="h-px w-8 bg-orchid" />
              <span className="text-lilac">No. 03</span> The Wish List
            </p>
            <h2 className="font-serif text-[clamp(2.9rem,10.5vw,6.3rem)] leading-[0.98] tracking-[-0.035em] text-cream min-[761px]:text-[clamp(2.9rem,6.4vw,6.3rem)]">
              A little list
              <br />
              <em className="italic text-lilac">of lovely things.</em>
            </h2>
          </Reveal>

          <Reveal as="p" delay={100} className="mt-7 text-[0.96rem] leading-[1.85] text-cream/70">
            Your presence is the present. But if you’d like to spoil her just a
            little, our Tweety has left a few very good hints.
          </Reveal>
          <Reveal
            as="p"
            delay={150}
            className="mt-4 text-[0.6rem] uppercase leading-[1.7] tracking-[0.16em] text-lilac opacity-85"
          >
            Tap a card to keep your gift idea. Your choices stay saved on this
            device — no pressure, no fuss.
          </Reveal>

          <Reveal delay={200} className="mt-10 border-t border-lilac-pale/25 pt-4">
            <div className="mb-3 flex justify-between gap-4 text-[0.58rem] uppercase tracking-[0.14em] text-cream/65">
              <span>
                <strong className="font-serif text-[0.9rem] font-normal text-lilac-pale">
                  {count}
                </strong>{" "}
                of {total} marked by you
              </span>
              <span>{percent}%</span>
            </div>
            <div className="h-0.5 overflow-hidden bg-lilac-pale/15">
              <i
                className="block h-full bg-gradient-to-r from-orchid to-lilac transition-[width] duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          </Reveal>

          <Reveal
            delay={250}
            className="mt-9 flex gap-3 border border-dashed border-lilac-pale/25 p-4 text-[0.72rem] leading-[1.65] text-cream/60"
          >
            <Icon name="heart" className="mt-0.5 h-4 w-4 shrink-0 text-lilac" />
            <p>
              And yes — “Moneyyyyyy” is a love language. It’s on the list,
              unashamedly.
            </p>
          </Reveal>
        </aside>

        <div className="grid grid-cols-2 gap-3 min-[761px]:gap-4 lg:grid-cols-3">
          {wishes.map((wish, index) => {
            const isReserved = reserved.has(wish.id);
            return (
              <Reveal key={wish.id} delay={Math.min(index * 30, 240)} className="h-full">
                <button
                  type="button"
                  onClick={(event) => toggle(event, wish)}
                  aria-pressed={isReserved}
                  aria-label={`${wish.title} — ${
                    isReserved
                      ? "saved to your gift list. Tap to remove."
                      : "tap to save this gift idea."
                  }`}
                  className={`wish-card group relative flex min-h-[195px] h-full w-full flex-col overflow-hidden rounded-sm border p-4 text-left transition duration-500 lg:min-h-[220px] lg:p-5 ${
                    isReserved
                      ? "border-lilac/70 bg-lilac/10"
                      : "border-lilac-pale/[0.16] bg-paper/[0.035] hover:-translate-y-1 hover:border-lilac/55 hover:bg-paper/[0.065]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.55rem] tracking-[0.18em] text-lilac-pale/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`grid h-[1.6rem] w-[1.6rem] place-items-center rounded-full border transition lg:h-[1.85rem] lg:w-[1.85rem] ${
                        isReserved
                          ? "border-lilac bg-lilac text-plum-deep"
                          : "border-lilac/35 text-lilac group-hover:border-lilac"
                      }`}
                    >
                      <Icon name="heart" className="h-3 w-3" filled={isReserved} />
                    </span>
                  </span>

                  <span className="mb-2 mt-3 block text-lilac lg:mb-3.5 lg:mt-5">
                    <Icon
                      name={wish.icon}
                      className="h-[26px] w-[26px] lg:h-[31px] lg:w-[31px]"
                      strokeWidth={1.15}
                    />
                  </span>
                  <span className="block font-serif text-[1.18rem] leading-[1.15] tracking-[-0.02em] text-cream lg:text-[clamp(1.4rem,2vw,1.7rem)]">
                    {wish.title}
                  </span>
                  <span className="mt-1.5 block text-[0.68rem] leading-[1.5] text-cream/65 lg:mt-2 lg:text-[0.78rem] lg:leading-[1.6]">
                    {wish.note}
                  </span>
                  <span
                    className={`mt-auto flex items-center gap-1.5 pt-3 text-[0.43rem] uppercase tracking-[0.1em] lg:pt-4 lg:text-[0.52rem] lg:tracking-[0.2em] ${
                      isReserved ? "text-lilac-pale" : "text-lilac-pale/60"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        isReserved ? "bg-lilac shadow-[0_0_0_3px_rgba(203,163,222,0.16)]" : "bg-current"
                      }`}
                    />
                    {isReserved ? "Saved to your list" : "Still dreaming"}
                  </span>
                </button>
              </Reveal>
            );
          })}

          <div
            role="note"
            className="flex min-h-[195px] flex-col items-center justify-center border border-dashed border-lilac-pale/30 p-4 text-center text-lilac-pale lg:hidden"
          >
            <Icon name="bird" className="mb-3 h-7 w-7 text-lilac" />
            <p className="font-serif text-[1.3rem] leading-tight tracking-[-0.02em]">
              The best gift?
              <br />
              <em className="italic text-lilac">You, there.</em>
            </p>
            <span className="mt-3 text-[0.5rem] uppercase tracking-[0.2em] text-lilac-pale/55">
              with love
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
