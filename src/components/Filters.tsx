'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectFilters } from '@/types/project';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  categories: string[];
  statuses: string[];
  domains: string[];
}

export function Filters({ filters, onFiltersChange, statuses, domains }: FiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusToggle = (status: string) => {
    onFiltersChange({ 
      ...filters, 
      status: filters.status === status ? '' : status 
    });
  };

  const handleDomainToggle = (domain: string) => {
    onFiltersChange({ 
      ...filters, 
      domain: filters.domain === domain ? '' : domain 
    });
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', status: '', search: '', domain: '' };
    setSearchValue('');
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.category || filters.status || filters.search || filters.domain;

  return (
    <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filter Projects</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Status Toggle Chips */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <Badge
                key={status}
                variant={filters.status === status ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleStatusToggle(status)}
              >
                {status === 'complete' ? 'Complete' : 
                 status === 'in-progress' ? 'In-Progress' : 
                 status === 'archived' ? 'Archived' : status}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Domain Toggle Chips */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Domain</label>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <Badge
                key={domain}
                variant={filters.domain === domain ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleDomainToggle(domain)}
              >
                {domain}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
