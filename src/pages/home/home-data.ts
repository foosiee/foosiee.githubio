export type AppId =
  | 'about'
  | 'cedar'
  | 'work'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'terminal';

export interface AppDefinition {
  id: AppId;
  icon: string;
  label: string;
  title: string;
  command: string;
}

export interface WindowState {
  open: boolean;
  minimized: boolean;
  zIndex: number;
}

export interface WindowLayout {
  top: number;
  left: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
}

export interface WindowPosition {
  top: number;
  left: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface BootStep {
  delay: number;
  line: string;
}

export const APP_DEFINITIONS: AppDefinition[] = [
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
    label: 'Cedar',
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

export const WINDOW_LAYOUTS: Record<AppId, WindowLayout> = {
  about: {
    top: 36,
    left: 180,
    width: 540,
    height: 560,
    minWidth: 420,
    minHeight: 320,
  },
  cedar: {
    top: 54,
    left: 260,
    width: 860,
    height: 760,
    minWidth: 620,
    minHeight: 460,
  },
  work: {
    top: 88,
    left: 260,
    width: 760,
    height: 700,
    minWidth: 560,
    minHeight: 420,
  },
  projects: {
    top: 160,
    left: 190,
    width: 860,
    height: 720,
    minWidth: 620,
    minHeight: 460,
  },
  skills: {
    top: 92,
    left: 930,
    width: 420,
    height: 420,
    minWidth: 320,
    minHeight: 280,
  },
  contact: {
    top: 378,
    left: 930,
    width: 320,
    height: 260,
    minWidth: 280,
    minHeight: 220,
  },
  terminal: {
    top: 430,
    left: 120,
    width: 560,
    height: 320,
    minWidth: 420,
    minHeight: 240,
  },
};

export const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: { open: true, minimized: false, zIndex: 4 },
  cedar: { open: false, minimized: false, zIndex: 1 },
  work: { open: false, minimized: false, zIndex: 1 },
  projects: { open: false, minimized: false, zIndex: 1 },
  skills: { open: true, minimized: false, zIndex: 2 },
  contact: { open: false, minimized: false, zIndex: 1 },
  terminal: { open: true, minimized: false, zIndex: 3 },
};

export const EXTRA_HIGHLIGHTS = [
  'Strong bias for reliable systems, clear UX, and maintainable product code.',
  'Recent work spans authorization systems, Rust services, and large-scale AWS product engineering.',
  'Best work happens where product sense and engineering rigor overlap.',
];

export const CURRENTLY_EXPLORING = [
  'Building richer portfolio interactions that feel like software, not a brochure.',
  'Tighter product polish on internal tools and customer-facing web apps.',
  'Ways to make engineering-heavy UIs feel fast and understandable.',
];

export const BOOT_SEQUENCE: BootStep[] = [
  { delay: 220, line: 'COLE BIOS v9.5' },
  { delay: 420, line: '640K SYSTEM MEMORY ........ OK' },
  { delay: 620, line: 'DETECTING AUTHORIZATION MODULES ........ OK' },
  { delay: 860, line: 'LOADING AWS PROFILE ........ OK' },
  { delay: 1100, line: 'INITIALIZING CEDAR TOOLING ........ OK' },
  { delay: 1380, line: 'STARTING COLEOS 95 SHELL ........ OK' },
];
