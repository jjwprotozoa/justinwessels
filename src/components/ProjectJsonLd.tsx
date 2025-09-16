import { CaseStudy } from '@/lib/caseStudies';
import { Project } from '@/types/project';

interface ProjectJsonLdProps {
  project: Project;
  caseStudy?: CaseStudy | null;
}

export function ProjectJsonLd({ project, caseStudy }: ProjectJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://justinwessels.com/projects/${project.slug}`,
    name: project.title,
    description: project.description,
    image: project.ogImage,
    url: project.liveUrl || `https://justinwessels.com/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: 'Justin Wessels',
      url: 'https://justinwessels.com',
    },
    dateCreated: project.pushedAt,
    dateModified: project.pushedAt,
    keywords: [...project.stack, ...project.domains, ...(project.topics || [])].join(', '),
    genre: project.domains[0] || 'Other',
    inLanguage: 'en',
    isAccessibleForFree: true,
    ...(project.repoUrl && {
      codeRepository: {
        '@type': 'SoftwareSourceCode',
        url: project.repoUrl,
        programmingLanguage: project.stack,
      },
    }),
    ...(project.liveUrl && {
      url: project.liveUrl,
    }),
    ...(caseStudy && {
      about: {
        '@type': 'Thing',
        name: caseStudy.frontmatter.title,
        description: caseStudy.content.substring(0, 200) + '...',
        keywords: caseStudy.frontmatter.keywords?.join(', '),
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Case Study',
          value: 'Available',
        },
        {
          '@type': 'PropertyValue',
          name: 'Roles',
          value: caseStudy.frontmatter.roles?.join(', '),
        },
        {
          '@type': 'PropertyValue',
          name: 'Outcomes',
          value: caseStudy.frontmatter.outcomes?.join('; '),
        },
      ],
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
    />
  );
}
