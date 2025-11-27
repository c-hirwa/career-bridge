"use client";

import { useState } from 'react';
import { LandingPage } from '../components/LandingPage';
import { AuthPage } from '../components/auth/AuthPage';
import { StudentDashboard } from '../components/student/StudentDashboard';
import { EmployerDashboard } from '../components/employer/EmployerDashboard';

type Page = 'landing' | 'auth' | 'student-dashboard' | 'employer-dashboard';
type UserRole = 'student' | 'employer' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentPage('auth')} />
      )}
      {currentPage === 'auth' && (
        <AuthPage />
      )}
      {currentPage === 'student-dashboard' && (
        <StudentDashboard onLogout={handleLogout} />
      )}
      {currentPage === 'employer-dashboard' && (
        <EmployerDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}
