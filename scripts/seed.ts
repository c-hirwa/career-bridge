import { db } from './db';
import { users, studentProfiles, employerProfiles, jobs } from './db/schema';
import bcrypt from 'bcryptjs';

const sampleJobs = [
  {
    title: 'Junior Software Engineer',
    description: 'We are looking for a junior software engineer to join our growing team. You will work on full-stack applications using modern technologies.',
    requirements: ['JavaScript/TypeScript', 'React or Vue', 'Node.js', 'SQL basics', 'Git'],
    location: 'San Francisco, CA',
    type: 'entry-level' as const,
    workMode: 'hybrid' as const,
    salary: '$80,000 - $100,000',
  },
  {
    title: 'Frontend Internship',
    description: 'Join our design team for a summer internship building beautiful user interfaces. Perfect for students looking to gain real-world experience.',
    requirements: ['HTML/CSS', 'JavaScript', 'Basic React knowledge', 'Design sense'],
    location: 'New York, NY',
    type: 'internship' as const,
    workMode: 'onsite' as const,
    salary: '$20/hour',
  },
  {
    title: 'Data Science Internship',
    description: 'Work with our data team on real-world machine learning projects. Gain hands-on experience with Python, SQL, and ML frameworks.',
    requirements: ['Python', 'SQL', 'Statistics', 'Machine Learning basics'],
    location: 'Remote',
    type: 'internship' as const,
    workMode: 'remote' as const,
    salary: '$22/hour',
  },
  {
    title: 'Backend Developer',
    description: 'Build scalable backend systems for our SaaS platform. Experience with microservices, cloud infrastructure, and distributed systems required.',
    requirements: ['Node.js/Python/Go', 'PostgreSQL/MongoDB', 'Docker', 'AWS/GCP', 'REST APIs'],
    location: 'Seattle, WA',
    type: 'entry-level' as const,
    workMode: 'remote' as const,
    salary: '$90,000 - $120,000',
  },
  {
    title: 'Product Designer Internship',
    description: 'Design user experiences for our mobile app. Learn design thinking, prototyping, and user research in a collaborative environment.',
    requirements: ['Figma', 'Design principles', 'Prototyping', 'UI/UX basics'],
    location: 'Austin, TX',
    type: 'internship' as const,
    workMode: 'hybrid' as const,
    salary: '$18/hour',
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Create employer user
    const hashedPassword = await bcrypt.hash('employer123', 10);
    const [employer] = await db.insert(users).values({
      email: 'employer@example.com',
      password: hashedPassword,
      role: 'employer',
    }).returning();

    // Create employer profile
    const [employerProfile] = await db.insert(employerProfiles).values({
      userId: employer.id,
      companyName: 'TechCorp',
      industry: 'Technology',
      companySize: '100-500',
      website: 'https://techcorp.example.com',
      description: 'Leading technology company building innovative solutions for the future.',
      logoUrl: 'https://via.placeholder.com/150?text=TechCorp',
    }).returning();

    // Create multiple sample jobs
    for (const job of sampleJobs) {
      await db.insert(jobs).values({
        employerId: employerProfile.id,
        ...job,
      });
    }

    // Create student user
    const studentHashedPassword = await bcrypt.hash('student123', 10);
    const [student] = await db.insert(users).values({
      email: 'student@example.com',
      password: studentHashedPassword,
      role: 'student',
    }).returning();

    // Create student profile
    await db.insert(studentProfiles).values({
      userId: student.id,
      fullName: 'John Doe',
      university: 'Stanford University',
      major: 'Computer Science',
      graduationYear: 2025,
      gpa: '3.8',
      bio: 'Passionate about building cool software and solving real-world problems.',
      resumeUrl: 'https://example.com/resume.pdf',
    });

    console.log('✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Employer: employer@example.com / employer123');
    console.log('   Student: student@example.com / student123');
    console.log('\n💼 Sample Jobs Created: 5 jobs posted by TechCorp');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
