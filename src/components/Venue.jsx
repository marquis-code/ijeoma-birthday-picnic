import Icon from "./Icon";
import Reveal from "./Reveal";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=6.48898%2C3.37827";

export default function Venue() {
  return (
    <section id="venue" className="venue-surface relative overflow-hidden py-16 text-cream min-[761px]:py-24">
      <span className="pointer-events-none absolute inset-[1.2rem] border border-lilac-pale/[0.16] max-[760px]:inset-[0.7rem]" />
      <span className="pointer-events-none absolute -right-4 top-6 select-none font-serif text-[clamp(9rem,24vw,22rem)] font-semibold leading-none text-lilac-pale/[0.04]">
        05
      </span>

      <div className="container-page relative z-[2] grid items-center gap-8 min-[901px]:grid-cols-[1.15fr_0.85fr] min-[901px]:gap-20">
        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-cream/90">
              <span className="h-px w-8 bg-orchid" />
              Find us here
            </p>
            <h2 className="font-serif text-[clamp(3rem,10vw,6rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-cream">
              Jaekel House
            </h2>
            <p className="mt-3 max-w-[480px] text-[1rem] leading-[1.65] text-cream/88">
              A garden hideaway tucked inside the old Railway Compound in Ebute
              Metta.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-7 flex items-start gap-3 border-t border-lilac-pale/25 pt-6">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lilac/40 text-lilac">
              <Icon name="pin" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-lilac">
                The full address
              </p>
              <p className="mt-1.5 max-w-[500px] font-serif text-[1.15rem] font-medium leading-[1.45] text-cream">
                Jaekel House, Nigerian Railway Corporation Compound, Ebute Metta,
                Lagos
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="border-t border-lilac-pale/25 pt-6 min-[901px]:border-l min-[901px]:border-t-0 min-[901px]:pl-10 min-[901px]:pt-0">
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-lilac">
            The garden gate
          </p>
          <p className="mt-2 font-serif text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-cream">
            Follow the string lights.
          </p>
          <p className="mt-3 text-[1rem] leading-[1.6] text-cream/92">
            Enter through the NRC Railway Compound gate off Federal Road. Parking
            is available inside.
          </p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[3rem] items-center justify-center gap-2.5 rounded-full bg-lilac px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-plum-deep transition hover:bg-cream"
          >
            Get directions <Icon name="arrow" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
