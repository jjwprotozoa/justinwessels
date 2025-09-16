import { Project, ProjectFilters } from '@/types/project';
import projectsData from '../../public/data/projects.json';

// Convert legacy format to new Project format
function convertLegacyProject(item: Record<string, unknown>): Project {
  return {
    slug: String(item.id || ''),
    title: String(item.title || ''),
    description: String(item.description || ''),
    source: 'github', // Legacy projects are from GitHub
    status: item.status === 'Completed' ? 'complete' : 
            item.status === 'In Development' ? 'in-progress' : 'archived',
    tier: item.featured ? 'flagship' : 'mvp',
    topics: Array.isArray(item.highlights) ? item.highlights as string[] : [],
    domains: [String(item.category || '').toLowerCase()],
    stack: Array.isArray(item.technologies) ? item.technologies as string[] : [],
    roles: ['Developer'], // Default role
    repoUrl: String(item.githubUrl || ''),
    homepageUrl: item.liveUrl ? String(item.liveUrl) : undefined,
    liveUrl: item.liveUrl ? String(item.liveUrl) : undefined,
    demoUrl: item.liveUrl ? String(item.liveUrl) : undefined,
    stars: 0, // Default value
    pushedAt: String(item.endDate || item.startDate || ''),
    ogImage: item.image ? String(item.image) : undefined,
    highlights: Array.isArray(item.highlights) ? item.highlights as string[] : [],
    metrics: {},
    visibility: item.featured ? 'featured' : 'portfolio' // Map legacy featured to new visibility
  };
}

// Cache for projects data
let projectsCache: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (projectsCache === null) {
    try {
      projectsCache = (projectsData as Record<string, unknown>[]).map(convertLegacyProject);
    } catch (error) {
      console.error('Error reading projects data:', error);
      projectsCache = [];
    }
  }
  return projectsCache;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find(project => project.slug === slug);
}

export function getDomains(): string[] {
  const projects = getAllProjects();
  const domains = new Set<string>();
  
  projects.forEach(project => {
    project.domains.forEach(domain => domains.add(domain));
  });
  
  return Array.from(domains).sort();
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects()
    .filter(project => project.visibility === 'featured')
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}

export function getCurrentlyBuildingProjects(): Project[] {
  return getAllProjects()
    .filter(project => project.status === 'in-progress')
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 6);
}

export function getPortfolioProjects(): Project[] {
  return getAllProjects()
    .filter(project => project.visibility === 'portfolio' || project.visibility === 'featured')
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}

export function getLabsProjects(): Project[] {
  return getAllProjects()
    .filter(project => project.visibility === 'labs')
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}

export function getVenturesProjects(): Project[] {
  return getAllProjects()
    .filter(project => project.visibility === 'ventures')
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
}

export function getFilteredProjects(filters: ProjectFilters): Project[] {
  let projects = getAllProjects();
  
  // Filter by visibility - only show portfolio and featured projects on /projects
  projects = projects.filter(project => 
    project.visibility === 'portfolio' || project.visibility === 'featured'
  );

  // Filter by search term (fuzzy search on title, description, stack, topics)
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    projects = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      (project.description && project.description.toLowerCase().includes(searchTerm)) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      project.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );
  }

  // Filter by domain
  if (filters.domain) {
    projects = projects.filter(project => 
      project.domains.includes(filters.domain)
    );
  }

  // Filter by status
  if (filters.status) {
    projects = projects.filter(project => project.status === filters.status);
  }

  // Sort: tier (flagship > mvp > experiment), then status (complete > in-progress > archived), then pushedAt desc
  projects.sort((a, b) => {
    // Tier priority
    const tierOrder = { flagship: 3, mvp: 2, experiment: 1 };
    const tierDiff = tierOrder[b.tier] - tierOrder[a.tier];
    if (tierDiff !== 0) return tierDiff;

    // Status priority
    const statusOrder = { complete: 3, 'in-progress': 2, archived: 1 };
    const statusDiff = statusOrder[b.status] - statusOrder[a.status];
    if (statusDiff !== 0) return statusDiff;

    // Date (most recent first)
    return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
  });

  return projects;
}

export function getUniqueCategories(): string[] {
  const categories = getAllProjects().map(project => project.domains[0] || 'Other');
  return Array.from(new Set(categories)).sort();
}

export function getUniqueStatuses(): string[] {
  const statuses = getAllProjects().map(project => project.status);
  return Array.from(new Set(statuses)).sort();
}

// Legacy functions for backward compatibility
export function getProjectById(id: string): Project | undefined {
  return getProjectBySlug(id);
}
