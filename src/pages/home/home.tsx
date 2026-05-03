import React, {
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CedarLab from '../../components/cedarLab/cedarLab';
import ConfigContext from '../../context/configContext';
import { Education, Job } from '../../types';

import './home.css';

type AppId =
  | 'about'
  | 'cedar'
  | 'work'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'terminal';

interface AppDefinition {
  id: AppId;
  icon: string;
  label: string;
  title: string;
  command: string;
}

interface WindowState {
  open: boolean;
  minimized: boolean;
  zIndex: number;
}

interface WindowLayout {
  top: number;
  left: number;
  width: number;
}

interface WindowPosition {
  top: number;
  left: number;
}

interface DragState {
  appId: AppId;
  offsetX: number;
  offsetY: number;
}

type ProjectKind = 'embedded' | 'external' | 'case-study';

interface ProjectShowcase {
  id: string;
  title: string;
  typeLabel: string;
  kind: ProjectKind;
  summary: string;
  details: string[];
  stack: string[];
  href?: string;
  launchAppId?: AppId;
}

interface BootStep {
  delay: number;
  line: string;
}

const APP_DEFINITIONS: AppDefinition[] = [
  {
    id: 'about',
    icon: 'TXT',
    label: 'About Me',
    title: 'C:\\PORTFOLIO\\ABOUT.TXT',
    command: 'open about',
  },
  {
    id: 'cedar',
    icon: 'WASM',
    label: 'Cedar Lab',
    title: 'C:\\LAB\\CEDAR.EXE',
    command: 'open cedar',
  },
  {
    id: 'work',
    icon: 'DOC',
    label: 'Resume',
    title: 'C:\\DOCS\\RESUME.EXE',
    command: 'open resume',
  },
  {
    id: 'projects',
    icon: 'EXE',
    label: 'Projects',
    title: 'C:\\LAB\\PROJECTS.EXE',
    command: 'open projects',
  },
  {
    id: 'skills',
    icon: 'SYS',
    label: 'Skills',
    title: 'C:\\TOOLS\\SKILLS.SYS',
    command: 'open skills',
  },
  {
    id: 'contact',
    icon: 'NET',
    label: 'Contact',
    title: 'C:\\MODEM\\CONTACT.CFG',
    command: 'open contact',
  },
  {
    id: 'terminal',
    icon: 'COM',
    label: 'Command',
    title: 'C:\\DOS\\PROMPT.COM',
    command: 'open terminal',
  },
];

const WINDOW_LAYOUTS: Record<AppId, WindowLayout> = {
  about: { top: 36, left: 180, width: 540 },
  cedar: { top: 54, left: 260, width: 860 },
  work: { top: 88, left: 260, width: 760 },
  projects: { top: 160, left: 190, width: 760 },
  skills: { top: 92, left: 930, width: 420 },
  contact: { top: 378, left: 930, width: 320 },
  terminal: { top: 430, left: 120, width: 560 },
};

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: { open: true, minimized: false, zIndex: 4 },
  cedar: { open: false, minimized: false, zIndex: 1 },
  work: { open: false, minimized: false, zIndex: 1 },
  projects: { open: false, minimized: false, zIndex: 1 },
  skills: { open: true, minimized: false, zIndex: 2 },
  contact: { open: false, minimized: false, zIndex: 1 },
  terminal: { open: true, minimized: false, zIndex: 3 },
};

const EXTRA_HIGHLIGHTS = [
  'Strong bias for reliable systems, clear UX, and maintainable product code.',
  'Recent work spans authorization systems, Rust services, and large-scale AWS product engineering.',
  'Best work happens where product sense and engineering rigor overlap.',
];

const CURRENTLY_EXPLORING = [
  'Building richer portfolio interactions that feel like software, not a brochure.',
  'Tighter product polish on internal tools and customer-facing web apps.',
  'Ways to make engineering-heavy UIs feel fast and understandable.',
];

const PROJECT_SHOWCASES: ProjectShowcase[] = [
  {
    id: 'cedar-lsp',
    title: 'Cedar Language Server',
    typeLabel: 'Embedded App',
    kind: 'embedded',
    summary:
      'Primary-author work on Cedar tooling, now showcased directly in this site through WASM and Monaco.',
    details: [
      'Browser-integrated Cedar language tooling with diagnostics, completions, and hover.',
      'Live policy validation and authorization evaluation running fully client-side.',
      'Demonstrates both product polish and deep ownership of language-tooling architecture.',
    ],
    stack: ['Rust', 'WASM', 'Monaco', 'TypeScript', 'Cedar'],
    launchAppId: 'cedar',
  },
  {
    id: 'spotify-lyrics',
    title: 'spotify-lyrics',
    typeLabel: 'External App',
    kind: 'external',
    summary:
      'Web player experience that pulls lyrics for the track currently playing in Spotify.',
    details: [
      'Focused on a lightweight consumer-facing interface around music playback context.',
      'Useful example of building a narrow tool with immediate feedback and a clear UX loop.',
    ],
    stack: ['Web', 'Spotify APIs', 'Frontend'],
    href: 'https://www.spotify-lyrics.com/',
  },
  {
    id: 'super-marka-metrics',
    title: 'Super-Marka-Metrics',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Budgeting and forecasting tool for grocery spending, built around visualization and prediction.',
    details: [
      'Helped users inspect spending habits instead of just tracking totals.',
      'Added prediction-focused thinking rather than stopping at dashboard reporting.',
    ],
    stack: ['Web', 'Data Visualization', 'ML'],
    href: 'https://devpost.com/software/healthystudentuc',
  },
  {
    id: 'v-net-lab',
    title: 'V-Net Lab',
    typeLabel: 'External Repo',
    kind: 'external',
    summary:
      'Network topology design tool inspired by Visio for modeling infrastructure layouts.',
    details: [
      'Focused on interactive graph-style editing and system visualization.',
      'Good example of building software that behaves more like an application than a page.',
    ],
    stack: ['Desktop-style UI', 'Networking', 'Visualization'],
    href: 'https://github.com/foosiee/CSET-3600-VNETLAB_PROJ',
  },
  {
    id: 'document-processor',
    title: 'Automated Document Processor',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Event-driven serverless invoice-processing system that reduced manual billing work.',
    details: [
      'OCR extraction pipeline designed to move humans out of repetitive billing steps.',
      'Highlights backend workflow ownership, system design, and measurable operational impact.',
    ],
    stack: ['AWS', 'Serverless', 'OCR', 'Event-driven Systems'],
  },
  {
    id: 'zero-touch-sani-system',
    title: 'zero-touch-sani-system',
    typeLabel: 'External Repo',
    kind: 'external',
    summary:
      'Handsfree sanitation system with Raspberry Pi hardware, cloud connectivity, and a control UI.',
    details: [
      'Mixed hardware, cloud IoT, and web interface concerns in one end-to-end project.',
      'Strong example of multidisciplinary product delivery beyond standard CRUD applications.',
    ],
    stack: ['Raspberry Pi', 'IoT', 'Google Cloud', 'Firebase', 'Web UI'],
    href: 'https://github.com/foosiee/zero-touch-sani-system',
  },
];

const BOOT_SEQUENCE: BootStep[] = [
  { delay: 220, line: 'COLE BIOS v9.5' },
  { delay: 420, line: '640K SYSTEM MEMORY ........ OK' },
  { delay: 620, line: 'DETECTING AUTHORIZATION MODULES ........ OK' },
  { delay: 860, line: 'LOADING AWS PROFILE ........ OK' },
  { delay: 1100, line: 'INITIALIZING CEDAR LAB ........ OK' },
  { delay: 1380, line: 'STARTING COLEOS 95 SHELL ........ OK' },
];

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
    </section>
  );
}

export default function Home() {
  const config = useContext(ConfigContext);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(
    INITIAL_WINDOWS
  );
  const [positions, setPositions] = useState<Record<AppId, WindowPosition>>(
    buildInitialPositions
  );
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [, setNextZIndex] = useState(5);
  const [terminalInput, setTerminalInput] = useState('');
  const [startOpen, setStartOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(
    PROJECT_SHOWCASES[0].id
  );
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
    if (!dragState) {
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
      const windowElement = canvas.querySelector(
        `[data-window-id="${dragState.appId}"]`
      ) as HTMLElement | null;
      const windowRect = windowElement
        ? windowElement.getBoundingClientRect()
        : null;
      const maxLeft = Math.max(
        0,
        canvasRect.width -
          (windowRect
            ? windowRect.width
            : WINDOW_LAYOUTS[dragState.appId].width)
      );
      const maxTop = Math.max(
        0,
        canvasRect.height - (windowRect ? windowRect.height : 180)
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
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

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
  const selectedProject =
    PROJECT_SHOWCASES.find((project) => project.id === selectedProjectId) ??
    PROJECT_SHOWCASES[0];

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
        'Commands: HELP, DIR, WHOAMI, OPEN <APP>, CLOSE <APP>, RESUME, CONTACT, CLEAR'
      );
    } else if (normalized === 'dir' || normalized === 'apps') {
      nextHistory.push(
        'ABOUT.TXT  CEDAR.EXE  RESUME.EXE  PROJECTS.EXE  SKILLS.SYS  CONTACT.CFG  PROMPT.COM'
      );
    } else if (normalized === 'whoami') {
      nextHistory.push(
        'Cole Foos | software engineer | web, cloud, product engineering'
      );
    } else if (normalized === 'resume') {
      openWindow('work');
      nextHistory.push('Launching RESUME.EXE...');
    } else if (normalized === 'contact') {
      openWindow('contact');
      nextHistory.push(`Opening CONTACT.CFG... email: ${config.email}`);
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
        <div className="hero-grid">
          <div>
            <p className="prompt-line">C:\&gt; whoami</p>
            <h1>Cole Foos</h1>
            <p className="hero-subtitle">
              Software engineer building cloud systems, authorization tooling,
              and product infrastructure across AWS-backed platforms.
            </p>
            <div className="ascii-panel">
              <p className="prompt-line">C:\&gt; type profile.txt</p>
              <p>
                Based in Arlington, currently building at {currentRole.company},
                with experience across AWS, Rust, React, TypeScript, Python, and
                event-driven systems. I like software that feels sharp, useful,
                and durable.
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
              <button
                className="win-button primary"
                onClick={() => openWindow('work')}
              >
                Resume.exe
              </button>
              <ExternalLink className="win-button" href={config.github}>
                Github.sys
              </ExternalLink>
              <ExternalLink className="win-button" href={config.linkedin}>
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

    if (appId === 'work') {
      return (
        <div className="resume-window">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; open resume.exe</p>
            <p>
              Career history, education, and download link loaded successfully.
            </p>
          </div>
          <div className="resume-summary-grid">
            <div className="mini-panel">
              <p className="skills-status-label">Current Role</p>
              <strong className="skills-status-value">
                {currentRole.title}
              </strong>
            </div>
            <div className="mini-panel">
              <p className="skills-status-label">Current Company</p>
              <strong className="skills-status-value">
                {currentRole.company}
              </strong>
            </div>
          </div>
          <div className="hero-actions">
            <ExternalLink className="win-button primary" href={config.resume}>
              Download Resume
            </ExternalLink>
            <button
              className="win-button"
              onClick={() => openWindow('contact')}
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
                {config.jobs.map((job, index) => (
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
                {config.education.map((item) => (
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

    if (appId === 'projects') {
      return (
        <div className="project-explorer">
          <div className="section-copy">
            <p className="prompt-line">C:\&gt; scan /projects</p>
            <p>
              Executable builds, case studies, and live experiments indexed
              below.
            </p>
          </div>
          <div className="project-explorer-grid">
            <div className="project-directory">
              {PROJECT_SHOWCASES.map((project) => (
                <button
                  key={project.id}
                  className={`project-entry${
                    selectedProject.id === project.id ? ' active' : ''
                  }`}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <span className="project-entry-icon">
                    {project.kind === 'embedded'
                      ? 'APP'
                      : project.kind === 'external'
                      ? 'URL'
                      : 'DOC'}
                  </span>
                  <span className="project-entry-copy">
                    <strong>{project.title}</strong>
                    <small>{project.typeLabel}</small>
                  </span>
                </button>
              ))}
            </div>

            <article className="project-detail-card">
              <div className="card-topline">
                <p className="eyebrow">{selectedProject.typeLabel}</p>
                <span className="project-kind-pill">
                  {selectedProject.kind}
                </span>
              </div>
              <h3>{selectedProject.title}</h3>
              <p className="supporting-text">{selectedProject.summary}</p>

              <ul className="detail-list compact">
                {selectedProject.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              <div className="project-stack-list">
                {selectedProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="hero-actions">
                {selectedProject.launchAppId ? (
                  <button
                    className="win-button primary"
                    onClick={() => openWindow(selectedProject.launchAppId!)}
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
                      ? 'Visit'
                      : 'Read More'}
                  </ExternalLink>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      );
    }

    if (appId === 'skills') {
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
                {config.skills.length}
              </strong>
            </div>
            <div className="mini-panel">
              <p className="skills-status-label">Primary Mode</p>
              <strong className="skills-status-value">Web / Cloud</strong>
            </div>
          </div>
          <div className="skill-cloud">
            {config.skills.map((skill) => (
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

    if (appId === 'contact') {
      return (
        <div className="contact-card">
          <p className="prompt-line">C:\&gt; ping cole@foos.dev</p>
          <p className="supporting-text">
            Open to product engineering roles, interesting builds, and technical
            conversations.
          </p>
          <div className="contact-links">
            <a href={`mailto:${config.email}`}>{config.email}</a>
            <ExternalLink href={config.linkedin}>LinkedIn profile</ExternalLink>
            <ExternalLink href={config.github}>GitHub profile</ExternalLink>
          </div>
        </div>
      );
    }

    if (appId === 'cedar') {
      return <CedarLab />;
    }

    return (
      <div className="terminal-window">
        <div className="terminal-screen">
          {terminalHistory.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
        <form className="terminal-form" onSubmit={handleTerminalSubmit}>
          <label htmlFor="terminal-input">C:\&gt;</label>
          <input
            id="terminal-input"
            autoComplete="off"
            spellCheck={false}
            value={terminalInput}
            onChange={(event) => setTerminalInput(event.target.value)}
          />
        </form>
      </div>
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
                  width: `min(${layout.width}px, calc(100% - 24px))`,
                  zIndex: windows[app.id].zIndex,
                }}
                onFocus={() => focusWindow(app.id)}
                onDragStart={(event) => startDraggingWindow(app.id, event)}
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
        <div className="taskbar-clock">{clockValue}</div>
      </footer>
    </main>
  );
}
