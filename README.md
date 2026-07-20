# Ipsos iSay — Post-survey flow (static prototype)

Static HTML/CSS prototype of the post-survey screens (completion, points, quick-finish,
error, loading). Built to mirror the **astra** parent design system, for developer handoff.

## View it

- **Navigator:** open `index.html` in a browser — a sidebar + iframe to click through
  every screen (Prev/Next, keyboard arrows, deep-link via `#n`). This is a **preview
  harness only**, not part of the deliverable UI.
- **Single screen:** open any `screens/NN-*.html` directly.

No build step, no dependencies to install. Everything is static.

## Structure

```
index.html            Preview navigator (dev tool)
screens/NN-*.html      One file per screen (11 screens, self-contained)
assets/
  variables.css        Ipsos design tokens (color) — ported from astra
  overrides.css        Bootstrap re-skin (look & feel) — ported from astra
  styles.css           @imports the two above + minimal page-chrome glue
  partials.js          Shared header/footer/points/rating, injected at runtime
```

## Styling model

Load order per screen: **Bootstrap 5.3** (CDN) → **Font Awesome 6** (CDN) →
`variables.css` → `overrides.css` → `styles.css`.

- Markup sticks to **stock Bootstrap classes** re-skinned by the override layer, plus the
  token utilities (`.text-main`, `.text-warning`, `.alert-success`, `.btn-primary`…).
- **All color comes from tokens** in `variables.css` (`--bg-*`, `--text-*`, `--stroke-*`).
  No raw hex in markup.
- Only genuinely custom glue lives in `styles.css` (header/footer chrome, the SVG seal
  sizing, the rating widget, the confetti overlay).
- Fonts: **Inter 400/700** (matches astra).

## Notes for implementation

- `partials.js` injects the shared header/footer and the reusable points/rating blocks so
  the 11 files stay DRY — replace with your framework's components when integrating.
- The **rating** is an accessible radiogroup (keyboard arrows/Home/End/Enter, cumulative
  hover). Wire it to real state / a form control on integration.
- Icons/illustrations use the Ipsos CDN; the green/blue **completion seal** is an inline
  token-colored SVG (`partials.js` → `seal()`).
- `href="#"` links and the sample data ("250 points", "Sebastian"…) are placeholders.
