"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BrowseJobs } from './BrowseJobs';
import { SavedJobs } from './SavedJobs';
import { MyApplications } from './MyApplications';
import { CareerResources } from './CareerResources';
import { mockJobs } from '../../data/mockJobs';
import { Job } from '../JobCard';

interface StudentDashboardProps {
  onLogout?: () => void;
}

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Job[]>([]);

  const handleApply = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    
    const appliedJob = jobs.find(job => job.id === jobId);
    if (appliedJob && !applications.find(app => app.id === jobId)) {
      setApplications([...applications, { ...appliedJob, applied: true }]);
    }
  };

  const handleSave = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const savedJobs = jobs.filter(job => job.saved);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Manage your job search and applications</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="resources">Career Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <BrowseJobs jobs={jobs} onApply={handleApply} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="saved">
            <SavedJobs jobs={savedJobs} onApply={handleApply} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="applications">
            <MyApplications applications={applications} />
          </TabsContent>

          <TabsContent value="resources">
            <CareerResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
