#!/usr/bin/env tsx

import { readdirSync, readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join, parse } from 'path';
import { Project, ProjectSchema } from '../src/types/project';
import { extractDomainsFromTopics } from './normalize';

interface ManualProjectManifest {
  slug?: string;
  title: string;
  source: 'manual';
  include?: boolean;
  visibility?: 'featured' | 'portfolio' | 'labs' | 'ventures';
  status?: 'complete' | 'in-progress' | 'archived';
  tier?: 'flagship' | 'mvp' | 'experiment';
  stack?: string[];
  roles?: string[];
  live_url?: string;
  demo_url?: string;
  repo_url?: string;
  homepage_url?: string;
  highlights?: string[];
  metrics?: Record<string, number | string>;
  topics?: string[];
  description?: string;
}

interface LoadManualStats {
  totalFiles: number;
  validFiles: number;
  invalidFiles: number;
  included: number;
  skipped: number;
  errors: string[];
}

export function loadManualProjects(): { projects: Project[]; stats: LoadManualStats } {
  const manualDir = join(process.cwd(), 'data', 'manual');
  const stats: LoadManualStats = {
    totalFiles: 0,
    validFiles: 0,
    invalidFiles: 0,
    included: 0,
    skipped: 0,
    errors: []
  };

  const projects: Project[] = [];

  try {
    // Check if manual directory exists
    const files = readdirSync(manualDir).filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
    stats.totalFiles = files.length;

    console.log(`📁 Found ${files.length} manual project files`);

    for (const file of files) {
      try {
        const filePath = join(manualDir, file);
        const fileContent = readFileSync(filePath, 'utf8');
        const parsed = yaml.load(fileContent) as unknown;
        
        // Parse with our manual manifest schema
        const manifest = parsed as ManualProjectManifest;
        
        // Extract slug from filename if not provided
        const { name: filenameSlug } = parse(file);
        const slug = manifest.slug || filenameSlug;
        
        // Validate required fields
        if (!manifest.title) {
          throw new Error('Missing required field: title');
        }
        
        if (manifest.source !== 'manual') {
          throw new Error('Source must be "manual"');
        }

        // Set defaults
        const include = manifest.include ?? true;
        const visibility = manifest.visibility || 'ventures';
        const status = manifest.status || 'in-progress';
        const tier = manifest.tier || 'mvp';
        const topics = manifest.topics || ['portfolio:include'];
        const pushedAt = new Date().toISOString();

        // Extract domains from topics
        const domains = extractDomainsFromTopics(topics);

        // Create normalized project
        const project: Project = {
          slug,
          title: manifest.title,
          description: manifest.description,
          source: 'manual',
          status,
          tier,
          topics,
          domains,
          stack: manifest.stack || [],
          roles: manifest.roles || [],
          repoUrl: manifest.repo_url || undefined,
          homepageUrl: manifest.homepage_url || undefined,
          liveUrl: manifest.live_url || undefined,
          demoUrl: manifest.demo_url || undefined,
          stars: 0, // Manual projects don't have stars
          pushedAt,
          ogImage: undefined,
          highlights: manifest.highlights,
          metrics: manifest.metrics,
          visibility,
          manifest: {
            title: manifest.title,
            status: manifest.status,
            tier: manifest.tier,
            stack: manifest.stack,
            roles: manifest.roles,
            live_url: manifest.live_url,
            demo_url: manifest.demo_url,
            repo_url: manifest.repo_url,
            homepage_url: manifest.homepage_url,
            highlights: manifest.highlights,
            metrics: manifest.metrics,
            topics: manifest.topics,
            visibility: manifest.visibility
          }
        };

        // Validate with Zod schema
        const validatedProject = ProjectSchema.parse(project);
        
        // Apply inclusion rules
        const shouldInclude = include && topics.includes('portfolio:include');
        const shouldExclude = topics.includes('portfolio:hide');
        
        if (shouldExclude) {
          stats.skipped++;
          console.log(`⏭️  Skipped ${slug} (portfolio:hide)`);
        } else if (shouldInclude) {
          projects.push(validatedProject);
          stats.included++;
          console.log(`✅ Included ${slug}`);
        } else {
          stats.skipped++;
          console.log(`⏭️  Skipped ${slug} (not included)`);
        }
        
        stats.validFiles++;
        
      } catch (error) {
        stats.invalidFiles++;
        stats.errors.push(`${file}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        console.error(`❌ Error processing ${file}:`, error);
      }
    }

    console.log(`\n📊 Manual Projects Summary:`);
    console.log(`   📁 Total files: ${stats.totalFiles}`);
    console.log(`   ✅ Valid files: ${stats.validFiles}`);
    console.log(`   ❌ Invalid files: ${stats.invalidFiles}`);
    console.log(`   📦 Included: ${stats.included}`);
    console.log(`   ⏭️  Skipped: ${stats.skipped}`);
    
    if (stats.errors.length > 0) {
      console.log(`\n❌ Errors:`);
      stats.errors.forEach(error => console.log(`   - ${error}`));
    }

    return { projects, stats };

  } catch (error) {
    console.error('❌ Error loading manual projects:', error);
    return { projects: [], stats };
  }
}

// Allow running as standalone script
if (require.main === module) {
  const { projects, stats } = loadManualProjects();
  console.log(`\n🎉 Loaded ${projects.length} manual projects`);
}
