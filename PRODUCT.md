# Product

## Register

brand

## Users

Two audiences, weighted equally — the design has to serve both without
compromising either:

- **Recruiters and hiring managers**, arriving from a link or a referral,
  skimming on a 10-second budget: _who is this, what has he built, where's the
  resume, how do I reach him?_ They need the answer at a glance, on first paint,
  with zero spelunking.
- **Engineer peers and the technically curious** — prospective teammates, people
  who followed a GitHub link or a talk. They stay longer and reward depth: they
  will actually open a live demo, read the real code, and judge the craft. The
  question in their head is _is this person good, and do they have taste?_

The front door must read instantly for the skimmer; the depth must pay off for
the engineer who stays. Most arrive on desktop, in an evaluative mindset.

## Product Purpose

Cole Foos's personal portfolio. It exists to **demonstrate** engineering ability
directly, not merely describe it. Projects are first-class, and the strongest
ones carry a live, in-browser interactive demo — the first being a Cedar policy
playground running entirely client-side via WebAssembly, with more to follow.
The demos are the proof; the project is the headline; the demo is the evidence
underneath it.

Success: a recruiter leaves in 10 seconds knowing who Cole is and how to reach
him, and a peer leaves thinking "this person can build, and sweats the details"
— ideally after having actually _run_ something real on the page.

This is a deliberate redirection from an earlier version built as a 1990s
desktop-OS metaphor (draggable windows, terminal, boot sequence). That frame put
a single demo at the center and made the front door work to read. The new
direction keeps the working interactive demos as the core proof, but presents
them inside a clean, modern, fast portfolio that any visitor can parse
immediately.

## Brand Personality

**Sharp · precise · quietly confident.** The voice is dry, specific, and
self-assured — never corporate, never cute. Personality is carried by
typography, motion, copy, and the live demos themselves, not by a costume or a
retro skin. Wit shows up in word choice and in the fact that the proof actually
runs, not in gimmickry. The credibility is in the depth; the charm is in the
restraint and the craft.

## Anti-references

- **Generic SaaS / portfolio template.** Gradient hero, identical icon-card
  grid, Inter everywhere, builder-made landing page. The default this site has to
  beat.
- **Costume retro / gimmick.** All-surface nostalgia — CRT flicker, beeps, fake
  windows with nothing real behind them. The prior version risked this; the new
  direction explicitly drops the 90s skin.
- **LinkedIn-style resume dump.** Dense corporate bullet lists with no point of
  view. The resume section should have craft and editing, not a pasted CV.
- **Overdesigned / try-hard.** Effects for their own sake that hurt clarity or
  load time. Every flourish answers to readability and speed first.

## Design Principles

- **Show, don't tell.** Prove ability through working artifacts (live demos, real
  code, real interaction) rather than claims about it.
- **The proof must function.** Every interactive demo is real software —
  keyboard-reachable, fast, genuinely working. A demo that's only decorative is
  cut.
- **Readable in ten seconds, rewarding for ten minutes.** The front door answers
  the recruiter's questions on first paint; depth pays off the engineer who
  stays. Neither audience is sacrificed for the other.
- **Personality through craft, not costume.** Distinctiveness comes from type,
  motion, copy, and the demos — not a themed skin. Restraint with intent.
- **Projects scale.** The architecture treats projects-with-live-demos as a
  first-class, repeatable pattern, so adding the next demo is cheap and
  consistent.

## Accessibility & Inclusion

Pragmatic, not exhaustive — a personal site, not a compliance-bar product. Cover
what any visitor actually hits: legible contrast on all body text (≥4.5:1),
keyboard reachability for navigation and interactive demos, and visible focus
states. Honor `prefers-reduced-motion` for non-essential animation. Don't
over-engineer ARIA; prioritize the things a real keyboard or screen-reader user
would trip on.
