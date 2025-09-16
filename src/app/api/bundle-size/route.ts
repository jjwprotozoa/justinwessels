import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Only serve bundle data in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
    }

    const reportPath = join(process.cwd(), 'bundle-report.json');
    
    if (!existsSync(reportPath)) {
      return NextResponse.json({ error: 'Bundle report not found' }, { status: 404 });
    }

    const reportData = JSON.parse(readFileSync(reportPath, 'utf8'));
    
    return NextResponse.json({
      totalSize: reportData.bundle.totalSize,
      gzippedSize: reportData.bundle.gzippedSize,
      compressionRatio: reportData.bundle.compressionRatio,
      budgetPassed: reportData.performance.budgetPassed,
      violations: reportData.performance.violations,
      timestamp: reportData.timestamp
    });
  } catch (error) {
    console.error('Error reading bundle report:', error);
    return NextResponse.json({ error: 'Failed to read bundle data' }, { status: 500 });
  }
}
