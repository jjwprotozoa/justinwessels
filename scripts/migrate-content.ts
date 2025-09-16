#!/usr/bin/env tsx

/**
 * Content Migration Script
 * 
 * This script helps migrate and manage content by:
 * 1. Creating new case studies from templates
 * 2. Updating existing content
 * 3. Migrating between formats
 * 4. Bulk content operations
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// Content schemas
const CaseStudyFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  stack: z.array(z.string()),
  roles: z.array(z.string()),
  date: z.string(),
  updated: z.string(),
  outcomes: z.array(z.string()),
  keywords: z.array(z.string()),
});

interface MigrationOptions {
  source?: string;
  target?: string;
  dryRun?: boolean;
  backup?: boolean;
}

async function migrateContent(options: MigrationOptions = {}) {
  console.log('🔄 Content Migration\n');

  const {
    source = 'templates',
    target = 'content',
    dryRun = false,
    backup = true
  } = options;

  console.log(`📁 Source: ${source}`);
  console.log(`📁 Target: ${target}`);
  console.log(`🔍 Dry run: ${dryRun ? 'Yes' : 'No'}`);
  console.log(`💾 Backup: ${backup ? 'Yes' : 'No'}\n`);

  // Create target directories if they don't exist
  if (!dryRun) {
    const caseStudiesDir = join(process.cwd(), target, 'case-studies');
    if (!existsSync(caseStudiesDir)) {
      mkdirSync(caseStudiesDir, { recursive: true });
      console.log(`✅ Created directory: ${caseStudiesDir}`);
    }
  }

  // Migrate case studies
  await migrateCaseStudies(source, target, dryRun, backup);
  
  // Migrate project manifests
  await migrateProjectManifests(source, target, dryRun, backup);

  console.log('\n✅ Content migration completed!');
}

async function migrateCaseStudies(source: string, target: string, dryRun: boolean, backup: boolean) {
  console.log('📝 Migrating case studies...');

  const sourceDir = join(process.cwd(), source, 'case-studies');
  const targetDir = join(process.cwd(), target, 'case-studies');

  if (!existsSync(sourceDir)) {
    console.log('⚠️  Source case studies directory not found');
    return;
  }

  const files = require('fs').readdirSync(sourceDir)
    .filter((file: string) => file.endsWith('.mdx'));

  for (const file of files) {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    console.log(`   📄 ${file}`);

    if (existsSync(targetPath) && backup) {
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      if (!dryRun) {
        require('fs').copyFileSync(targetPath, backupPath);
        console.log(`     💾 Backed up to: ${backupPath}`);
      }
    }

    if (!dryRun) {
      const content = readFileSync(sourcePath, 'utf8');
      writeFileSync(targetPath, content);
      console.log(`     ✅ Migrated to: ${targetPath}`);
    } else {
      console.log(`     🔍 Would migrate to: ${targetPath}`);
    }
  }
}

async function migrateProjectManifests(source: string, target: string, dryRun: boolean, backup: boolean) {
  console.log('📋 Migrating project manifests...');

  const sourceDir = join(process.cwd(), source, 'manifests');
  const targetDir = join(process.cwd(), target, 'manifests');

  if (!existsSync(sourceDir)) {
    console.log('⚠️  Source manifests directory not found');
    return;
  }

  if (!dryRun && !existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`✅ Created directory: ${targetDir}`);
  }

  const files = require('fs').readdirSync(sourceDir)
    .filter((file: string) => file.endsWith('.yml') || file.endsWith('.yaml'));

  for (const file of files) {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);

    console.log(`   📄 ${file}`);

    if (existsSync(targetPath) && backup) {
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      if (!dryRun) {
        require('fs').copyFileSync(targetPath, backupPath);
        console.log(`     💾 Backed up to: ${backupPath}`);
      }
    }

    if (!dryRun) {
      const content = readFileSync(sourcePath, 'utf8');
      writeFileSync(targetPath, content);
      console.log(`     ✅ Migrated to: ${targetPath}`);
    } else {
      console.log(`     🔍 Would migrate to: ${targetPath}`);
    }
  }
}

// Create new case study from template
async function createCaseStudy(slug: string, title: string, options: Partial<CaseStudyFrontmatterSchema> = {}) {
  console.log(`📝 Creating new case study: ${slug}`);

  const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
  const filePath = join(caseStudiesDir, `${slug}.mdx`);

  if (existsSync(filePath)) {
    console.log(`❌ Case study already exists: ${filePath}`);
    return;
  }

  const now = new Date().toISOString().split('T')[0];
  
  const frontmatter = {
    slug,
    title,
    stack: options.stack || [],
    roles: options.roles || [],
    date: now,
    updated: now,
    outcomes: options.outcomes || [],
    keywords: options.keywords || [],
  };

  const content = `---
slug: ${slug}
title: ${title}
stack: [${frontmatter.stack.map(s => `"${s}"`).join(', ')}]
roles: [${frontmatter.roles.map(r => `"${r}"`).join(', ')}]
date: ${frontmatter.date}
updated: ${frontmatter.updated}
outcomes:
${frontmatter.outcomes.map(o => `  - "${o}"`).join('\n')}
keywords: [${frontmatter.keywords.map(k => `"${k}"`).join(', ')}]
---

## Problem

Describe the problem this project solves...

## Solution

Explain your approach and solution...

## Architecture

Detail the technical architecture and key decisions...

## Outcomes

List the measurable outcomes and impact...

## Lessons Learned

Share key insights and learnings from this project...
`;

  if (!existsSync(caseStudiesDir)) {
    mkdirSync(caseStudiesDir, { recursive: true });
  }

  writeFileSync(filePath, content);
  console.log(`✅ Created case study: ${filePath}`);
}

// Update existing case study
async function updateCaseStudy(slug: string, updates: Partial<CaseStudyFrontmatterSchema>) {
  console.log(`📝 Updating case study: ${slug}`);

  const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
  const filePath = join(caseStudiesDir, `${slug}.mdx`);

  if (!existsSync(filePath)) {
    console.log(`❌ Case study not found: ${filePath}`);
    return;
  }

  const content = readFileSync(filePath, 'utf8');
  const { data, content: body } = require('gray-matter')(content);

  const updatedData = {
    ...data,
    ...updates,
    updated: new Date().toISOString().split('T')[0]
  };

  const updatedContent = `---
${Object.entries(updatedData).map(([key, value]) => {
  if (Array.isArray(value)) {
    return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
  }
  return `${key}: ${value}`;
}).join('\n')}
---

${body}`;

  writeFileSync(filePath, updatedContent);
  console.log(`✅ Updated case study: ${filePath}`);
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'migrate':
      const dryRun = args.includes('--dry-run');
      const backup = !args.includes('--no-backup');
      await migrateContent({ dryRun, backup });
      break;

    case 'create':
      const slug = args[1];
      const title = args[2];
      if (!slug || !title) {
        console.log('Usage: npm run content:migrate create <slug> <title>');
        process.exit(1);
      }
      await createCaseStudy(slug, title);
      break;

    case 'update':
      const updateSlug = args[1];
      if (!updateSlug) {
        console.log('Usage: npm run content:migrate update <slug>');
        process.exit(1);
      }
      // This would need more sophisticated argument parsing
      console.log('Update functionality requires more complex argument parsing');
      break;

    default:
      console.log('Available commands:');
      console.log('  migrate [--dry-run] [--no-backup]  - Migrate content');
      console.log('  create <slug> <title>              - Create new case study');
      console.log('  update <slug>                      - Update existing case study');
      break;
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}

export { createCaseStudy, migrateContent, updateCaseStudy };

