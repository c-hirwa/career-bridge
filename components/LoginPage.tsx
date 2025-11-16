import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GraduationCap, Building2, ArrowLeft } from 'lucide-react';

type View = 'landing' | 'login' | 'signup' | 'employee' | 'employer';

interface LoginPageProps {
  onNavigate: (view: View) => void;
  onLogin: (role: 'employee' | 'employer') => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPassword, setEmployerPassword] = useState('');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('employee');
  };

  const handleEmployerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('employer');
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

      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your career journey</p>
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
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="student@university.edu"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="Enter your password"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <Button variant="link" className="p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>

                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => onNavigate('signup')}
                  >
                    Sign up
                  </Button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <form onSubmit={handleEmployerLogin} className="space-y-4">
                <div>
                  <Label htmlFor="employer-email">Company Email</Label>
                  <Input
                    id="employer-email"
                    type="email"
                    placeholder="hr@company.com"
                    value={employerEmail}
                    onChange={(e) => setEmployerEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="employer-password">Password</Label>
                  <Input
                    id="employer-password"
                    type="password"
                    placeholder="Enter your password"
                    value={employerPassword}
                    onChange={(e) => setEmployerPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <Button variant="link" className="p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>

                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => onNavigate('signup')}
                  >
                    Sign up
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
