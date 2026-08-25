---
name: Boss Tire — "Race Shop"
description: Boss Tire's own red/black/white brand — condensed motorsport display type, a dark stage with one red action, and industrial spec-sheet pricing. Inspired by Tesla's showroom structure, teenage engineering's catalogue precision, and a Ferrari-style red-on-black stage.
colors:
  ink: "#0B0B0C"        # the dark stage — hero, header, footer, feature bands
  carbon: "#141518"     # raised dark surface / cards on ink
  hairline-dark: "#2A2C31" # hairline rules on ink
  paper: "#FFFFFF"      # light band base
  smoke: "#F4F4F5"      # alternating light band / surface
  border: "#E4E4E7"     # hairline rules on light
  heading: "#101113"    # headings + primary text on light
  body: "#4B4E55"       # body copy on light (AA on paper & smoke)
  muted: "#7A7D84"      # labels, captions, spec keys
  red: "#D81E24"        # brand accent — icon marks, eyebrows, large accents
  red-cta: "#C81922"    # button fill (white text ≈ 4.7:1, AA)
  red-deep: "#A9151A"   # button hover; red-as-text on light (AA)
  on-dark: "#E7E8EA"    # body text on ink
  on-dark-mute: "#A2A5AC" # secondary text on ink
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, system-ui, sans-serif"
    fontWeight: 700
    textTransform: uppercase
    lineHeight: 0.95
    note: "Heavy condensed, often italic on the hero. This is the motorsport voice."
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  spec:
    fontFamily: "Inter, system-ui, sans-serif"
    note: "tabular-nums for prices and the spec sheet — the catalogue-precision voice"
rounded:
  sm: "4px"
  md: "8px"
  full: "9999px"
---

# Design System: Boss Tire — "Race Shop"

## Overview

Boss Tire's real brand lives in its 2026 promo graphics, not the old template
site: **red, black and white, high contrast, no third colour**, bold condensed
italic type with hard diagonal cuts. This system is built from that.

Three references shaped the execution, none copied:
- **Tesla** — the page structure: photographic dark stage, generous space, and
  a single saturated action ("Call") that is the loudest object on every surface.
- **teenage engineering** — the pricing and tire catalogue: an industrial
  spec-sheet with hairline rules, tabular numbers and tight labels.
- **Ferrari / Lamborghini** — the cinematic dark stage with one accent, but the
  accent is Boss Tire **red**, not yellow.

The page's one job is the phone call — 100% of the shop's ad conversions are
calls — so the red Call button is present and loud on every surface.

## Colours

- **Red** (`--color-red`, #D81E24) is the only accent: eyebrows, the tread mark,
  rule accents, icons. Red-as-text on light uses `--color-red-deep` (#A9151A, AA).
- **Buttons** fill with `--color-red-cta` (#C81922) + white text; hover
  `--color-red-deep`. There is no second accent hue, ever.
- **Ink** (#0B0B0C) is the dark stage — hero, header, footer and feature bands.
  `--color-carbon` (#141518) is the raised surface for cards on ink.
- Light bands alternate **paper** (#FFFFFF) and **smoke** (#F4F4F5); cards on
  light are paper with a `--color-border` hairline.

## Typography

- **Barlow Condensed**, heavy, uppercase, is the display voice — headings, the
  hero, section eyebrows. Italic on the hero headline for the motorsport lean.
  Condensed faces need no negative tracking.
- **Inter** carries all body copy and UI. Prices and the spec sheet use
  `tabular-nums` so columns line up like a real parts list.

## Signature

1. **The diagonal tread cut.** Section transitions between the dark stage and
   light bands are cut on a hard diagonal, echoing a tire's contact patch and the
   promo graphics' angled slashes. One bold move, used sparingly.
2. **The spec sheet.** Published prices are rendered as an industrial parts list
   — hairline rows, tabular prices hard-right, service name and inclusions left.
   It is both the brand's precision voice and its strongest conversion asset.
3. **The tread mark.** A small tread-block motif (from the logo's tire-tread "C")
   marks eyebrows and list bullets.

## Components

- **Buttons**: primary = solid red-cta, white text, `rounded-md`, subtle lift on
  hover. `CallButton` is always primary and always present.
- **Cards on light**: paper, 1px `--color-border`, soft shadow, `rounded-md`.
  **Cards on ink**: `border-white/10` + `bg-white/[0.03]`, no shadow.
- **MobileCallBar**: ink strip, red Call button, phone-first.
- **Inputs**: paper, hairline border, red focus ring.

## Do / Don't

- **Do** keep the red Call button the loudest object on every surface.
- **Do** alternate ink / paper / smoke bands for rhythm; use the diagonal cut
  only where the stage meets a light band.
- **Do** set prices in tabular numerals, hard-right, like a parts list.
- **Don't** add a second accent hue, gradient text, or glow/emergency motifs.
- **Don't** over-use the diagonal cut — it stops being a signature if it's everywhere.
