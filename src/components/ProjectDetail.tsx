import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date';
import { Project } from '@/types/project';
import { Calendar, Clock, ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="space-y-6">
        {project.ogImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={project.ogImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold">{project.title}</h1>
              <p className="text-xl text-muted-foreground mt-2">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2">
              {project.repoUrl && (
                <Button variant="outline" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="capitalize">{project.domains[0] || 'Other'}</Badge>
            <Badge 
              variant={project.status === 'complete' ? 'default' : 
                      project.status === 'in-progress' ? 'secondary' : 'outline'}
            >
              {project.status === 'complete' ? 'Complete' : 
               project.status === 'in-progress' ? 'In-Progress' : 'Archived'}
            </Badge>
            {project.tier === 'flagship' && (
              <Badge variant="outline">Flagship</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Project Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Updated:</span>
              <span className="text-sm font-medium">{formatDate(project.pushedAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="text-sm font-medium">
                {project.status === 'complete' ? 'Complete' : 
                 project.status === 'in-progress' ? 'In-Progress' : 'Archived'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tier:</span>
              <span className="text-sm font-medium capitalize">{project.tier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stars:</span>
              <span className="text-sm font-medium flex items-center gap-1">
                <Star className="h-3 w-3" />
                {project.stars}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Topics */}
      {project.topics && project.topics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Back to Projects */}
      <div className="pt-8">
        <Button variant="outline" asChild>
          <Link href="/projects">
            ← Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ProjectDetail;