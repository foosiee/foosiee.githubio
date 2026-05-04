import React from 'react';
import { ExplorerFolder, ProjectPanelTab } from '../project-data';
import {
  CommonWindowProps,
  ExternalLink,
  FolderTree,
  ProjectTabs,
  getProjectIcon,
} from './shared';

interface ProjectsAppProps extends CommonWindowProps {
  projectFolders: ExplorerFolder[];
  selectedProjectFolderId: string;
  selectedProjectEntryId: string;
  selectedProjectPanel: ProjectPanelTab;
  setSelectedProjectFolderId: (folderId: string) => void;
  setSelectedProjectEntryId: (entryId: string) => void;
  setSelectedProjectPanel: (tab: ProjectPanelTab) => void;
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

  if (!selectedFolder || !selectedProject) {
    return (
      <div className="explorer-empty">
        <p className="prompt-line">C:\&gt; scan /projects</p>
        <p className="supporting-text">No projects available.</p>
      </div>
    );
  }

  return (
    <div className="project-window">
      <div className="project-window-toolbar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      <div className="project-window-layout">
        <aside className="project-tree-pane">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; tree /projects</p>
            <p>Projects grouped by team, context, and medium.</p>
          </div>
          <FolderTree
            folders={props.projectFolders}
            selectedFolderId={props.selectedProjectFolderId}
            selectedEntryId={props.selectedProjectEntryId}
            onSelectFolder={(folderId) => {
              const folder =
                props.projectFolders.find((item) => item.id === folderId) ??
                props.projectFolders[0];

              props.setSelectedProjectFolderId(folderId);
              props.setSelectedProjectEntryId(folder?.entries[0]?.id ?? '');
            }}
            onSelectEntry={(entryId) => {
              props.setSelectedProjectEntryId(entryId);
              const parent = props.projectFolders.find((folder) =>
                folder.entries.some((entry) => entry.id === entryId)
              );

              if (parent) {
                props.setSelectedProjectFolderId(parent.id);
              }
            }}
          />
        </aside>

        <section className="project-detail-pane">
          <ProjectTabs
            selected={props.selectedProjectPanel}
            onSelect={props.setSelectedProjectPanel}
          />

          <div className="project-detail-content">
            {props.selectedProjectPanel === 'overview' ? (
              <div className="project-overview">
                <div className="project-overview-header">
                  <div className="project-icon-frame">
                    <span>{getProjectIcon(selectedProject)}</span>
                  </div>
                  <div>
                    <h3>{selectedProject.title}</h3>
                    <p>{selectedProject.summary}</p>
                  </div>
                </div>

                <div className="project-panel-row">
                  <div className="project-panel-block">
                    <p className="project-panel-label">Overview</p>
                    <p className="supporting-text">
                      {selectedProject.details[0] ??
                        'A project details view with a stronger folder-and-files metaphor.'}
                    </p>
                  </div>
                  <div className="project-panel-block">
                    <p className="project-panel-label">Role</p>
                    <p className="supporting-text">
                      {selectedProject.source === 'tooling'
                        ? 'Built as AWS tooling / language infrastructure.'
                        : selectedProject.source === 'work'
                        ? 'Work-adjacent product or platform delivery.'
                        : 'Personal demo or open-source project.'}
                    </p>
                  </div>
                  <div className="project-panel-block">
                    <p className="project-panel-label">Tech</p>
                    <div className="project-tech-grid">
                      {selectedProject.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-panel-block">
                    <p className="project-panel-label">Impact</p>
                    <ul className="detail-list compact">
                      {selectedProject.details.slice(1, 3).map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hero-actions">
                  {selectedProject.launchAppId ? (
                    <button
                      className="win-button primary"
                      onClick={() =>
                        props.openWindow(selectedProject.launchAppId!)
                      }
                    >
                      Launch
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
              </div>
            ) : null}

            {props.selectedProjectPanel === 'files' ? (
              <div className="project-files">
                <div className="section-copy">
                  <p className="prompt-line">
                    C:\&gt; dir {selectedFolder.title}
                  </p>
                  <p>Files and supporting notes for the selected project.</p>
                </div>
                <div className="project-file-list">
                  {selectedFolder.entries.map((entry) => (
                    <button
                      key={entry.id}
                      className={`project-file-card${
                        selectedProject.id === entry.id ? ' active' : ''
                      }`}
                      onClick={() => props.setSelectedProjectEntryId(entry.id)}
                    >
                      <span className="project-file-icon">{entry.badge}</span>
                      <span>
                        <strong>{entry.title}</strong>
                        <small>{entry.path}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {props.selectedProjectPanel === 'notes' ? (
              <div className="project-notes">
                <div className="section-copy">
                  <p className="prompt-line">C:\&gt; type notes.txt</p>
                  <p>
                    Extra context on the selected project and why it matters.
                  </p>
                </div>
                <div className="stack-list">
                  {selectedProject.details.map((detail) => (
                    <div key={detail} className="mini-panel">
                      <p>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
