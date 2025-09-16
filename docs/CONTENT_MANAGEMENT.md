# Content Management Guide

This guide covers managing content for the portfolio, including case studies, project manifests, and content validation.

## Overview

The portfolio supports rich content management with:

- **MDX Support**: Markdown with JSX for rich content rendering
- **Content Validation**: Schema validation and linting
- **Content Migration**: Tools for moving and updating content
- **Content Generation**: Automated content creation from templates
- **Content API**: RESTful API for content management

## Content Types

### 1. Case Studies

Case studies are detailed project documentation stored as MDX files in `content/case-studies/`.

**File Structure:**

```
content/case-studies/
├── ruvoplay.mdx
├── zeroforms.mdx
├── codm-squadup.mdx
└── ...
```

**Frontmatter Schema:**

```yaml
---
slug: project-name
title: Project Title
stack: ['React', 'TypeScript', 'Node.js']
roles: ['Full-stack Developer', 'Product Manager']
date: 2024-01-15
updated: 2024-01-15
outcomes:
  - 'Outcome 1'
  - 'Outcome 2'
keywords: ['keyword1', 'keyword2']
---
```

**Content Sections:**

- Problem: What problem does this solve?
- Solution: How did you solve it?
- Architecture: Technical details and decisions
- Outcomes: Measurable results and impact
- Lessons Learned: Key insights and takeaways

### 2. Project Manifests

Project manifests are YAML files that define project metadata for repositories.

**File Structure:**

```
templates/
├── ruvoplayer-manifest.yml
├── zeroforms-manifest.yml
└── ...
```

**Schema:**

```yaml
title: Project Name
status: complete # complete, in-progress, archived
tier: flagship # flagship, mvp, experiment
stack:
  - React
  - TypeScript
  - Node.js
roles:
  - Full-stack Developer
  - Product Manager
live_url: https://example.com
demo_url: https://demo.example.com
repo_url: https://github.com/user/repo
homepage_url: https://project.example.com
highlights:
  - Key feature 1
  - Key feature 2
metrics:
  users: 1000
  revenue: '$10k MRR'
topics:
  - react
  - typescript
  - saas
```

## Content Management Tools

### 1. Content Validation

Validate all content files for schema compliance and data integrity:

```bash
# Validate all content
npm run content:validate

# Validate specific type
npm run content:validate -- --type case-study
```

**Validation Checks:**

- Frontmatter schema compliance
- Required fields present
- Data types and formats correct
- Content structure valid
- Image references exist
- Date formats valid

### 2. Content Migration

Migrate content between formats and locations:

```bash
# Migrate all content
npm run content:migrate migrate

# Dry run migration
npm run content:migrate migrate --dry-run

# Create new case study
npm run content:migrate create my-project "My Project Title"

# Update existing case study
npm run content:migrate update my-project
```

**Migration Features:**

- Template-based content creation
- Bulk content operations
- Format conversion
- Backup and restore
- Content validation

### 3. Content Generation

Generate content from templates and data sources:

```bash
# Generate from templates
npm run content:generate template

# Generate from GitHub
npm run content:generate github

# Generate manually
npm run content:generate manual

# Dry run generation
npm run content:generate template --dry-run
```

**Generation Sources:**

- **Templates**: Create content from predefined templates
- **GitHub**: Generate from repository data
- **Manual**: Interactive content creation

## Content Management API

### Endpoints

#### GET /api/content

Fetch all content with filtering options.

**Query Parameters:**

- `type`: Filter by content type (`case-study`, `project-manifest`, `all`)
- `status`: Filter by status (`draft`, `published`, `archived`, `all`)

**Response:**

```json
{
  "content": [
    {
      "id": "ruvoplay",
      "type": "case-study",
      "title": "Ruvo Play - Multi-device subscription manager",
      "status": "published",
      "lastModified": "2024-01-15",
      "path": "/content/case-studies/ruvoplay.mdx",
      "slug": "ruvoplay",
      "stack": ["React", "TypeScript"],
      "roles": ["Full-stack Developer"],
      "keywords": ["saas", "streaming"]
    }
  ],
  "total": 1,
  "types": {
    "case-study": 1,
    "project-manifest": 0
  },
  "statuses": {
    "published": 1,
    "draft": 0,
    "archived": 0
  }
}
```

#### POST /api/content

Create new content.

**Request Body:**

```json
{
  "type": "case-study",
  "slug": "my-project",
  "title": "My Project Title",
  "content": "Optional content data"
}
```

#### PUT /api/content

Update existing content.

**Request Body:**

```json
{
  "id": "my-project",
  "type": "case-study",
  "updates": {
    "title": "Updated Title",
    "status": "published"
  }
}
```

#### DELETE /api/content

Delete content.

**Query Parameters:**

- `id`: Content ID
- `type`: Content type

## Content Management Dashboard

Access the content management dashboard at `/content` to:

- **View All Content**: Browse case studies and project manifests
- **Filter and Search**: Find content by type, status, or keywords
- **Create Content**: Generate new case studies and manifests
- **Edit Content**: Update existing content
- **Manage Status**: Change content status (draft, published, archived)
- **Export Content**: Download content files
- **View Statistics**: Content metrics and analytics

## Best Practices

### 1. Content Structure

- **Use Clear Titles**: Descriptive and SEO-friendly titles
- **Consistent Formatting**: Follow the established frontmatter schema
- **Rich Descriptions**: Provide detailed problem/solution narratives
- **Measurable Outcomes**: Include quantifiable results and metrics
- **Regular Updates**: Keep content current and relevant

### 2. Content Quality

- **Proofread Content**: Check for spelling and grammar errors
- **Validate Data**: Use the validation tools before publishing
- **Test Links**: Ensure all URLs are working and accessible
- **Optimize Images**: Use appropriate formats and sizes
- **SEO Optimization**: Include relevant keywords and meta descriptions

### 3. Content Workflow

- **Draft First**: Create content in draft status initially
- **Review Process**: Have content reviewed before publishing
- **Version Control**: Use Git for content versioning
- **Backup Regularly**: Keep backups of important content
- **Monitor Performance**: Track content engagement and metrics

### 4. Content Maintenance

- **Regular Audits**: Review content periodically for accuracy
- **Update Timestamps**: Keep last modified dates current
- **Archive Old Content**: Move outdated content to archived status
- **Clean Up**: Remove unused or duplicate content
- **Documentation**: Keep content management processes documented

## Troubleshooting

### Common Issues

1. **Validation Errors**:
   - Check frontmatter schema compliance
   - Verify required fields are present
   - Ensure data types are correct

2. **Content Not Loading**:
   - Check file paths and permissions
   - Verify content format is valid
   - Check for syntax errors in MDX

3. **Migration Failures**:
   - Ensure source files exist and are accessible
   - Check target directory permissions
   - Verify content format compatibility

4. **Generation Issues**:
   - Check template files exist
   - Verify data source connectivity
   - Review generation parameters

### Getting Help

- Check content validation logs
- Review API error responses
- Test content locally before deployment
- Consult documentation for schema requirements

## Content Templates

### Case Study Template

```mdx
---
slug: project-name
title: Project Title
stack: ['Technology 1', 'Technology 2']
roles: ['Role 1', 'Role 2']
date: YYYY-MM-DD
updated: YYYY-MM-DD
outcomes:
  - 'Outcome 1'
  - 'Outcome 2'
keywords: ['keyword1', 'keyword2']
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
```

### Project Manifest Template

```yaml
title: Project Name
status: in-progress # complete, in-progress, archived
tier: experiment # flagship, mvp, experiment
stack:
  - Technology 1
  - Technology 2
roles:
  - Role 1
  - Role 2
live_url: https://example.com
demo_url: https://demo.example.com
repo_url: https://github.com/user/repo
homepage_url: https://project.example.com
highlights:
  - Key feature 1
  - Key feature 2
metrics:
  users: 1000
  revenue: '$10k MRR'
topics:
  - topic1
  - topic2
```

## Next Steps

After setting up content management:

1. **Create Initial Content**: Generate your first case studies and manifests
2. **Set Up Workflow**: Establish content creation and review processes
3. **Train Team**: Ensure team members understand content management
4. **Monitor Quality**: Use validation tools to maintain content quality
5. **Iterate and Improve**: Continuously improve content management processes
