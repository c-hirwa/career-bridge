"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PostJob } from './PostJob';
import { MyPostings } from './MyPostings';
import { Applicants } from './Applicants';
import { Job } from '../JobCard';

interface EmployerDashboardProps {
  onLogout: () => void;
}

export function EmployerDashboard({ onLogout }: EmployerDashboardProps) {
  const [postedJobs, setPostedJobs] = useState<Job[]>([
    {
      id: 'emp-1',
      title: 'Software Engineering Intern',
      company: 'My Company',
      location: 'San Francisco, CA',
      type: 'internship',
      workMode: 'hybrid',
      salary: '$25-30/hour',
      description: 'Join our engineering team to work on cutting-edge web applications.',
      requirements: ['Computer Science student', 'Knowledge of React/TypeScript'],
      postedDate: '5 days ago',
    },
    {
      id: 'emp-2',
      title: 'Junior Product Manager',
      company: 'My Company',
      location: 'Remote',
      type: 'entry-level',
      workMode: 'remote',
      salary: '$60,000-70,000/year',
      description: 'Help manage product roadmap and work with cross-functional teams.',
      requirements: ['Bachelor\'s degree', 'Strong communication skills'],
      postedDate: '2 weeks ago',
    },
  ]);

  const handlePostJob = (job: Omit<Job, 'id' | 'postedDate' | 'company'>) => {
    const newJob: Job = {
      ...job,
      id: `emp-${Date.now()}`,
      company: 'My Company',
      postedDate: 'Just now',
    };
    setPostedJobs([newJob, ...postedJobs]);
  };

  const handleDeleteJob = (jobId: string) => {
    setPostedJobs(postedJobs.filter(job => job.id !== jobId));
  };

  // Mock applicants data
  const mockApplicants = postedJobs.map(job => ({
    jobId: job.id,
    jobTitle: job.title,
    applicants: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@university.edu',
        university: 'Stanford University',
        major: 'Computer Science',
        gpa: '3.8',
        appliedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@university.edu',
        university: 'MIT',
        major: 'Software Engineering',
        gpa: '3.9',
        appliedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
    ],
  }));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and review applicants</p>
        </div>

        <Tabs defaultValue="postings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="postings">My Postings ({postedJobs.length})</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="post">Post New Job</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
}
