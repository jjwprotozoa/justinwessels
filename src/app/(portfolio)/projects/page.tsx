'use client';

import { Filters } from '@/components/Filters';
import { ProjectCard } from '@/components/ProjectCard';
import { getDomains, getFilteredProjects, getUniqueCategories, getUniqueStatuses } from '@/lib/projects';
import { ProjectFilters } from '@/types/project';
import { useEffect, useMemo, useState } from 'react';

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    category: '',
    status: '',
    search: '',
    domain: ''
  });
  const [caseStudySlugs, setCaseStudySlugs] = useState<string[]>([]);

  const categories = getUniqueCategories();
  const statuses = getUniqueStatuses();
  const domains = getDomains();
  const filteredProjects = useMemo(() => getFilteredProjects(filters), [filters]);

  // Load case study slugs on component mount
  useEffect(() => {
    const loadCaseStudySlugs = async () => {
      try {
        const response = await fetch('/api/case-studies/slugs');
        if (response.ok) {
          const slugs = await response.json();
          setCaseStudySlugs(slugs);
        }
      } catch {
        // Silently fail - case study badges will not show
      }
    };
    loadCaseStudySlugs();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of web applications, tools, and digital experiences. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          statuses={statuses}
          domains={domains}
        />

        {/* Results Count */}
        <div className="mt-6 mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {filters.search && ` for "${filters.search}"`}
            {filters.category && ` in ${filters.category}`}
            {filters.status && ` with status ${filters.status}`}
            {filters.domain && ` in ${filters.domain}`}
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                hasCaseStudy={caseStudySlugs.includes(project.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
