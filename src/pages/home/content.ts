/**
 * Editorial content for the home page. Contact links come from config.json
 * (single source of truth); the curated copy, featured selection, and
 * experience framing live here.
 */
import config from '../../config.json';

export const PROFILE = {
  name: 'Cole Foos',
  role: 'Software Development Engineer III',
  company: 'AWS — Verified Permissions',
  location: 'Arlington, VA',
  tagline:
    'I build authorization systems — and I make them runnable, not just describable.',
  bio:
    'Software engineer working on Amazon Verified Permissions. I like systems where product sense and engineering rigor overlap, and I tend to prove the work by making it run in front of you.',
  about: [
    'I work on Amazon Verified Permissions — the authorization service and the Cedar policy language behind it. Most of my work lives where a hard systems problem meets a product someone actually has to use.',
    'I would rather show you something running than describe it. Open the Cedar Language Server in the work below — it’s the same engine that ships in the AWS console, compiled to WASM and running in your browser. That bias, prove it, don’t pitch it, is most of how I work.',
  ],
  focus:
    'Cedar language tooling, access-query systems, and making authorization legible.',
  links: {
    github: config.github,
    linkedin: config.linkedin,
    email: config.email,
    resume: config.resume,
  },
};

export type FeaturedKind = 'live' | 'external' | 'case';

export interface ProjectWriteup {
  problem: string;
  approach: string[];
  deliverables: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  kind: FeaturedKind;
  blurb: string;
  tags: string[];
  href?: string;
  era: string;
  writeup?: ProjectWriteup;
}

export const FEATURED: FeaturedProject[] = [
  {
    id: 'cedar-lsp',
    title: 'Cedar Language Server',
    kind: 'live',
    blurb:
      'Authored the Cedar language server (completions, diagnostics, validation) and packaged it to WASM. Powers the AWS AVP console — and runs live, right here.',
    tags: ['Rust', 'WASM', 'Monaco', 'Cedar'],
    era: '2024',
    writeup: {
      problem:
        'Language tooling is hard to show through a repo link. I wanted the editor experience and the Cedar runtime to be demonstrable as working software — not described.',
      approach: [
        'I authored the Cedar language server — completions, hover, diagnostics, validation — then compiled it to WASM and wired it to Monaco so the whole thing runs in a browser.',
        'The same server powers editor functionality in the AWS Verified Permissions console; this site just runs it client-side so anyone can try it.',
      ],
      deliverables: [
        'Primary author of the Cedar language server (Rust).',
        'Browser packaging via WASM + Monaco editor integration.',
        'Powers editor features in the AWS AVP console and on this page.',
      ],
    },
  },
  {
    id: 'avp-access-queries',
    title: 'AVP Access Queries',
    kind: 'case',
    blurb:
      'Turned Cedar partial-evaluation residuals into indexed lookups so apps can ask "what can Alice see?", not just "can Alice see X?". Three internal services depend on it.',
    tags: ['Cedar', 'DynamoDB', 'Valkey', 'Lambda'],
    era: '2024',
    writeup: {
      problem:
        'Apps needed to ask "what can Alice see?" across a whole dataset, not just "can Alice see X?" — much harder than a point check in a policy-driven (not relationship-driven) system.',
      approach: [
        'I treated the resource as unknown and partially evaluated the relevant Cedar policies into residual policies.',
        'From the residuals I extracted constraints — public visibility, ownership — and turned them into indexed queries, instead of scanning every entity and re-running full authorization on each.',
      ],
      deliverables: [
        'Reusable internal API turning Cedar policy logic into renderable resource lists.',
        'Storage + query path from partial-evaluation residuals to indexed lookups.',
        'In production for three internal AWS applications.',
      ],
    },
  },
  {
    id: 'ava-endpoint-authorization',
    title: 'Endpoint Authorization Platform',
    kind: 'case',
    blurb:
      'Owned client-side authorization + OAuth session transport for a Verified Access extension carrying identity over protocols (like DNS) that never had it. Cross-team systems work across Route53, Identity, and client engineering.',
    tags: ['Rust', 'OAuth', 'Zero Trust', 'DNS'],
    era: '2023',
    writeup: {
      problem:
        "Protocols like DNS don't carry user identity the way browser OAuth flows do — yet authorization decisions had to be made centrally in AWS, not on the client machine.",
      approach: [
        'I owned client-side services that make the authorization decisions, and contributed to the OAuth server converting JWTs into sessions usable over the wire.',
        'It was a hard cross-team systems problem spanning Route53, AVA, client engineering, and Identity.',
      ],
      deliverables: [
        'Client-side authorization services (Rust).',
        'OAuth session-transport for over-the-wire identity.',
        'Cross-team design across Route53, Identity, and client engineering.',
      ],
    },
  },
  {
    id: 'everest-platform',
    title: 'Everest Campaign Orchestration',
    kind: 'case',
    blurb:
      'Core contributor to an internal Amazon platform modeling marketing campaigns as workflow graphs — send, wait, branch, react — at Amazon scale. The base several later features built on.',
    tags: ['Java', 'Angular', 'Workflow Systems'],
    era: '2022',
    writeup: {
      problem:
        "Automated marketing campaigns aren't one-step sends. They need a reusable workflow system that can branch, wait, react to state, and coordinate actions across channels.",
      approach: [
        'I was a core contributor to a platform that modeled campaigns as graphs of actions — send, wait, branch, follow-up — running at Amazon scale.',
        'Several later features I worked on (Lifecycle Promotions, Nudging, ML branching) were built directly on this workflow model.',
      ],
      deliverables: [
        'Workflow-graph platform used for campaigns at Amazon scale.',
        'The foundation multiple later campaign features were built on.',
        'Java / Angular / AWS across multiple releases.',
      ],
    },
  },
  {
    id: 'spotify-lyrics',
    title: 'spotify-lyrics',
    kind: 'external',
    blurb:
      'A web player that pulls live lyrics for whatever is playing in Spotify. A small, focused consumer product with a tight feedback loop.',
    tags: ['Web', 'Spotify API', 'Frontend'],
    href: 'https://www.spotify-lyrics.com/',
    era: '2021',
    writeup: {
      problem:
        'Spotify playback and lyrics live in separate places. The goal was to connect them with as little friction as possible.',
      approach: [
        'A lightweight consumer web player that pulls live lyrics for whatever track is currently playing.',
      ],
      deliverables: [
        'A live, public web app with a tight playback → lyrics feedback loop.',
        'A small, focused consumer product rather than an API demo.',
      ],
    },
  },
];

export interface ExperienceEntry {
  id: string;
  org: string;
  title: string;
  span: string;
  /** One-line role descriptor, shown collapsed in the index row. */
  summary: string;
  /** Resume-like prose: what the role was and what I drove. */
  commentary: string[];
  /** Optional crisp artifacts; omit for entries (e.g. education) that don't need them. */
  deliverables?: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'aws',
    org: 'Amazon Web Services',
    title: 'SDE III · SDE II',
    span: 'Nov 2023 — Present',
    summary:
      'Authorization platform and zero-trust identity — Cedar, Rust, and the systems behind Verified Permissions.',
    commentary: [
      'Authorization is the through-line here. I build features for Amazon Verified Permissions and the Cedar policy language that powers it — the service AWS customers use to pull authorization logic out of their application code and reason about it on its own terms.',
      'My largest effort has been a managed authn/authz service for a new zero-trust identity system, designed and built in Rust from the ground up. It spans several teams, so beyond the code I own the design breakdowns and drive the implementation across the teams that depend on it — and I sweat the parts that show, like caching tuned to single-digit-millisecond latency.',
    ],
    deliverables: [
      'Building new features for Amazon Verified Permissions.',
      'Designed and built a Rust managed authn/authz service for a new zero-trust identity system.',
      'Vendored internal Rust libraries for other AWS service teams integrating with the service.',
      'Engineered caching that delivered single-digit-millisecond response times.',
      'Wrote design breakdowns and drove implementation across multiple teams.',
    ],
  },
  {
    id: 'amazon',
    org: 'Amazon',
    title: 'SDE II · SDE I',
    span: 'May 2021 — Nov 2023',
    summary: 'Lifecycle marketing tooling at consumer scale.',
    commentary: [
      'I worked on a drag-and-drop lifecycle-marketing platform serving millions of customers a day — the kind of system where a small correctness bug or a slow query shows up immediately, at scale.',
      'The work ran the full stack of that problem: customer-facing features, a cross-team ML capability that automatically picks the best experience for each customer, large storage and query optimizations across S3, Athena, and Glue, and the safety automation that halts campaigns the moment they misbehave.',
    ],
    deliverables: [
      'Built features for a drag-and-drop lifecycle marketing tool serving millions of users per day.',
      'Developed a cross-team ML feature that automatically selects the best customer experience.',
      'Cut S3, Athena, and Glue utilization via storage reductions, query optimization, and partitioning.',
      'Built automation to halt under-performing or malfunctioning campaigns.',
      'Built a notification system (hundreds of weekly alerts) and a high-capacity processor for millions of events.',
    ],
  },
  {
    id: 'onpoint',
    org: 'Onpoint Group',
    title: 'Software Developer',
    span: 'Feb 2019 — Feb 2021',
    summary: 'Internal apps, automation, and cloud integrations.',
    commentary: [
      'My first engineering role — internal applications, automation, and cloud integrations, often as the person who took a manual process and made it run itself.',
      'The work that stuck with me was an invoice-automation pipeline built on Amazon Textract and Rekognition and wired into Salesforce, processing hundreds of invoices a day, plus performance work on Azure Cosmos DB that cut load times tenfold.',
    ],
    deliverables: [
      'Invoice automation on Amazon Textract + Rekognition and Salesforce, processing hundreds of invoices/day.',
      'Web-accessible Power BI dashboards for internal and external use.',
      'Tuned Azure Cosmos DB request efficiency for a 10× reduction in load times.',
      'Built a CI/CD pipeline with GitHub Actions and integrated third-party CRMs.',
    ],
  },
  {
    id: 'toledo',
    org: 'University of Toledo',
    title: 'B.S. Computer Science',
    span: '2016 — 2020',
    summary: 'Bachelor of Computer Science, Cum Laude.',
    commentary: [
      'B.S. in Computer Science, graduated Cum Laude. The foundation: algorithms, systems, and the habit of digging until I actually understand how something works.',
    ],
  },
];

export const SKILLS = [
  'Rust',
  'TypeScript',
  'React',
  'Python',
  'Java',
  'AWS',
  'Cedar',
  'WASM',
];
