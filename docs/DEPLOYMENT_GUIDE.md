# Deployment Guide

This guide walks you through deploying the Justin Wessels portfolio to Vercel with all features enabled.

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier works)
- Node.js 18+ installed locally

## Step 1: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "feat: complete portfolio implementation"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Build Settings**:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

## Step 2: Configure Environment Variables

### Required Environment Variables

1. **In Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add the following variables:

   | Variable           | Value                              | Description                   |
   | ------------------ | ---------------------------------- | ----------------------------- |
   | `SITE_URL`         | `https://justinwessels.vercel.app` | Your deployed site URL        |
   | `REVALIDATE_TOKEN` | `your-secure-random-token`         | Secret token for revalidation |

2. **Generate REVALIDATE_TOKEN**:
   ```bash
   # Generate a secure random token
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## Step 3: Configure GitHub Secrets

1. **Go to GitHub Repository**:
   - Navigate to Settings → Secrets and variables → Actions

2. **Add Required Secrets**:
   - `GH_TOKEN`: GitHub Personal Access Token with repo access
   - `REVALIDATE_URL`: `https://justinwessels.vercel.app/api/revalidate`
   - `REVALIDATE_TOKEN`: Same value as set in Vercel

### Creating GitHub Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (for private repositories)
   - `public_repo` (for public repositories)
4. Copy the token and add it as `GH_TOKEN` secret

## Step 4: Test Deployment

### 1. Verify Basic Deployment

- Visit your deployed URL
- Check that all pages load correctly
- Verify project cards display properly

### 2. Test API Endpoints

```bash
# Test case studies API
curl https://justinwessels.vercel.app/api/case-studies/slugs

# Test revalidation endpoint (should return 401 without token)
curl -X POST https://justinwessels.vercel.app/api/revalidate
```

### 3. Test Dynamic Features

- Visit `/og/ruvoplay` to test OG image generation
- Check `/feed.xml` for RSS feed
- Verify `/sitemap.xml` is generated

## Step 5: Enable Auto-Revalidation

### 1. Test GitHub Action

- Make a small change to trigger the GitHub Action
- Check that `projects.json` gets updated
- Verify the revalidation endpoint is called

### 2. Verify Revalidation

- Check Vercel function logs for revalidation calls
- Confirm pages update automatically after GitHub Action runs

## Step 6: Add Project Manifests

### 1. Copy Templates

```bash
# Copy manifest templates to your repositories
cp templates/ruvoplayer-manifest.yml /path/to/ruvoplayer/.project-manifest.yml
cp templates/zeroforms-manifest.yml /path/to/zeroforms/.project-manifest.yml
# ... repeat for other projects
```

### 2. Customize Manifests

- Edit each `.project-manifest.yml` file
- Update URLs, metrics, and highlights
- Commit and push to repositories

### 3. Run Topics Backfill

```bash
# Set your GitHub token
export GITHUB_TOKEN=your_token_here

# Run the backfill script
npm run backfill:topics
```

## Step 7: Final Verification

### 1. Check All Features

- [ ] Homepage loads with featured projects
- [ ] Projects page shows all projects with filters
- [ ] Project detail pages display case studies
- [ ] GitHub shields load on project cards
- [ ] Docs links appear when available
- [ ] RSS feed is accessible
- [ ] Sitemap is generated
- [ ] OG images generate correctly

### 2. Test Performance

- Run Lighthouse audit
- Check Core Web Vitals
- Verify mobile responsiveness

### 3. SEO Verification

- Check meta tags on all pages
- Verify structured data (JSON-LD)
- Test social media sharing

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Errors**:
   - Verify environment variables are set
   - Check Vercel function logs
   - Ensure CORS headers are configured

3. **Revalidation Not Working**:
   - Verify `REVALIDATE_TOKEN` matches in both Vercel and GitHub
   - Check GitHub Action logs
   - Test revalidation endpoint manually

4. **Missing Projects**:
   - Ensure GitHub token has proper permissions
   - Check repository visibility settings
   - Verify manifest files are properly formatted

### Getting Help

- Check Vercel function logs in dashboard
- Review GitHub Action logs in repository
- Test locally with `npm run dev`
- Verify environment variables are set correctly

## Next Steps

After successful deployment:

1. **Customize Content**: Update personal information, project details
2. **Add Real Projects**: Replace placeholder data with actual projects
3. **Monitor Performance**: Set up analytics and monitoring
4. **Regular Updates**: Keep project data current with GitHub Actions

## Security Notes

- Never commit tokens or secrets to repository
- Use environment variables for all sensitive data
- Regularly rotate API tokens
- Monitor access logs for suspicious activity
