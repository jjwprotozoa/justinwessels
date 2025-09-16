import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CaseStudy as CaseStudyType } from '@/lib/caseStudies';
import { formatDate } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote';

interface CaseStudyProps {
  caseStudy: CaseStudyType;
}

export function CaseStudy({ caseStudy }: CaseStudyProps) {
  const { frontmatter, mdxSource } = caseStudy;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {frontmatter.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {frontmatter.roles.map((role) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Published: {formatDate(frontmatter.date)}</p>
            <p>Updated: {formatDate(frontmatter.updated)}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <MDXRemote {...mdxSource} />
        </div>
      </CardContent>
    </Card>
  );
}

export default CaseStudy;