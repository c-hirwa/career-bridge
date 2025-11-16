import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GraduationCap, Building2, ArrowLeft } from 'lucide-react';

type View = 'landing' | 'login' | 'signup' | 'employee' | 'employer';

interface SignupPageProps {
  onNavigate: (view: View) => void;
  onSignup: (role: 'employee' | 'employer') => void;
}

export default function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    university: '',
    password: '',
    confirmPassword: '',
  });

  const [employerData, setEmployerData] = useState({
    companyName: '',
    email: '',
    contactName: '',
    password: '',
    confirmPassword: '',
  });

  const handleStudentSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentData.password !== studentData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSignup('employee');
  };

  const handleEmployerSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (employerData.password !== employerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onSignup('employer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('landing')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <span>CareerBridge</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join CareerBridge and start your journey</p>
        </div>

        <Card className="p-8">
          <Tabs defaultValue="student">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">
                <GraduationCap className="h-4 w-4 mr-2" />
                Student
              </TabsTrigger>
              <TabsTrigger value="employer">
                <Building2 className="h-4 w-4 mr-2" />
                Employer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={handleStudentSignup} className="space-y-4">
                <div>
                  <Label htmlFor="student-name">Full Name</Label>
                  <Input
                    id="student-name"
                    placeholder="John Smith"
                    value={studentData.name}
                    onChange={(e) =>
                      setStudentData({ ...studentData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={studentData.email}
                    onChange={(e) =>
                      setStudentData({ ...studentData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="student-university">University</Label>
                  <Input
                    id="student-university"
                    placeholder="Your University"
                    value={studentData.university}
                    onChange={(e) =>
                      setStudentData({ ...studentData, university: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Create a password"
                    value={studentData.password}
                    onChange={(e) =>
                      setStudentData({ ...studentData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="student-confirm-password">Confirm Password</Label>
                  <Input
                    id="student-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={studentData.confirmPassword}
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" required />
                  <p className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Create Student Account
                </Button>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => onNavigate('login')}
                  >
                    Sign in
                  </Button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <form onSubmit={handleEmployerSignup} className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    placeholder="Your Company"
                    value={employerData.companyName}
                    onChange={(e) =>
                      setEmployerData({ ...employerData, companyName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="employer-email">Company Email</Label>
                  <Input
                    id="employer-email"
                    type="email"
                    placeholder="hr@company.com"
                    value={employerData.email}
                    onChange={(e) =>
                      setEmployerData({ ...employerData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact-name">Contact Person Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Jane Doe"
                    value={employerData.contactName}
                    onChange={(e) =>
                      setEmployerData({ ...employerData, contactName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="employer-password">Password</Label>
                  <Input
                    id="employer-password"
                    type="password"
                    placeholder="Create a password"
                    value={employerData.password}
                    onChange={(e) =>
                      setEmployerData({ ...employerData, password: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="employer-confirm-password">Confirm Password</Label>
                  <Input
                    id="employer-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={employerData.confirmPassword}
                    onChange={(e) =>
                      setEmployerData({
                        ...employerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" required />
                  <p className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Create Employer Account
                </Button>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => onNavigate('login')}
                  >
                    Sign in
                  </Button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
