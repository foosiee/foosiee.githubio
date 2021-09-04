export interface Config {
  jobs: Job[];
  education: Education[];
  projects: Project[];
  skills: string[];
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

export interface Position {
  details: string[];
  date: string;
  location: string;
}

export interface Job extends Position {
  title: string;
  company: string;
}

export interface Education extends Position {
  school: string;
  awarded: string;
}

export interface Project {
  title: string;
  link?: string;
  description: string;
}
