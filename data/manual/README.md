# Manual Project Entries

This directory contains YAML files for projects that don't have GitHub repositories but should still appear in the portfolio.

## File Format

Each file should be named `<slug>.yml` and follow the same schema as `.project-manifest.yml` files, with the addition of a `slug` field if not inferable from the filename.

## Required Fields

- `slug`: Project identifier (can be omitted if filename matches)
- `title`: Project name
- `source`: Must be set to `"manual"`
- `include`: Whether to include in portfolio (default: `true`)
- `visibility`: Where to show the project (default: `"ventures"`)
- `status`: Project status (default: `"in-progress"`)
- `tier`: Project tier (default: `"mvp"`)
- `topics`: Must include `portfolio:include` to be visible

## Example

```yaml
slug: my-project
title: My Project
source: manual
include: true
visibility: ventures
status: in-progress
tier: mvp
roles: [Founder]
homepage_url: https://myproject.com
highlights:
  - Key feature 1
  - Key feature 2
topics: [portfolio:include, domain:saas, health]
```

## Adding New Projects

1. Create a new `<slug>.yml` file in this directory
2. Fill in the required fields following the schema
3. Commit the changes
4. The build process will automatically include it in the portfolio
