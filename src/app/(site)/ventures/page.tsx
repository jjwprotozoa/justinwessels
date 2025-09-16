import { ProjectCard } from '@/components/ProjectCard';
import { getVenturesProjects } from '@/lib/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ventures — Businesses and Brands',
  description: 'Explore the businesses and brands I run or contribute to, including Fluid Investment Group, Ruvo Play, Hoodies for Faith, and more.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function VenturesPage() {
  const venturesProjects = getVenturesProjects();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Ventures</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Businesses and brands I run or contribute to, spanning various industries 
            and markets.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted/30 border border-muted rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground text-center">
            Some ventures are in active development; details on request.
          </p>
        </div>

        {/* Projects Grid */}
        {venturesProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venturesProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                externalLink={project.homepageUrl && !project.homepageUrl.includes('github.com')}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">No ventures yet</h3>
            <p className="text-muted-foreground">
              Check back soon for business ventures and brand projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
