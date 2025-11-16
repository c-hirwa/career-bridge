import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock,
  Bookmark,
  CheckCircle2,
  User,
  FileText,
  BookOpen,
  LogOut
} from 'lucide-react';

interface EmployeeDashboardProps {
  onLogout: () => void;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  description: string;
  requirements: string[];
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Internship',
    salary: '$25/hour',
    postedAt: '2 days ago',
    description: 'Join our engineering team for a summer internship. Perfect for Computer Science students.',
    requirements: ['JavaScript', 'React', 'Git']
  },
  {
    id: 2,
    title: 'Junior UX Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'Entry-Level',
    salary: '$55k - $65k',
    postedAt: '1 week ago',
    description: 'Looking for a creative junior designer to join our growing design team.',
    requirements: ['Figma', 'UI/UX', 'Portfolio']
  },
  {
    id: 3,
    title: 'Marketing Intern',
    company: 'GrowthLab',
    location: 'Remote',
    type: 'Internship',
    salary: '$20/hour',
    postedAt: '3 days ago',
    description: 'Help us grow our brand through digital marketing campaigns.',
    requirements: ['Social Media', 'Content Creation', 'Analytics']
  },
  {
    id: 4,
    title: 'Junior Data Analyst',
    company: 'DataSystems',
    location: 'Austin, TX',
    type: 'Entry-Level',
    salary: '$60k - $70k',
    postedAt: '5 days ago',
    description: 'Analyze data and create insights for business decisions. Recent graduates welcome!',
    requirements: ['Python', 'SQL', 'Excel']
  },
  {
    id: 5,
    title: 'Frontend Developer Intern',
    company: 'StartupCo',
    location: 'Seattle, WA',
    type: 'Internship',
    salary: '$28/hour',
    postedAt: '1 day ago',
    description: 'Build modern web applications with our frontend team.',
    requirements: ['HTML/CSS', 'JavaScript', 'React']
  },
];

export default function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const handleApply = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  const handleSave = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <AvatarFallback>JS</AvatarFallback>
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
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome Back, John!</h1>
          <p className="text-gray-600">Find your next internship or entry-level opportunity</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="browse">
              <Search className="h-4 w-4 mr-2" />
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger value="applied">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Applied ({appliedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved ({savedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="h-4 w-4 mr-2" />
              Career Resources
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search internships and entry-level jobs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-3">{job.company}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSave(job.id)}
                    >
                      <Bookmark
                        className={`h-5 w-5 ${
                          savedJobs.includes(job.id) ? 'fill-current text-blue-600' : ''
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <Badge variant={job.type === 'Internship' ? 'default' : 'secondary'}>
                      {job.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.postedAt}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req, idx) => (
                      <Badge key={idx} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        'Apply Now'
                      )}
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applied" className="space-y-4">
            {appliedJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-4">
                  Start applying to internships and entry-level positions
                </p>
              </Card>
            ) : (
              mockJobs
                .filter(job => appliedJobs.includes(job.id))
                .map(job => (
                  <Card key={job.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl mb-2">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <Badge variant="secondary">Applied</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="mb-2">No saved jobs</h3>
                <p className="text-gray-600 mb-4">
                  Save jobs to easily find them later
                </p>
              </Card>
            ) : (
              mockJobs
                .filter(job => savedJobs.includes(job.id))
                .map(job => (
                  <Card key={job.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-3">{job.company}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(job.id)}
                      >
                        <Bookmark className="h-5 w-5 fill-current text-blue-600" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <Badge variant={job.type === 'Internship' ? 'default' : 'secondary'}>
                        {job.type}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                    </Button>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div>
              <h2 className="text-2xl mb-4">Career Resources</h2>
              <p className="text-gray-600 mb-6">
                Access expert guides and tips to help you succeed in your job search and career.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CV Tips */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl">CV Writing Tips</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="mb-1">Tailor Your CV</h4>
                    <p className="text-gray-600">
                      Customize your CV for each application. Highlight relevant skills and experiences that match the job description.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="mb-1">Use Action Verbs</h4>
                    <p className="text-gray-600">
                      Start bullet points with strong action verbs like "developed," "managed," "created," or "led."
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="mb-1">Quantify Achievements</h4>
                    <p className="text-gray-600">
                      Use numbers and metrics to demonstrate impact. Example: "Increased social media engagement by 40%."
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="mb-1">Keep It Concise</h4>
                    <p className="text-gray-600">
                      For students and recent graduates, aim for a one-page CV. Focus on relevant education, projects, and experience.
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Download CV Template
                </Button>
              </Card>

              {/* Interview Guides */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl">Interview Guides</h3>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="mb-1">Research the Company</h4>
                    <p className="text-gray-600">
                      Learn about the company's mission, values, and recent news. Show genuine interest during the interview.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="mb-1">Prepare STAR Responses</h4>
                    <p className="text-gray-600">
                      Use the STAR method (Situation, Task, Action, Result) to structure answers to behavioral questions.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="mb-1">Ask Good Questions</h4>
                    <p className="text-gray-600">
                      Prepare thoughtful questions about team culture, growth opportunities, and day-to-day responsibilities.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h4 className="mb-1">Follow Up</h4>
                    <p className="text-gray-600">
                      Send a thank-you email within 24 hours. Reiterate your interest and highlight key discussion points.
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Common Questions
                </Button>
              </Card>
            </div>

            {/* Additional Resources */}
            <Card className="p-6">
              <h3 className="text-xl mb-4">Additional Career Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2">Building Your Portfolio</h4>
                  <p className="text-gray-600">
                    Showcase your best projects, especially for technical and creative roles. Include descriptions and your role in each project.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2">Networking Tips</h4>
                  <p className="text-gray-600">
                    Attend career fairs, join professional groups, and connect with alumni. Building relationships can open doors.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2">LinkedIn Optimization</h4>
                  <p className="text-gray-600">
                    Create a professional LinkedIn profile with a clear headline, summary, and detailed experience sections.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2">Salary Negotiation</h4>
                  <p className="text-gray-600">
                    Research typical salaries for your role and location. Be prepared to discuss your expectations professionally.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl mb-1">John Smith</h2>
                  <p className="text-gray-600">Computer Science Student</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3">Contact Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Email: john.smith@university.edu</p>
                    <p>Phone: (555) 123-4567</p>
                    <p>University: State University</p>
                    <p>Expected Graduation: May 2026</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>React</Badge>
                    <Badge>Python</Badge>
                    <Badge>HTML/CSS</Badge>
                    <Badge>Git</Badge>
                    <Badge>SQL</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <p>Bachelor of Science in Computer Science</p>
                      <p className="text-gray-600">State University</p>
                      <p className="text-gray-600">Expected: May 2026 • GPA: 3.7</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <p>Web Development Intern</p>
                      <p className="text-gray-600">Local Tech Company</p>
                      <p className="text-gray-600">Summer 2024</p>
                    </div>
                  </div>
                </div>

                <Button>Edit Profile</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
