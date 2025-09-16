import { CaseStudy } from '@/components/CaseStudy';
import { ProjectDetail } from '@/components/ProjectDetail';
import { ProjectJsonLd } from '@/components/ProjectJsonLd';
import { getCaseStudyBySlug } from '@/lib/caseStudies';
import { getProjectById } from '@/lib/projects';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 300;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.SITE_URL || 'https://justinwessels.com';
  const ogImage = project.ogImage || `${siteUrl}/og/${params.slug}`;

  return {
    title: `${project.title} - Justin Wessels Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [ogImage],
      type: 'website',
      url: `${siteUrl}/projects/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.slug);

  if (!project) {
    notFound();
  }

  // Check if a case study exists for this project
  const caseStudy = await getCaseStudyBySlug(params.slug);

  return (
    <>
      <ProjectJsonLd project={project} caseStudy={caseStudy} />
      <div className="min-h-screen py-8 px-4">
        {caseStudy && <CaseStudy caseStudy={caseStudy} />}
        <ProjectDetail project={project} />
      </div>
    </>
  );
}
