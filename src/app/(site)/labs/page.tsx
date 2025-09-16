import { ProjectCard } from '@/components/ProjectCard';
import { getLabsProjects } from '@/lib/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Labs — Niche and Sector-Specific Tools',
  description: 'Explore niche and sector-specific tools, experiments, and specialized applications built for specific industries and use cases.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LabsPage() {
  const labsProjects = getLabsProjects();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Labs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Niche and sector-specific tools, experiments, and specialized applications 
            built for specific industries and use cases.
          </p>
        </div>

        {/* Projects Grid */}
        {labsProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labsProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold mb-2">No labs projects yet</h3>
            <p className="text-muted-foreground">
              Check back soon for specialized tools and experiments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
