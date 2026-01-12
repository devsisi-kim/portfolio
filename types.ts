export interface Project {
  id: string;
  title: string;
  summary: string;     // Short punchline for the project card
  description: string; // Catchy sub-headline for the detail page
  overview: string;    // Intro text
  content: string;     // Markdown body text
  role: string;
  period: string;
  tools: string[];
  domain: string[];
  tags: string[];
  imageUrl: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}