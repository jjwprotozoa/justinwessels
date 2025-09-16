import { z } from 'zod';

// Manifest schema for .project-manifest.yml files
export const ProjectManifestSchema = z.object({
  title: z.string().optional(),
  status: z.enum(['complete', 'in-progress', 'archived']).optional(),
  tier: z.enum(['flagship', 'mvp', 'experiment']).optional(),
  stack: z.array(z.string()).optional(),
  roles: z.array(z.string()).optional(),
  live_url: z.string().optional(),
  demo_url: z.string().optional(),
  repo_url: z.string().optional(),
  homepage_url: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  metrics: z.record(z.union([z.number(), z.string()])).optional(),
  topics: z.array(z.string()).optional(),
  visibility: z.enum(['featured', 'portfolio', 'labs', 'ventures']).optional(),
});

// Zod schema for validation
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  source: z.enum(['github', 'manual']).default('github'),
  status: z.enum(['complete', 'in-progress', 'archived']),
  tier: z.enum(['flagship', 'mvp', 'experiment']),
  topics: z.array(z.string()),
  domains: z.array(z.string()),
  stack: z.array(z.string()),
  roles: z.array(z.string()),
  repoUrl: z.string().optional(),
  homepageUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  stars: z.number(),
  pushedAt: z.string(),
  ogImage: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  metrics: z.record(z.union([z.number(), z.string()])).optional(),
  manifest: ProjectManifestSchema.optional(),
  visibility: z.enum(['featured', 'portfolio', 'labs', 'ventures']).default('portfolio'),
});

// TypeScript type derived from Zod schema
export type Project = z.infer<typeof ProjectSchema>;

// Legacy interface for backward compatibility with existing components
export interface LegacyProject {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  status: 'Completed' | 'In Development' | 'Planned';
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
  challenges: string;
  solutions: string;
}

export interface ProjectFilters {
  category: string;
  status: string;
  search: string;
  domain: string;
}

export type ProjectManifest = z.infer<typeof ProjectManifestSchema>;

// GitHub GraphQL response types
export interface GitHubRepository {
  name: string;
  description: string | null;
  stargazerCount: number;
  pushedAt: string;
  isArchived: boolean;
  isFork: boolean;
  homepageUrl: string | null;
  openGraphImageUrl: string | null;
  url: string;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  object: {
    text: string;
  } | null;
}

export interface GitHubResponse {
  data: {
    user: {
      repositories: {
        nodes: GitHubRepository[];
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string | null;
        };
      };
    };
  };
}
