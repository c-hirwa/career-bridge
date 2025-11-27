# 🎓 CareerBridge - Student Job Platform

## Overview

CareerBridge simplifies the job search process for students and the hiring process for employers. Students can browse opportunities, save jobs, and apply with a single click. Employers can post positions, review applicants, and manage their job listings through an intuitive dashboard.

[![Status](https://img.shields.io/badge/status-production--ready-brightgreen)](.)
[![Node.js](https://img.shields.io/badge/node-18%2B-green)](.)
[![Next.js](https://img.shields.io/badge/next.js-16-black)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)](.)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)


## Features

**For Students:**
- Browse and search job listings with filters
- Save jobs to review later
- Apply to positions with one click
- Track application status
- Manage student profile (university, major, GPA)

**For Employers:**
- Post job openings
- View all applicants and their academic profiles
- Edit or delete job postings
- Update company information

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js v5
- **UI Components**: shadcn/ui

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/career-bridge.git
cd career-bridge
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**

Create `.env.local` in the root directory:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/careerbridge"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

Generate a secret key:
```bash
openssl rand -base64 32
```

4. **Set up PostgreSQL**
- Install PostgreSQL from https://www.postgresql.org/download/
- Create a database named `careerbridge` using pgAdmin or command line

5. **Initialize database**
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

6. **Start the development server**
```bash
npm run dev
```

7. **Open the app**
Navigate to http://localhost:3000

## Project Structure

```
career-bridge/
├── app/              # Next.js app directory
│   ├── api/         # API endpoints
│   └── page.tsx     # Main routing page
├── components/       # React components
│   ├── auth/        # Authentication
│   ├── student/     # Student dashboard
│   ├── employer/    # Employer dashboard
│   └── ui/          # Reusable components
├── db/              # Database
│   ├── schema.ts    # Database schema
│   └── index.ts     # DB connection
└── .env.local       # Environment variables
```

## Database Schema

Main tables:
- **users** - User accounts with email and role
- **student_profiles** - Student academic information
- **employer_profiles** - Company details
- **jobs** - Job listings
- **applications** - Student job applications
- **saved_jobs** - Bookmarked jobs

## Usage

### As a Student:
1. Sign up and select "Student" role
2. Complete your profile with university details
3. Browse jobs and use search/filters
4. Save jobs or apply directly
5. Track applications in your dashboard

### As an Employer:
1. Sign up and select "Employer" role
2. Add company information
3. Post job openings with details
4. View applicants and their profiles
5. Manage your job postings

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
npx drizzle-kit push # Update database schema
```

## Troubleshooting

**Database connection issues:**
- Verify `DATABASE_URL` in `.env.local`
- Check PostgreSQL is running
- Confirm database `careerbridge` exists

**Authentication problems:**
- Ensure `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your URL
- Clear browser cookies

**Build errors:**
```bash
rm -rf .next
npm run build
```

## Deployment

The application can be deployed to Vercel, Netlify, or similar platforms:

```bash
npx vercel
```

Add environment variables in your hosting platform. For production, use a cloud database like Vercel Postgres, Neon, or Supabase.

## License

MIT

---

Built with Next.js, TypeScript, and PostgreSQL
