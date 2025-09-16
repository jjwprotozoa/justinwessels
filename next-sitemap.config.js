/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://justinwessels.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    const result = [];
    
    try {
      // Read projects.json to get all project slugs
      const fs = require('fs');
      const path = require('path');
      const projectsPath = path.join(process.cwd(), 'public', 'data', 'projects.json');
      
      if (fs.existsSync(projectsPath)) {
        const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
        
        // Add each project page
        projects.forEach((project) => {
          const lastmod = project.pushedAt ? new Date(project.pushedAt).toISOString() : new Date().toISOString();
          result.push({
            loc: `/projects/${project.slug}`,
            lastmod: lastmod,
            changefreq: 'weekly',
            priority: 0.8,
          });
        });
      }
    } catch (error) {
      console.warn('Failed to read projects.json for sitemap:', error);
    }
    
    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://justinwessels.com/sitemap.xml',
    ],
  },
};
