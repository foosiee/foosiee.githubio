import { AppId } from './home-data';

export type ProjectKind = 'embedded' | 'external' | 'case-study';
export interface ProjectReference {
  label: string;
  href: string;
}
export type ProjectStoryBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'list';
      items: string[];
    }
  | {
      type: 'code';
      language: string;
      code: string;
      caption?: string;
    };

export interface ProjectShowcase {
  id: string;
  title: string;
  typeLabel: string;
  kind: ProjectKind;
  summary: string;
  role: string;
  context: string;
  problem: string;
  details: ProjectStoryBlock[];
  impact: string[];
  outcome: string;
  stack: string[];
  references?: ProjectReference[];
  href?: string;
  launchAppId?: AppId;
}

export interface ExplorerEntry {
  id: string;
  title: string;
  path: string;
  badge: string;
  summary: string;
  role: string;
  context: string;
  problem: string;
  details: ProjectStoryBlock[];
  impact: string[];
  outcome: string;
  stack: string[];
  references?: ProjectReference[];
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

function paragraph(text: string): ProjectStoryBlock {
  return { type: 'paragraph', text };
}

function list(items: string[]): ProjectStoryBlock {
  return { type: 'list', items };
}

function code(
  language: string,
  source: string,
  caption?: string
): ProjectStoryBlock {
  return { type: 'code', language, code: source, caption };
}

export const PROJECT_SHOWCASES: ProjectShowcase[] = [
  {
    id: 'cedar-lsp',
    title: 'Cedar Language Server',
    typeLabel: 'Embedded App',
    kind: 'embedded',
    summary:
      'Language tooling for Cedar, packaged into this site as a live browser editor with WASM and Monaco and used in the AWS AVP console.',
    role:
      'Primary author of the Cedar language server, plus the browser integration path used to run it in this site.',
    context:
      'This site shows the tooling in a browser, but the underlying work is the Cedar language server itself: completions, hover, diagnostics, validation, and browser packaging.',
    problem:
      'Language tooling is hard to show through a repo link alone. I wanted a way to demonstrate the editor experience and the underlying Cedar runtime as working software.',
    details: [
      paragraph(
        'The core work here is the language server itself, not just the UI wrapped around it.'
      ),
      paragraph(
        'I used WASM and Monaco to bring that tooling into the browser so the site can show completions, hover, diagnostics, policy validation, and authorization evaluation as a live editor experience.'
      ),
      paragraph(
        'That makes the project legible both as developer tooling and as a product surface someone can actually interact with.'
      ),
    ],
    impact: [
      'Turns a language-server project into something people can actually try instead of only read about.',
      'Powers editor functionality in the AWS AVP console as well as in this site.',
      'Shows Rust, WASM, editor integration, and Cedar runtime work in one surface.',
    ],
    outcome:
      'The result is a runnable browser editor that makes the Cedar language-server work visible as real tooling rather than a buried implementation detail.',
    stack: ['Rust', 'WASM', 'Monaco', 'TypeScript', 'Cedar'],
    launchAppId: 'cedar',
  },
  {
    id: 'avp-idc-integration',
    title: 'AVP Identity Center Integration',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Internal Amazon Verified Permissions integration that let first-party AWS apps use Identity Center identities without each team building its own AVP integration.',
    role:
      'Led the design and built the authorization side of the integration so internal AWS apps could use Identity Center identities with AVP through one shared path.',
    context:
      'Amazon Verified Permissions can evaluate policies, but apps still need to supply the user and group data those policies depend on.',
    problem:
      'Without a shared integration, every app had to call Identity Center itself, fetch user and group data, and pass that into AVP in its own way.',
    details: [
      paragraph(
        'Before this, internal apps had to make Identity Center calls themselves just to gather the data needed for an AVP authorization request.'
      ),
      paragraph(
        'This integration moved that work into AVP so app teams could integrate once instead of each team building its own version of the same flow.'
      ),
      paragraph(
        'One of the more interesting parts was that authorization usually does not need every group for a user, only the groups that matter for the policies being evaluated.'
      ),
    ],
    impact: [
      'Reduced repeated app-side integration work around IDC and AVP.',
      'Standardized the identity flow across at least three internal AWS app integrations.',
    ],
    outcome:
      'The result was a cleaner path for internal apps to use IDC identities with AVP without every team owning its own version of the same integration problem.',
    stack: ['Cedar', 'Identity Center', 'AWS', 'Authorization'],
  },
  {
    id: 'avp-access-queries',
    title: 'AVP Access Queries',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Internal API for answering list-style authorization questions in a Cedar-based system, such as which resources a user can access.',
    role:
      'Owned APIs for service teams to store principals and resources in AVP, plus the storage and query path used to turn Cedar partial-evaluation results into indexed lookups.',
    context:
      'Several internal AWS apps needed to show users only the resources they were allowed to access, but Cedar authorization is policy-driven rather than relationship-driven like Zanzibar.',
    problem:
      'This is harder than a normal point authorization check. Instead of asking whether Alice can view one known document, apps needed to ask what documents Alice can view across an entire dataset.',
    details: [
      paragraph(
        'A good mental model comes from Cedar partial evaluation: point auth answers "can Alice view document X?" while access queries answer "what documents can Alice view?"'
      ),
      code(
        'cedar',
        `permit (
  principal,
  action,
  resource
) when {
  resource.isPublic
};

permit (
  principal,
  action,
  resource
) when {
  resource.owner == User::"Alice"
};`,
        'Residual policies after partial evaluation for a request from Alice.'
      ),
      paragraph(
        'We treated the resource as unknown and partially evaluated the relevant Cedar policies into residual policies like these.'
      ),
      paragraph(
        'From there, we extracted constraints like public visibility or ownership and turned them into indexed queries instead of scanning every entity and re-running full authorization on each one.'
      ),
    ],
    impact: [
      'Enabled internal app teams to show only resources users can access without each team building its own Cedar-specific access-query system.',
      'Currently supports three internal AWS applications.',
    ],
    outcome:
      'The end result was a reusable internal API that turned Cedar policy logic into resource lists apps could actually render, instead of every team inventing its own access-query system.',
    stack: ['Valkey', 'DynamoDB', 'EC2', 'SQS', 'Lambda', 'Cedar'],
    references: [
      {
        label: 'Total Policy Evaluation blog post',
        href: 'https://cedarpolicy.com/blog/tpe',
      },
    ],
  },
  {
    id: 'avp-ipv6-fips',
    title: 'AVP IPv6 and FIPS PrivateLink',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Combined networking and compliance delivery that brought Amazon Verified Permissions to IPv6 parity and added FIPS PrivateLink support.',
    role:
      'Rolled out IPv6 endpoints in GovCloud and owned FIPS PrivateLink end to end.',
    context:
      'AVP needed to keep pace with broader AWS expectations around network support and compliant private connectivity.',
    problem:
      'This was not just an endpoint toggle. The work required new infrastructure rollout and had to satisfy networking and compliance constraints at the same time.',
    details: [
      paragraph(
        'Part of a broader AWS initiative to bring services to IPv6 parity.'
      ),
      list([
        'The hard parts were new infrastructure rollout and compliance constraints rather than a simple endpoint toggle.',
        'This work expanded the ways customers and internal consumers could connect to AVP in regulated and private-network contexts.',
      ]),
    ],
    impact: [
      'Brought AVP closer to full AWS parity for IPv6 support.',
      'Delivered compliant private connectivity support through FIPS PrivateLink.',
    ],
    outcome:
      'The delivery expanded how AVP could be consumed in regulated and private-network environments while bringing the service closer to AWS parity.',
    stack: ['IPv6', 'PrivateLink', 'GovCloud', 'AWS Networking', 'Compliance'],
  },
  {
    id: 'ava-endpoint-authorization',
    title: 'Managed Endpoint Authorization Platform',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Large multi-team initiative to extend Amazon Verified Access-style policy control beyond app-layer access toward DNS and general endpoint authorization.',
    role:
      'Owned client-side services used to make authorization decisions and contributed to the OAuth server that converted JWTs into sessions usable over the wire.',
    context:
      'This was a large extension to Amazon Verified Access intended to bring Cedar-controlled policy decisions to endpoints beyond applications an organization directly owns.',
    problem:
      'Protocols like DNS do not naturally carry user identity in the way browser-centric OAuth flows do, yet the design required authorization decisions to be made centrally in AWS rather than on the client machine.',
    details: [
      paragraph(
        'The project aimed to bring Cedar-controlled policy flexibility to endpoint access cases such as blocking access to external destinations, not just applications an organization owns.'
      ),
      list([
        'A core technical challenge was that protocols like DNS do not naturally carry user identity in the way browser-based OAuth flows do.',
        'The system used over-the-wire identity/session transport so authorization decisions could be made centrally in AWS rather than on the client machine.',
      ]),
    ],
    impact: [
      'Established the authn/authz direction for a large extension to Amazon Verified Access.',
      'Coordinated across Route53, AVA, client engineering, and Identity on a hard cross-team systems problem.',
    ],
    outcome:
      'Although the broader initiative was eventually canceled, the work is still one of the clearest examples of cross-team systems design, identity transport, and authz engineering in my background.',
    stack: ['Rust', 'OAuth', 'Cedar', 'DNS', 'Identity', 'Zero Trust'],
  },
  {
    id: 'spotify-lyrics',
    title: 'spotify-lyrics',
    typeLabel: 'External App',
    kind: 'external',
    summary:
      'Web player experience that pulls lyrics for the track currently playing in Spotify.',
    role:
      'Built a lightweight consumer-facing integration around Spotify playback context.',
    context:
      'This was a narrower public web build aimed at making listening context immediately more useful.',
    problem:
      'Spotify playback and lyrics are separate pieces of information, so the product challenge was to connect them with as little friction as possible.',
    details: [
      paragraph(
        'Focused on a lightweight consumer-facing interface around music playback context.'
      ),
      list([
        'Useful example of building a narrow tool with immediate feedback and a clear UX loop.',
      ]),
    ],
    impact: [
      'Turns playback context into an immediate, useful user-facing feature.',
    ],
    outcome:
      'The finished app works as a small, focused web product rather than just an API demo.',
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
    role:
      'Built a consumer budgeting experience around visualization and prediction.',
    context:
      'This project started from a straightforward budgeting problem but became more useful once forecasting and visualization were part of the product.',
    problem:
      'Most spending tools stop at recording history. I wanted something that helped users anticipate future grocery costs as well.',
    details: [
      paragraph(
        'Helped users inspect spending habits instead of just tracking totals.'
      ),
      list([
        'Added prediction-focused thinking rather than stopping at dashboard reporting.',
      ]),
    ],
    impact: [
      'Made spending habits easier to understand and forecast rather than just record.',
    ],
    outcome:
      'The result framed budgeting as a prediction and planning problem rather than just a reporting problem.',
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
    role:
      'Built an application-style visualization tool for designing and configuring network layouts.',
    context:
      'This was an attempt to make network design feel more like using a dedicated application than filling out a static form.',
    problem:
      'Network layout work is spatial and interactive, so a document-style interface would not have fit the task well.',
    details: [
      paragraph(
        'Focused on interactive graph-style editing and system visualization.'
      ),
      list([
        'Good example of building software that behaves more like an application than a page.',
      ]),
    ],
    impact: [
      'Demonstrates desktop-style interaction patterns in a domain-specific tool.',
    ],
    outcome:
      'The project became a strong example of application-style interaction design in a technical domain.',
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
    role: 'Built the invoice-processing workflow and OCR pipeline.',
    context:
      'Invoice processing was repetitive manual work that fit well into an event-driven automation flow.',
    problem:
      'Humans were spending time extracting and routing invoice information that could be handled by OCR-backed automation instead.',
    details: [
      paragraph(
        'OCR extraction pipeline designed to move humans out of repetitive billing steps.'
      ),
      list([
        'Highlights backend workflow ownership, system design, and measurable operational impact.',
      ]),
    ],
    impact: [
      'Reduced human interaction with billing workflows through automated extraction and processing.',
    ],
    outcome:
      'The system turned a manual billing step into an automated serverless workflow with clear operational value.',
    stack: ['AWS', 'Serverless', 'OCR', 'Event-driven Systems'],
  },
  {
    id: 'zero-touch-sani-system',
    title: 'zero-touch-sani-system',
    typeLabel: 'External Repo',
    kind: 'external',
    summary:
      'Handsfree sanitation system with Raspberry Pi hardware, cloud connectivity, and a control UI.',
    role:
      'Built an end-to-end system spanning device control, cloud connectivity, and web interfaces.',
    context:
      'This project crossed hardware, cloud, and interface concerns rather than living in a single typical web stack.',
    problem:
      'The challenge was to build a hands-free sanitation system that could sense, react, report, and be remotely controlled as one product.',
    details: [
      paragraph(
        'Mixed hardware, cloud IoT, and web interface concerns in one end-to-end project.'
      ),
      list([
        'Strong example of multidisciplinary product delivery beyond standard CRUD applications.',
      ]),
    ],
    impact: [
      'Shows comfortable ownership across hardware, cloud, and interface boundaries.',
    ],
    outcome:
      'It became a credible end-to-end systems build rather than just a hardware prototype or a disconnected web dashboard.',
    stack: ['Raspberry Pi', 'IoT', 'Google Cloud', 'Firebase', 'Web UI'],
    href: 'https://github.com/foosiee/zero-touch-sani-system',
  },
  {
    id: 'everest-platform',
    title: 'Everest Campaign Orchestration',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Internal Amazon platform for building automated marketing campaigns as workflow graphs across channels like direct mail, push notifications, and widgets.',
    role:
      'Core contributor to the platform across multiple releases and feature areas.',
    context:
      'Everest was the base platform behind multiple later projects, so it matters as the product surface and workflow model that those features had to fit into.',
    problem:
      'Automated marketing campaigns are not simple one-step sends. They need a reusable workflow system that can branch, wait, react to state, and coordinate actions across channels.',
    details: [
      paragraph(
        'Everest modeled campaigns as graphs of actions like send, wait, branch, and follow-up instead of simple linear flows.'
      ),
      list([
        'The system supported planning, automation, and execution of automated marketing journeys across multiple channels.',
        'Several later projects, including Lifecycle Promotions, Nudging, and ML branching, were built on top of this workflow model.',
      ]),
    ],
    impact: [
      'Provided a reusable internal platform for complex automated marketing campaigns.',
      'Supported feature development for campaigns used at Amazon scale.',
    ],
    outcome:
      'The platform gave internal teams a common system for building richer automated campaign journeys rather than solving each flow as a one-off feature.',
    stack: [
      'Java',
      'Angular',
      'AWS',
      'Workflow Systems',
      'Marketing Automation',
    ],
  },
  {
    id: 'everest-ml-branching',
    title: 'Everest ML Branching Node',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Machine-learning-backed workflow node that automatically selected the best-performing branch inside a marketing campaign.',
    role:
      'Owned the engineering integration between Everest and an applied-science model so the model could be inferenced and the result fed back into the workflow graph.',
    context:
      'The feature lived inside Everest, where campaign logic already existed as a workflow graph that marketers interacted with directly.',
    problem:
      'A model is only useful if it can participate cleanly in a production workflow system. The challenge was connecting applied-science output to a marketer-facing orchestration product.',
    details: [
      paragraph(
        'Worked with an applied scientist who owned the model while I owned the production engineering path into Everest.'
      ),
      list([
        'The feature let marketers use an adaptive branching node rather than hand-tuning every branch themselves.',
        'This required fitting model inference and results cleanly into an existing graph-based campaign product.',
      ]),
    ],
    impact: [
      'Brought ML-driven decisioning directly into marketer workflows.',
      'Connected science output to a production orchestration system used by internal teams.',
    ],
    outcome:
      'The result made model-backed branching a product feature rather than a science-side experiment, which is the part I care about most in these integrations.',
    stack: ['ML Integration', 'Java', 'Angular', 'AWS', 'Workflow Systems'],
  },
  {
    id: 'everest-guardrails',
    title: 'Everest Campaign Guardrails',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Automation that halted bad campaigns or notified marketers when journeys entered operationally risky states.',
    role:
      'Owned systems that halted campaigns or alerted marketers based on campaign state.',
    context:
      'Everest was powerful enough that it also needed operational guardrails to prevent bad journeys from quietly causing damage or confusion.',
    problem:
      'Marketers needed the system to detect risky states automatically instead of relying on manual monitoring after campaigns were already in trouble.',
    details: [
      paragraph(
        'Handled cases like journeys ending soon, invalid owners, and invalid targeting rules.'
      ),
      list([
        'This work acted as a reliability layer for campaign operations rather than a customer-facing feature alone.',
        'Earlier notification work and later guardrail automation belong to the same core project area.',
      ]),
    ],
    impact: [
      'Reduced operator burden by surfacing or stopping problematic campaigns automatically.',
      'Improved safety and operability for automated campaign execution.',
    ],
    outcome:
      'The feature made Everest safer to operate by turning a set of failure-prone states into explicit automation rather than tribal knowledge.',
    stack: ['Java', 'AWS', 'Notifications', 'Operational Tooling'],
  },
  {
    id: 'lifecycle-promotions',
    title: 'Lifecycle Promotions',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Event-driven campaign feature that let marketers require multiple customer actions before a journey advanced and a promotion could be earned.',
    role:
      'Owned frontend integration that translated Everest graph models into sane API inputs and owned state tracking so customers could see which prerequisite events had or had not been completed.',
    context:
      'Lifecycle Promotions sat on top of Everest, but it pushed the product model harder than earlier campaign features did.',
    problem:
      'Previously a promotion could only depend on one event. Supporting many prerequisite events changed both the data model and the shape of the workflow itself.',
    details: [
      paragraph(
        'Before this, promotions were limited to a single event; Lifecycle Promotions enabled N prerequisite events.'
      ),
      list([
        'The hardest product constraint was that Everest’s frontend model was designed as a tree, while Lifecycle Promotions required a DAG.',
        'A separate team handled actual promotion-credit issuance while I focused on graph integration and event-state visibility.',
      ]),
    ],
    impact: [
      'Expanded promotional journeys from one-event rules to richer multi-event progression.',
      'Made campaign state visible so marketers could see where customers were completing or missing prerequisite steps.',
    ],
    outcome:
      'The feature made multi-step promotions feel like a real product capability rather than a backend rule hack, which is why the DAG constraint mattered so much.',
    stack: ['Java', 'Angular', 'Event Processing', 'Graph Modeling', 'AWS'],
  },
  {
    id: 'everest-nudging',
    title: 'Everest Nudging',
    typeLabel: 'Case Study',
    kind: 'case-study',
    summary:
      'Feature that let marketers remind customers to complete the final missing action needed to earn a promotional credit.',
    role:
      'Built the feature layer that let marketers target near-complete Lifecycle Promotions journeys with reminder actions.',
    context:
      'Nudging only makes sense once multi-step lifecycle journeys exist, so it was an extension of Lifecycle Promotions rather than a standalone campaign primitive.',
    problem:
      'If a customer is one step away from completing a promotion, the product should help marketers act on that state instead of just showing it passively.',
    details: [
      paragraph(
        'Nudging complemented Lifecycle Promotions by helping customers finish the last step of a campaign.'
      ),
      list([
        'It turned progression state into a practical re-engagement feature for marketers.',
      ]),
    ],
    impact: [
      'Increased the usefulness of multi-step promotion campaigns by helping customers complete near-finished journeys.',
    ],
    outcome:
      'It made progression state operationally useful by turning “almost complete” customers into an audience marketers could act on immediately.',
    stack: ['Java', 'Angular', 'Marketing Automation', 'Campaign Logic'],
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
      id: 'aws-verified-permissions',
      title: 'Amazon Verified Permissions',
      path: 'C:\\WORK\\AWS\\AVP',
      description:
        'Authorization platform work across AVP product features, internal integrations, access-query capabilities, and Cedar-based tooling.',
      entries: [
        {
          id: 'project-cedar-lsp',
          title: 'Cedar Language Server',
          path: 'C:\\WORK\\AWS\\AVP\\CEDAR_LSP.EXE',
          badge: 'APP',
          summary:
            'Primary-author Cedar tooling shown as a live in-site application.',
          role: demoById.get('cedar-lsp')?.role ?? '',
          context: demoById.get('cedar-lsp')?.context ?? '',
          problem: demoById.get('cedar-lsp')?.problem ?? '',
          details: demoById.get('cedar-lsp')?.details ?? [],
          impact: demoById.get('cedar-lsp')?.impact ?? [],
          outcome: demoById.get('cedar-lsp')?.outcome ?? '',
          stack: demoById.get('cedar-lsp')?.stack ?? [],
          references: demoById.get('cedar-lsp')?.references ?? [],
          source: 'tooling',
          launchAppId: 'cedar',
        },
        ...['avp-idc-integration', 'avp-access-queries', 'avp-ipv6-fips'].map(
          (id) => {
            const project = demoById.get(id)!;

            return {
              id: `project-${project.id}`,
              title: project.title,
              path: `C:\\WORK\\AWS\\AVP\\${slugify(
                project.title
              ).toUpperCase()}.DOC`,
              badge: 'AWS',
              summary: project.summary,
              role: project.role,
              context: project.context,
              problem: project.problem,
              details: project.details,
              impact: project.impact,
              outcome: project.outcome,
              stack: project.stack,
              references: project.references,
              source: 'work' as const,
            };
          }
        ),
      ],
    },
    {
      id: 'aws-verified-access',
      title: 'AWS Zero Trust',
      path: 'C:\\WORK\\AWS\\ZERO_TRUST',
      description:
        'Identity and endpoint-authorization work tied to a large Amazon Verified Access extension spanning Route53, client engineering, and identity systems.',
      entries: ['ava-endpoint-authorization'].map((id) => {
        const project = demoById.get(id)!;

        return {
          id: `project-${project.id}`,
          title: project.title,
          path: `C:\\WORK\\AWS\\ZERO_TRUST\\${slugify(
            project.title
          ).toUpperCase()}.DOC`,
          badge: 'AVA',
          summary: project.summary,
          role: project.role,
          context: project.context,
          problem: project.problem,
          details: project.details,
          impact: project.impact,
          outcome: project.outcome,
          stack: project.stack,
          references: project.references,
          source: 'work' as const,
          href: project.href,
        };
      }),
    },
    {
      id: 'amazon-everest',
      title: 'Amazon Everest',
      path: 'C:\\WORK\\AMAZON\\EVEREST',
      description:
        'Internal Amazon platform for building automated marketing campaigns as workflow graphs, plus the feature work layered on top of that system.',
      entries: [
        'everest-platform',
        'everest-ml-branching',
        'everest-guardrails',
        'lifecycle-promotions',
        'everest-nudging',
      ].map((id) => {
        const project = demoById.get(id)!;

        return {
          id: `project-${project.id}`,
          title: project.title,
          path: `C:\\WORK\\AMAZON\\EVEREST\\${slugify(
            project.title
          ).toUpperCase()}.DOC`,
          badge: 'EVR',
          summary: project.summary,
          role: project.role,
          context: project.context,
          problem: project.problem,
          details: project.details,
          impact: project.impact,
          outcome: project.outcome,
          stack: project.stack,
          references: project.references,
          source: 'work' as const,
          href: project.href,
        };
      }),
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      path: 'C:\\LAB\\CASEFILES',
      description:
        'Public or semi-public projects that are better explained as engineering stories than live demos, with an emphasis on system design and outcomes.',
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
          role: project.role,
          context: project.context,
          problem: project.problem,
          details: project.details,
          impact: project.impact,
          outcome: project.outcome,
          stack: project.stack,
          references: project.references,
          source: 'demo' as const,
          href: project.href,
        };
      }),
    },
    {
      id: 'personal-demos',
      title: 'Personal Demos',
      path: 'C:\\DEMOS\\PERSONAL',
      description:
        'Smaller public builds, interactive experiments, and side projects that show product taste, interface work, or end-to-end ownership.',
      entries: ['spotify-lyrics', 'v-net-lab', 'zero-touch-sani-system'].map(
        (id) => {
          const project = demoById.get(id)!;

          return {
            id: `project-${project.id}`,
            title: project.title,
            path: `C:\\DEMOS\\PERSONAL\\${slugify(
              project.title
            ).toUpperCase()}.${project.kind === 'external' ? 'EXE' : 'DOC'}`,
            badge: id === 'zero-touch-sani-system' ? 'OSS' : 'DEMO',
            summary: project.summary,
            role: project.role,
            context: project.context,
            problem: project.problem,
            details: project.details,
            impact: project.impact,
            outcome: project.outcome,
            stack: project.stack,
            references: project.references,
            source: 'demo' as const,
            href: project.href,
          };
        }
      ),
    },
  ];
}

export function formatExplorerTree(folders: ExplorerFolder[]) {
  return folders.flatMap((folder) => [
    folder.path,
    ...folder.entries.map((entry) => `  ${entry.badge} ${entry.path}`),
  ]);
}
