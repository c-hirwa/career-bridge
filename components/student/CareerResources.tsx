"use client";

import { FileText, Video, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function CareerResources() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Career Resources</h2>
        <p className="text-gray-600">Tools and guides to help you succeed in your job search</p>
      </div>

      <Tabs defaultValue="cv-tips" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cv-tips">CV Tips</TabsTrigger>
          <TabsTrigger value="interview-guides">Interview Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="cv-tips">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>CV Writing Basics</CardTitle>
                    <CardDescription>Learn the fundamentals of creating an effective CV</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16">
                  <h4 className="font-medium mb-2">Key Sections to Include:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Contact information and professional summary</li>
                    <li>Education with relevant coursework and achievements</li>
                    <li>Work experience and internships</li>
                    <li>Skills (technical and soft skills)</li>
                    <li>Projects and extracurricular activities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Tailoring Your CV</CardTitle>
                    <CardDescription>Customize your CV for each application</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16">
                  <h4 className="font-medium mb-2">Best Practices:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Read the job description carefully and match your skills</li>
                    <li>Use keywords from the job posting</li>
                    <li>Highlight relevant experience and projects</li>
                    <li>Keep it concise (1-2 pages for entry-level)</li>
                    <li>Use action verbs and quantify achievements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Common Mistakes to Avoid</CardTitle>
                    <CardDescription>What not to do when writing your CV</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16">
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Spelling and grammar errors</li>
                    <li>Using an unprofessional email address</li>
                    <li>Including irrelevant information</li>
                    <li>Using generic templates without customization</li>
                    <li>Lying or exaggerating experiences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interview-guides">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Preparing for Interviews</CardTitle>
                    <CardDescription>How to ace your job interviews</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16">
                  <h4 className="font-medium mb-2">Before the Interview:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Research the company thoroughly</li>
                    <li>Review the job description and requirements</li>
                    <li>Prepare examples using the STAR method</li>
                    <li>Practice common interview questions</li>
                    <li>Prepare questions to ask the interviewer</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Common Interview Questions</CardTitle>
                    <CardDescription>Prepare answers for these frequently asked questions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16 space-y-3">
                  <div>
                    <p className="font-medium text-sm mb-1">1. Tell me about yourself</p>
                    <p className="text-sm text-gray-600">Give a brief professional summary highlighting relevant experiences</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">2. Why do you want this position?</p>
                    <p className="text-sm text-gray-600">Show your knowledge of the company and align with their values</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">3. What are your strengths and weaknesses?</p>
                    <p className="text-sm text-gray-600">Be honest and show self-awareness and growth mindset</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">4. Describe a challenge you faced</p>
                    <p className="text-sm text-gray-600">Use STAR method: Situation, Task, Action, Result</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>After the Interview</CardTitle>
                    <CardDescription>Follow-up and next steps</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pl-16">
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Send a thank-you email within 24 hours</li>
                    <li>Reference specific topics discussed in the interview</li>
                    <li>Reiterate your interest in the position</li>
                    <li>Be patient and follow up if you don't hear back</li>
                    <li>Reflect on your performance and areas for improvement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
