import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import MoneyGifts from "./MoneyGifts";
import Reveal from "./Reveal";
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
      pdf.save("Ijeoma-Birthday-Picnic-Wishlist.pdf");
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
              Your presence is the present. But if you’d like to spoil her,
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

        <div className="mt-8 grid gap-x-10 border-t border-lilac-pale/25 min-[761px]:mt-10 min-[761px]:grid-cols-2">
          {wishes.map((wish, index) => {
            const isReserved = reserved.has(wish.id);
            return (
              <Reveal key={wish.id} delay={Math.min(index * 20, 180)}>
                <button
                  type="button"
                  onClick={(event) => toggle(event, wish)}
                  aria-pressed={isReserved}
                  aria-label={`${wish.title} — ${
                    isReserved
                      ? "saved to your gift list. Tap to remove."
                      : "tap to save this gift idea."
                  }`}
                  className="group flex w-full items-start gap-3 border-b border-lilac-pale/20 py-3.5 text-left transition hover:bg-paper/[0.04]"
                >
                  <span className="w-6 shrink-0 pt-1 font-serif text-[0.9rem] font-medium text-lilac">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                      isReserved
                        ? "border-lilac bg-lilac text-plum-deep"
                        : "border-lilac/25 text-lilac"
                    }`}
                  >
                    <Icon name={wish.icon} className="h-4 w-4" strokeWidth={1.25} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.08rem] font-medium leading-[1.2] tracking-[-0.01em] text-cream">
                      {wish.title}
                    </span>
                    <span className="mt-0.5 block text-[0.88rem] leading-[1.45] text-cream/90">
                      {wish.note}
                    </span>
                  </span>
                  <span
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${
                      isReserved
                        ? "border-lilac bg-lilac text-plum-deep"
                        : "border-lilac-pale/25 text-lilac group-hover:border-lilac"
                    }`}
                  >
                    <Icon name="heart" className="h-3 w-3" filled={isReserved} />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 text-[0.88rem] leading-[1.6] text-cream/74">
          Your checkmarks stay on this device. Download the PDF above to share the
          list with friends or family.
        </p>

        <MoneyGifts />
      </div>

      <WishlistPdf ref={pdfRef} />
    </section>
  );
}
