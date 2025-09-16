import { getAllProjects } from '@/lib/projects';
import { NextResponse } from 'next/server';

export async function GET() {
  const projects = getAllProjects();
  
  // Get latest 25 projects sorted by pushedAt
  const latestProjects = projects
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
    .slice(0, 25);

  const siteUrl = process.env.SITE_URL || 'https://justinwessels.vercel.app';
  const currentDate = new Date().toISOString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Justin Wessels - Portfolio Updates</title>
    <description>Latest updates from Justin Wessels' portfolio projects</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <language>en-us</language>
    <managingEditor>justin@example.com (Justin Wessels)</managingEditor>
    <webMaster>justin@example.com (Justin Wessels)</webMaster>
    <generator>Next.js Portfolio</generator>
    
    ${latestProjects.map(project => `
    <item>
      <title><![CDATA[${project.title}]]></title>
      <description><![CDATA[${project.description}]]></description>
      <link>${siteUrl}/projects/${project.slug}</link>
      <guid isPermaLink="true">${siteUrl}/projects/${project.slug}</guid>
      <pubDate>${new Date(project.pushedAt).toUTCString()}</pubDate>
      <category><![CDATA[${project.domains[0] || 'Other'}]]></category>
      ${project.liveUrl ? `<link>${project.liveUrl}</link>` : ''}
      ${project.repoUrl ? `<link>${project.repoUrl}</link>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
