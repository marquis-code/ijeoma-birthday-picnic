import { useState } from "react";
import Icon from "./Icon";

const ACCOUNT_NAME = "Ojukwu Ijeoma Linda";
const ACCOUNTS = [
  { key: "gtbank", bank: "GTBank", number: "0684531680" },
  { key: "opay", bank: "Opay", number: "7035628526" },
];
const PROOF_NUMBER = "+234 703 562 8526";
const PROOF_URL =
  "https://wa.me/2347035628526?text=" +
  encodeURIComponent("Hi! I just sent a birthday gift for Ijeoma 💜 Here’s my proof — thank you!");

export default function MoneyGifts() {
  const [copied, setCopied] = useState(null);

  const copy = async (account) => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(account.key);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      window.prompt(`Copy ${account.bank} account number:`, account.number);
    }
  };

  return (
    <div className="mt-10 rounded-sm border border-lilac/30 bg-paper/[0.045] p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-lilac/35 text-lilac">
          <Icon name="gift" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-lilac">
            A little envelope of love
          </p>
          <p className="mt-1 max-w-[620px] text-[0.96rem] leading-[1.6] text-cream/85">
            If you’d rather send a money gift, here’s where it can land.
          </p>
          <p className="mt-1 text-[0.9rem] text-cream/80">
            Account name:{" "}
            <span className="font-medium text-cream">{ACCOUNT_NAME}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 min-[521px]:grid-cols-2">
        {ACCOUNTS.map((account) => (
          <div
            key={account.key}
            className="flex items-center justify-between gap-3 rounded-sm border border-lilac/20 bg-plum-deep/25 px-4 py-3"
          >
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-lilac">
                {account.bank}
              </p>
              <p className="mt-1 font-medium tabular-nums tracking-[0.08em] text-cream">
                {account.number}
              </p>
            </div>
            <button
              type="button"
              onClick={() => copy(account)}
              className="shrink-0 border-b border-lilac/40 pb-0.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-lilac transition hover:border-cream hover:text-cream"
            >
              {copied === account.key ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-lilac/15 pt-4 text-[0.9rem] leading-[1.6] text-cream/80 min-[761px]:flex-row min-[761px]:items-center min-[761px]:justify-between">
        <p className="max-w-[560px]">
          Sent? WhatsApp your proof to{" "}
          <a
            href="https://wa.me/2347035628526"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-medium text-lilac-pale underline decoration-lilac/50 underline-offset-4 transition hover:text-cream"
          >
            {PROOF_NUMBER}
          </a>{" "}
          so we can appreciate you extra specially. A big birthday hug is waiting. 💜
        </p>
        <a
          href={PROOF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[2.8rem] w-fit shrink-0 items-center justify-center gap-2 rounded-full border border-lilac bg-lilac px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-plum-deep transition hover:bg-cream"
        >
          Send proof on WhatsApp <Icon name="arrow" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
