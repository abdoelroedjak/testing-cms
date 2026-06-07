export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface SocialLinks {
  instagram?: string;
  behance?: string;
  linkedin?: string;
  dribbble?: string;
  twitter?: string;
}

export interface ThemeColors {
  id: string;
  name: string;
  bg: string;          // Tailwind class or hex (e.g. 'bg-stone-50' or '#f5f5f4')
  text: string;        // Tailwind class or hex (e.g. 'text-neutral-900')
  textMuted: string;   // Tailwind class (e.g. 'text-neutral-500')
  accent: string;      // Tailwind class (e.g. 'text-orange-600')
  accentBg: string;    // Tailwind class (e.g. 'bg-orange-600')
  border: string;      // Tailwind class (e.g. 'border-stone-200')
  cardBg: string;      // Tailwind class (e.g. 'bg-stone-100')
}

export interface CMSConfig {
  name: string;
  role: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutTitle: string;
  aboutText: string;
  quoteText: string;
  quoteAuthor: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  socials: SocialLinks;
  projects: Project[];
  services: Service[];
  activeThemeId: string;
  gridColumns: '2' | '3';
  aspectRatio: 'square' | 'video' | 'portrait';
  layoutType: 'split' | 'classic' | 'minimalist';
}
