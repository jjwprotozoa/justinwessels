#!/usr/bin/env tsx

/**
 * GitHub Topics Backfill Script
 * 
 * This script allows you to set topics for selected repositories using the GitHub REST API.
 * It reads a local topics.json file that maps repository names to topics arrays.
 * 
 * Usage:
 * 1. Create a topics.json file with your repository mappings
 * 2. Set GITHUB_TOKEN environment variable
 * 3. Run: npx tsx scripts/backfill-topics.ts
 * 
 * Example topics.json:
 * {
 *   "ruvoplayer": ["portfolio:complete", "domain:saas", "react", "typescript"],
 *   "zeroforms": ["portfolio:in-progress", "domain:saas", "health", "forms"]
 * }
 */

import fs from 'fs';
import path from 'path';

interface TopicsConfig {
  [repoName: string]: string[];
}

const GITHUB_API_BASE = 'https://api.github.com';
const OWNER = 'jjwprotozoa'; // Change this to your GitHub username/organization

async function setRepositoryTopics(repoName: string, topics: string[]): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    return false;
  }

  const url = `${GITHUB_API_BASE}/repos/${OWNER}/${repoName}/topics`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.mercy-preview+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        names: topics
      })
    });

    if (response.ok) {
      console.log(`✅ Successfully set topics for ${repoName}:`, topics.join(', '));
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ Failed to set topics for ${repoName}:`, response.status, errorData.message || response.statusText);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error setting topics for ${repoName}:`, error);
    return false;
  }
}

async function backfillTopics() {
  console.log('🚀 Starting GitHub Topics Backfill...\n');

  // Check for GITHUB_TOKEN
  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    console.log('💡 Get a token from: https://github.com/settings/tokens');
    console.log('💡 Required scopes: repo (for private repos) or public_repo (for public repos)');
    process.exit(1);
  }

  // Load topics configuration
  const topicsPath = path.join(process.cwd(), 'topics.json');
  
  if (!fs.existsSync(topicsPath)) {
    console.error('❌ topics.json file not found');
    console.log('💡 Create a topics.json file with your repository mappings');
    console.log('💡 Example:');
    console.log(JSON.stringify({
      "ruvoplayer": ["portfolio:complete", "domain:saas", "react", "typescript"],
      "zeroforms": ["portfolio:in-progress", "domain:saas", "health", "forms"]
    }, null, 2));
    process.exit(1);
  }

  let topicsConfig: TopicsConfig;
  try {
    const topicsContent = fs.readFileSync(topicsPath, 'utf8');
    topicsConfig = JSON.parse(topicsContent);
  } catch (error) {
    console.error('❌ Failed to parse topics.json:', error);
    process.exit(1);
  }

  const repositories = Object.keys(topicsConfig);
  
  if (repositories.length === 0) {
    console.log('ℹ️  No repositories found in topics.json');
    return;
  }

  console.log(`📋 Found ${repositories.length} repositories to process:`);
  repositories.forEach(repo => {
    const topics = topicsConfig[repo];
    console.log(`   • ${repo}: ${topics ? topics.join(', ') : 'no topics'}`);
  });
  console.log('');

  // Process each repository
  let successCount = 0;
  let failureCount = 0;

  for (const repoName of repositories) {
    const topics = topicsConfig[repoName];
    
    if (!Array.isArray(topics) || topics.length === 0) {
      console.log(`⚠️  Skipping ${repoName}: no topics defined`);
      continue;
    }

    const success = await setRepositoryTopics(repoName, topics);
    
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n📊 Backfill Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📝 Total: ${repositories.length}`);

  if (failureCount > 0) {
    console.log('\n💡 Tips for failed repositories:');
    console.log('   • Check that the repository exists and you have write access');
    console.log('   • Verify your GITHUB_TOKEN has the required permissions');
    console.log('   • Ensure repository names match exactly (case-sensitive)');
  }
}

// Run the script
if (require.main === module) {
  backfillTopics().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { backfillTopics, setRepositoryTopics };
