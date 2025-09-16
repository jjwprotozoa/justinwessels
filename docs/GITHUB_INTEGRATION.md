# GitHub Integration Guide

This guide covers setting up and managing GitHub integration for the portfolio project, including workflows, branch protection, and automation.

## Overview

The portfolio uses GitHub for:

- **Source Control**: Code versioning and collaboration
- **CI/CD**: Automated testing, building, and deployment
- **Project Management**: Issues, pull requests, and project boards
- **Automation**: Auto-updating project data and site revalidation

## Prerequisites

- GitHub account with repository access
- GitHub Personal Access Token with appropriate permissions
- Repository with the portfolio code

## Required Permissions

Your GitHub token needs these permissions:

- `repo` - Full repository access
- `workflow` - Update GitHub Actions workflows
- `write:packages` - Write packages (if using GitHub Packages)
- `admin:org` - Organization administration (if applicable)

## Setup Process

### 1. Quick Setup

Run the automated setup script:

```bash
# Set your GitHub token
export GH_TOKEN=your_github_token_here

# Run the setup script
npm run github:setup
```

This will:

- Validate your GitHub token
- Check repository access
- Verify required files exist
- Check branch protection status
- Provide next steps

### 2. Manual Setup

If you prefer manual setup or need to troubleshoot:

#### A. Create GitHub Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Actions workflows)
   - `write:packages` (Write packages)
4. Copy the token and save it securely

#### B. Configure Repository Secrets

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these secrets:

| Secret Name        | Value                                         | Description                   |
| ------------------ | --------------------------------------------- | ----------------------------- |
| `GH_TOKEN`         | `your_github_token`                           | GitHub Personal Access Token  |
| `REVALIDATE_URL`   | `https://your-site.vercel.app/api/revalidate` | Vercel revalidation endpoint  |
| `REVALIDATE_TOKEN` | `your_secure_token`                           | Secret token for revalidation |

#### C. Enable Branch Protection

1. Go to Settings → Branches
2. Click "Add rule" for the main branch
3. Configure:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

#### D. Configure Repository Settings

1. Go to Settings → General
2. Enable:
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki (optional)
   - ✅ Discussions (optional)

## Workflows

### 1. Build Projects JSON (`build-projects.yml`)

**Triggers:**

- Push to main branch
- Daily at 6 AM UTC
- Manual trigger

**What it does:**

- Fetches latest project data from GitHub
- Builds `projects.json`
- Commits changes back to repository
- Triggers site revalidation

**Configuration:**

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 6 * * *' # Daily at 6 AM UTC
  workflow_dispatch: # Manual trigger
```

### 2. CI Pipeline (`ci.yml`)

**Triggers:**

- Push to main/develop branches
- Pull requests to main/develop

**What it does:**

- Type checking
- Linting
- Format checking
- Build verification
- Security audit

### 3. Deploy Preview (`deploy-preview.yml`)

**Triggers:**

- Pull requests to main branch

**What it does:**

- Builds the application
- Comments on PR with build status
- Provides deployment information

## Branch Strategy

### Main Branch

- **Purpose**: Production-ready code
- **Protection**: Required PR reviews, status checks
- **Deployment**: Auto-deploys to production

### Develop Branch

- **Purpose**: Integration branch for features
- **Protection**: Required PR reviews, status checks
- **Deployment**: Auto-deploys to staging (if configured)

### Feature Branches

- **Naming**: `feature/description` or `fix/description`
- **Purpose**: Individual features or bug fixes
- **Protection**: None (merged via PR)

## Issue Templates

### Bug Report Template

- **File**: `.github/ISSUE_TEMPLATE/bug_report.yml`
- **Purpose**: Standardized bug reporting
- **Fields**: Description, steps to reproduce, expected vs actual behavior

### Feature Request Template

- **File**: `.github/ISSUE_TEMPLATE/feature_request.yml`
- **Purpose**: Standardized feature requests
- **Fields**: Description, problem/solution, use cases, priority

## Pull Request Template

- **File**: `.github/pull_request_template.md`
- **Purpose**: Standardized PR descriptions
- **Sections**: Description, type of change, testing, checklist

## Automation Features

### 1. Auto-Update Projects

- **Frequency**: Daily at 6 AM UTC
- **Process**: Fetches GitHub data → Builds JSON → Commits → Revalidates site
- **Configuration**: `build-projects.yml`

### 2. Site Revalidation

- **Trigger**: After project data updates
- **Process**: Calls Vercel revalidation endpoint
- **Result**: Site updates with latest data

### 3. PR Previews

- **Trigger**: Pull requests to main
- **Process**: Builds application → Comments on PR
- **Result**: Build status and deployment info

## Monitoring and Maintenance

### 1. Workflow Monitoring

- Check Actions tab for workflow runs
- Monitor for failures or errors
- Review logs for troubleshooting

### 2. Secret Rotation

- Rotate GitHub tokens regularly
- Update repository secrets when needed
- Monitor token usage and permissions

### 3. Branch Protection

- Review and update protection rules
- Ensure required checks are appropriate
- Monitor for bypassed protections

## Troubleshooting

### Common Issues

1. **Workflow Failures**:
   - Check GitHub token permissions
   - Verify repository secrets are set
   - Review workflow logs for specific errors

2. **Permission Errors**:
   - Ensure token has required scopes
   - Check repository access permissions
   - Verify organization settings

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript and linting errors

4. **Revalidation Failures**:
   - Verify REVALIDATE_TOKEN matches Vercel
   - Check REVALIDATE_URL is correct
   - Ensure Vercel deployment is active

### Getting Help

- Check GitHub Actions logs
- Review repository settings
- Test workflows manually
- Consult GitHub documentation

## Security Considerations

### 1. Token Security

- Use fine-grained tokens when possible
- Rotate tokens regularly
- Monitor token usage
- Never commit tokens to code

### 2. Repository Security

- Enable branch protection
- Require PR reviews
- Use status checks
- Monitor for security alerts

### 3. Workflow Security

- Use minimal permissions
- Validate inputs
- Avoid hardcoded secrets
- Review third-party actions

## Best Practices

### 1. Workflow Design

- Keep workflows focused and simple
- Use reusable workflows when possible
- Include proper error handling
- Add meaningful step names

### 2. Branch Management

- Use descriptive branch names
- Keep branches up to date
- Delete merged branches
- Use conventional commits

### 3. Issue Management

- Use templates consistently
- Label issues appropriately
- Link issues to PRs
- Close issues when resolved

## Next Steps

After setting up GitHub integration:

1. **Test Workflows**: Create a test PR to verify all workflows work
2. **Configure Notifications**: Set up notifications for workflow failures
3. **Monitor Performance**: Track workflow run times and optimize
4. **Document Changes**: Update documentation when making changes
5. **Regular Maintenance**: Review and update workflows regularly
