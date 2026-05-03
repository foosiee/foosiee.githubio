import React, { useContext } from 'react';
import ConfigContext from '../../context/configContext';
import { Education, Job, Project } from '../../types';

import './home.css';

function ExternalLink(props: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={props.className}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
}

function ExperienceCard(props: { job: Job; featured?: boolean }) {
  const { job, featured } = props;

  return (
    <article
      className={featured ? 'experience-card featured' : 'experience-card'}
    >
      <div className="card-topline">
        <p className="eyebrow">{job.company}</p>
        <p className="date-text">{job.date}</p>
      </div>
      <h3>
        {job.title}
        <span>{job.location}</span>
      </h3>
      {job.details.length > 0 ? (
        <ul className="detail-list">
          {job.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ) : (
        <p className="supporting-text">
          Leading software delivery and platform work at scale.
        </p>
      )}
    </article>
  );
}

function ProjectCard(props: { project: Project }) {
  const { project } = props;

  return (
    <article className="project-card">
      <div className="card-topline">
        <p className="eyebrow">Project</p>
        {project.link ? (
          <ExternalLink href={project.link}>Open</ExternalLink>
        ) : null}
      </div>
      <h3>{project.title}</h3>
      <p className="supporting-text">{project.description}</p>
    </article>
  );
}

function EducationCard(props: { education: Education }) {
  const { education } = props;

  return (
    <article className="education-card">
      <div className="card-topline">
        <p className="eyebrow">{education.school}</p>
        <p className="date-text">{education.date}</p>
      </div>
      <h3>
        {education.awarded}
        <span>{education.location}</span>
      </h3>
      <ul className="detail-list compact">
        {education.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </article>
  );
}

function WindowFrame(props: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`window-frame${props.className ? ` ${props.className}` : ''}`}
    >
      <div className="window-titlebar">
        <div className="titlebar-text">{props.title}</div>
        <div className="titlebar-actions">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="window-body">{props.children}</div>
    </section>
  );
}

export default function Home() {
  const config = useContext(ConfigContext);
  const currentRole = config.jobs[0];

  return (
    <main className="home-page">
      <header className="boot-header">
        <div className="boot-status">
          <span className="status-dot" />
          <span>COLEOS 95</span>
        </div>
        <div className="boot-menu">
          <span>FILE</span>
          <span>VIEW</span>
          <span>PROJECTS</span>
          <span>HELP</span>
        </div>
      </header>

      <section className="desktop-layout">
        <div className="desktop-main">
          <WindowFrame
            title="C:\\PORTFOLIO\\README.TXT"
            className="hero-window"
          >
            <div className="hero-grid">
              <div>
                <p className="prompt-line">C:\&gt; whoami</p>
                <h1>Cole Foos</h1>
                <p className="hero-subtitle">
                  Software engineer shipping cloud systems, frontend products,
                  and reliable backend workflows.
                </p>
                <div className="ascii-panel">
                  <p className="prompt-line">C:\&gt; type intro.txt</p>
                  <p>
                    Based in Ohio, currently building at {currentRole.company},
                    with a background across AWS, React, TypeScript, and
                    event-driven architecture. I like interfaces that feel fast,
                    systems that scale cleanly, and products that stay usable
                    under pressure.
                  </p>
                </div>
              </div>

              <div className="system-panel">
                <div className="system-row">
                  <span>ROLE</span>
                  <strong>{currentRole.title}</strong>
                </div>
                <div className="system-row">
                  <span>LOCATION</span>
                  <strong>{currentRole.location}</strong>
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
                  <ExternalLink
                    className="win-button primary"
                    href={config.resume}
                  >
                    Resume.exe
                  </ExternalLink>
                  <ExternalLink className="win-button" href={config.github}>
                    Github.sys
                  </ExternalLink>
                  <ExternalLink className="win-button" href={config.linkedin}>
                    LinkedIn.net
                  </ExternalLink>
                </div>
              </div>
            </div>
          </WindowFrame>

          <WindowFrame title="C:\\WORK\\EXPERIENCE.DAT">
            <div className="section-copy">
              <p className="prompt-line">C:\&gt; dir experience</p>
              <p>Career history loaded successfully.</p>
            </div>
            <div className="stack-list">
              {config.jobs.map((job, index) => (
                <ExperienceCard
                  key={`${job.company}-${job.title}-${job.date}`}
                  job={job}
                  featured={index === 0}
                />
              ))}
            </div>
          </WindowFrame>

          <WindowFrame title="C:\\LAB\\PROJECTS.INI">
            <div className="section-copy">
              <p className="prompt-line">C:\&gt; scan /projects</p>
              <p>Executable builds and experiments indexed below.</p>
            </div>
            <div className="project-grid">
              {config.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </WindowFrame>
        </div>

        <aside className="desktop-side">
          <WindowFrame title="C:\\TOOLS\\SKILLS.SYS">
            <div className="section-copy">
              <p className="prompt-line">C:\&gt; list skills</p>
            </div>
            <div className="skill-cloud">
              {config.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </WindowFrame>

          <WindowFrame title="C:\\DOCS\\EDUCATION.LOG">
            {config.education.map((item) => (
              <EducationCard
                key={`${item.school}-${item.date}`}
                education={item}
              />
            ))}
          </WindowFrame>

          <WindowFrame title="C:\\MODEM\\CONTACT.CFG">
            <div className="contact-card">
              <p className="prompt-line">C:\&gt; ping cole@foos.dev</p>
              <p className="supporting-text">
                Open to product engineering roles, interesting builds, and
                technical conversations.
              </p>
              <div className="contact-links">
                <a href={`mailto:${config.email}`}>{config.email}</a>
                <ExternalLink href={config.linkedin}>
                  LinkedIn profile
                </ExternalLink>
                <ExternalLink href={config.github}>GitHub profile</ExternalLink>
              </div>
            </div>
          </WindowFrame>
        </aside>
      </section>

      <footer className="taskbar">
        <div className="start-button">Start</div>
        <div className="taskbar-tabs">
          <span>portfolio.exe</span>
          <span>resume.doc</span>
          <span>contact.txt</span>
        </div>
        <div className="taskbar-clock">09:41 PM</div>
      </footer>
    </main>
  );
}
