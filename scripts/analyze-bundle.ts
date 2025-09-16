#!/usr/bin/env tsx

/**
 * Enhanced Bundle Analysis Script
 * 
 * This script analyzes the bundle size, provides optimization recommendations,
 * and monitors performance budgets
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: Array<{
    name: string;
    size: number;
    gzippedSize: number;
    modules: number;
  }>;
  recommendations: string[];
  performanceBudget: {
    passed: boolean;
    violations: string[];
  };
  bundleStats: {
    totalChunks: number;
    totalModules: number;
    duplicateModules: number;
    unusedModules: number;
  };
}

async function analyzeBundle() {
  console.log('📊 Bundle Analysis\n');

  try {
    // Build the project first
    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });

    // Check if bundle analysis file exists
    const analysisFile = join(process.cwd(), 'bundle-analysis.html');
    if (!existsSync(analysisFile)) {
      console.log('⚠️  Bundle analysis file not found. Run with ANALYZE=true npm run build');
      return;
    }

    // Read the analysis file (simplified parsing)
    const analysisContent = readFileSync(analysisFile, 'utf8');
    
    // Extract bundle information (this is a simplified version)
    const analysis: BundleAnalysis = {
      totalSize: 0,
      gzippedSize: 0,
      chunks: [],
      recommendations: [],
      performanceBudget: {
        passed: true,
        violations: []
      },
      bundleStats: {
        totalChunks: 0,
        totalModules: 0,
        duplicateModules: 0,
        unusedModules: 0
      }
    };

    // Parse bundle information (simplified)
    const sizeMatch = analysisContent.match(/Total Size: ([\d.]+) KB/);
    if (sizeMatch && sizeMatch[1]) {
      analysis.totalSize = parseFloat(sizeMatch[1]);
    }

    const gzippedMatch = analysisContent.match(/Gzipped Size: ([\d.]+) KB/);
    if (gzippedMatch && gzippedMatch[1]) {
      analysis.gzippedSize = parseFloat(gzippedMatch[1]);
    }

    // Generate recommendations
    generateRecommendations(analysis);

    // Check performance budget
    checkPerformanceBudget(analysis);

    // Display results
    console.log('📈 Bundle Analysis Results:\n');
    console.log(`Total Size: ${analysis.totalSize.toFixed(2)} KB`);
    console.log(`Gzipped Size: ${analysis.gzippedSize.toFixed(2)} KB`);
    console.log(`Compression Ratio: ${((1 - analysis.gzippedSize / analysis.totalSize) * 100).toFixed(1)}%\n`);

    // Display performance budget results
    console.log('🎯 Performance Budget:\n');
    if (analysis.performanceBudget.passed) {
      console.log('✅ All performance budgets passed');
    } else {
      console.log('❌ Performance budget violations:');
      analysis.performanceBudget.violations.forEach(violation => {
        console.log(`   - ${violation}`);
      });
    }

    if (analysis.recommendations.length > 0) {
      console.log('\n💡 Optimization Recommendations:\n');
      analysis.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }

    // Check package.json for potential optimizations
    checkPackageOptimizations();

    // Generate bundle report
    generateBundleReport(analysis);

  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
    process.exit(1);
  }
}

function generateRecommendations(analysis: BundleAnalysis) {
  const recommendations: string[] = [];

  // Size-based recommendations
  if (analysis.totalSize > 1000) {
    recommendations.push('Bundle size is large (>1MB). Consider code splitting and lazy loading.');
  }

  if (analysis.gzippedSize > 250) {
    recommendations.push('Gzipped size is large (>250KB). Optimize dependencies and remove unused code.');
  }

  // General recommendations
  recommendations.push('Use dynamic imports for non-critical components');
  recommendations.push('Implement tree shaking to remove unused code');
  recommendations.push('Optimize images and use next/image for automatic optimization');
  recommendations.push('Consider using a CDN for static assets');
  recommendations.push('Enable compression in production');
  recommendations.push('Use webpack-bundle-analyzer to identify large dependencies');

  analysis.recommendations = recommendations;
}

function checkPackageOptimizations() {
  console.log('\n🔍 Package Optimization Check:\n');

  const packageJsonPath = join(process.cwd(), 'package.json');
  if (!existsSync(packageJsonPath)) {
    console.log('❌ package.json not found');
    return;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for common large dependencies
  const largeDependencies = [
    'lodash',
    'moment',
    'jquery',
    'bootstrap',
    'antd',
    'material-ui',
    'semantic-ui',
  ];

  const foundLarge = largeDependencies.filter(dep => dependencies[dep]);
  
  if (foundLarge.length > 0) {
    console.log('⚠️  Large dependencies found:');
    foundLarge.forEach(dep => {
      console.log(`   - ${dep}: Consider alternatives or tree shaking`);
    });
  }

  // Check for duplicate dependencies
  const duplicateCheck = [
    { name: 'react', alternatives: ['preact', 'inferno'] },
    { name: 'lodash', alternatives: ['ramda', 'date-fns'] },
    { name: 'moment', alternatives: ['date-fns', 'dayjs'] },
  ];

  duplicateCheck.forEach(({ name, alternatives }) => {
    if (dependencies[name]) {
      const hasAlternatives = alternatives.some(alt => dependencies[alt]);
      if (hasAlternatives) {
        console.log(`⚠️  Consider using only one of: ${name} or ${alternatives.join(', ')}`);
      }
    }
  });

  // Check for development dependencies in production
  const devDeps = Object.keys(packageJson.devDependencies || {});
  const prodDeps = Object.keys(packageJson.dependencies || {});
  
  const misplacedDevDeps = devDeps.filter(dep => 
    ['typescript', 'eslint', 'prettier', 'jest', 'cypress'].includes(dep) && 
    prodDeps.includes(dep)
  );

  if (misplacedDevDeps.length > 0) {
    console.log('⚠️  Development dependencies in production:');
    misplacedDevDeps.forEach(dep => {
      console.log(`   - ${dep}: Move to devDependencies`);
    });
  }
}

// Performance budget checker
function checkPerformanceBudget(analysis: BundleAnalysis) {
  const budgets = {
    'Bundle Size': { good: 500, poor: 1000 }, // KB
    'Gzipped Size': { good: 150, poor: 300 }, // KB
    'First Contentful Paint': { good: 1800, poor: 3000 }, // ms
    'Largest Contentful Paint': { good: 2500, poor: 4000 }, // ms
    'First Input Delay': { good: 100, poor: 300 }, // ms
    'Cumulative Layout Shift': { good: 0.1, poor: 0.25 }, // score
    'Time to First Byte': { good: 800, poor: 1800 }, // ms
  };

  // Check bundle size budgets
  if (analysis.totalSize > budgets['Bundle Size'].poor) {
    analysis.performanceBudget.passed = false;
    analysis.performanceBudget.violations.push(`Bundle size (${analysis.totalSize.toFixed(2)} KB) exceeds poor threshold (${budgets['Bundle Size'].poor} KB)`);
  } else if (analysis.totalSize > budgets['Bundle Size'].good) {
    analysis.performanceBudget.violations.push(`Bundle size (${analysis.totalSize.toFixed(2)} KB) exceeds good threshold (${budgets['Bundle Size'].good} KB)`);
  }

  if (analysis.gzippedSize > budgets['Gzipped Size'].poor) {
    analysis.performanceBudget.passed = false;
    analysis.performanceBudget.violations.push(`Gzipped size (${analysis.gzippedSize.toFixed(2)} KB) exceeds poor threshold (${budgets['Gzipped Size'].poor} KB)`);
  } else if (analysis.gzippedSize > budgets['Gzipped Size'].good) {
    analysis.performanceBudget.violations.push(`Gzipped size (${analysis.gzippedSize.toFixed(2)} KB) exceeds good threshold (${budgets['Gzipped Size'].good} KB)`);
  }
}

// Generate bundle report
function generateBundleReport(analysis: BundleAnalysis) {
  const report = {
    timestamp: new Date().toISOString(),
    bundle: {
      totalSize: analysis.totalSize,
      gzippedSize: analysis.gzippedSize,
      compressionRatio: ((1 - analysis.gzippedSize / analysis.totalSize) * 100).toFixed(1)
    },
    performance: {
      budgetPassed: analysis.performanceBudget.passed,
      violations: analysis.performanceBudget.violations
    },
    recommendations: analysis.recommendations,
    stats: analysis.bundleStats
  };

  const reportPath = join(process.cwd(), 'bundle-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Bundle report saved to: ${reportPath}`);
}

// Run the script
if (require.main === module) {
  analyzeBundle()
    .then(() => {
      console.log('\n✅ Bundle analysis completed!');
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

export { analyzeBundle, checkPackageOptimizations, checkPerformanceBudget };
