"use client";

import { MapPin, Briefcase, Clock, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'entry-level';
  workMode: 'remote' | 'onsite' | 'hybrid';
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  saved?: boolean;
  applied?: boolean;
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  showActions?: boolean;
}

export function JobCard({ job, onApply, onSave, showActions = true }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="text-base">{job.company}</CardDescription>
          </div>
          {showActions && onSave && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave(job.id)}
            >
              {job.saved ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant={job.type === 'internship' ? 'default' : 'secondary'}>
            {job.type === 'internship' ? 'Internship' : 'Entry Level'}
          </Badge>
          <Badge variant="outline">{job.workMode}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Posted {job.postedDate}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
      </CardContent>
      {showActions && onApply && (
        <CardFooter>
          <Button 
            className="w-full"
            onClick={() => onApply(job.id)}
            disabled={job.applied}
          >
            {job.applied ? 'Applied' : 'Apply Now'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
