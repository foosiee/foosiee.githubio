import React, {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ConfigContext from '../../context/configContext';
import {
  APP_DEFINITIONS,
  BOOT_SEQUENCE,
  INITIAL_WINDOWS,
  WINDOW_LAYOUTS,
  WindowPosition,
  WindowSize,
  WindowState,
  AppId,
} from './home-data';
import {
  buildProjectExplorerFolders,
  formatExplorerTree,
} from './project-data';
import { buildResumeExplorerFolders } from './resume-data';
import { AboutApp } from './apps/about-app';
import { ContactApp } from './apps/contact-app';
import { ProjectsApp } from './apps/projects-app';
import { ResumeApp } from './apps/resume-app';
import { SkillsApp } from './apps/skills-app';
import { TerminalApp } from './apps/terminal-app';
import CedarLab from '../../components/cedarLab/cedarLab';
import type { ProjectPanelTab } from './project-data';

import './home.css';

interface DragState {
  appId: AppId;
  offsetX: number;
  offsetY: number;
}

interface ResizeState {
  appId: AppId;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildInitialPositions(): Record<AppId, WindowPosition> {
  return Object.keys(WINDOW_LAYOUTS).reduce((positions, appId) => {
    const typedAppId = appId as AppId;

    return {
      ...positions,
      [typedAppId]: {
        top: WINDOW_LAYOUTS[typedAppId].top,
        left: WINDOW_LAYOUTS[typedAppId].left,
      },
    };
  }, {} as Record<AppId, WindowPosition>);
}

function buildInitialSizes(): Record<AppId, WindowSize> {
  return Object.keys(WINDOW_LAYOUTS).reduce((sizes, appId) => {
    const typedAppId = appId as AppId;

    return {
      ...sizes,
      [typedAppId]: {
        width: WINDOW_LAYOUTS[typedAppId].width,
        height: WINDOW_LAYOUTS[typedAppId].height,
      },
    };
  }, {} as Record<AppId, WindowSize>);
}

function WindowFrame(props: {
  appId: AppId;
  title: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  dragging?: boolean;
  style?: React.CSSProperties;
  onFocus?: () => void;
  onDragStart?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onResizeStart?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMinimize?: () => void;
  onClose?: () => void;
}) {
  return (
    <section
      data-window-id={props.appId}
      className={`window-frame${props.className ? ` ${props.className}` : ''}${
        props.active ? ' active' : ''
      }${props.dragging ? ' dragging' : ''}`}
      style={props.style}
      onMouseDown={props.onFocus}
    >
      <div className="window-titlebar" onMouseDown={props.onDragStart}>
        <div className="titlebar-text">{props.title}</div>
        <div className="titlebar-actions">
          <button
            aria-label="Minimize window"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={props.onMinimize}
          >
            _
          </button>
          <button
            aria-label="Close window"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={props.onClose}
          >
            X
          </button>
        </div>
      </div>
      <div className="window-body">{props.children}</div>
      <div
        className="window-resize-handle"
        onMouseDown={props.onResizeStart}
        aria-hidden="true"
      />
    </section>
  );
}

class WindowErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string | null }
> {
  state = { hasError: false, message: null };

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      message:
        error instanceof Error ? error.message : 'Window failed to render.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="explorer-empty">
          <p className="prompt-line">C:\&gt; app /crash</p>
          <p className="supporting-text">{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  const config = useContext(ConfigContext);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const projectFolders = useMemo(() => buildProjectExplorerFolders(), []);
  const resumeFolders = useMemo(() => buildResumeExplorerFolders(config.jobs), [
    config.jobs,
  ]);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(
    INITIAL_WINDOWS
  );
  const [positions, setPositions] = useState<Record<AppId, WindowPosition>>(
    buildInitialPositions
  );
  const [sizes, setSizes] = useState<Record<AppId, WindowSize>>(
    buildInitialSizes
  );
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const [, setNextZIndex] = useState(5);
  const [terminalInput, setTerminalInput] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const [selectedProjectFolderId, setSelectedProjectFolderId] = useState(
    projectFolders[0]?.id ?? 'work-tooling'
  );
  const [selectedProjectEntryId, setSelectedProjectEntryId] = useState(
    projectFolders[0]?.entries[0]?.id ?? ''
  );
  const [selectedProjectPanel, setSelectedProjectPanel] = useState<
    ProjectPanelTab
  >('overview');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'COLEOS 95 command shell ready.',
    'Type HELP for commands or OPEN ABOUT to launch a window.',
  ]);

  useEffect(() => {
    const timeouts = BOOT_SEQUENCE.map((step, index) =>
      window.setTimeout(() => {
        setBootLines((current) => [...current, step.line]);

        if (index === BOOT_SEQUENCE.length - 1) {
          window.setTimeout(() => {
            setBootComplete(true);
          }, 380);
        }
      }, step.delay)
    );

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    if (!dragState && !resizeState) {
      return undefined;
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();

      if (dragState) {
        const windowElement = canvas.querySelector(
          `[data-window-id="${dragState.appId}"]`
        ) as HTMLElement | null;
        const windowRect = windowElement
          ? windowElement.getBoundingClientRect()
          : null;
        const maxLeft = Math.max(
          0,
          canvasRect.width -
            (windowRect ? windowRect.width : sizes[dragState.appId].width)
        );
        const maxTop = Math.max(
          0,
          canvasRect.height -
            (windowRect ? windowRect.height : sizes[dragState.appId].height)
        );

        setPositions((current) => ({
          ...current,
          [dragState.appId]: {
            left: clamp(
              event.clientX - canvasRect.left - dragState.offsetX,
              0,
              maxLeft
            ),
            top: clamp(
              event.clientY - canvasRect.top - dragState.offsetY,
              0,
              maxTop
            ),
          },
        }));
      }

      if (resizeState) {
        const layout = WINDOW_LAYOUTS[resizeState.appId];
        const currentPosition = positions[resizeState.appId];
        const maxWidth = Math.max(0, canvasRect.width - currentPosition.left);
        const maxHeight = Math.max(0, canvasRect.height - currentPosition.top);

        setSizes((current) => ({
          ...current,
          [resizeState.appId]: {
            width: clamp(
              resizeState.startWidth + (event.clientX - resizeState.startX),
              layout.minWidth,
              maxWidth
            ),
            height: clamp(
              resizeState.startHeight + (event.clientY - resizeState.startY),
              layout.minHeight,
              maxHeight
            ),
          },
        }));
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
      setResizeState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, resizeState, positions, sizes]);

  useEffect(() => {
    if (
      projectFolders.length > 0 &&
      !projectFolders.some((folder) => folder.id === selectedProjectFolderId)
    ) {
      setSelectedProjectFolderId(projectFolders[0].id);
      setSelectedProjectEntryId(projectFolders[0].entries[0]?.id ?? '');
    }
  }, [projectFolders, selectedProjectFolderId]);

  useEffect(() => {
    const folder =
      projectFolders.find((item) => item.id === selectedProjectFolderId) ??
      projectFolders[0];
    const entry = folder?.entries.find(
      (item) => item.id === selectedProjectEntryId
    );

    if (!folder || folder.entries.length === 0) {
      return;
    }

    if (!entry) {
      setSelectedProjectEntryId(folder.entries[0].id);
    }
  }, [projectFolders, selectedProjectFolderId, selectedProjectEntryId]);

  useEffect(() => {
    setSelectedProjectPanel('overview');
  }, [selectedProjectEntryId]);

  const currentRole = config.jobs[0];

  const promoteWindow = (appId: AppId, updates?: Partial<WindowState>) => {
    setNextZIndex((value) => {
      setWindows((current) => ({
        ...current,
        [appId]: {
          ...current[appId],
          ...updates,
          zIndex: value,
        },
      }));

      return value + 1;
    });
  };

  const openWindow = (appId: AppId) => {
    promoteWindow(appId, {
      open: true,
      minimized: false,
    });
    setStartOpen(false);
  };

  const focusWindow = (appId: AppId) => {
    promoteWindow(appId);
  };

  const startDraggingWindow = (
    appId: AppId,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth <= 1100) {
      focusWindow(appId);
      return;
    }

    const frameElement = event.currentTarget
      .parentElement as HTMLElement | null;

    if (!frameElement) {
      return;
    }

    const frameRect = frameElement.getBoundingClientRect();

    focusWindow(appId);
    setDragState({
      appId,
      offsetX: event.clientX - frameRect.left,
      offsetY: event.clientY - frameRect.top,
    });
  };

  const startResizingWindow = (
    appId: AppId,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    if (window.innerWidth <= 1100) {
      focusWindow(appId);
      return;
    }

    focusWindow(appId);
    setResizeState({
      appId,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: sizes[appId].width,
      startHeight: sizes[appId].height,
    });
  };

  const minimizeWindow = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        minimized: true,
      },
    }));
  };

  const closeWindow = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        open: false,
        minimized: false,
      },
    }));
  };

  const activeAppId = useMemo(() => {
    return Object.entries(windows).reduce<AppId | null>((activeId, entry) => {
      const appId = entry[0] as AppId;
      const windowState = entry[1];

      if (!windowState.open || windowState.minimized) {
        return activeId;
      }

      if (!activeId || windowState.zIndex > windows[activeId].zIndex) {
        return appId;
      }

      return activeId;
    }, null);
  }, [windows]);

  const visibleWindows = APP_DEFINITIONS.filter((app) => {
    return windows[app.id].open && !windows[app.id].minimized;
  }).sort((a, b) => windows[a.id].zIndex - windows[b.id].zIndex);

  const openWindows = APP_DEFINITIONS.filter((app) => windows[app.id].open);

  const resolveAppFromToken = (token: string): AppId | null => {
    const normalized = token
      .toLowerCase()
      .replace('.exe', '')
      .replace('.com', '');
    const match = APP_DEFINITIONS.find((app) => {
      return (
        app.id === normalized || app.label.toLowerCase().includes(normalized)
      );
    });

    return match ? match.id : null;
  };

  const runTerminalCommand = (rawCommand: string) => {
    const command = rawCommand.trim();

    if (!command) {
      return;
    }

    const normalized = command.toLowerCase();
    const parts = normalized.split(/\s+/);
    const nextHistory = [`C:\\>${command}`];

    if (normalized === 'help') {
      nextHistory.push(
        'Commands: HELP, DIR, TREE [RESUME|PROJECTS], WHOAMI, OPEN <APP>, CLOSE <APP>, RESUME, CONTACT, PROJECTS, STATUS, CLEAR'
      );
    } else if (normalized === 'dir' || normalized === 'apps') {
      nextHistory.push(
        'ABOUT.TXT  CEDAR.EXE  RESUME.EXE  PROJECTS.EXE  SKILLS.SYS  CONTACT.CFG  PROMPT.COM'
      );
    } else if (parts[0] === 'tree') {
      const target = parts[1] ?? 'all';
      const lines =
        target === 'resume'
          ? formatExplorerTree(resumeFolders)
          : target === 'projects'
          ? formatExplorerTree(projectFolders)
          : [
              ...formatExplorerTree(resumeFolders),
              '',
              ...formatExplorerTree(projectFolders),
            ];

      nextHistory.push(...lines);
    } else if (normalized === 'whoami') {
      nextHistory.push(
        'Cole Foos | software engineer | web, cloud, product engineering'
      );
    } else if (normalized === 'resume') {
      openWindow('work');
      nextHistory.push('Launching RESUME.EXE...');
    } else if (normalized === 'projects') {
      openWindow('projects');
      nextHistory.push('Opening PROJECTS.EXE...');
    } else if (normalized === 'contact') {
      openWindow('contact');
      nextHistory.push(`Opening CONTACT.CFG... email: ${config.email}`);
    } else if (normalized === 'status') {
      nextHistory.push(
        `Desktop online | windows ${openWindows.length} open | cedar ${
          windows.cedar.open ? 'loaded' : 'available'
        } | shell ready`
      );
    } else if (parts[0] === 'open' && parts[1]) {
      const appId = resolveAppFromToken(parts.slice(1).join(' '));

      if (appId) {
        openWindow(appId);
        nextHistory.push(`Launching ${appId.toUpperCase()}...`);
      } else {
        nextHistory.push('File not found. Try DIR or HELP.');
      }
    } else if (parts[0] === 'close' && parts[1]) {
      const appId = resolveAppFromToken(parts.slice(1).join(' '));

      if (appId) {
        closeWindow(appId);
        nextHistory.push(`Closed ${appId.toUpperCase()}.`);
      } else {
        nextHistory.push('Close target not found.');
      }
    } else if (normalized === 'clear') {
      setTerminalHistory([
        'Terminal buffer cleared.',
        'Type HELP for commands.',
      ]);
      return;
    } else {
      nextHistory.push('Bad command or file name. Type HELP.');
    }

    setTerminalHistory((current) => [...current, ...nextHistory]);
  };

  const handleTerminalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runTerminalCommand(terminalInput);
    setTerminalInput('');
  };

  const renderWindowContent = (appId: AppId) => {
    if (appId === 'about') {
      return (
        <AboutApp
          config={config}
          currentRole={currentRole}
          openWindow={openWindow}
        />
      );
    }

    if (appId === 'work') {
      return (
        <ResumeApp
          config={config}
          currentRole={currentRole}
          openWindow={openWindow}
        />
      );
    }

    if (appId === 'projects') {
      return (
        <ProjectsApp
          config={config}
          currentRole={currentRole}
          openWindow={openWindow}
          projectFolders={projectFolders}
          selectedProjectFolderId={selectedProjectFolderId}
          selectedProjectEntryId={selectedProjectEntryId}
          selectedProjectPanel={selectedProjectPanel}
          setSelectedProjectFolderId={setSelectedProjectFolderId}
          setSelectedProjectEntryId={setSelectedProjectEntryId}
          setSelectedProjectPanel={setSelectedProjectPanel}
        />
      );
    }

    if (appId === 'skills') {
      return <SkillsApp config={config} />;
    }

    if (appId === 'contact') {
      return (
        <ContactApp
          config={config}
          currentRole={currentRole}
          openWindow={openWindow}
        />
      );
    }

    if (appId === 'cedar') {
      return (
        <WindowErrorBoundary>
          <CedarLab />
        </WindowErrorBoundary>
      );
    }

    return (
      <TerminalApp
        terminalHistory={terminalHistory}
        terminalInput={terminalInput}
        setTerminalInput={setTerminalInput}
        handleTerminalSubmit={handleTerminalSubmit}
      />
    );
  };

  const clockValue = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="home-page">
      {!bootComplete ? (
        <div className="startup-screen" aria-hidden="true">
          <div className="startup-shell">
            <p className="startup-brand">COLEOS 95 STARTUP</p>
            <div className="startup-console">
              {bootLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="startup-cursor">_</p>
            </div>
            <div className="startup-progress">
              <div
                className="startup-progress-bar"
                style={{
                  width: `${Math.max(
                    12,
                    (bootLines.length / BOOT_SEQUENCE.length) * 100
                  )}%`,
                }}
              />
            </div>
            <p className="startup-copy">Booting portfolio desktop...</p>
          </div>
        </div>
      ) : null}

      <header className="boot-header">
        <div className="boot-status">
          <span className="status-dot" />
          <span>COLEOS 95</span>
        </div>
        <div className="boot-menu">
          <span>FILE</span>
          <span>WINDOWS</span>
          <span>RUN</span>
          <span>HELP</span>
        </div>
      </header>

      <section className="desktop-shell">
        <aside className="desktop-icons">
          {APP_DEFINITIONS.map((app) => (
            <button
              key={app.id}
              className="desktop-icon"
              onClick={() => openWindow(app.id)}
            >
              <span className="desktop-icon-badge">{app.icon}</span>
              <span>{app.label}</span>
            </button>
          ))}
        </aside>

        <div className="desktop-canvas" ref={canvasRef}>
          {visibleWindows.map((app) => {
            const layout = WINDOW_LAYOUTS[app.id];

            return (
              <WindowFrame
                key={app.id}
                appId={app.id}
                title={app.title}
                active={activeAppId === app.id}
                dragging={dragState ? dragState.appId === app.id : false}
                className={`app-window app-window-${app.id}`}
                style={{
                  top: positions[app.id].top,
                  left: positions[app.id].left,
                  width: `min(${sizes[app.id].width}px, calc(100% - 24px))`,
                  height: `min(${sizes[app.id].height}px, calc(100% - 24px))`,
                  zIndex: windows[app.id].zIndex,
                }}
                onFocus={() => focusWindow(app.id)}
                onDragStart={(event) => startDraggingWindow(app.id, event)}
                onResizeStart={(event) => startResizingWindow(app.id, event)}
                onMinimize={() => minimizeWindow(app.id)}
                onClose={() => closeWindow(app.id)}
              >
                {renderWindowContent(app.id)}
              </WindowFrame>
            );
          })}
        </div>
      </section>

      {startOpen ? (
        <div className="start-menu">
          {APP_DEFINITIONS.map((app) => (
            <button key={app.id} onClick={() => openWindow(app.id)}>
              <span>{app.icon}</span>
              <div>
                <strong>{app.label}</strong>
                <small>{app.command}</small>
              </div>
            </button>
          ))}
        </div>
      ) : null}

      <footer className="taskbar">
        <button
          className={`start-button${startOpen ? ' active' : ''}`}
          onClick={() => setStartOpen((value) => !value)}
        >
          Start
        </button>
        <div className="taskbar-tabs">
          {openWindows.map((app) => (
            <button
              key={app.id}
              className={`taskbar-tab${
                windows[app.id].minimized ? ' minimized' : ''
              }${activeAppId === app.id ? ' active' : ''}`}
              onClick={() => {
                if (windows[app.id].minimized) {
                  openWindow(app.id);
                } else {
                  focusWindow(app.id);
                }
              }}
            >
              {app.label}
            </button>
          ))}
        </div>
        <button className="taskbar-clock" onClick={() => setStartOpen(false)}>
          {clockValue}
        </button>
      </footer>
    </main>
  );
}
