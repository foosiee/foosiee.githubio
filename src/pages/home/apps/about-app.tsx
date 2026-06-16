import React from 'react';
import { EXTRA_HIGHLIGHTS } from '../home-data';
import { CommonWindowProps, ExternalLink } from './shared';

export function AboutApp(props: CommonWindowProps) {
  return (
    <div className="hero-grid">
      <div>
        <p className="prompt-line">C:\&gt; whoami</p>
        <h1>Cole Foos</h1>
        <p className="hero-subtitle">
          Software engineer with 5+ years building large-scale distributed
          systems at AWS, specializing in identity, authorization, and Rust.
        </p>
        <div className="ascii-panel">
          <p className="prompt-line">C:\&gt; type profile.txt</p>
          <p>
            Based in Arlington, currently building at{' '}
            {props.currentRole.company}. I design low-latency, security-critical
            services and ship fine-grained access-control infrastructure that
            other teams and customers build on. I like software that feels
            sharp, useful, and durable.
          </p>
        </div>
      </div>

      <div className="system-panel">
        <div className="system-row">
          <span>ROLE</span>
          <strong>{props.currentRole.title}</strong>
        </div>
        <div className="system-row">
          <span>LOCATION</span>
          <strong>{props.currentRole.location}</strong>
        </div>
        <div className="system-row">
          <span>STATUS</span>
          <strong>ONLINE</strong>
        </div>
        <div className="system-row">
          <span>STACK</span>
          <strong>WEB / CLOUD / API</strong>
        </div>
        <div className="hero-actions">
          <button
            className="win-button primary"
            onClick={() => props.openWindow('work')}
          >
            Resume.exe
          </button>
          <button
            className="win-button"
            onClick={() => props.openWindow('projects')}
          >
            Projects.exe
          </button>
          <ExternalLink className="win-button" href={props.config.github}>
            Github.sys
          </ExternalLink>
          <ExternalLink className="win-button" href={props.config.linkedin}>
            LinkedIn.net
          </ExternalLink>
        </div>
      </div>

      <div className="info-strip">
        {EXTRA_HIGHLIGHTS.map((item) => (
          <div key={item} className="mini-panel">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
