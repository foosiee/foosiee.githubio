import React from 'react';
import {
  ExplorerFolder,
  ProjectPanelTab,
  ProjectStoryBlock,
} from '../project-data';
import { CommonWindowProps, ExternalLink, getProjectIcon } from './shared';

interface ProjectsAppProps extends CommonWindowProps {
  projectFolders: ExplorerFolder[];
  selectedProjectFolderId: string;
  selectedProjectEntryId: string;
  selectedProjectPanel: ProjectPanelTab;
  setSelectedProjectFolderId: (folderId: string) => void;
  setSelectedProjectEntryId: (entryId: string) => void;
  setSelectedProjectPanel: (tab: ProjectPanelTab) => void;
}

function renderStoryBlock(block: ProjectStoryBlock, index: number) {
  if (block.type === 'paragraph') {
    return (
      <p key={index} className="supporting-text">
        {block.text}
      </p>
    );
  }

  if (block.type === 'list') {
    return (
      <ul key={index} className="detail-list compact">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <figure key={index} className="case-code-block">
      <pre>
        <code>{block.code}</code>
      </pre>
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}

export function ProjectsApp(props: ProjectsAppProps) {
  const selectedFolder =
    props.projectFolders.find(
      (folder) => folder.id === props.selectedProjectFolderId
    ) ?? props.projectFolders[0];
  const selectedProject =
    selectedFolder?.entries.find(
      (entry) => entry.id === props.selectedProjectEntryId
    ) ?? selectedFolder?.entries[0];
  const allEntries = props.projectFolders.flatMap((folder) =>
    folder.entries.map((entry) => ({ folder, entry }))
  );
  const systemsEntries = allEntries.filter(
    ({ entry }) => entry.source === 'work'
  );
  const demoEntries = allEntries.filter(({ entry }) => entry.launchAppId);
  const publicEntries = allEntries.filter(
    ({ entry }) => entry.source === 'demo' && !entry.launchAppId
  );

  if (!selectedFolder || !selectedProject) {
    return (
      <div className="explorer-empty">
        <p className="prompt-line">C:\&gt; scan /projects</p>
        <p className="supporting-text">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="explorer-window">
      <div className="project-window-toolbar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      <div className="explorer-shell">
        <aside className="explorer-folder-list">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; dir /projects</p>
            <p>Projects grouped by product area, demoability, and context.</p>
          </div>
          {props.projectFolders.map((folder) => (
            <button
              key={folder.id}
              className={`explorer-folder-button${
                folder.id === props.selectedProjectFolderId ? ' active' : ''
              }`}
              onClick={() => {
                props.setSelectedProjectFolderId(folder.id);
                props.setSelectedProjectEntryId(folder.entries[0]?.id ?? '');
              }}
            >
              <div className="explorer-folder-name">
                <strong>{folder.title}</strong>
                <small>{folder.description}</small>
              </div>
              <span className="explorer-folder-count">
                {folder.entries.length}
              </span>
            </button>
          ))}
        </aside>

        <div className="explorer-main">
          <div className="explorer-folder-header">
            <div>
              <p className="prompt-line">C:\&gt; open {selectedFolder.path}</p>
              <strong>{selectedFolder.title}</strong>
              <p className="explorer-folder-description">
                {selectedFolder.description}
              </p>
            </div>
            <div className="explorer-action-note">
              {selectedFolder.entries.length} project
              {selectedFolder.entries.length === 1 ? '' : 's'}
            </div>
          </div>

          <div className="explorer-file-list">
            {selectedFolder.entries.map((entry) => (
              <button
                key={entry.id}
                className={`explorer-entry-button${
                  entry.id === selectedProject.id ? ' active' : ''
                }`}
                onClick={() => props.setSelectedProjectEntryId(entry.id)}
              >
                <span className="explorer-entry-icon">{entry.badge}</span>
                <span className="explorer-entry-copy">
                  <strong>{entry.title}</strong>
                  <small>{entry.path}</small>
                  <span>{entry.summary}</span>
                </span>
              </button>
            ))}
          </div>

          <article className="explorer-detail-card">
            <div className="project-case-header">
              <div className="project-icon-frame">
                <span>{getProjectIcon(selectedProject)}</span>
              </div>
              <div>
                <p className="project-panel-label">Case File</p>
                <h3>{selectedProject.title}</h3>
                <p className="supporting-text">{selectedProject.summary}</p>
              </div>
            </div>

            <div className="project-story-meta">
              <span className="project-story-badge">
                {selectedProject.badge}
              </span>
              <small>{selectedFolder.title}</small>
            </div>

            <article className="project-case-article">
              <section className="project-case-section">
                <p className="project-panel-label">Context</p>
                <p className="supporting-text">{selectedProject.context}</p>
              </section>
              <section className="project-case-section">
                <p className="project-panel-label">Problem</p>
                <p className="supporting-text">{selectedProject.problem}</p>
              </section>
              <section className="project-case-section">
                <p className="project-panel-label">What I Owned</p>
                <p className="supporting-text">{selectedProject.role}</p>
              </section>
              <section className="project-case-section">
                <p className="project-panel-label">Technical Approach</p>
                {selectedProject.details.map(renderStoryBlock)}
              </section>
              <section className="project-case-section">
                <p className="project-panel-label">Outcome</p>
                <p className="supporting-text">{selectedProject.outcome}</p>
                <ul className="detail-list compact">
                  {selectedProject.impact.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </section>
              <section className="project-case-section">
                <p className="project-panel-label">Stack</p>
                <div className="project-tech-grid">
                  {selectedProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
              {selectedProject.references?.length ? (
                <section className="project-case-section">
                  <p className="project-panel-label">References</p>
                  <div className="project-reference-list">
                    {selectedProject.references.map((reference) => (
                      <ExternalLink
                        key={reference.href}
                        className="project-reference-link"
                        href={reference.href}
                      >
                        {reference.href}
                      </ExternalLink>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <div className="hero-actions">
              {selectedProject.launchAppId ? (
                <button
                  className="win-button primary"
                  onClick={() => props.openWindow(selectedProject.launchAppId!)}
                >
                  Launch Demo
                </button>
              ) : null}
              {selectedProject.href ? (
                <ExternalLink
                  className={
                    selectedProject.launchAppId
                      ? 'win-button'
                      : 'win-button primary'
                  }
                  href={selectedProject.href}
                >
                  {selectedProject.kind === 'external'
                    ? 'Open Repo'
                    : 'Read More'}
                </ExternalLink>
              ) : null}
              <button
                className="win-button"
                onClick={() => props.openWindow('work')}
              >
                Resume.exe
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
