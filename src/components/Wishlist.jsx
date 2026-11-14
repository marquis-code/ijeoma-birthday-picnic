import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import MoneyGifts from "./MoneyGifts";
import Reveal from "./Reveal";
import { CelebrationDecor } from "./Celebration";
import WishlistPdf from "./WishlistPdf";
import { wishes } from "../data/wishes";
import { celebrate } from "../lib/celebrate";
import { readJSON, writeJSON } from "../lib/storage";

const STORAGE_KEY = "ijeoma-birthday-picnic-wishes-v2";

export default function Wishlist() {
  const [reserved, setReserved] = useState(() => {
    const stored = readJSON(STORAGE_KEY, []);
    const valid = new Set(wishes.map((wish) => wish.id));
    return new Set(Array.isArray(stored) ? stored.filter((id) => valid.has(id)) : []);
  });
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const pdfRef = useRef(null);

  useEffect(() => {
    writeJSON(STORAGE_KEY, Array.from(reserved));
  }, [reserved]);

  const toggle = (event, wish) => {
    const next = new Set(reserved);
    if (next.has(wish.id)) {
      next.delete(wish.id);
    } else {
      next.add(wish.id);
      celebrate(event.currentTarget, 24);
    }
    setReserved(next);
  };

  const downloadPdf = async () => {
    if (!pdfRef.current || exporting) return;
    setExporting(true);
    setExportError("");
    try {
      await document.fonts.ready;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        backgroundColor: "#3e1b4b",
        useCORS: true,
        logging: false,
      });
      const image = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      pdf.addImage(image, "JPEG", 0, 0, 210, 297);
      pdf.save("Ijeoma-Birthday-Wishlist.pdf");
    } catch (error) {
      console.error(error);
      setExportError("The PDF could not be created. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <section id="wishlist" className="wishlist-surface relative overflow-hidden py-16 text-cream min-[761px]:py-24">
      <span className="pointer-events-none absolute inset-[1.2rem] border border-lilac-pale/[0.16] max-[760px]:inset-[0.7rem]" />
      <span className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(232,214,240,0.2)_0.6px,transparent_0.6px)] [background-size:26px_26px]" />
      <span className="pointer-events-none absolute -right-4 top-8 select-none font-serif text-[clamp(8rem,20vw,18rem)] font-semibold leading-none text-lilac-pale/[0.045]">
        wish
      </span>

      <CelebrationDecor section="wishlist" />
      <div className="container-page relative z-[2]">
        <div className="flex flex-col justify-between gap-6 min-[901px]:flex-row min-[901px]:items-end">
          <Reveal>
            <p className="mb-4 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-lilac">
              A little gifting guide
            </p>
            <h2 className="font-serif text-[clamp(2.8rem,9vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.025em] text-cream">
              A little list
              <br />
              <span className="text-lilac">of lovely things.</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="flex flex-col items-start gap-4 min-[901px]:items-end">
            <p className="max-w-[360px] text-[1rem] leading-[1.65] text-cream/88 min-[901px]:text-right">
              For the friends insisting on spoiling her — no pressure, no fuss.
              Ijeoma has left a few very good hints.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[0.82rem] font-medium uppercase tracking-[0.16em] text-cream/78">
                {reserved.size} / {wishes.length} saved
              </span>
              <button
                type="button"
                onClick={downloadPdf}
                disabled={exporting}
                className="inline-flex min-h-[2.9rem] items-center gap-2 rounded-full border border-lilac bg-lilac px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-plum-deep transition hover:bg-cream disabled:cursor-wait disabled:opacity-70"
              >
                {exporting ? "Preparing…" : "Download wishlist PDF"}
                <Icon name="download" className="h-4 w-4" />
              </button>
            </div>
            {exportError ? (
              <p className="text-[0.82rem] text-lilac-pale">{exportError}</p>
            ) : null}
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 border-t border-lilac-pale/25 pt-5 min-[761px]:gap-4 min-[1001px]:grid-cols-3">
          {wishes.map((wish, index) => {
            const isReserved = reserved.has(wish.id);
            return (
              <Reveal key={wish.id} delay={Math.min(index * 22, 180)} className="h-full">
                <button
                  type="button"
                  onClick={(event) => toggle(event, wish)}
                  aria-pressed={isReserved}
                  aria-label={`${wish.title} — ${
                    isReserved
                      ? "saved to your gift list. Tap to remove."
                      : "tap to save this gift idea."
                  }`}
                  className={`group relative flex h-full min-h-[205px] w-full flex-col overflow-hidden rounded-sm border p-3.5 text-left transition duration-500 min-[761px]:min-h-[220px] min-[761px]:p-5 ${
                    isReserved
                      ? "border-lilac/70 bg-lilac/12"
                      : "border-lilac-pale/[0.16] bg-paper/[0.035] hover:-translate-y-1 hover:border-lilac/55 hover:bg-paper/[0.065]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.6rem] font-medium tracking-[0.18em] text-lilac-pale/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full border transition ${
                        isReserved
                          ? "border-lilac bg-lilac text-plum-deep"
                          : "border-lilac/35 text-lilac group-hover:border-lilac"
                      }`}
                    >
                      <Icon name="heart" className="h-3.5 w-3.5" filled={isReserved} />
                    </span>
                  </span>

                  <span className="mt-3 grid h-9 w-9 place-items-center rounded-full border border-lilac/20 bg-plum-deep/30 text-lilac min-[761px]:h-10 min-[761px]:w-10">
                    <Icon
                      name={wish.icon}
                      className="h-[18px] w-[18px] min-[761px]:h-5 min-[761px]:w-5"
                      strokeWidth={1.2}
                    />
                  </span>

                  <span className="mt-3 block font-serif text-[1.04rem] font-medium leading-[1.16] tracking-[-0.015em] text-cream min-[761px]:text-[1.28rem]">
                    {wish.title}
                  </span>
                  <span className="mt-1.5 block text-[0.76rem] leading-[1.45] text-cream/72 min-[761px]:text-[0.84rem] min-[761px]:leading-[1.55]">
                    {wish.note}
                  </span>

                  <span
                    className={`mt-auto flex items-center gap-1.5 pt-3 text-[0.54rem] font-medium uppercase tracking-[0.12em] min-[761px]:text-[0.58rem] ${
                      isReserved ? "text-lilac-pale" : "text-lilac-pale/55"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        isReserved
                          ? "bg-lilac shadow-[0_0_0_3px_rgba(203,163,222,0.16)]"
                          : "bg-current"
                      }`}
                    />
                    {isReserved ? "Saved to your list" : "Still dreaming"}
                  </span>
                </button>
              </Reveal>
            );
          })}

          <div className="flex min-h-[205px] flex-col items-center justify-center rounded-sm border border-dashed border-lilac-pale/30 p-4 text-center min-[1001px]:hidden">
            <Icon name="heart" filled className="h-7 w-7 text-lilac" />
            <p className="mt-3 font-serif text-[1.08rem] font-medium leading-[1.15] tracking-[-0.02em] text-cream">
              The best gift?
              <br />
              <span className="text-lilac">You, there.</span>
            </p>
            <span className="mt-3 text-[0.5rem] font-medium uppercase tracking-[0.2em] text-lilac-pale/55">
              with love
            </span>
          </div>
        </div>

        <p className="mt-5 text-[0.88rem] leading-[1.6] text-cream/74">
          Tap any card to keep your favourite ideas. Your choices stay on this
          device — no pressure, no fuss.
        </p>

        <MoneyGifts />
      </div>

      <WishlistPdf ref={pdfRef} />
    </section>
  );
}
