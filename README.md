# Ijeoma’s Birthday Picnic

A one-page birthday invitation for **Ijeoma (Tweety)** — Saturday, 5 December 2026 at Jaekel House, Ebute Metta, Lagos.

**Live site:** https://marquis-code.github.io/ijeoma-birthday-picnic/

Built with **React 19**, **Vite 8** and **Tailwind CSS 4**. No UI component library, no external requests at runtime, and no build secrets.

![Ijeoma’s Birthday Picnic](preview/desktop-hero.jpg)

## What’s inside

- Violet editorial hero with a custom arch portrait, rotating seal and staggered name reveal
- Live countdown to 1:30 PM WAT on 5 December 2026
- Stationery-style invitation with venue, “cutesy & comfortable” dress code and “bring something edible to share”
- Portrait story, hand-drawn Jaekel House postcard and picnic notes
- All **15 wish-list items** as an interactive local checklist
- RSVP form with validation, personalised confirmation, shareable reply and `.ics` calendar download
- Original Web Audio garden soundtrack (the floating sound button)
- Confetti, lilac dust, scroll reveals, a bird easter egg and reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  App.jsx                 Page composition
  components/             Hero, Invitation, Countdown, Story, Wishlist,
                          Venue, Postcard, Rsvp, Footer, Nav and effects
  data/wishes.js          The 15 wish-list entries
  lib/                    Calendar, confetti, storage and asset helpers
  index.css               Tailwind import, @theme tokens, font faces,
                          custom keyframes and a few art-direction classes
public/
  assets/images/          The supplied photographs
  favicon.svg
  robots.txt
.github/workflows/deploy.yml
```

## Personalise it

- **Copy and layout:** edit the relevant component in `src/components`.
- **Wish list:** edit `src/data/wishes.js`. The count updates automatically.
- **Colours and fonts:** the design tokens live in the `@theme` block at the top of `src/index.css`.
- **Photos:** replace the files in `public/assets/images/` while keeping the filenames.
- **RSVP delivery:** by default replies are saved in the guest’s browser and can be shared via the confirmation screen. To deliver them automatically, add a form endpoint (Formspree, Basin, etc.) or a WhatsApp number before the Vite entry script in `index.html`:

```html
<script>
  window.IJEOMA_CONFIG = {
    rsvpEndpoint: "https://formspree.io/f/your-id",
    whatsappNumber: "2348012345678"
  };
</script>
```

With `whatsappNumber` set, “Share my reply” opens a pre-filled WhatsApp chat. With `rsvpEndpoint` set, the form POSTs JSON to that endpoint.

The wish-list ticks are deliberately a personal, device-local checklist (`localStorage`), not a shared registry.

## Deploying

This repository is deployed automatically to GitHub Pages by `.github/workflows/deploy.yml`.

1. Push to `main`.
2. The workflow builds with `npm ci && npm run build`.
3. GitHub Pages serves `dist/` at the live URL above.

The Vite `base` is `./`, so the same build works at a repository subpath or a custom domain.

## Calendar & privacy notes

- The calendar event starts at 1:30 PM Lagos time (12:30 UTC) and uses a four-hour placeholder end time. Edit `src/lib/calendar.js` if the picnic ends at a different time.
- The RSVP endpoint and WhatsApp number are intentionally blank in the repo. Nothing is sent anywhere until you configure one.
- Fonts are self-hosted (Bodoni Moda, Pinyon Script, Jost, SIL Open Font License via Google Fonts).
