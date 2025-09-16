import { DocsLink } from '@/components/DocsLink';
import { GitHubShields } from '@/components/GitHubShields';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/date';
import { Project } from '@/types/project';
import { BookOpen, Calendar, ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
  hasCaseStudy?: boolean;
  externalLink?: boolean;
}

export function ProjectCard({ project, variant = 'default', hasCaseStudy = false, externalLink = false }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  
  // Generate fallback gradient image if ogImage is missing
  const getImageSrc = () => {
    if (project.ogImage) return project.ogImage;
    
    // Generate initials from repo name or title
    const initials = project.title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // Return a data URL for a gradient background with initials
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
              fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
      </svg>
    `)}`;
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${isFeatured ? 'border-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
          <Image
            src={getImageSrc()}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            className="absolute top-2 left-2"
            variant={project.status === 'complete' ? 'default' : 
                    project.status === 'in-progress' ? 'secondary' : 'outline'}
          >
            {project.status === 'complete' ? 'Complete' : 
             project.status === 'in-progress' ? 'In-Progress' : 'Archived'}
          </Badge>
          {project.tier === 'flagship' && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
              Flagship
            </Badge>
          )}
          {hasCaseStudy && (
            <Badge className="absolute bottom-2 left-2 bg-green-600 text-white">
              <BookOpen className="h-3 w-3 mr-1" />
              Case Study
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Stack chips (cap to 5) */}
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 5 && (
            <Badge variant="secondary" className="text-xs">
              +{project.stack.length - 5}
            </Badge>
          )}
        </div>
        
        {/* Highlights tooltip preview */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="text-xs text-muted-foreground">
            <div className="line-clamp-2">
              • {project.highlights[0]}
              {project.highlights[1] && ` • ${project.highlights[1]}`}
            </div>
          </div>
        )}
        
        {/* Domain and status */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="capitalize">{project.domains[0] || 'Other'}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatRelativeTime(project.pushedAt)}
            </span>
          </div>
        </div>
        
        {/* GitHub Shields */}
        {project.repoUrl && (
          <GitHubShields repoUrl={project.repoUrl} className="mt-2" />
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          {externalLink && project.homepageUrl ? (
            <Button asChild className="flex-1">
              <a href={project.homepageUrl} target="_blank" rel="noopener noreferrer">
                Visit Site
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button asChild className="flex-1">
              <Link href={`/projects/${project.slug}`}>
                View Details
              </Link>
            </Button>
          )}
          
          {/* Quick links */}
          {project.repoUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" title="Repository">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <DocsLink repoUrl={project.repoUrl} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
