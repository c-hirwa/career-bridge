"use client";

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { JobCard, Job } from '../JobCard';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

interface BrowseJobsProps {
  jobs: Job[];
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

export function BrowseJobs({ jobs, onApply, onSave }: BrowseJobsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'internship' | 'entry-level'>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || job.workMode === locationFilter;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type</label>
                <div className="flex gap-2">
                  <Badge
                    variant={typeFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTypeFilter('all')}
                  >
                    All
                  </Badge>
                  <Badge
                    variant={typeFilter === 'internship' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTypeFilter('internship')}
                  >
                    Internship
                  </Badge>
                  <Badge
                    variant={typeFilter === 'entry-level' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTypeFilter('entry-level')}
                  >
                    Entry Level
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Work Mode</label>
                <div className="flex gap-2">
                  <Badge
                    variant={locationFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLocationFilter('all')}
                  >
                    All
                  </Badge>
                  <Badge
                    variant={locationFilter === 'remote' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLocationFilter('remote')}
                  >
                    Remote
                  </Badge>
                  <Badge
                    variant={locationFilter === 'hybrid' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLocationFilter('hybrid')}
                  >
                    Hybrid
                  </Badge>
                  <Badge
                    variant={locationFilter === 'onsite' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLocationFilter('onsite')}
                  >
                    Onsite
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <p className="text-gray-600 mb-4">
          Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={onApply}
              onSave={onSave}
            />
          ))}
        </div>
        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No jobs found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
