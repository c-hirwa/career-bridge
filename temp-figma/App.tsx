import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { EmployerDashboard } from './components/employer/EmployerDashboard';

type Page = 'landing' | 'auth' | 'student-dashboard' | 'employer-dashboard';
type UserRole = 'student' | 'employer' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleAuth = (role: 'student' | 'employer') => {
    setUserRole(role);
    setCurrentPage(role === 'student' ? 'student-dashboard' : 'employer-dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userRole={userRole}
        onLogout={handleLogout}
      />
      
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentPage('auth')} />
      )}
      
      {currentPage === 'auth' && (
        <AuthPage onAuth={handleAuth} />
      )}
      
      {currentPage === 'student-dashboard' && userRole === 'student' && (
        <StudentDashboard onLogout={handleLogout} />
      )}
      
      {currentPage === 'employer-dashboard' && userRole === 'employer' && (
        <EmployerDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
