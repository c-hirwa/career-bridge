import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { EmployerDashboard } from '@/components/employer/EmployerDashboard';

export default async function EmployerDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'employer') {
    redirect('/auth/signin');
  }

  return <EmployerDashboard />;
}
