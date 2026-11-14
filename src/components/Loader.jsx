import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function Loader({ ready }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!ready) return undefined;
    const timer = window.setTimeout(() => setGone(true), 1450);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-cream transition-transform duration-[1150ms] [transition-timing-function:cubic-bezier(.76,0,.24,1)] ${
        ready ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <span className="pointer-events-none absolute -left-[14vw] -bottom-[11vw] h-[34vw] w-[34vw] rounded-full border border-orchid/20" />
      <span className="pointer-events-none absolute -right-[14vw] -top-[12vw] h-[34vw] w-[34vw] rounded-full border border-orchid/20" />
      <div
        className={`flex flex-col items-center text-center transition-all duration-500 ${
          ready ? "-translate-y-5 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Icon name="bird" className="mb-2.5 h-8 w-8 text-orchid" />
        <div className="font-serif text-[4.4rem] leading-none text-plum">I</div>
        <div className="mt-5 mb-4 h-px w-[150px] overflow-hidden bg-ink/10">
          <i className="loader-line" />
        </div>
        <p className="text-[0.58rem] uppercase tracking-[0.26em] text-ink-soft">
          Something beautiful is on its way
        </p>
      </div>
    </div>
  );
}
