import Icon from "./Icon";

export default function Postcard() {
  return (
    <div className="relative w-full max-w-[595px] rotate-[-2.2deg] border border-orchid/45 bg-[#f8eff9] p-[15px] pb-[17px] shadow-postcard transition-transform duration-700 hover:rotate-0 max-[760px]:rotate-[-1.2deg]">
      <span className="pointer-events-none absolute -left-[13px] -top-[13px] -z-10 h-[calc(100%+13px)] w-[calc(100%+13px)] border border-lilac/40" />
      <span className="absolute right-[27px] top-[25px] z-[3] flex w-[4.7rem] -rotate-0 flex-col items-center gap-0.5 border border-dashed border-plum/60 bg-paper/90 px-1 py-2 text-center text-[0.42rem] leading-[1.5] tracking-[0.14em] text-plum max-[520px]:right-5 max-[520px]:top-5 max-[520px]:w-14 max-[520px]:text-[0.36rem]">
        <span>LAGOS</span>
        <i className="font-serif text-[0.8rem] not-italic tracking-[0.06em]">05.12</i>
        <span>2026</span>
        <Icon name="bird" className="mt-0.5 h-[19px] w-[19px] fill-plum max-[520px]:h-[15px] max-[520px]:w-[15px]" />
      </span>

          <svg className="block h-auto w-full border border-orchid/40" viewBox="0 0 560 430" role="img" aria-label="Illustration of Jaekel House, a colonial-style house with arches, columns, palm trees and string lights">
          <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7edf9"/>
          <stop offset="1" stopColor="#ecddf1"/>
          </linearGradient>
          <linearGradient id="houseShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf5fc"/>
          <stop offset="1" stopColor="#eadbef"/>
          </linearGradient>
          <filter id="bulbGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="5"/>
          </filter>
          </defs>
          
          <rect width="560" height="430" fill="url(#sky)"/>
          <circle cx="447" cy="105" r="58" fill="#cba3de" opacity=".28"/>
          <circle cx="447" cy="105" r="58" fill="none" stroke="#9b6cae" strokeWidth=".7" opacity=".6"/>
          
          <g fill="none" stroke="#7a528c" strokeWidth=".8" opacity=".5">
          <path d="M0 90c78-26 141-20 194 18M560 92c-64-14-117-6-159 23"/>
          <path d="M32 118c14-9 25-9 36-1M496 123c12-8 23-7 33 1"/>
          </g>
          
          {/* string lights */}
          <path d="M0 54C106 74 213 76 296 62c85-14 178-9 264 18" fill="none" stroke="#6a4a79" strokeWidth=".8" opacity=".7"/>
          <g fill="#e4c6f0">
          <circle cx="44" cy="64" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="44" cy="64" r="2.2"/>
          <circle cx="132" cy="74" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="132" cy="74" r="2.2"/>
          <circle cx="220" cy="73" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="220" cy="73" r="2.2"/>
          <circle cx="309" cy="63" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="309" cy="63" r="2.2"/>
          <circle cx="398" cy="59" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="398" cy="59" r="2.2"/>
          <circle cx="491" cy="68" r="4.5" opacity=".35" filter="url(#bulbGlow)"/>
          <circle cx="491" cy="68" r="2.2"/>
          </g>
          
          {/* palms */}
          <g fill="none" stroke="#4d3a5c" strokeWidth="2.2" strokeLinecap="round">
          <path d="M74 361c11-59 12-115 2-168"/>
          <path d="M76 193c-24-30-48-36-70-17 24 17 47 22 70 17Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M76 193c-5-35 6-58 34-70-1 32-12 55-34 70Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M77 194c25-25 51-27 75-4-26 14-51 15-75 4Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M77 196c13-32 35-48 66-48-14 29-36 45-66 48Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M487 361c-8-55-7-103 6-147"/>
          <path d="M493 214c22-25 45-28 65-9-23 13-44 16-65 9Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M493 214c3-31 18-49 46-55-7 28-22 46-46 55Z" fill="#4d3a5c" fillOpacity=".13"/>
          <path d="M492 216c-24-19-47-17-66 5 25 9 47 7 66-5Z" fill="#4d3a5c" fillOpacity=".13"/>
          </g>
          
          {/* grounds */}
          <path d="M0 359c92-15 177-17 278-6 106 12 192 9 282-5v82H0v-71Z" fill="#dccbe3" opacity=".65"/>
          <path d="M0 382c118-14 225-12 320 2 92 13 171 9 240-3" fill="none" stroke="#9b6cae" strokeWidth=".8" opacity=".5"/>
          
          {/* house */}
          <g>
          <path d="M143 164 286 91l143 73" fill="none" stroke="#3a2540" strokeWidth="2"/>
          <path d="M154 162h264v17H154z" fill="#e8d6f0" stroke="#3a2540" strokeWidth="1.5"/>
          <rect x="171" y="179" width="230" height="164" fill="url(#houseShade)" stroke="#3a2540" strokeWidth="1.6"/>
          <rect x="185" y="196" width="202" height="131" fill="none" stroke="#9b6cae" strokeWidth=".8" opacity=".55"/>
          
          {/* columns */}
          <g fill="#fbf5fc" stroke="#3a2540" strokeWidth="1.4">
          <rect x="196" y="198" width="13" height="129"/>
          <rect x="246" y="198" width="13" height="129"/>
          <rect x="301" y="198" width="13" height="129"/>
          <rect x="351" y="198" width="13" height="129"/>
          </g>
          <g fill="#e8d6f0" stroke="#3a2540" strokeWidth="1">
          <rect x="192" y="194" width="21" height="5"/>
          <rect x="242" y="194" width="21" height="5"/>
          <rect x="297" y="194" width="21" height="5"/>
          <rect x="347" y="194" width="21" height="5"/>
          </g>
          
          {/* door */}
          <path d="M272 327v-53c0-14 9-23 22-23s22 9 22 23v53" fill="#3e1b4b" opacity=".87"/>
          <path d="M273 327v-53c0-13 9-22 21-22s21 9 21 22v53" fill="none" stroke="#cba3de" strokeWidth="1"/>
          <circle cx="306" cy="298" r="1.6" fill="#cba3de"/>
          
          {/* windows */}
          <g fill="#3e1b4b" opacity=".68" stroke="#9b6cae" strokeWidth=".7">
          <rect x="216" y="216" width="19" height="34"/>
          <rect x="321" y="216" width="19" height="34"/>
          </g>
          <path d="M225.5 216v34M321 233h19M330.5 216v34" stroke="#e8d6f0" strokeWidth=".7" opacity=".8"/>
          
          {/* steps */}
          <path d="M254 343h80v7h-80zM246 350h96v7h-96zM238 357h112v7H238z" fill="#e4d4ea" stroke="#3a2540" strokeWidth="1"/>
          </g>
          
          {/* bushes */}
          <g fill="#4d3a5c" opacity=".55">
          <ellipse cx="148" cy="360" rx="54" ry="17"/>
          <ellipse cx="430" cy="360" rx="67" ry="19"/>
          <ellipse cx="207" cy="369" rx="37" ry="12"/>
          <ellipse cx="375" cy="373" rx="48" ry="13"/>
          </g>
          <g fill="#9b6cae" opacity=".55">
          <circle cx="124" cy="352" r="2"/><circle cx="168" cy="358" r="1.6"/><circle cx="409" cy="350" r="2"/><circle cx="452" cy="356" r="1.7"/>
          </g>
          
          <g fill="none" stroke="#3a2540" strokeWidth="1" opacity=".6">
          <path d="M99 270c-10-11-10-24 0-34 10 10 10 23 0 34Z"/>
          <path d="M460 283c-9-10-9-21 0-30 9 9 9 20 0 30Z"/>
          </g>
          
          <text x="286" y="154" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" letterSpacing="4.5" fill="#3a2540">JAEKEL HOUSE</text>
          </svg>

            <div className="pointer-events-none absolute right-[76px] top-[86px] z-[2] w-[6.3rem] -rotate-[8deg] opacity-50 max-[520px]:hidden" aria-hidden="true">
            <svg viewBox="0 0 120 120">
            <defs><path id="postmarkPath" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs>
            <text className="fill-plum font-sans text-[7px] tracking-[0.15em]"><textPath href="#postmarkPath" startOffset="0" textLength="268" lengthAdjust="spacing">EBUTE METTA · LAGOS · NIGERIA ·</textPath></text>
            <circle cx="60" cy="60" r="33" fill="none" stroke="#3e1b4b" strokeWidth=".7" opacity=".55"/>
            <text x="60" y="57" className="fill-plum font-sans text-[9px] tracking-[1.6px]" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#3e1b4b">05 · 12</text>
            <text x="60" y="69" className="fill-plum font-sans text-[6.5px] tracking-[2.2px]" textAnchor="middle" fontSize="6.5" letterSpacing="2.2" fill="#3e1b4b">2026</text>
            </svg>
            </div>

      <div className="flex justify-between gap-4 px-0.5 pt-3 text-[0.5rem] uppercase tracking-[0.16em] text-[#3a2540] max-[520px]:text-[0.42rem]">
        <span>An afternoon in violet</span>
        <span className="text-[#7a528c]">Railway Compound · Lagos</span>
      </div>
    </div>
  );
}
