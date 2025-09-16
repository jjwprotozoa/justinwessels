import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/lib/projects';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

// Curated project slugs for the business card
const CURATED_SLUGS = [
  'ruvoplayer',
  'zeroforms', 
  'codm-squad-up-arena',
  'teacher-curriculum-builder',
  'boilrkit'
];

export default function BusinessCardPage() {
  const allProjects = getAllProjects();
  const curatedProjects = CURATED_SLUGS
    .map(slug => allProjects.find(project => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => project !== undefined);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-primary">Justin Wessels</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Developer. Optimizer. Builder of lean systems that scale.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/hire">
                Hire Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship Projects Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Flagship Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my most impactful work, showcasing innovative solutions 
              and cutting-edge technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="featured"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hire / Consulting CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Build Something Amazing?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I specialize in creating lean, scalable systems that deliver real value. 
            Whether you need a full-stack application, performance optimization, 
            or technical consulting, let&apos;s discuss how we can bring your vision to life.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/hire">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:work@justinwessels.com">
                Get In Touch
                <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Justin Wessels. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/jjwprotozoa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/justinwessels" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:work@justinwessels.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}