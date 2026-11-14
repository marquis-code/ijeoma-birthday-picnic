import Reveal from "./Reveal";
import { CelebrationDecor, Bow } from "./Celebration";
import { image } from "../lib/assets";

const photos = [
  {
    src: "ijeoma-story.jpg",
    alt: "Ijeoma smiling in a champagne satin dress in a Lagos garden",
    caption: "The smile that starts the party.",
  },
  {
    src: "ijeoma-garden.jpg",
    alt: "Ijeoma standing in a tropical garden courtyard with string lights",
    caption: "The table she makes feel like home.",
  },
  {
    src: "ijeoma-stairs.jpg",
    alt: "Ijeoma laughing in a patterned purple kimono and white trousers",
    caption: "That laugh — our favourite sound.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-paper py-16 min-[761px]:py-24">
      <span className="pointer-events-none absolute -right-10 top-8 select-none font-serif text-[clamp(8rem,18vw,16rem)] font-semibold leading-none text-plum/[0.04]">
        05
      </span>
      <CelebrationDecor section="story" />
      <div className="container-page relative z-[2]">
        <div className="grid items-end gap-6 min-[901px]:grid-cols-[0.95fr_1.05fr] min-[901px]:gap-16">
          <Reveal>
            <p className="mb-4 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-orchid-dark">
              Her story
            </p>
            <h2 className="font-serif text-[clamp(2.8rem,9vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.025em] text-ink">
              The girl behind
              <br />
              <span className="text-plum">the glow.</span>
            </h2>
          </Reveal>
          <Reveal as="div" delay={100} className="max-w-[580px] pb-1">
            <p className="text-[1rem] leading-[1.7] text-ink-soft">
              Once upon a garden in Lagos, a girl called Ijeoma walked in and the
              whole afternoon got warmer. She has a laugh that turns strangers into
              friends, a heart that notices everyone’s favourite little things, and
              the kind of presence that makes people feel utterly seen. She is the
              one who says “come as you are” and means it — who dances first, gives the
              best hugs, and makes even a quiet Tuesday feel like a reason to dress up.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.7] text-ink-soft">
              So this picnic is not just a birthday. It’s our little love letter to
              the girl who makes life feel softer, brighter and a lot more fun.
              Ijeoma, our favourite Tweety: this whole day is for you. Happy
              birthday, beautiful. Go on and blush — we planned for it.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 min-[761px]:mx-0 min-[761px]:mt-10 min-[761px]:grid min-[761px]:grid-cols-3 min-[761px]:gap-5 min-[761px]:overflow-visible min-[761px]:px-0 min-[761px]:pb-0">
          {photos.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 100}
              as="figure"
              className="group w-[72%] min-w-[72%] snap-center overflow-hidden border border-orchid/40 bg-paper p-2 min-[761px]:w-auto min-[761px]:min-w-0"
            >
              {(index === 0 || index === 2) && (
                <Bow className="decor-sway pointer-events-none absolute right-2 top-2 z-[3] h-8 w-8 rotate-12 text-blush/85" style={{ animationDelay: "-2.2s" }} />
              )}
              <img
                src={image(photo.src)}
                alt={photo.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <figcaption className="flex items-start justify-between gap-3 px-2 pb-1 pt-3">
                <span className="font-serif text-[0.98rem] font-medium leading-snug tracking-[-0.005em] text-ink">
                  {photo.caption}
                </span>
                <span className="pt-0.5 text-[0.78rem] font-medium text-orchid-dark">
                  0{index + 1}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
