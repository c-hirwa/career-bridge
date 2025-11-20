"use client";

import { JobCard, Job } from '../JobCard';
import { Card, CardContent } from '../ui/card';
import { Bookmark } from 'lucide-react';

interface SavedJobsProps {
  jobs: Job[];
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

export function SavedJobs({ jobs, onApply, onSave }: SavedJobsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Saved Jobs</h2>
        <p className="text-gray-600">Jobs you've bookmarked for later</p>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={onApply}
              onSave={onSave}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved jobs yet</h3>
            <p className="text-gray-500">
              Start browsing jobs and save the ones you're interested in
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
