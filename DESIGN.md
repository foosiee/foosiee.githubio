---
name: Cole Foos — Portfolio
description: An editorial folio wired like a lab instrument, lit in Dracula.
colors:
  bg: "oklch(0.27 0.022 280)"
  surface: "oklch(0.32 0.025 279)"
  border: "oklch(0.4 0.03 278)"
  ink: "oklch(0.97 0.005 106)"
  muted: "oklch(0.64 0.055 277)"
  comment: "oklch(0.53 0.08 274)"
  signal-magenta: "oklch(0.75 0.17 351)"
  dracula-violet: "oklch(0.72 0.16 305)"
  allow-green: "oklch(0.87 0.21 150)"
  deny-red: "oklch(0.66 0.22 22)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 13vw, 8rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5.5vw, 3.6rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.4vw, 2.4rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.74rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "40px"
components:
  chip-scenario:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  chip-scenario-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
  card-specimen:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  link-nav:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  link-nav-hover:
    backgroundColor: "transparent"
    textColor: "{colors.signal-magenta}"
---

# Design System: Cole Foos — Portfolio

## 1. Overview

**Creative North Star: "The Instrument Folio"**

This is an editorial folio — a masthead, a numbered index of work, a colophon —
that has been wired like a lab instrument. The structure is print: oversized
Archivo headlines, hairline rules between entries, a confident asymmetric
masthead. The skin is an instrument: a near-black Dracula surface, monospace
readouts, and a single magenta signal that means _live_. The two halves are the
whole idea. A recruiter reads the folio in ten seconds; an engineer notices the
instrument, expands a project, and runs its live demo in a drawer. The palette is the
[Dracula](https://draculatheme.com/) theme — chosen because the audience _is_
developers, and they will recognize it on sight without a word of explanation.

It rejects, explicitly: the **generic SaaS / portfolio template** (gradient
hero, identical icon-card grid, Inter everywhere); **costume retro** (the old
Win95 desktop skin this replaces — no CRT, no beeps, no fake windows);
the **LinkedIn-style resume dump**; and **overdesign for its own sake**. Every
flourish answers to readability and load speed first. The personality lives in
the type, the Dracula light, the copy, and the fact that the demo actually runs
— never in a costume.

**Key Characteristics:**

- Editorial structure (masthead → about → work → experience → colophon), not a card grid.
- Dracula-dark surface; bone-white text; one magenta signal for _live_.
- Archivo display weight 900 paired with JetBrains Mono for every label and number.
- Quiet, text-led controls. The interface recedes so the work and the live proof lead.
- Depth from layered shadows, not borders-as-decoration.

## 2. Colors

A near-black Dracula surface carrying bone-white editorial type, with magenta
reserved as the single live-signal and violet as a quieter structural accent.
All values are canonical in OKLCH; the Dracula hex origin is noted for
provenance.

### Primary

- **Signal Magenta** — Dracula Pink (`#ff79c6`, `oklch(0.75 0.17 351)`): The one
  voice. Used only for _live / interactive_ meaning — the LIVE marker, the
  active-scenario border, link hovers, the email address, the rule that fires on
  an Allow. It is never decoration.

### Secondary

- **Dracula Violet** — Dracula Purple (`#bd93f9`, `oklch(0.72 0.16 305)`):
  Structural, not interactive. Carries the index numerals (01–05) and other
  ordinal scaffolding, so magenta stays exclusively about _live_.

### Tertiary (semantic only)

- **Allow Green** — Dracula Green (`#50fa7b`, `oklch(0.87 0.21 150)`): The
  Cedar exhibit's Allow decision and any success/affirmative readout. Semantic only.
- **Deny Red** — Dracula Red (`#ff5555`, `oklch(0.66 0.22 22)`): The Deny
  decision and error/negative readouts. Semantic only.

### Neutral

- **Surface Black** — Dracula Background (`#282a36`, `oklch(0.27 0.022 280)`): The page base.
- **Raised Surface** — (`#343746`, `oklch(0.32 0.025 279)`): Elevated panels, the
  specimen card, hovered index rows.
- **Hairline** — Dracula Selection (`#44475a`, `oklch(0.4 0.03 278)`): Borders,
  dividers, rules between index entries.
- **Bone Ink** — Dracula Foreground (`#f8f8f2`, `oklch(0.97 0.005 106)`): Primary text and headlines.
- **Muted Lavender** — (`oklch(0.64 0.055 277)`): Body sub-text and de-emphasized
  copy. Lightened off Dracula's comment hue to clear 4.5:1 on the surface black.
- **Comment** — Dracula Comment (`#6272a4`, `oklch(0.53 0.08 274)`): The dimmest
  label tone. Permitted only on large or bold labels where it still clears 3:1; never on body text.

### Named Rules

**The One Signal Rule.** Magenta means exactly one thing: _live / interactive_.
If an element is not live, hoverable, or the thing-that-just-ran, it is not
magenta. Ordinals are violet; success is green; failure is red; everything else
is bone or muted.

**The Lightened-Comment Rule.** Dracula's comment `#6272a4` fails 4.5:1 as body
text on the surface black. Body sub-text uses Muted Lavender instead. Comment is
reserved for large/bold de-emphasized labels only.

## 3. Typography

**Display Font:** Archivo (with system-ui, sans-serif)
**Body Font:** Archivo (same family, lighter weights)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** One grotesk family pushed to its extremes — Archivo at 900 for
mastheads that read as confident print, at 400–500 for calm body — against
JetBrains Mono for every number, label, and code readout. The mono is the
instrument voice; the Archivo is the folio voice. The contrast between them _is_
the hybrid.

### Hierarchy

- **Display** (Archivo 900, `clamp(3.4rem, 13vw, 8rem)`, line-height 0.9, `-0.045em`): The masthead name. One per page.
- **Headline** (Archivo 900, `clamp(2rem, 5.5vw, 3.6rem)`, line-height 1, `-0.04em`): The Exhibit's lead. Sets the live-proof moment apart.
- **Title** (Archivo 800, `clamp(1.4rem, 3.4vw, 2.4rem)`, line-height 1.04, `-0.035em`): Work-index entry titles.
- **Body** (Archivo 400–500, 17px, line-height 1.55, `-0.01em`): Taglines, blurbs, prose. Cap measure at 52–66ch.
- **Label** (JetBrains Mono 500, 0.74rem, `0.04em`, UPPERCASE): Eyebrows, the LIVE marker, section notes, dates, code.

### Named Rules

**The Two-Voice Rule.** Archivo carries meaning and emotion; JetBrains Mono
carries data and machine state. Never set a date, count, ID, or decision in
Archivo, and never set a headline in mono.

**The Heavy-on-Dark Rule.** Display and headline run at Archivo 900, not 700 —
dark backgrounds eat perceived weight, so the masthead must over-commit to read
as confident rather than thin.

## 4. Elevation

Depth is conveyed with **layered drop shadows**, not borders or glows. Surfaces
sit at three levels: the page base, hovered/raised rows, and the elevated
specimen card. Shadows are deep and near-black (tuned for a dark surface, where
a soft gray shadow would vanish). Borders remain hairline-thin and informational
(dividers, field edges), never a substitute for elevation.

### Shadow Vocabulary

- **shadow-sm** (`box-shadow: 0 1px 2px rgba(13,14,20,0.5)`): Hovered index rows and the decision readout. A slight lift on interaction.
- **shadow-md** (`box-shadow: 0 10px 30px rgba(13,14,20,0.5)`): The elevated specimen card holding the live Cedar exhibit. The page's primary focal lift.
- **shadow-lg** (`box-shadow: 0 22px 60px rgba(13,14,20,0.6)`): Reserved for any future modal/overlay surface.

### Named Rules

**The Deep-Shadow Rule.** On the Dracula surface, shadows must be near-black and
generous (≥10px blur for elevation). A pale, tight shadow reads as a 2014 web
app and disappears against the dark. If you can't see the lift, the shadow is too small.

## 5. Components

Controls are quiet and editorial: minimal chrome, text-led, crisp single-state
changes. The interface recedes so the work and the live proof lead.

### Buttons / Controls

- **Shape:** Gently squared corners (`4px`, `rounded.sm`).
- **Scenario chips (the primary control):** Transparent background, muted text,
  hairline border. Text-led — they read as a list of choices, not a row of buttons.
- **Hover:** Text brightens to bone, border to muted. No fill, no motion beyond color.
- **Active:** Border becomes Signal Magenta, background lifts to Raised Surface,
  text goes bone. The magenta border is the only color cue — quiet, not a filled pill.

### Cards / Containers

- **Corner Style:** `8px` (`rounded.lg`) on the specimen card; `6px` on inner code/decision panels.
- **Background:** Raised Surface (`#343746`) on the page base.
- **Shadow Strategy:** `shadow-md` on the specimen card (see Elevation). The page's one true elevation.
- **Border:** Hairline (`#44475a`), informational only.
- **Internal Padding:** `22–28px` (`spacing.md`–`lg`).

### Navigation / Links

- **Style:** Mono labels (JetBrains Mono), muted at rest.
- **Hover:** Color shifts to Signal Magenta with an animated underline wiping in
  left-to-right (`width 0→100%`, ease `cubic-bezier(0.22, 1, 0.36, 1)`).
- **Active/Visited:** No persistent state; this is a single-surface page.

### The Expandable Entry (signature component)

The spine of the page. Both Selected Work and Experience are ordered lists of
expandable entries — each row is `violet ordinal/date · Archivo-800 title · muted blurb · mono kind + chevron`, separated by hairlines only. On hover the
row pads inward 16px, lifts with `shadow-sm`, raises its background, and the
title goes magenta. Click to expand inline into a two-column detail: a
problem/approach writeup (left) and a `▸`-marked **Deliverables** list + stack
chips (right). It replaces the identical-card-grid entirely. One entry open at a
time (accordion). A _live_ project's detail carries a "Run the live demo"
button.

### The Demo Drawer (signature component)

The "show, don't tell" payoff. A live project's "Run the live demo" button opens
a right-side slide-in drawer (`shadow-lg`, `min(560px, 100%)` wide, backdrop
with a 2px blur) hosting the running demo full-size: the Cedar policy (mono, in
a sunken panel), a scenario picker, and a large Archivo-900 decision word —
green for Allow, red for Deny — plus a mono reason line naming the rule that
fired. Escape or backdrop-click closes it. The real Cedar WASM engine wires in
here. **This is how every demo mounts** — a new demo is a new live project, not
a new section.

## 6. Do's and Don'ts

### Do:

- **Do** keep Signal Magenta to ≤10% of any screen, and only for _live /
  interactive_ meaning (the One Signal Rule).
- **Do** set every number, date, and machine readout in JetBrains Mono, and
  every headline in Archivo (the Two-Voice Rule).
- **Do** run display/headline at Archivo 900 on the dark surface.
- **Do** convey depth with deep, near-black layered shadows (≥10px blur for elevation).
- **Do** keep controls quiet and text-led; let the work and the live proof carry the page.
- **Do** prove ability with working artifacts (the live Cedar exhibit), per "show, don't tell."

### Don't:

- **Don't** build a **generic SaaS / portfolio template** — no gradient hero, no
  identical icon-card grid, no Inter-everywhere builder look.
- **Don't** reintroduce **costume retro** — no CRT flicker, beeps, or fake OS
  windows. The Win95 desktop is retired; charm now comes from type, color, and the demo.
- **Don't** paste a **LinkedIn-style resume dump** — dense corporate bullet lists with no point of view.
- **Don't** **overdesign** — no effect that costs clarity or load speed for its own sake.
- **Don't** use gradient text or `background-clip: text` (single solid colors only).
- **Don't** use a colored `border-left`/`border-right` stripe as an accent on rows or cards; borders are hairline and full.
- **Don't** set body sub-text in Dracula Comment `#6272a4` — it fails contrast; use Muted Lavender.
- **Don't** let magenta become decoration. If it isn't live, it isn't magenta.
