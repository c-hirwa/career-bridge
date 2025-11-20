"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { GraduationCap, Mail, Calendar, Download, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface Applicant {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  gpa: string;
  appliedDate: string;
}

interface JobApplicants {
  jobId: string;
  jobTitle: string;
  applicants: Applicant[];
}

interface ApplicantsProps {
  applicants: JobApplicants[];
}

export function Applicants({ applicants }: ApplicantsProps) {
  const totalApplicants = applicants.reduce((sum, job) => sum + job.applicants.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Applicants</h2>
        <p className="text-gray-600">
          Review candidates who applied to your positions ({totalApplicants} total)
        </p>
      </div>

      {applicants.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {applicants.map((job) => (
            <AccordionItem key={job.jobId} value={job.jobId} className="border-none">
              <Card>
                <AccordionTrigger className="hover:no-underline px-6">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="text-left">
                      <h3 className="font-semibold">{job.jobTitle}</h3>
                      <p className="text-sm text-gray-600">
                        {job.applicants.length} {job.applicants.length === 1 ? 'applicant' : 'applicants'}
                      </p>
                    </div>
                    <Badge>{job.applicants.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4 space-y-4">
                    {job.applicants.map((applicant) => (
                      <Card key={applicant.id} className="bg-gray-50">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <GraduationCap className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-lg">{applicant.name}</h4>
                                  <p className="text-sm text-gray-600">{applicant.university}</p>
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Mail className="w-4 h-4" />
                                  <span>{applicant.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  <span>Applied {applicant.appliedDate}</span>
                                </div>
                              </div>

                              <div className="flex gap-2 mt-3">
                                <Badge variant="secondary">Major: {applicant.major}</Badge>
                                <Badge variant="secondary">GPA: {applicant.gpa}</Badge>
                              </div>
                            </div>

                            <div className="flex md:flex-col gap-2">
                              <Button variant="default" size="sm" className="gap-2">
                                <ExternalLink className="w-4 h-4" />
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="w-4 h-4" />
                                Download CV
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No applicants yet</h3>
            <p className="text-gray-500">
              When students apply to your jobs, you'll see them here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
