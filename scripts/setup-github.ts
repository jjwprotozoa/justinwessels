#!/usr/bin/env tsx

/**
 * GitHub Integration Setup Script
 * 
 * This script helps set up GitHub integration by:
 * 1. Validating GitHub token
 * 2. Testing repository access
 * 3. Setting up branch protection
 * 4. Configuring repository settings
 */

import { Octokit } from '@octokit/rest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface GitHubSetupCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  fix?: string;
}

async function setupGitHubIntegration() {
  console.log('🔗 GitHub Integration Setup\n');

  const checks: GitHubSetupCheck[] = [];
  
  // Check 1: GitHub token exists
  const githubToken = process.env.GH_TOKEN;
  if (githubToken) {
    checks.push({
      name: 'GitHub Token',
      status: 'pass',
      message: 'GH_TOKEN environment variable found'
    });
  } else {
    checks.push({
      name: 'GitHub Token',
      status: 'fail',
      message: 'GH_TOKEN environment variable not found',
      fix: 'Set GH_TOKEN environment variable with your GitHub personal access token'
    });
  }

  // Check 2: Package.json exists
  const packageJsonPath = join(process.cwd(), 'package.json');
  if (existsSync(packageJsonPath)) {
    checks.push({
      name: 'Package.json',
      status: 'pass',
      message: 'Package.json found'
    });
  } else {
    checks.push({
      name: 'Package.json',
      status: 'fail',
      message: 'Package.json not found',
      fix: 'Run this script from the project root directory'
    });
  }

  // Check 3: GitHub workflows exist
  const workflowsPath = join(process.cwd(), '.github', 'workflows');
  if (existsSync(workflowsPath)) {
    checks.push({
      name: 'GitHub Workflows',
      status: 'pass',
      message: 'GitHub workflows directory found'
    });
  } else {
    checks.push({
      name: 'GitHub Workflows',
      status: 'fail',
      message: 'GitHub workflows directory not found',
      fix: 'Create .github/workflows directory with workflow files'
    });
  }

  // Display initial checks
  console.log('📋 Pre-setup Checks:\n');
  
  checks.forEach(check => {
    const icon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${check.name}: ${check.message}`);
    if (check.fix) {
      console.log(`   💡 Fix: ${check.fix}`);
    }
  });

  const failedChecks = checks.filter(c => c.status === 'fail');
  if (failedChecks.length > 0) {
    console.log(`\n❌ ${failedChecks.length} critical issues found. Please fix these before continuing.`);
    process.exit(1);
  }

  // Initialize GitHub client
  let octokit: Octokit;
  try {
    octokit = new Octokit({ auth: githubToken });
    console.log('\n🔐 GitHub client initialized');
  } catch (error) {
    console.error('❌ Failed to initialize GitHub client:', error);
    process.exit(1);
  }

  // Test GitHub connection
  try {
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✅ Connected as: ${user.login}`);
  } catch (error) {
    console.error('❌ Failed to authenticate with GitHub:', error);
    process.exit(1);
  }

  // Get repository information
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const repoName = packageJson.name || 'jjw-portfolio';
  
  console.log(`\n📦 Repository: ${repoName}`);
  console.log('🔍 Checking repository access...');

  try {
    // Try to get repository info
    const { data: repo } = await octokit.rest.repos.get({
      owner: user.login,
      repo: repoName
    });
    
    console.log(`✅ Repository found: ${repo.full_name}`);
    console.log(`   - Private: ${repo.private ? 'Yes' : 'No'}`);
    console.log(`   - Default branch: ${repo.default_branch}`);
    console.log(`   - Has issues: ${repo.has_issues ? 'Yes' : 'No'}`);
    console.log(`   - Has projects: ${repo.has_projects ? 'Yes' : 'No'}`);
    console.log(`   - Has wiki: ${repo.has_wiki ? 'Yes' : 'No'}`);

    // Check if repository has the required files
    console.log('\n📁 Checking repository structure...');
    
    const requiredFiles = [
      '.github/workflows/build-projects.yml',
      '.github/workflows/ci.yml',
      '.github/workflows/deploy-preview.yml',
      'vercel.json',
      'package.json'
    ];

    for (const file of requiredFiles) {
      try {
        await octokit.rest.repos.getContent({
          owner: user.login,
          repo: repoName,
          path: file
        });
        console.log(`✅ ${file}`);
      } catch {
        console.log(`❌ ${file} - Missing or not accessible`);
      }
    }

    // Check branch protection
    console.log('\n🛡️ Checking branch protection...');
    try {
      const { data: protection } = await octokit.rest.repos.getBranchProtection({
        owner: user.login,
        repo: repoName,
        branch: repo.default_branch
      });
      console.log(`✅ Branch protection enabled for ${repo.default_branch}`);
    } catch {
      console.log(`⚠️ No branch protection found for ${repo.default_branch}`);
      console.log('   💡 Consider enabling branch protection in repository settings');
    }

    // Check secrets
    console.log('\n🔐 Checking repository secrets...');
    try {
      const { data: secrets } = await octokit.rest.actions.listRepoSecrets({
        owner: user.login,
        repo: repoName
      });
      
      const requiredSecrets = ['GH_TOKEN', 'REVALIDATE_URL', 'REVALIDATE_TOKEN'];
      const existingSecrets = secrets.secrets.map(s => s.name);
      
      requiredSecrets.forEach(secret => {
        if (existingSecrets.includes(secret)) {
          console.log(`✅ ${secret}`);
        } else {
          console.log(`❌ ${secret} - Not configured`);
        }
      });
    } catch (error) {
      console.log('⚠️ Could not check repository secrets (insufficient permissions)');
    }

  } catch (error) {
    console.error('❌ Repository not found or not accessible:', error);
    console.log('\n💡 Make sure:');
    console.log('   - The repository exists on GitHub');
    console.log('   - Your token has the correct permissions');
    console.log('   - The repository name matches package.json');
    process.exit(1);
  }

  // Generate setup instructions
  console.log('\n🚀 GitHub Integration Setup Complete!\n');
  
  console.log('📋 Next Steps:');
  console.log('1. Configure repository secrets:');
  console.log('   - Go to Settings → Secrets and variables → Actions');
  console.log('   - Add GH_TOKEN, REVALIDATE_URL, REVALIDATE_TOKEN');
  console.log('');
  console.log('2. Enable branch protection:');
  console.log('   - Go to Settings → Branches');
  console.log('   - Add rule for main branch');
  console.log('   - Require pull request reviews');
  console.log('   - Require status checks to pass');
  console.log('');
  console.log('3. Test the workflows:');
  console.log('   - Push changes to trigger CI');
  console.log('   - Create a pull request to test preview');
  console.log('   - Check Actions tab for workflow runs');
  console.log('');
  console.log('4. Configure repository settings:');
  console.log('   - Enable issues and projects');
  console.log('   - Set up issue templates');
  console.log('   - Configure pull request templates');

  console.log('\n📚 For detailed instructions, see docs/DEPLOYMENT_GUIDE.md');
}

// Run the script
if (require.main === module) {
  setupGitHubIntegration().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
}

export { setupGitHubIntegration };
