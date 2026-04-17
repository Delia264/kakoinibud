export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  avatar?: string;
  bio: {
    short: string;
    full: string;
  };
  experience: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'telegram' | 'vk' | 'email' | 'linkedin' | 'twitter';
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
  category?: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface NavItem {
  href: string;
  labelKey: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface TranslationMessages {
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: Record<string, string>;
  hero: {
    greeting: string;
    name: string;
    role: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    location: string;
    experience: string;
    skills: {
      title: string;
      level: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    liveDemo: string;
    sourceCode: string;
  };
  contacts: {
    title: string;
    subtitle: string;
    description: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    direct: {
      title: string;
      email: string;
      telegram: string;
      github: string;
    };
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
  common: {
    loading: string;
    error: string;
    close: string;
    menu: string;
    darkMode: string;
    lightMode: string;
    language: string;
  };
  notFound: {
    title: string;
    description: string;
    back: string;
  };
  skills: Record<string, string>;
}
