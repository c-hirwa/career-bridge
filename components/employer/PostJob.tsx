"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Job } from '../JobCard';
import { CheckCircle } from 'lucide-react';

interface PostJobProps {
  onPostJob: (job: Omit<Job, 'id' | 'postedDate' | 'company'>) => void;
}

export function PostJob({ onPostJob }: PostJobProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'internship' as 'internship' | 'entry-level',
    workMode: 'hybrid' as 'remote' | 'onsite' | 'hybrid',
    salary: '',
    description: '',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const job: Omit<Job, 'id' | 'postedDate' | 'company'> = {
      title: formData.title,
      location: formData.location,
      type: formData.type,
      workMode: formData.workMode,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
    };

    onPostJob(job);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        location: '',
        type: 'internship',
        workMode: 'hybrid',
        salary: '',
        description: '',
        requirements: '',
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Job Posted Successfully!</h3>
            <p className="text-gray-600">Your job listing is now live and visible to students</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>Fill out the form below to create a new job listing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Software Engineering Intern"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'internship' | 'entry-level') => setFormData({ ...formData, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="entry-level">Entry Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workMode">Work Mode *</Label>
              <Select value={formData.workMode} onValueChange={(value: 'remote' | 'onsite' | 'hybrid') => setFormData({ ...formData, workMode: value })}>
                <SelectTrigger id="workMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="salary">Salary/Compensation</Label>
              <Input
                id="salary"
                placeholder="e.g. $25-30/hour or $50,000-60,000/year"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities, and what the candidate will learn..."
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Textarea
              id="requirements"
              placeholder="Enter each requirement on a new line"
              rows={6}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              required
            />
            <p className="text-sm text-gray-500">Enter one requirement per line</p>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Post Job
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
