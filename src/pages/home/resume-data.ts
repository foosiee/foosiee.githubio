import { Job } from '../../types';
import { ExplorerFolder } from './project-data';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildResumeExplorerFolders(jobs: Job[]): ExplorerFolder[] {
  const groups = [
    {
      id: 'aws',
      title: 'Amazon Web Services',
      path: 'C:\\WORK\\AWS',
      description: 'Verified Permissions, Rust authz, and AWS platform work.',
      match: (job: Job) => job.company === 'Amazon Web Services',
    },
    {
      id: 'amazon',
      title: 'Amazon',
      path: 'C:\\WORK\\AMAZON',
      description: 'Lifecycle marketing and notification systems.',
      match: (job: Job) => job.company === 'Amazon',
    },
    {
      id: 'onpoint',
      title: 'Onpoint Group',
      path: 'C:\\WORK\\ONPOINT',
      description: 'Internal apps, automation, and cloud integrations.',
      match: (job: Job) => job.company === 'Onpoint Group',
    },
  ];

  const folders: ExplorerFolder[] = groups.map((group) => ({
    id: group.id,
    title: group.title,
    path: group.path,
    description: group.description,
    entries: jobs.filter(group.match).map((job) => ({
      id: `resume-${slugify(job.company)}-${slugify(job.title)}-${slugify(
        job.date
      )}`,
      title: job.title,
      path: `${group.path}\\${slugify(job.title).toUpperCase()}.TXT`,
      badge: 'ROLE',
      summary: job.details[0] ?? `${job.title} at ${job.company}`,
      details:
        job.details.length > 0
          ? job.details
          : ['Role summary available in the archive.'],
      stack: getJobStack(job),
      source: 'work' as const,
    })),
  }));

  folders.push({
    id: 'education',
    title: 'Education',
    path: 'C:\\DOCS\\EDUCATION',
    description: 'University and formal background.',
    entries: [
      {
        id: 'education-university-of-toledo',
        title: 'University of Toledo',
        path: 'C:\\DOCS\\EDUCATION\\U_TOLEDO.DOC',
        badge: 'EDU',
        summary: 'Bachelor of Computer Science, Cum Laude.',
        details: [
          'Bachelor of Computer Science',
          'Cum Laude',
          'University of Toledo, Toledo, Ohio',
          'Aug 2016 - Dec 2020',
        ],
        stack: ['Computer Science'],
        source: 'work',
      },
    ],
  });

  return folders;
}

export function getJobStack(job: Job) {
  if (job.company === 'Amazon Web Services' && job.title.includes('III')) {
    return ['AWS', 'Rust', 'Authorization', 'Verified Permissions'];
  }

  if (job.company === 'Amazon Web Services') {
    return ['AWS', 'Rust', 'Zero Trust', 'Caching'];
  }

  if (job.company === 'Amazon' && job.title.includes('I')) {
    return ['AWS', 'Java', 'Notifications', 'Scale'];
  }

  if (job.company === 'Amazon' && job.title.includes('Intern')) {
    return ['Angular', 'Java', 'Debugger', 'Campaigns'];
  }

  if (job.company === 'Amazon') {
    return ['Angular', 'Java', 'ML', 'Athena'];
  }

  return ['AWS', 'Azure', 'React', 'Python', 'Salesforce'];
}
