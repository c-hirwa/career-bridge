"use client";

import { Job } from '../JobCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Calendar, FileText } from 'lucide-react';

interface MyApplicationsProps {
  applications: Job[];
}

const applicationStatuses = ['submitted', 'reviewing', 'interview', 'rejected', 'accepted'] as const;

export function MyApplications({ applications }: MyApplicationsProps) {
  // Add random status to applications for demo
  const applicationsWithStatus = applications.map((app, index) => ({
    ...app,
    status: applicationStatuses[Math.min(index % 3, applicationStatuses.length - 1)],
    appliedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">My Applications</h2>
        <p className="text-gray-600">Track the status of your job applications</p>
      </div>

      {applicationsWithStatus.length > 0 ? (
        <div className="space-y-4">
          {applicationsWithStatus.map(app => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.title}</CardTitle>
                    <CardDescription>{app.company}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{app.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Applied on {app.appliedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="capitalize">{app.type.replace('-', ' ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-gray-500">
              Start applying to jobs to see your applications here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
