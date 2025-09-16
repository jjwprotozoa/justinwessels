import { ContentManager } from '@/components/ContentManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Manager - Justin Wessels Portfolio',
  description: 'Manage case studies, project manifests, and content for the portfolio.',
};

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentManager />
    </div>
  );
}
