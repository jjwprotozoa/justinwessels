#!/usr/bin/env tsx

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fetchAllRepositories, testConnection } from './github';
import { loadManualProjects } from './load-manual';
import { normalizeProject, sortProjects } from './normalize';

const OUTPUT_PATH = join(process.cwd(), 'public', 'data', 'projects.json');
const OUTPUT_DIR = join(process.cwd(), 'public', 'data');

// Status, tier, and visibility validation maps
const VALID_STATUSES = ['complete', 'in-progress', 'archived'] as const;
const VALID_TIERS = ['flagship', 'mvp', 'experiment'] as const;
const VALID_VISIBILITIES = ['featured', 'portfolio', 'labs', 'ventures'] as const;

type ValidStatus = typeof VALID_STATUSES[number];
type ValidTier = typeof VALID_TIERS[number];
type ValidVisibility = typeof VALID_VISIBILITIES[number];

// Statistics tracking
interface BuildStats {
  totalRepos: number;
  manifestsFound: number;
  included: number;
  skipped: number;
  errors: number;
  tierCounts: Record<string, number>;
  statusCounts: Record<string, number>;
  visibilityCounts: Record<string, number>;
  githubCount: number;
  manualCount: number;
  includedManual: number;
  skippedManual: number;
}

// Validation functions
function validateStatus(status: string): ValidStatus {
  const normalized = status.toLowerCase().trim();
  if (VALID_STATUSES.includes(normalized as ValidStatus)) {
    return normalized as ValidStatus;
  }
  console.warn(`⚠️  Invalid status "${status}", defaulting to "in-progress"`);
  return 'in-progress';
}

function validateTier(tier: string): ValidTier {
  const normalized = tier.toLowerCase().trim();
  if (VALID_TIERS.includes(normalized as ValidTier)) {
    return normalized as ValidTier;
  }
  console.warn(`⚠️  Invalid tier "${tier}", defaulting to "experiment"`);
  return 'experiment';
}

function validateVisibility(visibility: string): ValidVisibility {
  const normalized = visibility.toLowerCase().trim();
  if (VALID_VISIBILITIES.includes(normalized as ValidVisibility)) {
    return normalized as ValidVisibility;
  }
  console.warn(`⚠️  Invalid visibility "${visibility}", defaulting to "portfolio"`);
  return 'portfolio';
}

function validateManifestKeys(manifest: any): any {
  const allowedKeys = [
    'title', 'status', 'tier', 'stack', 'roles', 'live_url', 'demo_url', 
    'homepage_url', 'highlights', 'metrics', 'topics', 'description', 'visibility'
  ];
  
  const validated: any = {};
  for (const [key, value] of Object.entries(manifest)) {
    if (allowedKeys.includes(key)) {
      validated[key] = value;
    } else {
      console.warn(`⚠️  Unknown manifest key "${key}" will be ignored`);
    }
  }
  
  return validated;
}

async function main() {
  const stats: BuildStats = {
    totalRepos: 0,
    manifestsFound: 0,
    included: 0,
    skipped: 0,
    errors: 0,
    tierCounts: {},
    statusCounts: {},
    visibilityCounts: {},
    githubCount: 0,
    manualCount: 0,
    includedManual: 0,
    skippedManual: 0
  };

  try {
    console.log('🚀 Starting projects build process...');
    console.log(`📅 Started at: ${new Date().toISOString()}`);

    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
      console.log('📁 Creating output directory...');
      mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Test GitHub connection
    console.log('🔍 Testing GitHub connection...');
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to GitHub. Check your GH_TOKEN.');
    }
    console.log('✅ GitHub connection successful');

    // Fetch all repositories
    console.log('📡 Fetching repositories from GitHub...');
    const repositories = await fetchAllRepositories();
    stats.totalRepos = repositories.length;
    console.log(`📦 Found ${repositories.length} repositories`);

    // Process GitHub repositories with error handling
    console.log('🔄 Processing GitHub repositories...');
    const githubProjects = [];
    
    for (const repo of repositories) {
      try {
        const project = normalizeProject(repo);
        
        // Validate and normalize status, tier, and visibility
        project.status = validateStatus(project.status);
        project.tier = validateTier(project.tier);
        project.visibility = validateVisibility(project.visibility);
        
        // Validate manifest keys if present
        if (project.manifest) {
          project.manifest = validateManifestKeys(project.manifest);
        }
        
        githubProjects.push(project);
        stats.included++;
        stats.githubCount++;
        
        if (project.manifest) {
          stats.manifestsFound++;
        }
        
        // Update statistics
        stats.tierCounts[project.tier] = (stats.tierCounts[project.tier] || 0) + 1;
        stats.statusCounts[project.status] = (stats.statusCounts[project.status] || 0) + 1;
        stats.visibilityCounts[project.visibility] = (stats.visibilityCounts[project.visibility] || 0) + 1;
        
      } catch (error) {
        console.error(`❌ Error processing repository ${repo.name}:`, error);
        stats.errors++;
        stats.skipped++;
      }
    }

    // Load manual projects
    console.log('📁 Loading manual projects...');
    const { projects: manualProjects, stats: manualStats } = loadManualProjects();
    
    // Update manual statistics
    stats.manualCount = manualStats.totalFiles;
    stats.includedManual = manualStats.included;
    stats.skippedManual = manualStats.skipped;
    
    // Merge all projects
    const allProjects = [...githubProjects, ...manualProjects];
    
    // Update statistics for manual projects
    for (const project of manualProjects) {
      stats.tierCounts[project.tier] = (stats.tierCounts[project.tier] || 0) + 1;
      stats.statusCounts[project.status] = (stats.statusCounts[project.status] || 0) + 1;
      stats.visibilityCounts[project.visibility] = (stats.visibilityCounts[project.visibility] || 0) + 1;
    }

    // Sort projects
    console.log('🔄 Sorting projects...');
    const sortedProjects = sortProjects(allProjects);

    // Log comprehensive summary
    console.log('\n📊 Build Summary:');
    console.log(`   📦 Total repos scanned: ${stats.totalRepos}`);
    console.log(`   📄 Manifests found: ${stats.manifestsFound}`);
    console.log(`   ✅ Successfully included: ${stats.included}`);
    console.log(`   ⚠️  Skipped (errors): ${stats.skipped}`);
    console.log(`   ❌ Errors encountered: ${stats.errors}`);
    
    console.log('\n📁 Manual Projects:');
    console.log(`   📁 Total files: ${stats.manualCount}`);
    console.log(`   ✅ Included: ${stats.includedManual}`);
    console.log(`   ⏭️  Skipped: ${stats.skippedManual}`);
    
    console.log('\n🔗 Combined:');
    console.log(`   🐙 GitHub projects: ${stats.githubCount}`);
    console.log(`   📝 Manual projects: ${stats.includedManual}`);
    console.log(`   📊 Total projects: ${sortedProjects.length}`);
    
    console.log('\n📈 Project Distribution:');
    console.log(`   🏆 Tiers: ${JSON.stringify(stats.tierCounts, null, 2)}`);
    console.log(`   📊 Status: ${JSON.stringify(stats.statusCounts, null, 2)}`);
    console.log(`   👁️  Visibility: ${JSON.stringify(stats.visibilityCounts, null, 2)}`);

    // Write to file with pretty formatting
    console.log('\n💾 Writing projects.json...');
    const jsonContent = JSON.stringify(sortedProjects, null, 2);
    writeFileSync(OUTPUT_PATH, jsonContent, 'utf8');

    console.log(`✅ Successfully wrote ${sortedProjects.length} projects to ${OUTPUT_PATH}`);
    
    // Log top 5 projects
    console.log('\n🏆 Top 5 Projects:');
    sortedProjects.slice(0, 5).forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.tier}/${project.status}) - ${project.stars} stars`);
    });

    console.log(`\n🎉 Build completed successfully at ${new Date().toISOString()}`);
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    console.log(`\n📊 Final Statistics:`);
    console.log(`   📦 Total repos: ${stats.totalRepos}`);
    console.log(`   ✅ Included: ${stats.included}`);
    console.log(`   ⚠️  Skipped: ${stats.skipped}`);
    console.log(`   ❌ Errors: ${stats.errors}`);
    console.log(`   🐙 GitHub: ${stats.githubCount}`);
    console.log(`   📝 Manual: ${stats.includedManual}`);
    throw error;
  }
}

// Handle errors gracefully
main().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
