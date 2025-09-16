'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Edit, FileText, Plus, Trash2, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ContentItem {
  id: string;
  type: 'case-study' | 'project-manifest';
  title: string;
  status: 'draft' | 'published' | 'archived';
  lastModified: string;
  path: string;
}

interface ContentManagerProps {
  className?: string;
}

export function ContentManager({ className }: ContentManagerProps) {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'case-study' | 'project-manifest'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      // This would typically fetch from an API
      const mockContent: ContentItem[] = [
        {
          id: '1',
          type: 'case-study',
          title: 'Ruvo Play - Multi-device subscription manager',
          status: 'published',
          lastModified: '2024-01-15',
          path: '/content/case-studies/ruvoplay.mdx'
        },
        {
          id: '2',
          type: 'case-study',
          title: 'ZeroForms - Healthcare form automation',
          status: 'draft',
          lastModified: '2024-01-14',
          path: '/content/case-studies/zeroforms.mdx'
        },
        {
          id: '3',
          type: 'project-manifest',
          title: 'Ruvo Play Manifest',
          status: 'published',
          lastModified: '2024-01-13',
          path: '/templates/ruvoplayer-manifest.yml'
        }
      ];
      setContent(mockContent);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter(item => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = () => {
    return <FileText className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Content Manager</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="case-study">Case Studies</SelectItem>
            <SelectItem value="project-manifest">Project Manifests</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters or search query.'
                  : 'Get started by creating your first piece of content.'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Content
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon()}
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.type} • Modified {item.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{content.length}</div>
            <div className="text-sm text-gray-500">Total Content</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {content.filter(item => item.status === 'published').length}
            </div>
            <div className="text-sm text-gray-500">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {content.filter(item => item.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-500">Drafts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {content.filter(item => item.type === 'case-study').length}
            </div>
            <div className="text-sm text-gray-500">Case Studies</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContentManager;
