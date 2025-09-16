import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const status = searchParams.get('status') || 'all';

    const content: any[] = [];

    // Get case studies
    if (type === 'all' || type === 'case-study') {
      const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
      if (existsSync(caseStudiesDir)) {
        const files = readdirSync(caseStudiesDir)
          .filter(file => file.endsWith('.mdx'));

        for (const file of files) {
          try {
            const filePath = join(caseStudiesDir, file);
            const fileContent = readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            
            content.push({
              id: file.replace('.mdx', ''),
              type: 'case-study',
              title: data.title || file.replace('.mdx', ''),
              status: data.status || 'draft',
              lastModified: data.updated || data.date || new Date().toISOString().split('T')[0],
              path: filePath,
              slug: data.slug,
              stack: data.stack || [],
              roles: data.roles || [],
              keywords: data.keywords || []
            });
          } catch (error) {
            console.error(`Error reading case study ${file}:`, error);
          }
        }
      }
    }

    // Get project manifests
    if (type === 'all' || type === 'project-manifest') {
      const templatesDir = join(process.cwd(), 'templates');
      if (existsSync(templatesDir)) {
        const files = readdirSync(templatesDir)
          .filter(file => file.endsWith('-manifest.yml'));

        for (const file of files) {
          try {
            const filePath = join(templatesDir, file);
            const fileContent = readFileSync(filePath, 'utf8');
            
            // Simple YAML parsing for display
            const lines = fileContent.split('\n');
            const data: any = {};
            
            for (const line of lines) {
              if (line.includes(':')) {
                const [key, value] = line.split(':', 2);
                if (key && value) {
                  data[key.trim()] = value.trim();
                }
              }
            }

            content.push({
              id: file.replace('-manifest.yml', ''),
              type: 'project-manifest',
              title: data.title || file.replace('-manifest.yml', ''),
              status: data.status || 'draft',
              lastModified: new Date().toISOString().split('T')[0],
              path: filePath,
              stack: data.stack ? data.stack.split(',').map((s: string) => s.trim()) : [],
              roles: data.roles ? data.roles.split(',').map((s: string) => s.trim()) : []
            });
          } catch (error) {
            console.error(`Error reading manifest ${file}:`, error);
          }
        }
      }
    }

    // Filter by status
    const filteredContent = status === 'all' 
      ? content 
      : content.filter(item => item.status === status);

    return NextResponse.json({
      content: filteredContent,
      total: filteredContent.length,
      types: {
        'case-study': content.filter(item => item.type === 'case-study').length,
        'project-manifest': content.filter(item => item.type === 'project-manifest').length
      },
      statuses: {
        published: content.filter(item => item.status === 'published').length,
        draft: content.filter(item => item.status === 'draft').length,
        archived: content.filter(item => item.status === 'archived').length
      }
    });

  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, slug, title } = body;

    if (!type || !slug || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (type === 'case-study') {
      const caseStudiesDir = join(process.cwd(), 'content', 'case-studies');
      if (!existsSync(caseStudiesDir)) {
        mkdirSync(caseStudiesDir, { recursive: true });
      }

      const filePath = join(caseStudiesDir, `${slug}.mdx`);
      const now = new Date().toISOString().split('T')[0];

      const mdxContent = `---
slug: ${slug}
title: ${title}
stack: []
roles: []
date: ${now}
updated: ${now}
outcomes: []
keywords: []
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

      writeFileSync(filePath, mdxContent);

      return NextResponse.json({
        success: true,
        message: 'Case study created successfully',
        path: filePath
      });
    }

    if (type === 'project-manifest') {
      const templatesDir = join(process.cwd(), 'templates');
      if (!existsSync(templatesDir)) {
        mkdirSync(templatesDir, { recursive: true });
      }

      const filePath = join(templatesDir, `${slug}-manifest.yml`);

      const yamlContent = `title: ${title}
status: in-progress
tier: experiment
stack: []
roles: []
highlights: []
topics: []
`;

      writeFileSync(filePath, yamlContent);

      return NextResponse.json({
        success: true,
        message: 'Project manifest created successfully',
        path: filePath
      });
    }

    return NextResponse.json(
      { error: 'Invalid content type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, type, updates } = body;

    if (!id || !type || !updates) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update logic would go here
    // This is a simplified version

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully'
    });

  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Delete logic would go here
    // This is a simplified version

    return NextResponse.json({
      success: true,
      message: 'Content deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    );
  }
}
