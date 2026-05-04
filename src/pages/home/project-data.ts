import { AppId } from './home-data';

export type ProjectKind = 'embedded' | 'external' | 'case-study';

export interface ProjectShowcase {
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

export interface ExplorerEntry {
  id: string;
  title: string;
  path: string;
  badge: string;
  summary: string;
  details: string[];
  stack: string[];
  source: 'work' | 'demo' | 'tooling';
  href?: string;
  launchAppId?: AppId;
}

export interface ExplorerFolder {
  id: string;
  title: string;
  path: string;
  description: string;
  entries: ExplorerEntry[];
}

export type ProjectPanelTab = 'overview' | 'files' | 'notes';

export const PROJECT_SHOWCASES: ProjectShowcase[] = [
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildProjectExplorerFolders(): ExplorerFolder[] {
  const demoById = new Map(
    PROJECT_SHOWCASES.map((project) => [project.id, project])
  );

  return [
    {
      id: 'work-tooling',
      title: 'AWS Tooling',
      path: 'C:\\LAB\\AWS',
      description: 'Cedar tooling and other work-adjacent demos.',
      entries: [
        {
          id: 'project-cedar-lsp',
          title: 'Cedar Language Server',
          path: 'C:\\LAB\\AWS\\CEDAR\\CEDAR_LSP.EXE',
          badge: 'APP',
          summary:
            'Primary-author Cedar tooling shown as a live in-site application.',
          details: demoById.get('cedar-lsp')?.details ?? [],
          stack: demoById.get('cedar-lsp')?.stack ?? [],
          source: 'tooling',
          launchAppId: 'cedar',
        },
      ],
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      path: 'C:\\LAB\\CASEFILES',
      description: 'Work framed by outcome and system design.',
      entries: ['document-processor', 'super-marka-metrics'].map((id) => {
        const project = demoById.get(id)!;

        return {
          id: `project-${project.id}`,
          title: project.title,
          path: `C:\\LAB\\CASEFILES\\${slugify(
            project.title
          ).toUpperCase()}.DOC`,
          badge: 'DOC',
          summary: project.summary,
          details: project.details,
          stack: project.stack,
          source: 'demo' as const,
          href: project.href,
        };
      }),
    },
    {
      id: 'personal-demos',
      title: 'Personal Demos',
      path: 'C:\\DEMOS\\PERSONAL',
      description: 'Interactive projects and smaller product experiments.',
      entries: ['spotify-lyrics', 'v-net-lab'].map((id) => {
        const project = demoById.get(id)!;

        return {
          id: `project-${project.id}`,
          title: project.title,
          path: `C:\\DEMOS\\PERSONAL\\${slugify(
            project.title
          ).toUpperCase()}.EXE`,
          badge: 'DEMO',
          summary: project.summary,
          details: project.details,
          stack: project.stack,
          source: 'demo' as const,
          href: project.href,
        };
      }),
    },
    {
      id: 'open-source',
      title: 'Open Source / Hardware',
      path: 'C:\\DEMOS\\OSS',
      description: 'Public repos and system-level experiments.',
      entries: ['zero-touch-sani-system'].map((id) => {
        const project = demoById.get(id)!;

        return {
          id: `project-${project.id}`,
          title: project.title,
          path: `C:\\DEMOS\\OSS\\${slugify(project.title).toUpperCase()}.GIT`,
          badge: 'OSS',
          summary: project.summary,
          details: project.details,
          stack: project.stack,
          source: 'demo' as const,
          href: project.href,
        };
      }),
    },
  ];
}

export function formatExplorerTree(folders: ExplorerFolder[]) {
  return folders.flatMap((folder) => [
    folder.path,
    ...folder.entries.map((entry) => `  ${entry.badge} ${entry.path}`),
  ]);
}
