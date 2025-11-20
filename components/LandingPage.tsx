"use client";

import { Briefcase, Users, FileText, TrendingUp, CheckCircle, GraduationCap, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bridge Your Career Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect students and new graduates with companies offering internships and entry-level positions. 
              Start your career journey today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={onGetStarted}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Active Job Listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-600">Students Registered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CareerBridge?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive tools and resources for both students and employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Opportunities</h3>
                <p className="text-gray-600">
                  Access thousands of verified internships and entry-level positions from top companies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Resources</h3>
                <p className="text-gray-600">
                  Get access to CV tips, interview guides, and career advice to help you succeed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your applications, save jobs, and manage your job search efficiently
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Students */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">For Students</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Your Profile</h4>
                    <p className="text-gray-600">Sign up and build your professional profile</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Browse Opportunities</h4>
                    <p className="text-gray-600">Search and filter internships and entry-level jobs</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Apply & Track</h4>
                    <p className="text-gray-600">Submit applications and monitor your progress</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Hired</h4>
                    <p className="text-gray-600">Land your dream internship or first job</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Employers */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">For Employers</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Company Account</h4>
                    <p className="text-gray-600">Register your company and set up your profile</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Post Positions</h4>
                    <p className="text-gray-600">Create and publish internship or entry-level job listings</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review Applicants</h4>
                    <p className="text-gray-600">Browse qualified candidates and their profiles</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hire Top Talent</h4>
                    <p className="text-gray-600">Connect with the best students and graduates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of students and employers already using CareerBridge
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={onGetStarted}
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
