import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "src/data");

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  demo: string | null;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: string;
  email: string;
  social: {
    github: string;
    twitter: string;
    bilibili: string;
  };
}

function ensureDataDir() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
}

export function getProjects(): Project[] {
  const filePath = path.join(dataDirectory, "projects.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function saveProjects(projects: Project[]): void {
  ensureDataDir();
  const filePath = path.join(dataDirectory, "projects.json");
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
}

export function getSiteConfig(): SiteConfig {
  const filePath = path.join(dataDirectory, "config.json");
  if (!fs.existsSync(filePath)) {
    return {
      name: "Personal Blog",
      title: "Personal Blog",
      description: "A personal blog built with Next.js",
      author: "Author",
      email: "hello@example.com",
      social: {
        github: "https://github.com",
        twitter: "https://twitter.com",
        bilibili: "https://space.bilibili.com",
      },
    };
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

export function saveSiteConfig(config: SiteConfig): void {
  ensureDataDir();
  const filePath = path.join(dataDirectory, "config.json");
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
}
