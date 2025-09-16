import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/date';
import { getAllProjects } from '@/lib/projects';
import { Calendar, ExternalLink, GitBranch, Github } from 'lucide-react';
import Link from 'next/link';

export default function FeedsPage() {
  const projects = getAllProjects();
  
  // Group projects by date (last 30 days, then weekly, then monthly)
  const groupedProjectsMap = new Map<string, typeof projects>();
  
  projects.forEach(project => {
    const date = new Date(project.pushedAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    let groupKey: string;
    if (diffInDays <= 7) {
      groupKey = 'This Week';
    } else if (diffInDays <= 30) {
      groupKey = 'This Month';
    } else if (diffInDays <= 90) {
      groupKey = 'Last 3 Months';
    } else {
      groupKey = 'Older';
    }
    
    if (!groupedProjectsMap.has(groupKey)) {
      groupedProjectsMap.set(groupKey, []);
    }
    const group = groupedProjectsMap.get(groupKey);
    if (group) {
      group.push(project);
    }
  });

  // Convert Map to Object for rendering
  const groupedProjects = Object.fromEntries(groupedProjectsMap);

  // Sort projects within each group by pushedAt (newest first)
  Object.values(groupedProjects).forEach(group => {
    group.sort((a, b) => 
      new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
    );
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Project Feeds</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest changes across all projects. 
            See what&apos;s been updated recently and track development progress.
          </p>
        </div>

        {/* Feeds */}
        <div className="space-y-8">
          {Object.entries(groupedProjects).map(([groupKey, groupProjects]) => (
            <div key={groupKey}>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                {groupKey}
                <Badge variant="secondary" className="ml-2">
                  {groupProjects.length}
                </Badge>
              </h2>
              
              <div className="space-y-4">
                {groupProjects.map((project) => (
                  <Card key={project.slug} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">
                            <Link 
                              href={`/projects/${project.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {project.title}
                            </Link>
                          </CardTitle>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge 
                            variant={project.status === 'complete' ? 'default' : 
                                    project.status === 'in-progress' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {project.status === 'complete' ? 'Complete' : 
                             project.status === 'in-progress' ? 'In-Progress' : 'Archived'}
                          </Badge>
                          {project.tier === 'flagship' && (
                            <Badge variant="outline" className="text-xs">
                              Flagship
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Updated {formatRelativeTime(project.pushedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-4 w-4" />
                            {project.domains[0] || 'Other'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {project.repoUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Repo
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live
                              </a>
                            </Button>
                          )}
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.slug}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No project updates</h3>
            <p className="text-muted-foreground">
              No projects have been updated recently. Check back later for new updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
