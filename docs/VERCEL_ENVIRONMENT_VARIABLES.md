# Vercel Environment Variables

This document outlines the required environment variables for the portfolio project.

## Required Variables

### REVALIDATE_TOKEN

- **Description**: Secret token for secure revalidation endpoint
- **Type**: String
- **Required**: Yes (for auto-revalidation feature)
- **Example**: `your-secure-random-token-here`
- **Usage**: Used by GitHub Actions to securely trigger page revalidation after project updates

## Setup Instructions

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `REVALIDATE_TOKEN` with a secure random string
   - Deploy the changes

2. **In GitHub Repository:**
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `REVALIDATE_URL`: Your Vercel deployment URL + `/api/revalidate`
       - Example: `https://your-portfolio.vercel.app/api/revalidate`
     - `REVALIDATE_TOKEN`: Same value as set in Vercel

## How It Works

1. GitHub Action runs and updates `projects.json`
2. After successful commit, it calls the revalidation endpoint
3. The endpoint validates the token and revalidates all relevant pages
4. Your site automatically updates with the latest project data

## Security Notes

- The `REVALIDATE_TOKEN` should be a long, random string
- Never commit this token to your repository
- The revalidation endpoint will return 401 if the token doesn't match
- The GitHub Action will silently fail if secrets are not configured (optional feature)
