"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Briefcase, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CareerBridge</span>
          </div>

          <div className="flex items-center gap-4">
            {!session && (
              <>
                <Button variant="ghost" onClick={() => router.push('/auth/signin')}>Sign In</Button>
                <Button onClick={() => router.push('/auth/signin')}>Get Started</Button>
              </>
            )}

            {session && (
              <Button variant="outline" onClick={() => signOut()} className="gap-2">
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
