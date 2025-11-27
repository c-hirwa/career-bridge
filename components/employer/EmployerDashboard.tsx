"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostJob } from './PostJob';
import EmployerProfileSettings from './EmployerProfileSettings';
import { MyPostings } from './MyPostings';
import { Applicants } from './Applicants';
import { Job } from '../JobCard';

interface EmployerDashboardProps {
  onLogout?: () => void;
}

interface JobWithApplicants extends Job {
  applicantCount?: number;
}

export function EmployerDashboard({ onLogout }: EmployerDashboardProps) {
  const [postedJobs, setPostedJobs] = useState<JobWithApplicants[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);

  const fetchEmployerJobs = async () => {
    try {
      // Fetch all jobs
      const jobsRes = await fetch('/api/jobs');
      if (!jobsRes.ok) throw new Error('Failed to fetch jobs');
      const allJobs: any[] = await jobsRes.json();

      // Fetch applicants for each job
      const applicantsByJob: { [key: string]: any[] } = {};
      const allApplicants: any[] = [];

      for (const job of allJobs) {
        try {
          const appRes = await fetch(`/api/jobs/${job.id}/applicants`);
          if (appRes.ok) {
            const jobApplicants = await appRes.json();
            applicantsByJob[job.id] = jobApplicants;
            allApplicants.push(...jobApplicants.map((a: any) => ({ ...a, jobId: job.id, jobTitle: job.title })));
          }
        } catch (e) {
          // If endpoint doesn't exist yet, use empty array
          applicantsByJob[job.id] = [];
        }
      }

      const mapped: JobWithApplicants[] = allJobs.map((j: any) => ({
        id: j.id,
        title: j.title,
        company: j.employer?.companyName || 'Your Company',
        location: j.location,
        type: j.type,
        workMode: j.workMode,
        salary: j.salary,
        description: j.description,
        requirements: j.requirements || [],
        postedDate: new Date(j.createdAt).toLocaleDateString(),
        applicantCount: applicantsByJob[j.id]?.length || 0,
      }));

      setPostedJobs(mapped);
      setApplicants(allApplicants);
    } catch (err) {
      console.error('Failed to load employer jobs', err);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const handlePostJob = (job: Job) => {
    setPostedJobs([job, ...postedJobs]);
    fetchEmployerJobs();
  };

  const handleDeleteJob = (jobId: string) => {
    setPostedJobs(postedJobs.filter(job => job.id !== jobId));
    setApplicants(applicants.filter(app => app.jobId !== jobId));
  };

  const mockApplicants = postedJobs.map(job => ({
    jobId: job.id,
    jobTitle: job.title,
    applicants: applicants.filter(a => a.jobId === job.id).map(a => ({
      ...a,
      appliedDate: new Date(a.createdAt).toLocaleDateString(),
    })),
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and review applicants</p>
        </div>

        <Tabs defaultValue="postings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="postings">My Postings ({postedJobs.length})</TabsTrigger>
            <TabsTrigger value="applicants">Applicants ({applicants.length})</TabsTrigger>
            <TabsTrigger value="post">Post New Job</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="postings">
            <MyPostings jobs={postedJobs} onDeleteJob={handleDeleteJob} />
          </TabsContent>

          <TabsContent value="applicants">
            <Applicants applicants={mockApplicants} />
          </TabsContent>

          <TabsContent value="post">
            <PostJob onPostJob={handlePostJob} />
          </TabsContent>

          <TabsContent value="profile">
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
              <EmployerProfileSettings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
