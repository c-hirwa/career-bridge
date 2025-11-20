"use client";

import { Job, JobCard } from '../JobCard';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2, Edit, Eye } from 'lucide-react';
import { Badge } from '../ui/badge';

interface MyPostingsProps {
  jobs: Job[];
  onDeleteJob: (jobId: string) => void;
}

export function MyPostings({ jobs, onDeleteJob }: MyPostingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">My Job Postings</h2>
        <p className="text-gray-600">Manage your active job listings</p>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map(job => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant={job.type === 'internship' ? 'default' : 'secondary'}>
                        {job.type === 'internship' ? 'Internship' : 'Entry Level'}
                      </Badge>
                      <Badge variant="outline">{job.workMode}</Badge>
                      {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="text-sm text-gray-500">
                      Posted {job.postedDate} • 12 applicants
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => onDeleteJob(job.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">No job postings yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first job posting to start receiving applications
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
