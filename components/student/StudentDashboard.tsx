"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BrowseJobs } from './BrowseJobs';
import { SavedJobs } from './SavedJobs';
import { MyApplications } from './MyApplications';
import { CareerResources } from './CareerResources';
import StudentProfileSettings from './StudentProfileSettings';
import { Job } from '../JobCard';

interface StudentDashboardProps {
  onLogout?: () => void;
}

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load jobs from API
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch jobs
        const jobsRes = await fetch('/api/jobs');
        if (!jobsRes.ok) {
          const text = await jobsRes.text();
          throw new Error(`API error: ${jobsRes.status} ${text}`);
        }
        const jobsData = await jobsRes.json();

        // Fetch applications and saved jobs
        const appRes = await fetch('/api/student/applications');
        const savedRes = await fetch('/api/student/saved-jobs');

        const appliedSet = new Set<string>();
        const savedSet = new Set<string>();

        if (appRes.ok) {
          const appData = await appRes.json();
          if (Array.isArray(appData)) {
            appData.forEach((app: any) => appliedSet.add(app.jobId));
          }
        }

        if (savedRes.ok) {
          const savedData = await savedRes.json();
          if (Array.isArray(savedData)) {
            savedData.forEach((saved: any) => savedSet.add(saved.jobId));
          }
        }

        if (!mounted) return;

        if (Array.isArray(jobsData)) {
          const mapped: Job[] = jobsData.map((j: any) => ({
            id: j.id,
            title: j.title,
            company: j.employer?.companyName || 'Employer',
            location: j.location,
            type: j.type,
            workMode: j.workMode,
            salary: j.salary,
            description: j.description,
            requirements: j.requirements || [],
            postedDate: new Date(j.createdAt).toLocaleDateString(),
            saved: savedSet.has(j.id),
            applied: appliedSet.has(j.id),
          }));
          setJobs(mapped);
          setAppliedJobIds(appliedSet);
          setSavedJobIds(savedSet);
        } else {
          console.error('Jobs API returned non-array', jobsData);
        }
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => { mounted = false; };
  }, []);

  const handleApply = async (jobId: string) => {
    try {
      const res = await fetch('/api/student/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        setAppliedJobIds(new Set([...appliedJobIds, jobId]));
        setJobs(jobs.map(job =>
          job.id === jobId ? { ...job, applied: true } : job
        ));
      } else {
        console.error('Failed to apply');
      }
    } catch (err) {
      console.error('Apply error:', err);
    }
  };

  const handleSave = async (jobId: string) => {
    try {
      const res = await fetch('/api/student/save-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.saved) {
          setSavedJobIds(new Set([...savedJobIds, jobId]));
        } else {
          const newSaved = new Set(savedJobIds);
          newSaved.delete(jobId);
          setSavedJobIds(newSaved);
        }
        
        setJobs(jobs.map(job =>
          job.id === jobId ? { ...job, saved: data.saved } : job
        ));
      } else {
        console.error('Failed to save job');
      }
    } catch (err) {
      console.error('Save error:', err);
    }
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({appliedJobIds.size})</TabsTrigger>
            <TabsTrigger value="resources">Career Resources</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <BrowseJobs jobs={jobs} onApply={handleApply} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="saved">
            <SavedJobs jobs={savedJobs} onApply={handleApply} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="applications">
            <MyApplications applications={jobs.filter(j => appliedJobIds.has(j.id))} />
          </TabsContent>

          <TabsContent value="resources">
            <CareerResources />
          </TabsContent>

          <TabsContent value="profile">
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <StudentProfileSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
