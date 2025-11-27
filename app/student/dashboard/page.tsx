import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StudentDashboard } from '@/components/student/StudentDashboard';

export default async function StudentDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'student') {
    redirect('/auth/signin');
  }

  return <StudentDashboard />;
}
