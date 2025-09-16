import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import remarkGfm from 'remark-gfm';

export interface CaseStudyFrontmatter {
  slug: string;
  title: string;
  stack: string[];
  roles: string[];
  date: string;
  updated: string;
  outcomes: string[];
  keywords: string[];
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  mdxSource: MDXRemoteSerializeResult;
}

const caseStudiesDirectory = path.join(process.cwd(), 'content', 'case-studies');

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    });

    return {
      frontmatter: data as CaseStudyFrontmatter,
      content,
      mdxSource,
    };
  } catch {
    // Silently fail for missing case studies
    return null;
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(caseStudiesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(caseStudiesDirectory);
    return fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''));
  } catch {
    // Silently fail and return empty array
    return [];
  }
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const slugs = await getAllCaseStudySlugs();
  const caseStudies = await Promise.all(
    slugs.map(slug => getCaseStudyBySlug(slug))
  );
  
  return caseStudies.filter((caseStudy): caseStudy is CaseStudy => caseStudy !== null);
}
