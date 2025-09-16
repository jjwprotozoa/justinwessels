#!/usr/bin/env tsx

/**
 * Deployment Setup Script
 * 
 * This script helps set up the portfolio for deployment by:
 * 1. Generating secure tokens
 * 2. Validating configuration
 * 3. Testing local build
 * 4. Providing deployment instructions
 */

import { randomBytes } from 'crypto';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

interface DeploymentCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  fix?: string;
}

async function runDeploymentSetup() {
  console.log('🚀 Portfolio Deployment Setup\n');

  const checks: DeploymentCheck[] = [];
  
  // Check 1: Package.json exists
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

  // Check 2: Vercel config exists
  const vercelJsonPath = join(process.cwd(), 'vercel.json');
  if (existsSync(vercelJsonPath)) {
    checks.push({
      name: 'Vercel Config',
      status: 'pass',
      message: 'vercel.json found'
    });
  } else {
    checks.push({
      name: 'Vercel Config',
      status: 'fail',
      message: 'vercel.json not found',
      fix: 'Create vercel.json configuration file'
    });
  }

  // Check 3: Environment variables template
  const envExamplePath = join(process.cwd(), '.env.example');
  if (existsSync(envExamplePath)) {
    checks.push({
      name: 'Environment Template',
      status: 'pass',
      message: '.env.example found'
    });
  } else {
    checks.push({
      name: 'Environment Template',
      status: 'warning',
      message: '.env.example not found',
      fix: 'Create .env.example with required variables'
    });
  }

  // Check 4: Build script exists
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  if (packageJson.scripts?.build) {
    checks.push({
      name: 'Build Script',
      status: 'pass',
      message: 'Build script configured'
    });
  } else {
    checks.push({
      name: 'Build Script',
      status: 'fail',
      message: 'Build script not found',
      fix: 'Add build script to package.json'
    });
  }

  // Check 5: TypeScript config
  const tsConfigPath = join(process.cwd(), 'tsconfig.json');
  if (existsSync(tsConfigPath)) {
    checks.push({
      name: 'TypeScript Config',
      status: 'pass',
      message: 'tsconfig.json found'
    });
  } else {
    checks.push({
      name: 'TypeScript Config',
      status: 'fail',
      message: 'tsconfig.json not found',
      fix: 'Create TypeScript configuration'
    });
  }

  // Display results
  console.log('📋 Pre-deployment Checks:\n');
  
  checks.forEach(check => {
    const icon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${check.name}: ${check.message}`);
    if (check.fix) {
      console.log(`   💡 Fix: ${check.fix}`);
    }
  });

  const failedChecks = checks.filter(c => c.status === 'fail');
  const warningChecks = checks.filter(c => c.status === 'warning');

  if (failedChecks.length > 0) {
    console.log(`\n❌ ${failedChecks.length} critical issues found. Please fix these before deploying.`);
    process.exit(1);
  }

  if (warningChecks.length > 0) {
    console.log(`\n⚠️  ${warningChecks.length} warnings found. Consider addressing these.`);
  }

  console.log('\n✅ All critical checks passed! Ready for deployment.\n');

  // Generate secure tokens
  console.log('🔐 Generated Secure Tokens:\n');
  
  const revalidateToken = randomBytes(32).toString('hex');
  console.log(`REVALIDATE_TOKEN: ${revalidateToken}`);
  console.log(`\n📝 Add this to Vercel environment variables:`);
  console.log(`   - Variable: REVALIDATE_TOKEN`);
  console.log(`   - Value: ${revalidateToken}`);

  // Generate GitHub token instructions
  console.log('\n🔑 GitHub Token Setup:');
  console.log('   1. Go to GitHub → Settings → Developer settings → Personal access tokens');
  console.log('   2. Generate new token (classic)');
  console.log('   3. Select scopes: repo, public_repo');
  console.log('   4. Add as GH_TOKEN secret in repository settings');

  // Generate deployment instructions
  console.log('\n🚀 Deployment Instructions:');
  console.log('   1. Push code to GitHub: git push origin main');
  console.log('   2. Connect repository to Vercel');
  console.log('   3. Set environment variables in Vercel dashboard');
  console.log('   4. Add GitHub secrets for auto-revalidation');
  console.log('   5. Deploy and test all features');

  console.log('\n📚 For detailed instructions, see docs/DEPLOYMENT_GUIDE.md');
}

// Run the script
if (require.main === module) {
  runDeploymentSetup().catch(error => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
}

export { runDeploymentSetup };
