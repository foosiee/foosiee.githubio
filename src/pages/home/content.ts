/**
 * Editorial content for the home page. Contact links come from config.json
 * (single source of truth); the curated copy, featured selection, and
 * experience framing live here. See /DESIGN.md — "The Instrument Folio".
 */
import config from '../../config.json';

export const PROFILE = {
  name: 'Cole Foos',
  role: 'SDE III · AWS',
  company: 'AWS — Verified Permissions',
  location: 'Arlington, VA',
  tagline:
    'I build the large-scale distributed systems behind identity and authorization at AWS.',
  about: [
    'Five-plus years building large-scale, high-throughput distributed systems. These days that means production Rust authorization services — single-digit-millisecond latency, deep platform integrations — and leading cross-team design while staying hands-on across the stack.',
  ],
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
  approach: string;
  deliverables: string[];
  /** optional honest reflection shown after the deliverables */
  note?: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  kind: FeaturedKind;
  blurb: string;
  tags: string[];
  href?: string;
  /** link label for href; defaults to "Visit ↗" */
  hrefLabel?: string;
  era: string;
  writeup: ProjectWriteup;
}

export const WORK: FeaturedProject[] = [
  {
    id: 'cedar-lsp',
    title: 'Cedar Language Server',
    kind: 'live',
    blurb:
      'Authored the Cedar language server and packaged it to WASM. Powers the AWS AVP console — and runs live, right here.',
    tags: ['Rust', 'WASM', 'Monaco', 'Cedar'],
    era: '2025',
    href:
      'https://github.com/cedar-policy/cedar/tree/fdd3e50cd7efb915bf8f6c351e731ae4a1aca6a5/cedar-language-server',
    hrefLabel: 'view source ↗',
    writeup: {
      problem:
        'Language tooling is hard to show through a repo link. I wanted the editor experience and the Cedar runtime to be something people could actually try, not just read about.',
      approach:
        'Built the language server itself — completions, hover, diagnostics, validation — then compiled it to WASM and wired it to Monaco so the whole thing runs in a browser tab. The authorization engine evaluates live; the editor is the same one in the console.',
      deliverables: [
        'Cedar language server: completions, hover, diagnostics, validation',
        'WASM + Monaco browser integration',
        'Ships in the AWS Verified Permissions console',
      ],
    },
  },
  {
    id: 'avp-access-queries',
    title: 'AVP Access Queries',
    kind: 'case',
    blurb:
      'Turned Cedar partial-evaluation residuals into indexed lookups so apps can ask "what can Alice see?", not just "can Alice see X?".',
    tags: ['Cedar', 'DynamoDB', 'Valkey', 'Lambda'],
    era: '2025–2026',
    writeup: {
      problem:
        'Point authorization answers "can Alice view document X?". Several internal apps needed the inverse — "what documents can Alice view?" — across an entire dataset, which a per-entity check can’t answer at scale.',
      approach:
        'Treated the resource as unknown and partially evaluated the relevant Cedar policies into residuals, then extracted constraints (public visibility, ownership) into indexed queries instead of scanning every entity and re-running full authorization.',
      deliverables: [
        'Storage + query path over Cedar residuals',
        'Principal/resource ingestion APIs for service teams',
        'Backs three internal AWS services',
      ],
    },
  },
  {
    id: 'everest-ml-branching',
    title: 'ML-Driven Marketing Campaigns',
    kind: 'case',
    blurb:
      'An ML-backed Everest workflow node that automatically chose the best-performing branch inside a live marketing campaign — applied-science inference wired into a marketer-facing orchestration graph.',
    tags: ['ML Integration', 'Java', 'Angular', 'Workflow Systems'],
    era: '2023',
    writeup: {
      problem:
        'A model is only useful if it can participate cleanly in a production workflow. The challenge was connecting applied-science output to a marketer-facing orchestration product instead of leaving it a science-side experiment.',
      approach:
        'I partnered with an applied scientist who owned the model while I owned the production path into Everest — fitting model inference and its results cleanly into the existing graph-based campaign product, so marketers got an adaptive branching node instead of hand-tuning every branch.',
      deliverables: [
        'Production integration between Everest and an applied-science model',
        'Adaptive ML branching node in the marketer-facing workflow graph',
        'Model inference and result feedback wired into live campaign execution',
      ],
    },
  },
  {
    id: 'lifecycle-promotions',
    title: 'Lifecycle Promotions',
    kind: 'case',
    blurb:
      'An event-driven Everest feature that let a promotion require several customer actions before a journey advanced — which meant reshaping the campaign model from a tree into a DAG.',
    tags: ['Java', 'Angular', 'Event Processing', 'Graph Modeling'],
    era: '2022',
    writeup: {
      problem:
        'Promotions could previously depend on only one event. Supporting many prerequisite events changed both the data model and the shape of the workflow: Everest’s frontend model was a tree, but this needed a DAG.',
      approach:
        'I owned the frontend integration that translated Everest’s graph model into sane API inputs, plus the state tracking that let customers see which prerequisite events were complete — while a separate team handled promotion-credit issuance.',
      deliverables: [
        'Multi-event promotion journeys, up from single-event rules',
        'Tree-to-DAG workflow-model integration on the Everest frontend',
        'Event-state visibility so marketers could see where customers stalled',
      ],
    },
  },
  {
    id: 'document-processor',
    title: 'Automated Document Processor',
    kind: 'case',
    blurb:
      'An event-driven, serverless invoice-processing pipeline that pulled people out of repetitive billing work — one of my first real tastes of shipping measurable business impact.',
    tags: ['AWS', 'Serverless', 'OCR', 'Event-Driven'],
    era: '2019',
    writeup: {
      problem:
        'People were spending real time manually extracting and routing invoice information that OCR-backed automation could handle instead.',
      approach:
        'I built an event-driven, serverless pipeline on AWS Textract and Rekognition to read, extract, and route invoice data, moving humans out of the repetitive billing steps and into exception handling.',
      deliverables: [
        'OCR extraction pipeline on Textract and Rekognition',
        'Event-driven, serverless billing workflow',
        'Measurable reduction in manual billing effort',
      ],
      note:
        'One of my first real experiences building something with direct business impact, early in my time at OnPoint.',
    },
  },
];

export interface ExperienceEntry {
  id: string;
  org: string;
  title: string;
  span: string;
  /** one-line, shown collapsed */
  summary: string;
  /** resume-style commentary with a point of view, shown expanded */
  commentary: string;
  highlights: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'exp-aws-sde3',
    org: 'Amazon Web Services',
    title: 'SDE III',
    span: '2025—now',
    summary: 'Amazon Verified Permissions — managed authorization.',
    commentary:
      'I’m on Amazon Verified Permissions, AWS’s managed authorization service. My work spans the Cedar policy language and the service itself — compliance and connectivity, identity integrations, and the query APIs that answer “who can access what?”',
    highlights: [
      'Delivered FIPS, PrivateLink, and IPv6 support — broadening compliance reach and secure connectivity for regulated customers',
      'Built integrations between AVP and AWS IAM Identity Center for a unified path to externalized authorization',
      'Leading design of internal authorization-query APIs (slated for external launch): “who has access to what?”, “what can a user reach?”',
      'Authored a Cedar language server — an open-source contribution improving the policy-authoring experience',
    ],
    tags: ['Rust', 'Cedar', 'AWS', 'Authorization'],
  },
  {
    id: 'exp-aws-sde2',
    org: 'Amazon Web Services',
    title: 'SDE II',
    span: '2023—2025',
    summary: 'Zero-trust endpoint authorization · AWS Verified Access.',
    commentary:
      'I built the authorization core — a Rust service in the request path — for extending AWS Verified Access’s zero-trust model to new kinds of endpoints, where latency and clean cross-team integration were everything. Not all of the program shipped, but a real slice launched as Verified Access’s support for non-HTTP(S) protocols, and it was some of the best systems work I’ve done.',
    highlights: [
      'Designed and built a Rust-based managed authn/authz service for the zero-trust access program behind Verified Access',
      'Engineered caching that achieved single-digit-millisecond response times at scale',
      'Vendored internal Rust libraries adopted by other AWS service teams, cutting duplicate work',
      'Drove cross-team design, breaking work into task plans that aligned multiple teams',
    ],
    tags: ['Rust', 'Zero-Trust', 'Caching', 'AWS'],
  },
  {
    id: 'exp-amazon-sde2',
    org: 'Amazon',
    title: 'SDE II',
    span: '2022—2023',
    summary: 'Everest — lifecycle marketing platform.',
    commentary:
      'I built features for Everest, the drag-and-drop platform marketers used to compose lifecycle journeys for millions of people a day, gravitating to the parts that made it smarter and safer.',
    highlights: [
      'Engineered features for Everest, a drag-and-drop lifecycle marketing platform personalizing experiences for millions of users/day',
      'Developed a cross-team ML feature that auto-selects the best-performing customer experience',
      'Cut S3, Athena, and Glue utilization via storage reductions, query optimization, and partitioning',
      'Built automation to halt under-performing or malfunctioning campaigns; mentored teammates and ran on-call',
    ],
    tags: ['Java', 'Angular', 'ML', 'AWS'],
  },
  {
    id: 'exp-amazon-sde1',
    org: 'Amazon',
    title: 'SDE I',
    span: '2021—2022',
    summary: 'Everest — lifecycle marketing platform · remote.',
    commentary:
      'My first full-time role, on Everest (the lifecycle marketing platform), focused on the event and notification plumbing that drove engagement at scale.',
    highlights: [
      'Designed a notification system delivering hundreds of weekly alerts on campaign progress, engagement, and issues',
      'Built a high-capacity event processor handling millions of events to engage users at key lifecycle milestones',
    ],
    tags: ['Java', 'AWS', 'Distributed Systems'],
  },
  {
    id: 'exp-onpoint',
    org: 'OnPoint Group',
    title: 'Software Developer Intern',
    span: '2019—2021',
    summary: 'Automation, cloud, and integrations.',
    commentary:
      'Where I started — a small team where I owned things end to end across automation, cloud, and integrations.',
    highlights: [
      'Built an invoice-automation system (Textract, Rekognition, Salesforce) processing hundreds of invoices/day; tuned Azure Cosmos DB for a 10× page-load reduction',
      'Delivered mobile-app backend services, a CI/CD pipeline in GitHub Actions, Power BI dashboards, and CRM integrations',
    ],
    tags: ['Azure', 'Textract', 'Salesforce', 'CI/CD'],
  },
  {
    id: 'exp-amazon-intern',
    org: 'Amazon',
    title: 'SDE Intern',
    span: '2020',
    summary: 'Marketing campaigns · remote.',
    commentary:
      'A summer on the marketing-campaigns team, building tooling for the people who ran them.',
    highlights: [
      'Designed and shipped a debugger tool letting marketers see a customer’s position within their campaigns',
    ],
    tags: ['Java', 'AWS'],
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
