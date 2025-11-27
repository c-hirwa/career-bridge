# 🎓 CareerBridge - Student Job Platform

A modern, production-ready job platform connecting students with career opportunities and employers with talent.

[![Status](https://img.shields.io/badge/status-production--ready-brightgreen)](.)
[![Node.js](https://img.shields.io/badge/node-18%2B-green)](.)
[![Next.js](https://img.shields.io/badge/next.js-16-black)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)](.)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

### 🎓 For Students
- **Job Discovery**: Browse all active job listings with advanced search & filtering
- **Smart Saving**: Save jobs to review later (persisted to database)
- **Easy Applications**: One-click apply to jobs, track application status
- **Profile Management**: Build your profile with university, major, GPA, and resume
- **Career Resources**: Access helpful career development materials

### 💼 For Employers
- **Job Posting**: Create and publish job listings quickly
- **Applicant Management**: View all applicants with their full profiles
- **Job Dashboard**: Monitor, edit, and delete your postings
- **Company Profile**: Showcase your company information and logo
- **Real-time Notifications**: See applications as they come in

### 🔐 Technical
- **NextAuth.js v5**: Secure authentication with session management
- **PostgreSQL + Drizzle ORM**: Reliable data persistence
- **TypeScript**: Full type safety
- **Tailwind CSS + shadcn/ui**: Beautiful, responsive UI
- **Server Components**: Optimal performance with Next.js 14 App Router
- **REST API**: Clean, documented endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation
```bash
# 1. Clone repository
git clone https://github.com/yourusername/career-bridge.git
cd career-bridge

# 2. Install dependencies
npm install

# 3. Setup environment (.env.local)
cp .env.example .env.local

# Configure:
# DATABASE_URL=postgresql://user:password@localhost:5432/careerbridge
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=$(openssl rand -base64 32)

# 4. Initialize database
npx drizzle-kit generate
npx drizzle-kit push

# 5. (Optional) Seed sample data
npm run seed

# 6. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick setup and feature overview
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Architecture and implementation details

## 🏗️ Architecture

```
Next.js 14 App Router
├── Server Components (Data fetching, Auth checks)
├── Client Components (Interactive UI, Forms)
├── Server Actions (Form submissions, DB mutations)
└── REST API Routes (/api/*)

PostgreSQL Database (Drizzle ORM)
├── Users (email, password, role)
├── Profiles (student & employer-specific info)
├── Jobs (job listings)
├── Applications (student applications)
└── Saved Jobs (bookmarked jobs)

NextAuth v5 Authentication
├── Credentials Provider (email/password)
├── JWT Sessions
├── Role-based Access Control
└── Drizzle Adapter Integration
```

## 📱 Pages & Routes

### Student Flow
- `/` → Landing page
- `/auth` → Sign up/Sign in
- `/student/dashboard` → Main student dashboard
  - Browse Jobs tab
  - Saved Jobs tab
  - Applications tab
  - Career Resources tab
  - Profile tab

### Employer Flow
- `/employer/dashboard` → Main employer dashboard
  - My Postings tab
  - Applicants tab
  - Post New Job tab
  - Profile tab

## 🔌 API Endpoints

### Public
- `GET /api/jobs` - Get all active jobs

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout

### Jobs
- `POST /api/jobs` - Post new job (employer)
- `DELETE /api/jobs/:id` - Delete job (employer)
- `GET /api/jobs/:id/applicants` - Get applicants for job (employer)

### Student Actions
- `POST /api/student/apply` - Apply to job
- `POST /api/student/save-job` - Save/unsave job
- `GET /api/student/applications` - Get student's applications
- `GET /api/student/saved-jobs` - Get student's saved jobs
- `GET /api/student/profile` - Get student profile
- `PATCH /api/student/profile` - Update student profile

### Employer Profile
- `GET /api/employer/profile` - Get company profile
- `PATCH /api/employer/profile` - Update company profile

See [API_REFERENCE.md](./API_REFERENCE.md) for complete documentation.

## 🗄️ Database Schema

### Tables
- **users** - User accounts (email, password, role)
- **student_profiles** - Student details (university, major, GPA, etc.)
- **employer_profiles** - Company details (name, logo, description, etc.)
- **jobs** - Job listings (title, description, requirements, location, etc.)
- **applications** - Job applications (student + job + status)
- **saved_jobs** - Bookmarked jobs (student + job)

## 🛠️ Development

### Available Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:push    # Push database migrations
npm run db:generate # Generate new migrations
npm run seed       # Seed database with sample data
```

### File Structure
```
career-bridge/
├── app/
│   ├── api/              # REST API routes
│   ├── actions/          # Server actions
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/routing page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Auth components
│   ├── student/         # Student dashboard components
│   └── employer/        # Employer dashboard components
├── db/
│   ├── schema.ts        # Database schema
│   ├── index.ts         # Database connection
│   └── migrations/      # Migration files
├── lib/
│   └── auth.ts          # NextAuth configuration
├── public/              # Static assets
├── scripts/
│   └── seed.ts          # Database seeding script
└── QUICK_START.md       # Quick reference
```

## 🧪 Testing Workflows

### Student Registration & Job Browsing
1. Click "Get Started" on landing page
2. Select "Student" and enter email/password
3. Fill in academic profile (university, major, GPA)
4. View "Browse Jobs" tab
5. Search and filter jobs
6. Click "Apply Now" on a job
7. Verify application appears in "Applications" tab
8. Click bookmark icon to save jobs

### Employer Job Posting
1. Click "Get Started" on landing page
2. Select "Employer" and enter email/password
3. Fill in company profile
4. Click "Post New Job" tab
5. Enter job details and submit
6. Verify job appears in "My Postings"
7. Click "Applicants" tab to see student applications
8. Test delete button to remove job

### Data Persistence
1. Post a job or apply as student
2. Log out and log back in
3. Verify data persists (jobs still posted, applications still show)

## 🚀 Deployment

### Quick Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

Then configure environment variables in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_URL` (must be https)
- `NEXTAUTH_SECRET`

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions for Vercel, AWS, DigitalOcean, etc.

## 🔐 Security Features

- ✅ NextAuth v5 session management
- ✅ Password hashing with bcryptjs
- ✅ CSRF protection
- ✅ Role-based access control
- ✅ SQL injection prevention (Drizzle parameterized queries)
- ✅ Input validation with Zod
- ✅ Secure HTTP-only cookies
- ✅ Rate limiting (recommended for production)

## 📊 Performance Optimizations

- Server-side rendering for data-heavy pages
- Database indexes on frequently queried columns
- Efficient query patterns (avoid N+1 queries)
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Static generation where possible

## 🐛 Troubleshooting

### Database Connection Fails
```bash
# Verify connection string
echo $DATABASE_URL

# Test PostgreSQL connection
psql $DATABASE_URL
```

### Session Not Persisting
- Verify `NEXTAUTH_SECRET` is set and consistent
- Check `NEXTAUTH_URL` matches deployment domain
- Clear browser cookies

### Build Errors
```bash
npm run lint          # Check for TypeScript errors
rm -rf .next          # Clear cache
npm run build         # Rebuild
```

See [QUICK_START.md](./QUICK_START.md#-troubleshooting) for more troubleshooting tips.

## 📝 Development Notes

### Key Technologies
- **Next.js 14** - React framework with App Router
- **NextAuth.js v5** - Authentication
- **Drizzle ORM** - Type-safe SQL
- **PostgreSQL** - Database
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React 19** - UI library

### Coding Standards
- Use TypeScript for all new code
- Follow the file structure conventions
- Add error handling to API routes
- Use Server Components by default, Client Components when needed
- Keep components focused and reusable

### Git Workflow
```bash
# Feature branches
git checkout -b feature/add-new-feature

# Commit with clear messages
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/add-new-feature
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions:
1. Check [QUICK_START.md](./QUICK_START.md)
2. Review [API_REFERENCE.md](./API_REFERENCE.md)
3. Check browser console for errors
4. Review server logs in terminal

## 🎯 Roadmap

### Planned Features
- [ ] Email notifications for applications
- [ ] Advanced analytics dashboard
- [ ] Chat between employers and students
- [ ] Video interview integration
- [ ] Resume parsing and AI matching
- [ ] Social login (Google, GitHub)
- [ ] Mobile app (React Native)
- [ ] Internationalization (i18n)

### Performance Enhancements
- [ ] Database connection pooling
- [ ] Redis caching layer
- [ ] CDN for static assets
- [ ] GraphQL API option

## 📈 Current Status

✅ **Production Ready**

**Version**: 1.0.0  
**Last Updated**: 2024-01-20  
**Deployment Ready**: Yes  
**Demo Time**: 6-7 minutes for full feature walkthrough

---

Made with ❤️ for connecting students with opportunities.
