import React, { useEffect, useState } from 'react';
import './home.css';
import { EXPERIENCE, FEATURED, PROFILE, SKILLS } from './content';
import type { ExperienceEntry, FeaturedProject } from './content';
import CedarDemo from '../../components/cedarDemo/cedarDemo';

/**
 * The home page — an editorial folio in a Dracula palette ("The Instrument
 * Folio"). Work and experience are expandable entries; a live project opens its
 * demo in a slide-in drawer. See /DESIGN.md.
 */
export default function Home() {
  // First (live) project open by default, so a skimmer sees something runs.
  const [openId, setOpenId] = useState<string | null>(FEATURED[0].id);
  const [demoOpen, setDemoOpen] = useState(false);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div className="v-noir">
      <header className="nr-mast">
        <div className="nr-mast-main nr-rise" style={delay(0)}>
          <p className="nr-eyebrow">Software engineer · {PROFILE.location}</p>
          <h1>{PROFILE.name}</h1>
          <p className="nr-tagline">{PROFILE.tagline}</p>
        </div>
        <div className="nr-mast-side nr-rise" style={delay(1)}>
          <p className="nr-now">
            <span>Now</span>
            {PROFILE.company}
          </p>
          <nav className="nr-links">
            <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
            <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${PROFILE.links.email}`}>Email</a>
          </nav>
        </div>
      </header>

      <section className="nr-about nr-rise" style={delay(2)}>
        <div className="nr-about-body">
          {PROFILE.about.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
        <p className="nr-focus">
          <span className="nr-focus-label">Currently</span>
          {PROFILE.focus}
        </p>
      </section>

      <section className="nr-section" aria-labelledby="work-h">
        <div className="nr-section-head">
          <h2 id="work-h">Selected work</h2>
          <span className="nr-section-note">
            Five of sixteen — expand any entry
          </span>
        </div>
        <ol className="nr-list">
          {FEATURED.map((p, i) => (
            <WorkEntry
              key={p.id}
              project={p}
              index={i}
              open={openId === p.id}
              onToggle={() => toggle(p.id)}
              onRunDemo={() => setDemoOpen(true)}
              style={delay(3 + i)}
            />
          ))}
        </ol>
      </section>

      <section className="nr-section" aria-labelledby="exp-h">
        <div className="nr-section-head">
          <h2 id="exp-h">Experience</h2>
          <span className="nr-section-note">Full résumé on request</span>
        </div>
        <ol className="nr-list">
          {EXPERIENCE.map((e) => (
            <ExperienceRow
              key={e.id}
              entry={e}
              open={openId === e.id}
              onToggle={() => toggle(e.id)}
            />
          ))}
        </ol>
      </section>

      <section
        className="nr-section nr-skills-section"
        aria-labelledby="stack-h"
      >
        <div className="nr-section-head">
          <h2 id="stack-h">Stack</h2>
          <span className="nr-section-note">Day-to-day tools</span>
        </div>
        <div className="nr-skills">
          {SKILLS.map((s) => (
            <code key={s}>{s}</code>
          ))}
        </div>
      </section>

      <footer className="nr-colophon">
        <div>
          <h3>Reach</h3>
          <p className="nr-reach">
            <a href={`mailto:${PROFILE.links.email}`}>{PROFILE.links.email}</a>
          </p>
          <p className="nr-reach-sub">
            Open to conversations about authorization, Rust, and product
            engineering.
          </p>
        </div>
        <div className="nr-colophon-links">
          <h3>Elsewhere</h3>
          <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
            github.com/foosiee
          </a>
          <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/colefoos
          </a>
          <a href={PROFILE.links.resume} target="_blank" rel="noreferrer">
            résumé (PDF)
          </a>
        </div>
      </footer>

      <DemoDrawer open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

function WorkEntry(props: {
  project: FeaturedProject;
  index: number;
  open: boolean;
  onToggle: () => void;
  onRunDemo: () => void;
  style?: React.CSSProperties;
}) {
  const { project: p, index, open } = props;
  return (
    <li className="nr-item nr-rise" style={props.style}>
      <button
        className="nr-item-head"
        aria-expanded={open}
        onClick={props.onToggle}
      >
        <span className="nr-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="nr-title">{p.title}</span>
        <span className="nr-blurb">{p.blurb}</span>
        <span className="nr-tail">
          <span className="nr-era">{p.era}</span>
          <span className={'nr-kind nr-kind-' + p.kind}>
            {p.kind === 'live'
              ? 'Live'
              : p.kind === 'external'
              ? 'External'
              : 'Case study'}
          </span>
          <span className={'nr-chev' + (open ? ' is-open' : '')} aria-hidden>
            ▾
          </span>
        </span>
      </button>

      {open && p.writeup && (
        <div className="nr-detail">
          <div className="nr-detail-main">
            <p className="nr-detail-problem">{p.writeup.problem}</p>
            {p.writeup.approach.map((para) => (
              <p key={para.slice(0, 16)}>{para}</p>
            ))}
            <div className="nr-detail-actions">
              {p.kind === 'live' && (
                <button className="nr-run-demo" onClick={props.onRunDemo}>
                  <span className="nr-live">●</span> Run the live demo
                </button>
              )}
              {p.href && (
                <a
                  className="nr-visit"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit site ↗
                </a>
              )}
            </div>
          </div>
          <aside className="nr-detail-side">
            <h4 className="nr-detail-label">Deliverables</h4>
            <ul className="nr-deliverables">
              {p.writeup.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="nr-detail-stack">
              {p.tags.map((t) => (
                <code key={t}>{t}</code>
              ))}
            </div>
          </aside>
        </div>
      )}
    </li>
  );
}

function ExperienceRow(props: {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const { entry: e, open } = props;
  return (
    <li className="nr-item">
      <button
        className="nr-item-head nr-item-head-exp"
        aria-expanded={open}
        onClick={props.onToggle}
      >
        <span className="nr-num nr-num-mono">{e.span}</span>
        <span className="nr-title nr-title-sm">
          {e.org} <span className="nr-role">· {e.title}</span>
        </span>
        <span className="nr-blurb">{e.summary}</span>
        <span className="nr-tail">
          <span className={'nr-chev' + (open ? ' is-open' : '')} aria-hidden>
            ▾
          </span>
        </span>
      </button>
      {open && (
        <div className={'nr-detail' + (e.deliverables ? '' : ' nr-detail-exp')}>
          <div className="nr-detail-main">
            {e.commentary.map((para) => (
              <p key={para.slice(0, 16)}>{para}</p>
            ))}
          </div>
          {e.deliverables && (
            <aside className="nr-detail-side">
              <h4 className="nr-detail-label">Deliverables</h4>
              <ul className="nr-deliverables">
                {e.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      )}
    </li>
  );
}

/** Slide-in drawer hosting the real Cedar Language Server demo. */
function DemoDrawer(props: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [props.open, props.onClose]);

  if (!props.open) return null;

  return (
    <div
      className="nr-drawer-root"
      role="dialog"
      aria-modal="true"
      aria-label="Cedar Language Server demo"
    >
      <div className="nr-drawer-backdrop" onClick={props.onClose} />
      <aside className="nr-drawer nr-drawer-wide">
        <header className="nr-drawer-head">
          <p className="nr-eyebrow">
            <span className="nr-live">●</span> LIVE — Cedar Language Server
            <span className="nr-caret" aria-hidden />
          </p>
          <button
            className="nr-drawer-close"
            onClick={props.onClose}
            aria-label="Close demo"
          >
            ✕
          </button>
        </header>
        <div className="nr-drawer-body">
          <CedarDemo />
        </div>
      </aside>
    </div>
  );
}

/** Staggered entrance delay; CSS handles the reduced-motion fallback. */
function delay(step: number): React.CSSProperties {
  return { ['--rise-delay' as string]: `${step * 70}ms` };
}
