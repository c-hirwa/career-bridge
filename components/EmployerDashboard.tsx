import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  GraduationCap,
  Plus,
  Users,
  Eye,
  Edit,
  Trash2,
  Building2,
  LogOut,
} from 'lucide-react';

interface EmployerDashboardProps {
  onLogout: () => void;
}

interface JobPosting {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  applicants: number;
  postedAt: string;
  status: 'active' | 'closed';
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  university: string;
  appliedFor: string;
  appliedAt: string;
  status: 'new' | 'reviewed' | 'interviewed' | 'rejected';
}

const mockJobPostings: JobPosting[] = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    type: 'Internship',
    salary: '$25/hour',
    description: 'Looking for a motivated CS student for summer internship...',
    requirements: 'JavaScript, React, Git',
    applicants: 24,
    postedAt: '1 week ago',
    status: 'active',
  },
  {
    id: 2,
    title: 'Junior Marketing Associate',
    location: 'Remote',
    type: 'Entry-Level',
    salary: '$50k - $60k',
    description: 'Entry-level position for recent marketing graduates...',
    requirements: 'Marketing degree, Social media experience',
    applicants: 18,
    postedAt: '3 days ago',
    status: 'active',
  },
];

const mockApplicants: Applicant[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@university.edu',
    university: 'State University',
    appliedFor: 'Software Engineering Intern',
    appliedAt: '2 hours ago',
    status: 'new',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@tech.edu',
    university: 'Tech Institute',
    appliedFor: 'Software Engineering Intern',
    appliedAt: '1 day ago',
    status: 'reviewed',
  },
  {
    id: 3,
    name: 'Emily Brown',
    email: 'emily.b@college.edu',
    university: 'City College',
    appliedFor: 'Junior Marketing Associate',
    appliedAt: '3 hours ago',
    status: 'new',
  },
];

export default function EmployerDashboard({ onLogout }: EmployerDashboardProps) {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [applicants] = useState<Applicant[]>(mockApplicants);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'Internship',
    salary: '',
    description: '',
    requirements: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobPosting = {
      id: jobPostings.length + 1,
      ...formData,
      applicants: 0,
      postedAt: 'Just now',
      status: 'active',
    };
    setJobPostings([newJob, ...jobPostings]);
    setFormData({
      title: '',
      location: '',
      type: 'Internship',
      salary: '',
      description: '',
      requirements: '',
    });
    setIsDialogOpen(false);
  };

  const handleDeleteJob = (id: number) => {
    setJobPostings(jobPostings.filter(job => job.id !== id));
  };

  const getStatusBadgeVariant = (status: Applicant['status']) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'reviewed':
        return 'secondary';
      case 'interviewed':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <span>CareerBridge</span>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  <Building2 className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Connect with talented students and recent graduates</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Post New Position
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post a New Position</DialogTitle>
                <DialogDescription>
                  Create an internship or entry-level job posting for students and graduates.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Position Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Marketing Intern"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Remote or City, State"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Position Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="salary">Compensation</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., $20/hour or $50k - $60k"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Position Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities, and what students will learn..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="List required skills, education, and qualifications..."
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Post Position</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Active Positions</p>
                <p className="text-3xl">{jobPostings.filter(j => j.status === 'active').length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Applicants</p>
                <p className="text-3xl">{applicants.length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">New Applications</p>
                <p className="text-3xl">
                  {applicants.filter(a => a.status === 'new').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">
              <GraduationCap className="h-4 w-4 mr-2" />
              Job Postings
            </TabsTrigger>
            <TabsTrigger value="applicants">
              <Users className="h-4 w-4 mr-2" />
              Applicants
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            {jobPostings.length === 0 ? (
              <Card className="p-12 text-center">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="mb-2">No job postings yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first position to start connecting with students
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Position
                </Button>
              </Card>
            ) : (
              jobPostings.map(job => (
                <Card key={job.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl">{job.title}</h3>
                        <Badge variant={job.type === 'Internship' ? 'default' : 'secondary'}>
                          {job.type}
                        </Badge>
                        <Badge variant={job.status === 'active' ? 'default' : 'outline'}>
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{job.location} • {job.salary}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 mb-2">{job.description}</p>
                    <p className="text-gray-600">Requirements: {job.requirements}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <span>Posted {job.postedAt}</span>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="applicants" className="space-y-4">
            {applicants.length === 0 ? (
              <Card className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="mb-2">No applicants yet</h3>
                <p className="text-gray-600">
                  Applications from students will appear here
                </p>
              </Card>
            ) : (
              applicants.map(applicant => (
                <Card key={applicant.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="mb-1">{applicant.name}</h3>
                        <p className="text-gray-600 mb-1">{applicant.email}</p>
                        <p className="text-gray-600">{applicant.university}</p>
                        <p className="text-gray-600 mt-2">Applied for: {applicant.appliedFor}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-gray-600">Applied {applicant.appliedAt}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View CV</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
