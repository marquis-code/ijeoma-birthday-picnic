import Icon from "./Icon";
import Reveal from "./Reveal";
import { image } from "../lib/assets";

const photos = [
  {
    src: "ijeoma-story.jpg",
    alt: "Close portrait of Ijeoma smiling in a champagne satin dress, with a red garden wall and greenery behind her",
    caption: "The smile that lights up everything.",
    className:
      "col-span-2 md:col-span-1 md:mt-12 rounded-t-full rounded-b-[2px] border-orchid/60 bg-[#f7edf8] p-2",
    imageClassName: "aspect-[3/4.15] rounded-t-full object-[50%_26%]",
    rotate: "",
  },
  {
    src: "ijeoma-garden.jpg",
    alt: "Full-length portrait of Ijeoma in a champagne dress, standing in a tropical garden courtyard with red walls and fairy lights",
    caption: "Champagne dreams, garden light.",
    className: "border-orchid/60 bg-[#f7edf8] p-2",
    imageClassName: "aspect-[3/4] object-[50%_35%]",
    rotate: "",
  },
  {
    src: "ijeoma-stairs.jpg",
    alt: "Ijeoma laughing in a patterned purple kimono and white trousers beside a staircase",
    caption: "Caught being exactly herself.",
    className:
      "rotate-[1.2deg] border-orchid/60 bg-paper p-2.5 pb-1 shadow-[0_25px_45px_-25px_rgba(40,24,46,0.38)] md:mt-24",
    imageClassName: "aspect-[3/4] object-[50%_35%]",
    rotate: "",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-paper py-20 min-[761px]:py-32">
      <span className="pointer-events-none absolute -right-16 top-16 -rotate-6 select-none font-script text-[clamp(8rem,20vw,18rem)] leading-none text-plum/[0.045]">
        Tweety
      </span>

      <div className="container-page relative">
        <div className="grid items-end gap-8 min-[901px]:grid-cols-2 min-[901px]:gap-[clamp(2rem,6vw,7rem)]">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-orchid" />
              <span className="text-orchid-dark">No. 02</span> The Birthday Girl
            </p>
            <h2 className="font-serif text-[clamp(2.9rem,10.5vw,6.3rem)] leading-[0.98] tracking-[-0.035em] text-ink min-[761px]:text-[clamp(2.9rem,6.4vw,6.3rem)]">
              Meet our
              <br />
              <em className="italic text-plum">Tweety.</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-[600px] pb-1">
            <p className="mb-4 font-script text-[clamp(1.5rem,2.4vw,2.2rem)] leading-tight text-plum">
              bright like sunshine, sweet by name.
            </p>
            <p className="text-[0.95rem] leading-[1.85] text-ink-soft">
              Effortless, warm and quietly extraordinary — Ijeoma has a way of
              making everyone around her feel seen. She laughs with her whole face,
              gives with her whole heart, and turns the simplest moments into
              memories.
            </p>
            <p className="mt-4 text-[0.95rem] leading-[1.85] text-ink-soft">
              This year, we’re giving all of that back to her. Because if anyone
              deserves a day as beautiful as she is, it’s our Tweety.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 items-start gap-4 min-[761px]:mt-24 min-[761px]:grid-cols-3 min-[761px]:gap-[clamp(1.2rem,3vw,2.8rem)]">
          {photos.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 120}
              as="figure"
              className={`group min-w-0 ${photo.className}`}
            >
              <div className="overflow-hidden">
                <img
                  src={image(photo.src)}
                  alt={photo.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04] ${photo.imageClassName}`}
                />
              </div>
              <figcaption className="flex items-baseline gap-2 pt-3 text-[0.66rem] leading-relaxed text-ink-soft md:text-[0.7rem]">
                <span className="shrink-0 font-serif text-[0.85rem] text-orchid-dark">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {photo.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mx-auto mt-16 max-w-[830px] text-center min-[761px]:mt-28">
          <Icon name="quote" className="mx-auto mb-5 h-8 w-[38px] text-orchid" />
          <blockquote className="font-serif text-[clamp(1.55rem,3.1vw,2.6rem)] italic leading-[1.35] tracking-[-0.02em] text-plum">
            “She doesn’t just walk into a room — she brings the sunshine with her.”
          </blockquote>
          <cite className="mt-6 block text-[0.55rem] uppercase not-italic tracking-[0.24em] text-ink-soft">
            — everyone who has ever met her
          </cite>
        </Reveal>

        <div className="mt-16 grid border-t border-ink/10 min-[761px]:mt-28 min-[761px]:grid-cols-3">
          {[
            ["01", "Her laugh", "The kind that makes strangers smile and makes a whole room feel lighter."],
            ["02", "Her heart", "Wide open, endlessly generous, and always making space for one more person."],
            ["03", "Her light", "Impossible to dim. The reason we’re all gathering to celebrate her."],
          ].map(([number, title, copy], index) => (
            <Reveal
              key={title}
              delay={index * 80}
              className={`py-6 min-[761px]:py-9 ${
                index < 2
                  ? "border-b border-ink/10 min-[761px]:border-b-0 min-[761px]:border-r min-[761px]:pr-7"
                  : ""
              } ${index > 0 ? "min-[761px]:pl-7" : ""}`}
            >
              <span className="font-serif text-[0.9rem] text-orchid-dark">{number}</span>
              <h3 className="mb-2.5 mt-2.5 font-serif text-[1.6rem] leading-tight tracking-[-0.02em]">
                {title}
              </h3>
              <p className="text-[0.84rem] leading-[1.75] text-ink-soft">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
