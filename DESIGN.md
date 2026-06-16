---
name: Cole Foos — Portfolio
description: An editorial folio wired like a lab instrument, in a Paper & Ink (light) / Workbench (dark) cobalt system.
themes: [light, dark]
# LIGHT — "Paper & Ink" (the default; dark overrides below). Canonical in OKLCH.
colors:
  bg: "oklch(0.98 0.004 250)" # paper
  raise: "oklch(0.995 0.0015 250)" # lightest raised sheet
  sunken: "oklch(0.965 0.005 250)" # faint sunken well
  line: "oklch(0.88 0.008 255)" # hairline
  ink: "oklch(0.26 0.02 262)" # near-black ink
  muted: "oklch(0.5 0.025 262)" # secondary text
  comment: "oklch(0.6 0.02 262)" # dimmest decorative labels
  cobalt: "oklch(0.5 0.17 258)" # the one signal
  cobalt-wash: "oklch(0.95 0.03 258)" # accent background tint
  cobalt-muted: "oklch(0.5 0.1 262)" # ordinals + micro-labels
  allow: "oklch(0.52 0.15 150)" # Cedar Allow / success
  deny: "oklch(0.55 0.2 25)" # Cedar Deny / error
# DARK — "Workbench" ([data-theme='dark']).
colorsDark:
  bg: "oklch(0.18 0.012 262)" # deep blue-charcoal
  raise: "oklch(0.26 0.016 262)"
  sunken: "oklch(0.145 0.012 262)" # the code well
  line: "oklch(0.34 0.016 262)"
  ink: "oklch(0.94 0.008 250)"
  muted: "oklch(0.68 0.022 255)"
  comment: "oklch(0.55 0.02 258)"
  cobalt: "oklch(0.74 0.13 262)"
  cobalt-wash: "oklch(0.3 0.07 262)"
  cobalt-muted: "oklch(0.7 0.06 262)"
  allow: "oklch(0.82 0.18 150)"
  deny: "oklch(0.72 0.19 25)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 13cqi, 7rem)" # scales with the page measure, not the viewport
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3.6cqi, 2.2rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  sectionHead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 3.2cqi, 1.85rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem" # --t-body (17px)
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0" # neutral: light-on-dark reads lighter, don't tighten
  secondary:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem" # --t-secondary (15px)
  meta:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem" # --t-meta (13px)
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.72rem" # --t-label
    fontWeight: 500
    letterSpacing: "0.07em"
layout:
  pageMeasure: "1140px" # --page-w; centered with generous side margins, container-query root
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
  chip-stack:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "7px 12px"
  run-demo:
    backgroundColor: "{colors.cobalt-wash}"
    borderColor: "{colors.cobalt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "11px 18px"
  link-nav:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  link-nav-hover:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
---

# Design System: Cole Foos — Portfolio

## 1. Overview

**Creative North Star: "The Instrument Folio"**

This is an editorial folio — a masthead, a numbered index of work, a colophon —
wired like a lab instrument. The structure is print: oversized Archivo
headlines, hairline rules between entries, a confident asymmetric masthead, all
held in a **centered page measure** (~1140px) so the textured bench shows in the
side margins and the content reads as a sheet on a desk. The skin is an
instrument: monospace readouts, a faint dot-grid + grain backdrop, and a single
**cobalt** signal that means _live_. A recruiter reads the folio in ten seconds;
an engineer notices the instrument, expands a project, and runs its live demo in
a drawer.

The palette ships in **two themes** the visitor can toggle — **Paper & Ink**
(light, the default) and **Workbench** (dark, deep blue-charcoal). Cobalt is the
one signal in both. The theme is set on `<html data-theme>` before first paint
by an inline script (stored choice, else OS preference), so there is no flash.

It rejects, explicitly: the **generic SaaS / portfolio template** (gradient
hero, identical icon-card grid, Inter everywhere); **costume retro** (the old
Win95 desktop skin this replaces — no CRT, no beeps, no fake windows);
the **LinkedIn-style resume dump**; and **overdesign for its own sake**. Every
flourish answers to readability and load speed first. The personality lives in
the type, the cobalt signal, the copy, and the fact that the demo actually runs
— never in a costume.

**Key Characteristics:**

- Editorial structure (masthead → about → work → experience → stack → colophon), not a card grid.
- A centered page measure; the lit backdrop runs full-width and the empty side margins frame the content.
- Light & dark themes (Paper & Ink / Workbench); one cobalt signal for _live_ in both.
- Archivo display weight 900 paired with JetBrains Mono for every label and number.
- Quiet, text-led controls. The interface recedes so the work and the live proof lead.

## 2. Colors

Two themes, one identity. **Cobalt** is the single voice — used only for _live /
interactive_ meaning. A muted cobalt carries structural ordinals so the true
signal stays exclusive. Green/red are semantic only (the Cedar demo's Allow /
Deny). All values are canonical in OKLCH (see the `colors` / `colorsDark`
frontmatter for the full token pair); they map onto a shared set of semantic
tokens (`--bg`, `--raise`, `--sunken`, `--line`, `--ink`, `--soft`, `--acc`, …)
that flip with `[data-theme]`.

### Signal

- **Cobalt** (`--acc`): the one voice. The LIVE marker, link hovers, focus
  rings, the "Run the live demo" button, the email address. Light `oklch(0.5 0.17 258)`,
  dark `oklch(0.74 0.13 262)` (lifted for contrast on the dark bench). Never decoration.

### Structural

- **Muted Cobalt** (`--violet`): structural, not interactive — the index numerals
  (01–05) and uppercase micro-labels, so the true cobalt stays exclusively about _live_.

### Semantic only

- **Allow Green** / **Deny Red** (`--ok` / `--no`): the Cedar exhibit's decisions
  and any success / error readout. Never used decoratively.

### Surfaces & text

- **Page (`--bg`)**: paper `oklch(0.98 …)` in light; deep blue-charcoal
  `oklch(0.18 .012 262)` in dark. The `.v-noir` root is transparent; the page
  background lives on `body` so the backdrop reads through.
- **Raised (`--raise`)** / **Sunken (`--sunken`)**: chips and hovered rows lift;
  the editor well sinks. In dark, `--sunken` is the code-well black.
- **Hairline (`--line`)**: borders, dividers, rules between index entries.
- **Ink (`--ink`)** / **Muted (`--soft`)**: primary text and de-emphasized copy
  (verified ≥4.5:1 against the page in both themes).

### Named Rules

**The One Signal Rule.** Cobalt means exactly one thing: _live / interactive_.
If an element is not live, hoverable, or the thing-that-just-ran, it is not
cobalt. Ordinals are muted cobalt; success is green; failure is red; everything
else is ink or muted.

**The One-Identity Rule.** The two themes are the same brand re-lit, not two
designs. Only the palette and shadow tokens flip on `[data-theme]`; type,
layout, spacing, and structure are shared. Cobalt is the signal in both.

## 3. Typography

**Display / Body Font:** Archivo (one family, multiple weights)
**Label / Mono Font:** JetBrains Mono

**Character:** One grotesk family pushed to its extremes — Archivo at 900 for
mastheads that read as confident print, at 400–500 for calm body — against
JetBrains Mono for every number, label, and code readout. The mono is the
instrument voice; the Archivo is the folio voice. The contrast between them _is_
the hybrid.

### Scale

Display type scales with the **page measure** (container-query `cqi` units off
`.nr-page`), not the raw viewport — so it tracks `--page-w` and never outgrows
its column. Smaller roles use a committed ~1.13 ramp of four tokens.

- **Display** (Archivo 900, `clamp(3.4rem, 13cqi, 7rem)`, lh 0.9, `-0.04em`): the masthead name. One per page.
- **Title** (Archivo 800, `clamp(1.4rem, 3.6cqi, 2.2rem)`, lh 1.04, `-0.035em`): work-index entry titles.
- **Section head** (Archivo 700, `clamp(1.35rem, 3.2cqi, 1.85rem)`, `-0.025em`).
- **Body** (`--t-body`, 1.0625rem / 17px, lh 1.6, tracking 0): taglines, prose, writeups. Cap measure 60–66ch.
- **Secondary** (`--t-secondary`, 0.9375rem): blurbs, deliverables, sub-copy.
- **Meta** (`--t-meta`, 0.8125rem, JetBrains Mono): dates, nav, chips, ordinals' siblings.
- **Label** (`--t-label`, 0.72rem, JetBrains Mono, `0.07em`, UPPERCASE): eyebrows, the LIVE marker, section labels.

Body uses `rem` (respects user zoom), `text-wrap: pretty` on prose, `balance` on
headings, and `font-kerning: normal` / `font-optical-sizing: auto`.

### Named Rules

**The Two-Voice Rule.** Archivo carries meaning and emotion; JetBrains Mono
carries data and machine state. Never set a date, count, ID, or decision in
Archivo, and never set a headline in mono.

**The Light-on-Dark Rule.** Body is set with neutral tracking (not tightened)
and 1.6 line-height. Light text on the dark bench reads lighter and tighter than
on paper; the looser, untightened settings keep it legible in both themes.

## 4. Elevation

Depth is conveyed with **layered drop shadows**, theme-aware. Light shadows are
soft and blue-tinted (`rgba(42,52,82,…)`); dark shadows are near-black and
generous (a soft gray shadow would vanish on the dark bench). Borders stay
hairline and informational, never a substitute for elevation.

- **shadow-sm**: hovered index rows and small readouts — a slight lift on interaction.
- **shadow-md**: the live-demo button hover and mid surfaces.
- **shadow-lg**: the slide-in demo drawer.

## 5. Components

Controls are quiet and editorial: minimal chrome, text-led, crisp single-state
changes. The interface recedes so the work and the live proof lead.

### Theme toggle

A small pill in the masthead (`☾ Dark` / `☀ Light`, mono label), persisted to
`localStorage`, defaulting to the OS preference. Hover brightens to cobalt.

### Stack / tag chips

Mono, hairline-bordered, `--raise` background, `rounded.sm`. A list of tokens, not buttons.

### Navigation / Links

Mono labels, muted at rest; hover shifts to cobalt with an underline wiping in
left-to-right (`width 0→100%`, ease `cubic-bezier(0.22,1,0.36,1)`).

### The Expandable Entry (signature component)

The spine of the page. Both Selected Work and Experience are ordered lists of
expandable entries — each row is `muted-cobalt ordinal/date · Archivo-800 title · muted blurb · mono kind + chevron`, separated by hairlines only. On hover the
row pads inward 16px, lifts with `shadow-sm`, raises its background, and the
title goes cobalt. Click to expand inline into a two-column detail: a
problem/approach (work) or résumé commentary (experience) writeup on the left,
and a `▸`-marked **Deliverables** list + stack chips on the right (single-column
when an entry has no deliverables). One entry open at a time (accordion). A
_live_ project's detail carries a "Run the live demo" button.

### The Demo Drawer (signature component)

The "show, don't tell" payoff. A live project's "Run the live demo" opens a
right-side slide-in drawer (`shadow-lg`, `min(1080px, 100%)` wide, backdrop with
a 2px blur) hosting the running demo full-size. The drawer chrome follows the
page theme, but the **Monaco editor is a single dark "code screen" in both
modes** — a deliberate instrument embedded in the page (the editor theme keeps
its dark `--sunken`-family well even on the light paper page). The real Cedar
WASM language server wires in here: completions, diagnostics, validation, and an
Allow/Deny authorization readout. Escape or backdrop-click closes it. **This is
how every demo mounts** — a new demo is a new live project, not a new section.

> Drawer note: the drawer is rendered outside `.nr-page` and `.nr-page` is the
> only container-query/positioning context, so neither the page measure nor any
> ancestor becomes a containing block for Monaco's `fixedOverflowWidgets` (hover
> / suggestion popups). Keep it that way or the editor's overlays mis-anchor.

## 6. Do's and Don'ts

### Do:

- **Do** keep Cobalt to _live / interactive_ meaning only (the One Signal Rule), in both themes.
- **Do** keep the two themes identical except palette + shadows (the One-Identity Rule).
- **Do** set every number, date, and machine readout in JetBrains Mono, and every headline in Archivo (the Two-Voice Rule).
- **Do** scale display type with the page measure (`cqi`), and keep body in `rem`.
- **Do** prove ability with working artifacts (the live Cedar exhibit), per "show, don't tell."

### Don't:

- **Don't** build a **generic SaaS / portfolio template** — no gradient hero, no identical icon-card grid, no Inter-everywhere builder look.
- **Don't** reintroduce **costume retro** — no CRT flicker, beeps, or fake OS windows. Charm comes from type, color, and the demo.
- **Don't** paste a **LinkedIn-style resume dump** — dense corporate bullet lists with no point of view.
- **Don't** **overdesign** — no effect that costs clarity or load speed for its own sake.
- **Don't** use gradient text / `background-clip: text` (single solid colors only).
- **Don't** use a colored `border-left`/`border-right` stripe as an accent; borders are hairline and full.
- **Don't** let cobalt become decoration. If it isn't live, it isn't cobalt.
- **Don't** put a `transform`/`container-type`/`filter` on an ancestor of the demo drawer — it breaks the editor's fixed overflow widgets.
