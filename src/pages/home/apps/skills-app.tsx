import React from 'react';
import { Config } from '../../../types';
import { CURRENTLY_EXPLORING } from '../home-data';

export function SkillsApp(props: { config: Config }) {
  return (
    <div className="skills-window">
      <div className="section-copy">
        <p className="prompt-line">C:\&gt; list skills</p>
        <p>Installed tooling, languages, and platforms.</p>
      </div>
      <div className="skills-status-grid">
        <div className="mini-panel">
          <p className="skills-status-label">Tool Count</p>
          <strong className="skills-status-value">
            {props.config.skills.length}
          </strong>
        </div>
        <div className="mini-panel">
          <p className="skills-status-label">Primary Mode</p>
          <strong className="skills-status-value">Web / Cloud</strong>
        </div>
      </div>
      <div className="skill-cloud">
        {props.config.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <div className="skills-notes-grid">
        {CURRENTLY_EXPLORING.map((item) => (
          <div key={item} className="mini-panel">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
