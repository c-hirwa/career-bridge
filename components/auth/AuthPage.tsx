"use client";

import { useState, useTransition } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { GraduationCap, Building2 } from 'lucide-react';
import { signUpAction } from '@/app/actions/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [userType, setUserType] = useState<'student' | 'employer'>('student');
  const router = useRouter();
  
  type AuthResult = { error?: string; success?: boolean; [k: string]: unknown };

  const getErrorFrom = (res: unknown): string | undefined => {
    if (res && typeof res === 'object') {
      const maybe = (res as Record<string, unknown>)['error'];
      if (typeof maybe === 'string' && maybe.length > 0) return maybe;
    }
    return undefined;
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      startTransition(async () => {
                        setMessage(null);
                        const form = e.currentTarget as HTMLFormElement;
                        const formData = new FormData(form);
                        formData.set('role', 'student');

                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;

                        const signInOptions = { redirect: false, email, password, role: 'student' } as unknown as Record<string, unknown>;
                        const res = await signIn('credentials', signInOptions) as unknown;

                        const signInError = getErrorFrom(res);
                        if (signInError) {
                          setMessage('Sign in failed: ' + signInError);
                          return;
                        }

                        router.push('/student/dashboard');
                      });
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="role" value="student" />
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input id="student-email" name="email" type="email" placeholder="student@university.edu" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input id="student-password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">{isPending ? 'Signing in...' : 'Login as Student'}</Button>
                    {message && <p className="text-sm text-red-600">{message}</p>}
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      startTransition(async () => {
                        setMessage(null);
                        const form = e.currentTarget as HTMLFormElement;
                        const formData = new FormData(form);
                        formData.set('role', 'employer');

                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;

                        const signInOptions = { redirect: false, email, password, role: 'employer' } as unknown as Record<string, unknown>;
                        const res = await signIn('credentials', signInOptions) as unknown;

                        const signInError = getErrorFrom(res);
                        if (signInError) {
                          setMessage('Sign in failed: ' + signInError);
                          return;
                        }

                        router.push('/employer/dashboard');
                      });
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="role" value="employer" />
                    <div className="space-y-2">
                      <Label htmlFor="employer-email">Email</Label>
                      <Input id="employer-email" name="email" type="email" placeholder="recruiter@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-password">Password</Label>
                      <Input id="employer-password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">{isPending ? 'Signing in...' : 'Login as Employer'}</Button>
                    {message && <p className="text-sm text-red-600">{message}</p>}
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      startTransition(async () => {
                        setMessage(null);
                        const form = e.currentTarget as HTMLFormElement;
                        const formData = new FormData(form);
                        formData.set('role', 'student');

                        const res = await signUpAction(formData) as unknown;

                        const signUpError = getErrorFrom(res);
                        if (signUpError) {
                          setMessage('Sign up failed: ' + signUpError);
                          return;
                        }

                        // Auto sign-in after successful signup
                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;

                        const signInOptions = { redirect: false, email, password, role: 'student' } as unknown as Record<string, unknown>;
                        const signInRes = await signIn('credentials', signInOptions) as unknown;

                        const signInError = getErrorFrom(signInRes);
                        if (signInError) {
                          setMessage('Account created, but sign-in failed: ' + signInError);
                          return;
                        }

                        router.push('/student/dashboard');
                      });
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="role" value="student" />
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-name">Full Name</Label>
                      <Input id="student-signup-name" name="fullName" placeholder="Chris Hirwa" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-email">Email</Label>
                      <Input id="student-signup-email" name="email" type="email" placeholder="student@alustudent.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-university">University</Label>
                      <Input id="student-signup-university" name="university" placeholder="Your University" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-signup-password">Password</Label>
                      <Input id="student-signup-password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">{isPending ? 'Creating account...' : 'Sign Up as Student'}</Button>
                    {message && <p className="text-sm text-red-600">{message}</p>}
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      startTransition(async () => {
                        setMessage(null);
                        const form = e.currentTarget as HTMLFormElement;
                        const formData = new FormData(form);
                        formData.set('role', 'employer');

                        const res = await signUpAction(formData);

                        const signUpError = getErrorFrom(res);
                        if (signUpError) {
                          setMessage('Sign up failed: ' + signUpError);
                          return;
                        }

                        // Auto sign-in after successful signup
                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;

                        const signInOptions = { redirect: false, email, password, role: 'employer' } as unknown as Record<string, unknown>;
                        const signInRes = await signIn('credentials', signInOptions) as unknown;

                        const signInError = getErrorFrom(signInRes);
                        if (signInError) {
                          setMessage('Account created, but sign-in failed: ' + signInError);
                          return;
                        }

                        router.push('/employer/dashboard');
                      });
                    }}
                    className="space-y-4"
                  >
                    <input type="hidden" name="role" value="employer" />
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-company">Company Name</Label>
                      <Input id="employer-signup-company" name="companyName" placeholder="Company Inc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-email">Email</Label>
                      <Input id="employer-signup-email" name="email" type="email" placeholder="recruiter@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-industry">Industry</Label>
                      <Input id="employer-signup-industry" name="industry" placeholder="Technology" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employer-signup-password">Password</Label>
                      <Input id="employer-signup-password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">{isPending ? 'Creating account...' : 'Sign Up as Employer'}</Button>
                    {message && <p className="text-sm text-red-600">{message}</p>}
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
