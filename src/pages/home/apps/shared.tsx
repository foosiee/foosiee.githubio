import React, { FormEvent } from 'react';
import { Config } from '../../../types';
import type {
  ExplorerEntry,
  ExplorerFolder,
  ProjectPanelTab,
} from '../project-data';
import { AppId } from '../home-data';

export interface CommonWindowProps {
  config: Config;
  currentRole: {
    company: string;
    title: string;
    location: string;
  };
  openWindow: (appId: AppId) => void;
}

export function ExternalLink(props: {
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

export function ExperienceCard(props: {
  job: {
    company: string;
    title: string;
    date: string;
    location: string;
    details: string[];
  };
  featured?: boolean;
}) {
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

export function EducationCard(props: {
  education: {
    school: string;
    date: string;
    awarded: string;
    location: string;
    details: string[];
  };
}) {
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

export function FolderTree(props: {
  folders: ExplorerFolder[];
  selectedFolderId: string;
  selectedEntryId: string;
  onSelectFolder: (folderId: string) => void;
  onSelectEntry: (entryId: string) => void;
}) {
  return (
    <div className="folder-tree">
      {props.folders.map((folder) => {
        const expanded = props.selectedFolderId === folder.id;

        return (
          <div key={folder.id} className="folder-tree-node">
            <button
              className={`folder-tree-folder${expanded ? ' active' : ''}`}
              onClick={() => props.onSelectFolder(folder.id)}
            >
              <span className="folder-tree-toggle">{expanded ? '−' : '+'}</span>
              <span className="folder-tree-folder-icon">📁</span>
              <span className="folder-tree-folder-label">
                <strong>{folder.title}</strong>
                <small>{folder.path}</small>
              </span>
            </button>

            {expanded ? (
              <div className="folder-tree-children">
                {folder.entries.map((entry) => (
                  <button
                    key={entry.id}
                    className={`folder-tree-entry${
                      props.selectedEntryId === entry.id ? ' active' : ''
                    }`}
                    onClick={() => props.onSelectEntry(entry.id)}
                  >
                    <span className="folder-tree-branch" />
                    <span className="folder-tree-entry-icon">
                      {entry.badge}
                    </span>
                    <span className="folder-tree-entry-label">
                      {entry.title}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function getProjectIcon(entry: ExplorerEntry) {
  if (entry.source === 'tooling') {
    return '🧰';
  }

  if (entry.source === 'work') {
    return '🗂';
  }

  if (entry.href) {
    return '↗';
  }

  return '■';
}

export function ProjectTabs(props: {
  selected: ProjectPanelTab;
  onSelect: (tab: ProjectPanelTab) => void;
}) {
  return (
    <div className="project-tabs" role="tablist" aria-label="Project details">
      {(['overview', 'files', 'notes'] as ProjectPanelTab[]).map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={props.selected === tab}
          className={`project-tab${props.selected === tab ? ' active' : ''}`}
          onClick={() => props.onSelect(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}

export interface TerminalWindowProps {
  terminalHistory: string[];
  terminalInput: string;
  setTerminalInput: (value: string) => void;
  handleTerminalSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
