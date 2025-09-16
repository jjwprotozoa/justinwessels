'use client';

import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DocsLinkProps {
  repoUrl: string;
  className?: string;
}

export function DocsLink({ repoUrl, className = '' }: DocsLinkProps) {
  const [hasDocs, setHasDocs] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoUrl) return;

    setLoading(true);
    
    // Check if docs exist by trying to fetch the docs URL
    const docsUrl = `${repoUrl}/tree/main/docs`;
    
    const checkDocs = async () => {
      try {
        const response = await fetch(docsUrl, { method: 'HEAD' });
        setHasDocs(response.ok);
      } catch {
        // If fetch fails, assume no docs
        setHasDocs(false);
      } finally {
        setLoading(false);
      }
    };

    checkDocs();
  }, [repoUrl]);

  if (loading || !hasDocs) {
    return null;
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      asChild
      className={className}
      title="Documentation"
    >
      <a href={`${repoUrl}/tree/main/docs`} target="_blank" rel="noopener noreferrer">
        <FileText className="h-4 w-4" />
      </a>
    </Button>
  );
}

export default DocsLink;