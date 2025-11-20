"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { GraduationCap, Building2 } from 'lucide-react';

interface AuthPageProps {
  onAuth: (role: 'student' | 'employer') => void;
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'student' | 'employer'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(userType);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to CareerBridge</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Login */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType('student')}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Student Login</CardTitle>
                  <CardDescription>Access your student dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" type="email" placeholder="student@university.edu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Login as Student</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Employer Login */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType('employer')}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Employer Login</CardTitle>
                  <CardDescription>Access your employer dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employer-email">Email</Label>
                      <Input id="employer-email" type="email" placeholder="recruiter@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-password">Password</Label>
                      <Input id="employer-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Login as Employer</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Signup */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType('student')}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Student Sign Up</CardTitle>
                  <CardDescription>Create your student account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-name">Full Name</Label>
                      <Input id="student-signup-name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-email">Email</Label>
                      <Input id="student-signup-email" type="email" placeholder="student@university.edu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-university">University</Label>
                      <Input id="student-signup-university" placeholder="Your University" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-password">Password</Label>
                      <Input id="student-signup-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Sign Up as Student</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Employer Signup */}
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setUserType('employer')}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Employer Sign Up</CardTitle>
                  <CardDescription>Create your company account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-company">Company Name</Label>
                      <Input id="employer-signup-company" placeholder="Company Inc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-email">Email</Label>
                      <Input id="employer-signup-email" type="email" placeholder="recruiter@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-industry">Industry</Label>
                      <Input id="employer-signup-industry" placeholder="Technology" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-password">Password</Label>
                      <Input id="employer-signup-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Sign Up as Employer</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
