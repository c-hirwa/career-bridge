# CareerBridge - Quick Start Guide

A professional Next.js 14 career platform connecting students with job opportunities and employers with talent.

## 🚀 Features Implemented

### Authentication & User Management
- ✅ NextAuth v5 with Credentials provider
- ✅ Student and Employer role-based signup/signin
- ✅ Session management with JWT
- ✅ Profile editing (company info for employers, academic info for students)
- ✅ Persistent user sessions across page reloads

### Job Management
- ✅ Employers can post new job listings
- ✅ Jobs persisted in PostgreSQL database
- ✅ Students can browse all active jobs (public endpoint)
- ✅ Employers can view and delete their own job postings
- ✅ Real-time job updates across dashboards

### Student Features
- ✅ Browse all available jobs with search & filtering
- ✅ Save jobs to personal collection (persisted to DB)
- ✅ Apply to jobs (creates application record)
- ✅ View application history
- ✅ Career resources section
- ✅ Profile management with university, major, GPA, resume URL

### Employer Features
- ✅ Post new job listings with full details
- ✅ View all active job postings
- ✅ Delete job postings
- ✅ View real applicants with student profiles
- ✅ Application count per job
- ✅ Company profile management

### UI/UX
- ✅ Clean, professional design with Tailwind CSS + shadcn/ui
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Tab-based navigation for dashboard sections
- ✅ Loading states and error handling
- ✅ Smooth transitions and hover effects
- ✅ Badge system for job types and work modes

## 📋 Architecture Overview

```
Next.js 14 App Router
├── Server Components (pages)
├── Client Components (interactive UI)
├── Server Actions (form submissions)
└── REST API Routes (/api/*)

Database: PostgreSQL + Drizzle ORM
├── Users table (email, password, role)
├── Student Profiles (university, major, GPA, etc.)
├── Employer Profiles (company name, logo, etc.)
├── Jobs (title, description, requirements, location, type, workMode, salary)
├── Applications (student + job + status)
└── Saved Jobs (student + job)

Authentication: NextAuth v5
├── Credentials Provider
├── JWT Sessions
├── Drizzle Adapter
└── Role-based access control
```

## 🛠 Local Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd career-bridge
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```bash
   # Database (PostgreSQL)
   DATABASE_URL="postgresql://user:password@localhost:5432/careerbridge"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-use-openssl-rand-base64-32"

   # Optional: API endpoints
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

   Generate a secure NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

3. **Initialize database:**
   ```bash
   # Generate migrations from schema
   npx drizzle-kit generate

   # Push schema to database
   npx drizzle-kit push
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

## 📊 Database Schema

### Users
- `id` (UUID, PK)
- `email` (VARCHAR, unique)
- `password` (VARCHAR, hashed)
- `role` (ENUM: 'student' | 'employer')
- `created_at`, `updated_at`

### Student Profiles
- `id` (UUID, PK)
- `user_id` (FK to users)
- `full_name`, `university`, `major`, `graduation_year`, `gpa`
- `bio`, `resume_url`

### Employer Profiles
- `id` (UUID, PK)
- `user_id` (FK to users)
- `company_name`, `industry`, `company_size`, `website`, `description`, `logo_url`

### Jobs
- `id` (UUID, PK)
- `employer_id` (FK to employer_profiles)
- `title`, `description`, `requirements` (array), `location`, `type`, `work_mode`, `salary`
- `is_active` (boolean)
- `created_at`, `updated_at`

### Applications
- `id` (UUID, PK)
- `job_id` (FK to jobs)
- `student_id` (FK to student_profiles)
- `status` (ENUM: 'submitted' | 'reviewing' | 'interview' | 'rejected' | 'accepted')
- `cover_letter` (optional)
- `created_at`, `updated_at`

### Saved Jobs
- `id` (UUID, PK)
- `job_id` (FK to jobs)
- `student_id` (FK to student_profiles)
- `created_at`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signin` — Login (NextAuth)
- `POST /api/auth/signup` — Register (NextAuth)
- `POST /api/auth/signout` — Logout (NextAuth)

### Jobs (Public)
- `GET /api/jobs` — Get all active jobs (no auth required)
- `POST /api/jobs` — Post new job (employer only)
- `DELETE /api/jobs/:id` — Delete job (employer only)
- `GET /api/jobs/:id/applicants` — Get applicants for a job (employer only)

### Student Actions
- `POST /api/student/apply` — Apply to a job
- `POST /api/student/save-job` — Save/unsave a job
- `GET /api/student/applications` — Get all applications for student
- `GET /api/student/saved-jobs` — Get all saved jobs for student
- `GET /api/student/profile` — Get student profile
- `PATCH /api/student/profile` — Update student profile

### Employer Profiles
- `GET /api/employer/profile` — Get company profile
- `PATCH /api/employer/profile` — Update company profile

## 🎨 UI Components Used

- **shadcn/ui**: Button, Input, Card, Badge, Tabs, Dialog, Alert, etc.
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Bookmark, Trash2, Eye, Edit, MapPin, DollarSign, etc.

## 🔐 Security Features

- ✅ NextAuth session management
- ✅ Hashed passwords (NextAuth + @auth/drizzle-adapter)
- ✅ JWT tokens for stateless auth
- ✅ Role-based authorization checks on all API routes
- ✅ CSRF protection via NextAuth
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Drizzle parameterized queries)

## 📱 Page Structure

```
/
├── / — Landing page + auth routing (client-side)
├── /student/dashboard — Student dashboard (server component)
├── /employer/dashboard — Employer dashboard (server component)
└── /api/* — API routes
```

## 🚢 Deployment Checklist

- [ ] Set production environment variables in `.env.production`
- [ ] Run `npm run build` to verify production build
- [ ] Push migrations to production DB: `npx drizzle-kit push --env production`
- [ ] Set `NEXTAUTH_URL` to production domain (no trailing slash)
- [ ] Generate secure `NEXTAUTH_SECRET` and set in production
- [ ] Deploy to Vercel, Netlify, or your hosting provider
- [ ] Enable HTTPS (required for NextAuth cookies)
- [ ] Test all auth flows in production

### Deployment to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and set environment variables in Vercel dashboard
```

## 🧪 Testing Workflows

### Test Student Flow
1. Sign up as student (any email)
2. Fill in profile (university, major, GPA)
3. Browse jobs tab
4. Search and filter jobs
5. Click Apply on a job
6. Verify applied status updates
7. Click Saved Jobs tab
8. Save a job
9. Verify save persists
10. Check Applications tab

### Test Employer Flow
1. Sign up as employer (any email)
2. Fill in company profile
3. Post New Job tab
4. Fill job details and submit
5. My Postings tab - verify job appears
6. Click Applicants tab
7. Verify student applicants appear with their profiles
8. Test delete job button

### Test Persistence
1. Post a job as employer
2. Log out and log back in
3. Verify job still appears in My Postings
4. As student, apply to job and save it
5. Log out and log back in
6. Verify saved/applied status persists

## 📝 Key Files Reference

- `lib/auth.ts` — NextAuth configuration
- `app/api/auth/[...nextauth]/route.ts` — NextAuth handlers
- `app/api/jobs/route.ts` — Jobs GET/POST endpoints
- `app/api/jobs/[id]/route.ts` — Job DELETE endpoint
- `app/api/student/*` — Student endpoints
- `db/schema.ts` — Drizzle schema definition
- `components/student/StudentDashboard.tsx` — Student UI
- `components/employer/EmployerDashboard.tsx` — Employer UI

## 🐛 Troubleshooting

### "Failed to fetch jobs" error
- Check DATABASE_URL is correct
- Verify Drizzle migrations were pushed: `npx drizzle-kit push`
- Check server logs for detailed error message

### Session not persisting
- Verify NEXTAUTH_SECRET is set and consistent
- Clear browser cookies and try again
- Check NEXTAUTH_URL matches deployment domain

### Database connection errors
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Confirm user/password credentials
- Ensure database exists

### Build fails on production
- Run `npm run build` locally to debug
- Check all environment variables are set
- Verify no TypeScript errors: `npm run lint`

## 📞 Support

For issues or questions:
1. Check the error message in browser console (F12)
2. Check server logs in terminal
3. Review database logs
4. Verify `.env.local` is properly configured

---

**Status**: ✅ Production-ready MVP

**Next Steps**: Seed database with sample jobs, conduct UAT, deploy to hosting platform.
