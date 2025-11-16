import { Button } from './ui/button';
import { Card } from './ui/card';
import { GraduationCap, Building2, Search, TrendingUp, Shield, Zap, FileText, Users } from 'lucide-react';

type View = 'landing' | 'login' | 'signup' | 'employee' | 'employer';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl">CareerBridge</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => onNavigate('login')}>
                Log In
              </Button>
              <Button onClick={() => onNavigate('signup')}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6">
              Launch Your Career Journey Today
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connecting students and new graduates with companies offering internships and entry-level opportunities. Your future starts here.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('signup')}
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                I'm a Student
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
                onClick={() => onNavigate('signup')}
              >
                <Building2 className="mr-2 h-5 w-5" />
                I'm an Employer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Why Choose CareerBridge?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in helping students and graduates take their first steps into the professional world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2">Entry-Level Focused</h3>
              <p className="text-gray-600">
                Find internships and entry-level positions tailored specifically for students and recent graduates.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-2">CV Tips & Guides</h3>
              <p className="text-gray-600">
                Access expert advice on crafting the perfect CV and acing your interviews.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mb-2">Career Growth</h3>
              <p className="text-gray-600">
                Start your career journey with opportunities that offer mentorship and growth potential.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2">Quick Application</h3>
              <p className="text-gray-600">
                Apply to multiple opportunities with one click using your student profile.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2">Verified Companies</h3>
              <p className="text-gray-600">
                All companies are verified to ensure safe and legitimate opportunities for students.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2">Fresh Talent</h3>
              <p className="text-gray-600">
                Connect with motivated students eager to start their professional careers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-2">5,000+</div>
              <p className="text-blue-100">Internships & Entry-Level Jobs</p>
            </div>
            <div>
              <div className="text-5xl mb-2">25,000+</div>
              <p className="text-blue-100">Students & Graduates</p>
            </div>
            <div>
              <div className="text-5xl mb-2">2,000+</div>
              <p className="text-blue-100">Partner Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">How CareerBridge Works</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                For Students
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <p>Create your student profile with education and skills</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <p>Browse internships and entry-level positions</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <p>Access CV tips and interview guides</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <p>Apply with one click and track your applications</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                For Employers
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <p>Create your company profile</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <p>Post internship and entry-level job openings</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <p>Review applications from qualified students</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <p>Connect with talented graduates ready to contribute</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of students and companies finding success on CareerBridge.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('signup')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate('login')}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2025 CareerBridge. Empowering the next generation of professionals.</p>
        </div>
      </footer>
    </div>
  );
}
