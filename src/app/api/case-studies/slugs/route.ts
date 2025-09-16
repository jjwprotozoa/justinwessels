import { getAllCaseStudySlugs } from '@/lib/caseStudies';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const slugs = await getAllCaseStudySlugs();
    return NextResponse.json(slugs);
  } catch {
    // Return empty array on error
    return NextResponse.json([], { status: 500 });
  }
}
