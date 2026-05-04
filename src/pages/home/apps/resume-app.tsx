import React from 'react';
import {
  CommonWindowProps,
  EducationCard,
  ExperienceCard,
  ExternalLink,
} from './shared';

export function ResumeApp(props: CommonWindowProps) {
  return (
    <div className="resume-window">
      <div className="section-copy">
        <p className="prompt-line">C:\&gt; open resume.exe</p>
        <p>Career history, education, and download link loaded successfully.</p>
      </div>
      <div className="resume-summary-grid">
        <div className="mini-panel">
          <p className="skills-status-label">Current Role</p>
          <strong className="skills-status-value">
            {props.currentRole.title}
          </strong>
        </div>
        <div className="mini-panel">
          <p className="skills-status-label">Current Company</p>
          <strong className="skills-status-value">
            {props.currentRole.company}
          </strong>
        </div>
      </div>
      <div className="hero-actions">
        <ExternalLink className="win-button primary" href={props.config.resume}>
          Download Resume
        </ExternalLink>
        <button
          className="win-button"
          onClick={() => props.openWindow('projects')}
        >
          Projects.exe
        </button>
        <button
          className="win-button"
          onClick={() => props.openWindow('contact')}
        >
          Contact
        </button>
      </div>
      <div className="resume-sections">
        <section className="resume-section-block">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; dir experience</p>
            <p>Professional history indexed below.</p>
          </div>
          <div className="stack-list">
            {props.config.jobs.map((job, index) => (
              <ExperienceCard
                key={`${job.company}-${job.title}-${job.date}`}
                job={job}
                featured={index === 0}
              />
            ))}
          </div>
        </section>
        <section className="resume-section-block">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; dir education</p>
            <p>Formal education and awards.</p>
          </div>
          <div className="stack-list">
            {props.config.education.map((item) => (
              <EducationCard
                key={`${item.school}-${item.date}`}
                education={item}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
