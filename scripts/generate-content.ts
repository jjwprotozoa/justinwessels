#!/usr/bin/env tsx

/**
 * Content Generation Script
 * 
 * This script generates content from templates and data sources:
 * 1. Case study templates
 * 2. Project manifest templates
 * 3. Content from GitHub repositories
 * 4. Bulk content generation
 */

import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { Octokit } from '@octokit/rest';

interface ContentTemplate {
  name: string;
  description: string;
  template: string;
  schema: any;
}

interface GenerationOptions {
  source: 'github' | 'template' | 'manual';
  output: string;
  dryRun?: boolean;
  overwrite?: boolean;
}

// Content templates
const CASE_STUDY_TEMPLATE: ContentTemplate = {
  name: 'case-study',
  description: 'Case study template for project documentation',
  template: `---
slug: {{slug}}
title: {{title}}
stack: [{{#each stack}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
roles: [{{#each roles}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
date: {{date}}
updated: {{updated}}
outcomes:
{{#each outcomes}}  - "{{this}}"
{{/each}}keywords: [{{#each keywords}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
---

## Problem

{{problem}}

## Solution

{{solution}}

## Architecture

{{architecture}}

## Outcomes

{{outcomes}}

## Lessons Learned

{{lessons}}
`,
  schema: {
    slug: { type: 'string', required: true },
    title: { type: 'string', required: true },
    stack: { type: 'array', required: true },
    roles: { type: 'array', required: true },
    problem: { type: 'string', required: true },
    solution: { type: 'string', required: true },
    architecture: { type: 'string', required: true },
    outcomes: { type: 'string', required: true },
    lessons: { type: 'string', required: true },
  }
};

const PROJECT_MANIFEST_TEMPLATE: ContentTemplate = {
  name: 'project-manifest',
  description: 'Project manifest template for repository metadata',
  template: `title: {{title}}
status: {{status}}
tier: {{tier}}
stack:
{{#each stack}}  - {{this}}
{{/each}}roles:
{{#each roles}}  - {{this}}
{{/each}}live_url: {{live_url}}
demo_url: {{demo_url}}
repo_url: {{repo_url}}
homepage_url: {{homepage_url}}
highlights:
{{#each highlights}}  - {{this}}
{{/each}}metrics:
{{#each metrics}}  {{@key}}: {{this}}
{{/each}}topics:
{{#each topics}}  - {{this}}
{{/each}}`,
  schema: {
    title: { type: 'string', required: true },
    status: { type: 'string', required: true, enum: ['complete', 'in-progress', 'archived'] },
    tier: { type: 'string', required: true, enum: ['flagship', 'mvp', 'experiment'] },
    stack: { type: 'array', required: true },
    roles: { type: 'array', required: true },
  }
};

// @ts-ignore
async function generateContent(options: GenerationOptions) {
  console.log('🎨 Content Generation\n');

  const {
    source = 'template',
    output = 'content',
    dryRun = false,
    overwrite = false
  } = options;

  console.log(`📁 Source: ${source}`);
  console.log(`📁 Output: ${output}`);
  console.log(`🔍 Dry run: ${dryRun ? 'Yes' : 'No'}`);
  console.log(`🔄 Overwrite: ${overwrite ? 'Yes' : 'No'}\n`);

  switch (source) {
    case 'github':
      await generateFromGitHub(output, dryRun, overwrite);
      break;
    case 'template':
      await generateFromTemplates(output, dryRun, overwrite);
      break;
    case 'manual':
      await generateManually();
      break;
    default:
      console.log('❌ Invalid source. Use: github, template, or manual');
      process.exit(1);
  }

  console.log('\n✅ Content generation completed!');
}

async function generateManifestFromRepo(repo: any): Promise<string> {
  const status = repo.archived ? 'archived' : 'in-progress';
  const tier = repo.stargazers_count > 10 ? 'flagship' : 'experiment';

  return `title: ${repo.name}
status: ${status}
tier: ${tier}
stack:
  - ${repo.language || 'Unknown'}
roles:
  - Developer
repo_url: ${repo.html_url}
homepage_url: ${repo.homepage || ''}
highlights:
  - ${repo.stargazers_count} stars
  - ${repo.forks_count} forks
  - ${repo.language} project
topics:
  - ${repo.language?.toLowerCase() || 'code'}
  - github
`;
}

async function generateFromGitHub(output: string, dryRun: boolean, overwrite: boolean) {
  console.log('🔍 Generating content from GitHub repositories...');

  const githubToken = process.env.GH_TOKEN;
  if (!githubToken) {
    console.log('❌ GH_TOKEN environment variable not set');
    return;
  }

  const octokit = new Octokit({ auth: githubToken });

  try {
    // Get user repositories
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100
    });

    console.log(`📦 Found ${repos.length} repositories`);

    for (const repo of repos) {
      if (repo.archived || repo.disabled) continue;

      console.log(`   📄 Processing: ${repo.name}`);

      // Generate case study if it doesn't exist
      const caseStudyPath = join(process.cwd(), output, 'case-studies', `${repo.name}.mdx`);
      if (!existsSync(caseStudyPath) || overwrite) {
        const caseStudy = await generateCaseStudyFromRepo(repo);
        if (!dryRun) {
          writeFileSync(caseStudyPath, caseStudy);
          console.log(`     ✅ Generated case study: ${caseStudyPath}`);
        } else {
          console.log(`     🔍 Would generate case study: ${caseStudyPath}`);
        }
      }

      // Generate project manifest if it doesn't exist
      const manifestPath = join(process.cwd(), output, 'manifests', `${repo.name}-manifest.yml`);
      if (!existsSync(manifestPath) || overwrite) {
        const manifest = await generateManifestFromRepo(repo);
        if (!dryRun) {
          writeFileSync(manifestPath, manifest);
          console.log(`     ✅ Generated manifest: ${manifestPath}`);
        } else {
          console.log(`     🔍 Would generate manifest: ${manifestPath}`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Failed to generate content from GitHub:', error);
  }
}

async function generateFromTemplates(output: string, dryRun: boolean, overwrite: boolean) {
  console.log('📝 Generating content from templates...');

  // Create output directories
  if (!dryRun) {
    const caseStudiesDir = join(process.cwd(), output, 'case-studies');
    const manifestsDir = join(process.cwd(), output, 'manifests');
    
    if (!existsSync(caseStudiesDir)) {
      mkdirSync(caseStudiesDir, { recursive: true });
    }
    if (!existsSync(manifestsDir)) {
      mkdirSync(manifestsDir, { recursive: true });
    }
  }

  // Generate sample case studies
  const sampleCaseStudies = [
    {
      slug: 'sample-project-1',
      title: 'Sample Project 1 - Web Application',
      stack: ['React', 'TypeScript', 'Node.js'],
      roles: ['Full-stack Developer', 'Product Manager'],
      problem: 'Users needed a way to manage their tasks efficiently.',
      solution: 'Built a comprehensive task management application with real-time updates.',
      architecture: 'Frontend built with React and TypeScript, backend with Node.js and Express.',
      outcomes: 'Increased user productivity by 40% and reduced task completion time by 25%.',
      lessons: 'Learned the importance of user feedback in the development process.'
    },
    {
      slug: 'sample-project-2',
      title: 'Sample Project 2 - Mobile App',
      stack: ['React Native', 'Firebase', 'TypeScript'],
      roles: ['Mobile Developer', 'UI/UX Designer'],
      problem: 'Mobile users needed offline access to critical information.',
      solution: 'Developed a mobile app with offline-first architecture and sync capabilities.',
      architecture: 'React Native frontend with Firebase backend and local SQLite storage.',
      outcomes: 'Achieved 99.9% uptime and 50% reduction in data usage.',
      lessons: 'Offline-first architecture significantly improves user experience.'
    }
  ];

  for (const data of sampleCaseStudies) {
    const caseStudy = generateFromTemplate(CASE_STUDY_TEMPLATE, data);
    const filePath = join(process.cwd(), output, 'case-studies', `${data.slug}.mdx`);
    
    if (!existsSync(filePath) || overwrite) {
      if (!dryRun) {
        writeFileSync(filePath, caseStudy);
        console.log(`   ✅ Generated: ${filePath}`);
      } else {
        console.log(`   🔍 Would generate: ${filePath}`);
      }
    }
  }

  // Generate sample project manifests
  const sampleManifests = [
    {
      title: 'Sample Project 1',
      status: 'complete',
      tier: 'flagship',
      stack: ['React', 'TypeScript', 'Node.js'],
      roles: ['Full-stack Developer', 'Product Manager'],
      live_url: 'https://sample1.example.com',
      highlights: ['Real-time updates', 'User-friendly interface', 'Scalable architecture']
    },
    {
      title: 'Sample Project 2',
      status: 'in-progress',
      tier: 'mvp',
      stack: ['React Native', 'Firebase'],
      roles: ['Mobile Developer', 'UI/UX Designer'],
      highlights: ['Offline-first', 'Cross-platform', 'Modern design']
    }
  ];

  for (const data of sampleManifests) {
    const manifest = generateFromTemplate(PROJECT_MANIFEST_TEMPLATE, data);
    const filePath = join(process.cwd(), output, 'manifests', `${data.title.toLowerCase().replace(/\s+/g, '-')}-manifest.yml`);
    
    if (!existsSync(filePath) || overwrite) {
      if (!dryRun) {
        writeFileSync(filePath, manifest);
        console.log(`   ✅ Generated: ${filePath}`);
      } else {
        console.log(`   🔍 Would generate: ${filePath}`);
      }
    }
  }
}

async function generateManually() {
  console.log('✏️  Manual content generation...');
  console.log('This would open an interactive prompt for content creation.');
  console.log('For now, use the template-based generation instead.');
}

function generateFromTemplate(template: ContentTemplate, data: any): string {
  let content = template.template;

  // Simple template replacement
  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, String(value));
  }

  // Handle array replacements
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      const arrayRegex = new RegExp(`{{#each ${key}}}([\\s\\S]*?){{/each}}`, 'g');
      content = content.replace(arrayRegex, (_, template) => {
        return value.map(item => 
          template.replace(/{{this}}/g, String(item))
        ).join('');
      });
    }
  }

  return content;
}

async function generateCaseStudyFromRepo(githubRepo: any): Promise<string> {
  const now = new Date().toISOString().split('T')[0];
  
  return `---
slug: ${githubRepo.name}
title: ${githubRepo.name} - ${githubRepo.description || 'Project'}
stack: ["${githubRepo.language || 'Unknown"}"]
roles: ["Developer"]
date: ${now}
updated: ${now}
outcomes:
  - "Repository created and maintained"
keywords: ["${githubRepo.language?.toLowerCase() || 'code'}", "github"]
---

## Problem

This project addresses the need for ${githubRepo.description || 'a specific solution'}.

## Solution

The solution involves ${githubRepo.description || 'implementing a comprehensive approach'}.

## Architecture

Built using ${githubRepo.language || 'various technologies'} with a focus on ${githubRepo.description || 'quality and maintainability'}.

## Outcomes

- Repository has ${githubRepo.stargazers_count} stars
- ${githubRepo.forks_count} forks
- Last updated: ${new Date(githubRepo.updated_at).toLocaleDateString()}

## Lessons Learned

This project provided valuable experience in ${githubRepo.language || 'software development'}.
`;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const source = args[0] || 'template';
  const output = args[1] || 'content';
  const dryRun = args.includes('--dry-run');
  const overwrite = args.includes('--overwrite');

  await generateContent({ source, output, dryRun, overwrite });
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  });
}

// Export for use in other scripts
export { generateContent, generateFromTemplate };
