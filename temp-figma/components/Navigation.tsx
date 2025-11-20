"use client";

import { Briefcase, LogOut } from 'lucide-react';
import { Button } from './ui/button';

type Page = 'landing' | 'auth' | 'student-dashboard' | 'employer-dashboard';
type UserRole = 'student' | 'employer' | null;

interface NavigationProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export function Navigation({ currentPage, setCurrentPage, userRole, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('landing')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CareerBridge</span>
          </div>

          <div className="flex items-center gap-4">
            {!userRole && currentPage === 'landing' && (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => setCurrentPage('auth')}
                >
                  Sign In
                </Button>
                <Button onClick={() => setCurrentPage('auth')}>
                  Get Started
                </Button>
              </>
            )}
            
            {userRole && (
              <Button 
                variant="outline"
                onClick={onLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
