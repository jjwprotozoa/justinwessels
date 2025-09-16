import fs from 'fs';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: Request) {
  const token = req.headers.get('x-revalidate-token');
  if (!token || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  
  try {
    // Revalidate core pages
    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/projects'),
      revalidatePath('/feeds'),
    ]);
    
    // Revalidate project detail pages
    const projectsPath = path.join(process.cwd(), 'public', 'data', 'projects.json');
    const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8')) as Array<{ slug: string }>;
    const slugs = Array.isArray(projectsData) ? projectsData.map((p) => `/projects/${p.slug}`) : [];
    await Promise.all(slugs.map((projectPath) => revalidatePath(projectPath)));
    
    return NextResponse.json({ 
      ok: true, 
      revalidated: ['/', '/projects', '/feeds', ...slugs] 
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'revalidate failed';
    return NextResponse.json({ 
      ok: false, 
      error: errorMessage
    }, { status: 500 });
  }
}
