import * as yaml from 'js-yaml';
import { GitHubRepository, Project, ProjectManifest, ProjectManifestSchema } from '../src/types/project';

export function parseManifest(manifestText: string | null): ProjectManifest | null {
  if (!manifestText) return null;

  try {
    const parsed = yaml.load(manifestText) as unknown;
    return ProjectManifestSchema.parse(parsed);
  } catch (error) {
    console.warn('Failed to parse manifest:', error);
    return null;
  }
}

export function extractDomainsFromTopics(topics: string[]): string[] {
  return topics
    .filter(topic => topic.startsWith('domain:'))
    .map(topic => topic.replace('domain:', ''));
}

export function deriveStatus(
  manifest: ProjectManifest | null,
  topics: string[]
): 'complete' | 'in-progress' | 'archived' {
  // Priority: manifest.status → topics(portfolio:*) → default in-progress
  if (manifest?.status) {
    return manifest.status;
  }

  const portfolioTopics = topics.filter(topic => topic.startsWith('portfolio:'));
  if (portfolioTopics.length > 0) {
    const statusTopic = portfolioTopics[0]?.replace('portfolio:', '');
    if (statusTopic === 'complete' || statusTopic === 'archived') {
      return statusTopic;
    }
  }

  return 'in-progress';
}

export function deriveTier(
  manifest: ProjectManifest | null
): 'flagship' | 'mvp' | 'experiment' {
  return manifest?.tier || 'experiment';
}

export function deriveVisibility(
  manifest: ProjectManifest | null,
  topics: string[]
): 'featured' | 'portfolio' | 'labs' | 'ventures' {
  // Priority: manifest.visibility → topics(portfolio:*) → default portfolio
  if (manifest?.visibility) {
    return manifest.visibility;
  }

  const portfolioTopics = topics.filter(topic => topic.startsWith('portfolio:'));
  if (portfolioTopics.length > 0) {
    const visibilityTopic = portfolioTopics[0]?.replace('portfolio:', '');
    if (['featured', 'portfolio', 'labs', 'ventures'].includes(visibilityTopic)) {
      return visibilityTopic as 'featured' | 'portfolio' | 'labs' | 'ventures';
    }
  }

  return 'portfolio';
}

export function normalizeProject(repo: GitHubRepository): Project {
  const manifest = parseManifest(repo.object?.text || null);
  const githubTopics = repo.repositoryTopics.nodes.map(node => node.topic.name);
  const manifestTopics = manifest?.topics || [];
  const allTopics = [...new Set([...githubTopics, ...manifestTopics])];

  const domains = extractDomainsFromTopics(allTopics);
  const status = deriveStatus(manifest, allTopics);
  const tier = deriveTier(manifest);
  const visibility = deriveVisibility(manifest, allTopics);

  return {
    slug: repo.name,
    title: manifest?.title || repo.name,
    description: repo.description || undefined,
    source: 'github',
    status,
    tier,
    topics: allTopics,
    domains,
    stack: manifest?.stack || [],
    roles: manifest?.roles || [],
    repoUrl: repo.url, // Always use GitHub URL for security
    homepageUrl: repo.homepageUrl || manifest?.homepage_url || undefined,
    liveUrl: manifest?.live_url || undefined,
    demoUrl: manifest?.demo_url || undefined,
    stars: repo.stargazerCount,
    pushedAt: repo.pushedAt,
    ogImage: repo.openGraphImageUrl || undefined,
    highlights: manifest?.highlights || undefined,
    metrics: manifest?.metrics || undefined,
    visibility,
  };
}

export function compareProjects(a: Project, b: Project): number {
  // Tier priority: flagship > mvp > experiment
  const tierOrder = { flagship: 0, mvp: 1, experiment: 2 };
  const tierComparison = tierOrder[a.tier] - tierOrder[b.tier];
  if (tierComparison !== 0) return tierComparison;

  // Status priority: complete > in-progress > archived
  const statusOrder = { complete: 0, 'in-progress': 1, archived: 2 };
  const statusComparison = statusOrder[a.status] - statusOrder[b.status];
  if (statusComparison !== 0) return statusComparison;

  // Finally, sort by pushedAt desc (most recent first)
  return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(compareProjects);
}
