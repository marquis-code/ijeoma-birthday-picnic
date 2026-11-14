import Icon from "./Icon";
import Reveal from "./Reveal";
import { downloadCalendar } from "../lib/calendar";

export default function Invitation() {
  return (
    <section id="invitation" className="relative bg-cream py-24 min-[761px]:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_8%_8%,rgba(199,155,200,0.16),transparent_40%),radial-gradient(ellipse_at_92%_92%,rgba(203,163,222,0.13),transparent_45%)]" />
      <div className="container-page relative">
        <Reveal className="mx-auto mb-16 max-w-[900px] text-center">
          <p className="mb-5 flex items-center justify-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-ink-soft">
            <span className="h-px w-8 bg-orchid" />
            <span className="text-orchid-dark">No. 01</span> The Invitation
            <span className="h-px w-8 bg-orchid" />
          </p>
          <h2 className="font-serif text-[clamp(2.7rem,10.5vw,6.3rem)] leading-[0.98] tracking-[-0.035em] text-ink min-[761px]:text-[clamp(2.9rem,6.4vw,6.3rem)]">
            Come for the cake.
            <br />
            <em className="italic text-plum">Stay for the magic.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-[600px] text-[1rem] leading-[1.8] text-ink-soft">
            An intimate garden birthday picnic in honour of Ijeoma — our one and
            only Tweety.
          </p>
        </Reveal>

        <Reveal
          delay={100}
          className="relative mx-auto grid w-full max-w-[1140px] rotate-[-0.35deg] overflow-visible border border-orchid/40 bg-paper shadow-paper transition-transform duration-700 hover:rotate-0 md:grid-cols-[285px_1fr] max-[760px]:rotate-0"
        >
          <span className="pointer-events-none absolute inset-[10px] z-[1] border border-orchid/25" />
          <span className="pointer-events-none absolute left-[18px] top-[18px] z-[2] h-9 w-9 border-l border-t border-orchid" />
          <span className="pointer-events-none absolute bottom-[18px] right-[18px] z-[2] h-9 w-9 border-b border-r border-orchid" />

          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-plum px-6 py-10 text-center text-cream [background-image:radial-gradient(circle_at_30%_20%,rgba(203,163,222,0.15),transparent_45%)] md:px-7 md:py-16">
            <span className="pointer-events-none absolute inset-[18px] border border-lilac-pale/25" />
            <span className="pointer-events-none absolute -bottom-16 -right-10 font-serif text-[17rem] leading-none text-lilac-pale/[0.055]">
              I
            </span>
            <span className="relative text-[0.56rem] uppercase tracking-[0.3em] text-lilac">
              Saturday
            </span>
            <strong className="relative my-1 font-serif text-[5.2rem] font-normal leading-none tracking-[-0.04em] text-lilac-pale md:my-1.5 md:text-[clamp(6rem,9vw,8.4rem)]">
              05
            </strong>
            <span className="relative text-left font-serif text-[0.95rem] leading-[1.35] text-cream/85 md:text-center md:text-[1.1rem]">
              December
              <br />
              2026
            </span>
            <span className="relative mt-3 flex w-full items-center justify-center gap-3 border-t border-lilac-pale/30 pt-3.5 text-[0.55rem] uppercase tracking-[0.2em] text-lilac-pale md:mt-8">
              <i className="h-px w-5 bg-lilac-pale/40" />
              1:30 PM
              <i className="h-px w-5 bg-lilac-pale/40" />
            </span>
          </div>

          <div className="relative z-[2] px-6 py-10 md:px-12 md:py-16 lg:px-[clamp(3.5rem,5vw,5rem)]">
            <p className="mb-1.5 font-script text-[clamp(1.45rem,2.2vw,2rem)] leading-tight text-plum">
              You are warmly invited to celebrate
            </p>
            <h3 className="font-serif text-[3rem] leading-none tracking-[-0.035em] text-ink md:text-[clamp(3.1rem,5.5vw,5.2rem)]">
              Ijeoma
            </h3>
            <p className="mb-8 mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-ink-soft">
              affectionately known as{" "}
              <em className="ml-1.5 font-script text-[1.5rem] normal-case tracking-normal text-plum">
                Tweety
              </em>
            </p>

            <p className="max-w-[590px] text-[0.9rem] leading-[1.82] text-ink-soft md:text-[0.97rem]">
              On a December afternoon, in a garden tucked inside old Lagos, we’re
              gathering the people she loves for a birthday picnic in her honour.
            </p>
            <p className="mt-3 max-w-[590px] text-[0.9rem] leading-[1.82] text-ink-soft md:text-[0.97rem]">
              There will be good food, soft light, familiar faces and laughter worth
              staying for. The only thing missing is you.
            </p>

            <div className="mt-9 grid max-w-[680px] gap-5 border-t border-ink/10 pt-6 min-[761px]:grid-cols-[1.2fr_0.9fr_1fr]">
              <div>
                <span className="mb-2 block text-[0.53rem] uppercase tracking-[0.22em] text-orchid-dark">
                  Where
                </span>
                <p className="font-serif text-[0.9rem] leading-[1.65]">
                  Jaekel House
                  <br />
                  17 Federal Road
                  <br />
                  Railway Compound
                  <br />
                  Ebute Metta, Lagos, Nigeria
                </p>
              </div>
              <div>
                <span className="mb-2 block text-[0.53rem] uppercase tracking-[0.22em] text-orchid-dark">
                  Dress
                </span>
                <p className="font-serif text-[0.9rem] leading-[1.65]">
                  Cutesy &amp; comfortable
                  <br />
                  Soft colours, easy fabrics
                </p>
              </div>
              <div>
                <span className="mb-2 block text-[0.53rem] uppercase tracking-[0.22em] text-orchid-dark">
                  Bring
                </span>
                <p className="font-serif text-[0.9rem] leading-[1.65]">
                  Something edible to share
                  <br />
                  Sweet, savoury or both
                </p>
              </div>
            </div>

            <a
              href="#rsvp"
              className="mt-7 inline-flex items-center gap-2 border-b border-orchid/55 pb-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-ink transition hover:border-plum hover:text-plum"
            >
              Kindly RSVP <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>

          <div
            aria-hidden="true"
            className="wax-seal absolute bottom-[-1.7rem] right-4 z-[3] grid h-[5.6rem] w-[5.6rem] -rotate-[11deg] place-items-center rounded-full text-lilac-pale md:bottom-[-2.3rem] md:right-[-2.4rem] md:h-[7.7rem] md:w-[7.7rem]"
          >
            <span className="absolute inset-2 rounded-full border border-lilac-pale/40" />
            <span className="relative -translate-y-1 font-serif text-[2.3rem] leading-none md:text-[3.1rem]">
              I
            </span>
            <span className="absolute bottom-3 text-[0.35rem] uppercase tracking-[0.22em] text-lilac md:bottom-[1.15rem] md:text-[0.42rem]">
              with love
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={150}
          className="mx-auto mt-10 flex w-full max-w-[1140px] flex-col items-start justify-between gap-4 md:flex-row md:items-center"
        >
          <p className="max-w-[550px] font-serif text-[0.95rem] italic leading-[1.6] text-ink-soft">
            No formal programme for joy. Only a beautiful afternoon, made complete
            by you.
          </p>
          <button
            type="button"
            onClick={downloadCalendar}
            className="inline-flex w-fit items-center gap-2 border-b border-orchid/55 pb-1.5 text-[0.66rem] uppercase tracking-[0.18em] transition hover:border-plum hover:text-plum"
          >
            Add to calendar <Icon name="calendar" className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
