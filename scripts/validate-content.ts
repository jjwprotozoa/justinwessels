#!/usr/bin/env tsx

/**
 * Content Validation Script
 * 
 * This script validates all content files for:
 * 1. Frontmatter schema compliance
 * 2. Required fields
 * 3. Data types and formats
 * 4. Content structure
 * 5. Image references
 */

import { existsSync, readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { z } from 'zod';

// Content schemas
const CaseStudyFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  stack: z.array(z.string()).min(1),
  roles: z.array(z.string()).min(1),
  date: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]).transform(val => 
    val instanceof Date ? val.toISOString().split('T')[0] : val
  ),
  updated: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]).transform(val => 
    val instanceof Date ? val.toISOString().split('T')[0] : val
  ),
  outcomes: z.array(z.string()).min(1),
  keywords: z.array(z.string()).min(1),
});

const ProjectManifestSchema = z.object({
  title: z.string().optional(),
  status: z.enum(['complete', 'in-progress', 'archived', 'mvp']).optional(),
  tier: z.enum(['flagship', 'mvp', 'experiment']).optional(),
  stack: z.union([z.array(z.string()), z.string()]).optional().transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()) : val
  ),
  roles: z.union([z.array(z.string()), z.string()]).optional().transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()) : val
  ),
  live_url: z.string().optional(),
  demo_url: z.string().optional(),
  repo_url: z.string().optional(),
  homepage_url: z.string().optional(),
  highlights: z.union([z.array(z.string()), z.string()]).optional().transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()) : val
  ),
  metrics: z.union([z.record(z.union([z.number(), z.string()])), z.string()]).optional().transform(val => 
    typeof val === 'string' ? {} : val
  ),
  topics: z.union([z.array(z.string()), z.string()]).optional().transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()) : val
  ),
});

interface ValidationResult {
  file: string;
  type: 'case-study' | 'project-manifest';
  status: 'valid' | 'invalid' | 'error';
  errors: string[];
  warnings: string[];
}

async function validateContent() {
  console.log('📋 Content Validation\n');

  const results: ValidationResult[] = [];
  
  // Validate case studies
  console.log('🔍 Validating case studies...');
  const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
  
  if (existsSync(caseStudiesDir)) {
    const caseStudyFiles = readdirSync(caseStudiesDir)
      .filter(file => file.endsWith('.mdx'));
    
    for (const file of caseStudyFiles) {
      const result = await validateCaseStudy(join(caseStudiesDir, file));
      results.push(result);
    }
  } else {
    console.log('⚠️  Case studies directory not found');
  }

  // Validate project manifests
  console.log('🔍 Validating project manifests...');
  const templatesDir = join(process.cwd(), 'templates');
  
  if (existsSync(templatesDir)) {
    const manifestFiles = readdirSync(templatesDir)
      .filter(file => file.endsWith('-manifest.yml'));
    
    for (const file of manifestFiles) {
      const result = await validateProjectManifest(join(templatesDir, file));
      results.push(result);
    }
  } else {
    console.log('⚠️  Templates directory not found');
  }

  // Display results
  console.log('\n📊 Validation Results:\n');
  
  let validCount = 0;
  let invalidCount = 0;
  let errorCount = 0;

  results.forEach(result => {
    const icon = result.status === 'valid' ? '✅' : result.status === 'invalid' ? '❌' : '⚠️';
    console.log(`${icon} ${result.file} (${result.type})`);
    
    if (result.errors.length > 0) {
      result.errors.forEach(error => console.log(`   ❌ ${error}`));
    }
    
    if (result.warnings.length > 0) {
      result.warnings.forEach(warning => console.log(`   ⚠️  ${warning}`));
    }
    
    if (result.status === 'valid') validCount++;
    else if (result.status === 'invalid') invalidCount++;
    else errorCount++;
  });

  console.log(`\n📈 Summary:`);
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ❌ Invalid: ${invalidCount}`);
  console.log(`   ⚠️  Errors: ${errorCount}`);
  console.log(`   📁 Total: ${results.length}`);

  if (invalidCount > 0 || errorCount > 0) {
    console.log('\n❌ Content validation failed. Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ All content is valid!');
  }
}

async function validateCaseStudy(filePath: string): Promise<ValidationResult> {
  const result: ValidationResult = {
    file: filePath.split('/').pop() || filePath,
    type: 'case-study',
    status: 'valid',
    errors: [],
    warnings: []
  };

  try {
    const content = readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    // Validate frontmatter
    const validation = CaseStudyFrontmatterSchema.safeParse(data);
    if (!validation.success) {
      result.status = 'invalid';
      validation.error.errors.forEach(error => {
        result.errors.push(`${error.path.join('.')}: ${error.message}`);
      });
    }

    // Additional validations
    if (body.trim().length === 0) {
      result.warnings.push('Content body is empty');
    }

    // Check for required sections
    const requiredSections = ['## Problem', '## Solution', '## Architecture', '## Outcomes'];
    const missingSections = requiredSections.filter(section => 
      !body.includes(section)
    );
    
    if (missingSections.length > 0) {
      result.warnings.push(`Missing sections: ${missingSections.join(', ')}`);
    }

    // Check for image references
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    const images = [...body.matchAll(imageRegex)].map(match => match[1]);
    
    if (images.length > 0) {
      result.warnings.push(`Found ${images.length} image reference(s): ${images.join(', ')}`);
    }

    // Check date validity
    if (data.date && data.updated) {
      const date = new Date(data.date);
      const updated = new Date(data.updated);
      
      if (isNaN(date.getTime())) {
        result.errors.push('Invalid date format');
      }
      
      if (isNaN(updated.getTime())) {
        result.errors.push('Invalid updated date format');
      }
      
      if (updated < date) {
        result.warnings.push('Updated date is before creation date');
      }
    }

  } catch (error) {
    result.status = 'error';
    result.errors.push(`Failed to read file: ${error}`);
  }

  return result;
}

async function validateProjectManifest(filePath: string): Promise<ValidationResult> {
  const result: ValidationResult = {
    file: filePath.split('/').pop() || filePath,
    type: 'project-manifest',
    status: 'valid',
    errors: [],
    warnings: []
  };

  try {
    const content = readFileSync(filePath, 'utf8');
    
    // Parse YAML (simple parsing for validation)
    const lines = content.split('\n');
    const data: any = {};
    
    for (const line of lines) {
      if (line.includes(':')) {
        const [key, value] = line.split(':', 2);
        const cleanKey = key.trim();
        const cleanValue = value.trim();
        
        if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
          // Array value
          data[cleanKey] = cleanValue.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        } else if (cleanValue.startsWith('{') && cleanValue.endsWith('}')) {
          // Object value (skip for now)
          data[cleanKey] = {};
        } else {
          // String value
          data[cleanKey] = cleanValue.replace(/['"]/g, '');
        }
      }
    }

    // Validate schema
    const validation = ProjectManifestSchema.safeParse(data);
    if (!validation.success) {
      result.status = 'invalid';
      validation.error.errors.forEach(error => {
        result.errors.push(`${error.path.join('.')}: ${error.message}`);
      });
    }

    // Additional validations
    if (data.status && !['complete', 'in-progress', 'archived'].includes(data.status)) {
      result.errors.push('Invalid status value');
    }

    if (data.tier && !['flagship', 'mvp', 'experiment'].includes(data.tier)) {
      result.errors.push('Invalid tier value');
    }

    // Check for required fields based on status
    if (data.status === 'complete' && !data.live_url) {
      result.warnings.push('Complete projects should have a live_url');
    }

  } catch (error) {
    result.status = 'error';
    result.errors.push(`Failed to parse YAML: ${error}`);
  }

  return result;
}

// Run the script
if (require.main === module) {
  validateContent().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

export { validateContent };
