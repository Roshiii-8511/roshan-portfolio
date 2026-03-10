
export interface Project {
  id: string;
  title: string;
  category: 'Premium Web/App' | 'Bots for Business' | 'AI Integration';
  description: string;
  summary: string;
  images: string[];
  techStack: string[];
  link?: string;
}

export interface SiteContent {
  headline: string;
  aboutMe: string;
  profileImage: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Autonomous Social Manager',
    category: 'Bots for Business',
    description: 'A complete end-to-end social media automation system that uses AI to generate content, schedule posts, and interact with followers based on real-time sentiment analysis.',
    summary: 'AI-driven social media growth engine.',
    images: ['https://picsum.photos/seed/ai-auto-1/800/600', 'https://picsum.photos/seed/ai-auto-2/800/600'],
    techStack: ['Python', 'OpenAI', 'Next.js', 'Firestore'],
    link: 'https://github.com'
  },
  {
    id: '2',
    title: 'Market Intelligence Scraper',
    category: 'Premium Web/App',
    description: 'High-performance web scraping platform capable of extracting structured data from dynamic JavaScript-heavy websites at scale, featuring proxy rotation and anti-bot evasion.',
    summary: 'Enterprise-grade data extraction platform.',
    images: ['https://picsum.photos/seed/scraper-1/800/600'],
    techStack: ['Node.js', 'Puppeteer', 'Redis', 'Docker'],
  },
  {
    id: '3',
    title: 'Strategic CRM Automation',
    category: 'Bots for Business',
    description: 'Workflow automation that bridges the gap between marketing leads and sales closing using intelligent lead scoring and automated personalized follow-ups.',
    summary: 'Lead conversion optimization system.',
    images: ['https://picsum.photos/seed/bot-1/800/600'],
    techStack: ['Zapier', 'Make.com', 'Python', 'Airtable'],
  }
];

const DEFAULT_CONTENT: SiteContent = {
  headline: 'Architecting Autonomous AI Systems',
  aboutMe: 'Bridging the gap between Computer Science precision and MBA strategic vision. I specialize in building robust automation frameworks that scale businesses through intelligent technology.',
  profileImage: 'https://picsum.photos/seed/roshan/400/400'
};

// In a real app, these would fetch from Firestore
export const getProjects = async (): Promise<Project[]> => {
  return DEFAULT_PROJECTS;
};

export const getSiteContent = async (): Promise<SiteContent> => {
  return DEFAULT_CONTENT;
};
