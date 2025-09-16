# Project Manifest Templates

This directory contains `.project-manifest.yml` templates for key repositories. These templates can be copied to the root of their respective repositories to provide enhanced metadata for the portfolio build process.

## Usage

1. Copy the appropriate template to your repository root
2. Rename it to `.project-manifest.yml`
3. Customize the values as needed
4. Commit and push to your repository

## Available Templates

### Portfolio Projects

- `ruvoplayer-manifest.yml` - Ruvo Play (flagship SaaS project)
- `zeroforms-manifest.yml` - ZeroForms (healthcare platform)
- `codm-squadup-manifest.yml` - CODM SquadUp (gaming MVP)
- `valora-tribute-manifest.yml` - Valora Vale Tribute (landing page)
- `curriculum-builder-manifest.yml` - Curriculum Builder (edtech experiment)

### Ventures

- `fluidinvestmentgroup-manifest.yml` - Fluid Investment Group (government contracting)
- `hoodiesforfaith-manifest.yml` - Hoodies for Faith (faith-based apparel)
- `mychildsmasterpiece-manifest.yml` - My Child's Masterpiece (art book publishing)
- `startupbusinesscentre-manifest.yml` - Startup Business Centre (business consultancy)
- `justinsflightdeals-manifest.yml` - Justin's Flight Deals (travel deals)

### Labs

- `contractnav-manifest.yml` - ContractNav (government contracting tool)

## Manifest Schema

```yaml
title: 'Project Name'
status: complete | in-progress | archived
tier: flagship | mvp | experiment
visibility: featured | portfolio | labs | ventures
stack: [React, TypeScript, Node.js]
roles: [Founder, Full-stack, Product]
live_url: https://myapp.com
demo_url: https://demo.myapp.com
homepage_url: https://github.com/user/repo
highlights:
  - 'Key feature 1'
  - 'Key feature 2'
metrics:
  users: 1000
  mrr: 5000
topics: [domain:saas, ai, automation]
```

## Field Descriptions

- **title**: Display name for the project
- **status**: Current development status
- **tier**: Project importance level (flagship = most important)
- **visibility**: Where the project appears (featured = homepage, portfolio = /projects, labs = /labs, ventures = /ventures)
- **stack**: Technologies used (array of strings)
- **roles**: Your role(s) in the project
- **live_url**: Production URL (if deployed)
- **demo_url**: Demo/staging URL (if available)
- **homepage_url**: Repository or project homepage
- **highlights**: Key features or achievements (array of strings)
- **metrics**: Quantifiable project metrics (object)
- **topics**: Categorization tags (array of strings)

## Visibility System

The `visibility` field determines where projects appear on the website:

- **featured**: Appears on the homepage (/) - your best work
- **portfolio**: Appears on /projects - general portfolio items
- **labs**: Appears on /labs - niche/sector-specific tools and experiments
- **ventures**: Appears on /ventures - businesses and external brands

**Default**: If not specified, defaults to `portfolio`.

## Topic Guidelines

Use these topic prefixes for automatic categorization:

- `domain:saas` - Software as a Service
- `domain:gaming` - Gaming applications
- `domain:edtech` - Educational technology
- `domain:ecom` - E-commerce
- `domain:health` - Healthcare
- `domain:business` - Business/consulting
- `domain:government` - Government contracting
- `domain:travel` - Travel industry
- `docs` - Has documentation
- `ai` - Uses artificial intelligence
- `automation` - Automated processes
