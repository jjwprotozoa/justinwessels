#!/usr/bin/env tsx

/**
 * Simple Content Generation Script
 * 
 * This script generates content from templates and data sources
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

async function generateContent() {
  console.log('🎨 Content Generation\n');

  // Create output directories
  const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
  const manifestsDir = join(process.cwd(), 'content', 'manifests');
  
  if (!existsSync(caseStudiesDir)) {
    mkdirSync(caseStudiesDir, { recursive: true });
    console.log(`✅ Created directory: ${caseStudiesDir}`);
  }
  
  if (!existsSync(manifestsDir)) {
    mkdirSync(manifestsDir, { recursive: true });
    console.log(`✅ Created directory: ${manifestsDir}`);
  }

  // Generate sample case study
  const sampleCaseStudy = `---
slug: sample-project
title: Sample Project - Web Application
stack: ["React", "TypeScript", "Node.js"]
roles: ["Full-stack Developer", "Product Manager"]
date: 2024-01-15
updated: 2024-01-15
outcomes:
  - "Increased user productivity by 40%"
  - "Reduced task completion time by 25%"
keywords: ["react", "typescript", "web-app"]
---

## Problem

Users needed a way to manage their tasks efficiently and collaborate with team members.

## Solution

Built a comprehensive task management application with real-time updates and collaboration features.

## Architecture

Frontend built with React and TypeScript, backend with Node.js and Express, real-time updates with WebSockets.

## Outcomes

- Increased user productivity by 40%
- Reduced task completion time by 25%
- 95% user satisfaction rating

## Lessons Learned

Learned the importance of user feedback in the development process and the value of real-time collaboration features.
`;

  const caseStudyPath = join(caseStudiesDir, 'sample-project.mdx');
  writeFileSync(caseStudyPath, sampleCaseStudy);
  console.log(`✅ Generated case study: ${caseStudyPath}`);

  // Generate sample project manifest
  const sampleManifest = `title: Sample Project
status: complete
tier: flagship
stack:
  - React
  - TypeScript
  - Node.js
roles:
  - Full-stack Developer
  - Product Manager
live_url: https://sample.example.com
highlights:
  - Real-time collaboration
  - User-friendly interface
  - Scalable architecture
topics:
  - react
  - typescript
  - web-app
`;

  const manifestPath = join(manifestsDir, 'sample-project-manifest.yml');
  writeFileSync(manifestPath, sampleManifest);
  console.log(`✅ Generated manifest: ${manifestPath}`);

  console.log('\n✅ Content generation completed!');
}

// Run the script
if (require.main === module) {
  generateContent().catch(error => {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  });
}

export { generateContent };
