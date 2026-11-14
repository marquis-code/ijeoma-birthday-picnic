import Icon from "./Icon";
import Postcard from "./Postcard";
import Reveal from "./Reveal";
import { downloadCalendar } from "../lib/calendar";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=6.48898%2C3.37827";

export default function Venue() {
  return (
    <section
      id="venue"
      className="venue-surface relative overflow-hidden py-24 text-cream min-[761px]:py-32"
    >
      <span className="pointer-events-none absolute inset-[1.3rem] border border-lilac-pale/[0.12] max-[760px]:inset-[0.7rem]" />
      <div className="container-page grid items-center gap-16 min-[1024px]:grid-cols-[0.9fr_1.1fr] min-[1024px]:gap-[clamp(3rem,6vw,6.5rem)]">
        <div className="max-w-[680px]">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">
              <span className="h-px w-8 bg-orchid" />
              <span className="text-lilac">No. 04</span> The Venue
            </p>
            <h2 className="font-serif text-[clamp(2.9rem,10.5vw,6.3rem)] leading-[0.98] tracking-[-0.035em] text-cream min-[761px]:text-[clamp(2.9rem,6.4vw,6.3rem)]">
              Jaekel
              <br />
              <em className="italic text-lilac">House.</em>
            </h2>
            <p className="mt-3 font-script text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight text-lilac">
              a garden hideaway in old Lagos
            </p>
          </Reveal>

          <Reveal as="p" delay={100} className="mt-7 max-w-[520px] text-[0.95rem] leading-[1.85] text-cream/70">
            Tucked inside the historic Railway Compound in Ebute Metta, Jaekel
            House is a colonial-era beauty of arched verandas, quiet gardens and
            stories in every wall. Built in 1898 and lovingly restored, it is ours
            for one beautiful afternoon. Enter through the NRC Railway Compound
            gate off Federal Road — parking is available inside.
          </Reveal>

          <Reveal delay={150} className="mt-8 border-t border-lilac-pale/20">
            {[
              ["calendar", "The date", "Saturday, 5 December 2026"],
              ["pin", "The address", "17 Federal Road, Railway Compound, Ebute Metta, Lagos, Nigeria"],
              ["sparkle", "The hour", "Guests arrive by 1:30 PM"],
            ].map(([icon, label, value]) => (
              <div key={label} className="border-b border-lilac-pale/20 py-4">
                <span className="mb-1.5 flex items-center gap-2 text-[0.53rem] uppercase tracking-[0.22em] text-lilac">
                  <Icon name={icon} className="h-3.5 w-3.5" />
                  {label}
                </span>
                <p className="pl-5 font-serif text-[0.92rem] leading-[1.55] text-cream/90">
                  {value}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-full border border-lilac bg-lilac px-6 py-[0.95rem] text-[0.66rem] uppercase tracking-[0.19em] text-plum-deep transition hover:border-cream hover:bg-cream"
            >
              Get directions <Icon name="arrow" className="h-[17px] w-[17px]" />
            </a>
            <button
              type="button"
              onClick={downloadCalendar}
              className="inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-full border border-lilac-pale/40 px-6 py-[0.95rem] text-[0.66rem] uppercase tracking-[0.19em] text-cream transition hover:border-lilac hover:bg-lilac hover:text-plum-deep"
            >
              Save the date <Icon name="calendar" className="h-4 w-4" />
            </button>
          </Reveal>

          <Reveal delay={250} className="mt-10 grid gap-4 border-t border-lilac-pale/20 pt-5 min-[761px]:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="grid h-[2.15rem] w-[2.15rem] shrink-0 place-items-center rounded-full border border-lilac-pale/30 text-lilac">
                <Icon name="sparkle" className="h-4 w-4" />
              </span>
              <div>
                <span className="mb-1.5 block text-[0.53rem] uppercase tracking-[0.22em] text-lilac">
                  Dress cutesy
                </span>
                <p className="text-[0.78rem] leading-[1.7] text-cream/65">
                  Cutesy &amp; comfortable.{" "}
                  <em className="text-lilac-pale">Soft colours, easy fabrics, happy feet.</em>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="grid h-[2.15rem] w-[2.15rem] shrink-0 place-items-center rounded-full border border-lilac-pale/30 text-lilac">
                <Icon name="picnic" className="h-4 w-4" />
              </span>
              <div>
                <span className="mb-1.5 block text-[0.53rem] uppercase tracking-[0.22em] text-lilac">
                  Come with something
                </span>
                <p className="text-[0.78rem] leading-[1.7] text-cream/65">
                  Something edible to share.{" "}
                  <em className="text-lilac-pale">Sweet, savoury or both.</em>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={150}
          className="relative mx-auto w-full max-w-[680px] pt-6 min-[1024px]:mx-0 min-[1024px]:ml-auto"
        >
          <Postcard />
          <p className="ml-auto mt-8 max-w-[430px] text-right font-serif text-[0.87rem] italic leading-[1.65] text-cream/55 max-[760px]:text-center">
            Follow the string lights. Bring something delicious to share. Stay for
            the cake.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
