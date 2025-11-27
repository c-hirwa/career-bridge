import { pgTable, text, timestamp, uuid, varchar, integer, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'employer']);
export const jobTypeEnum = pgEnum('job_type', ['internship', 'entry-level']);
export const workModeEnum = pgEnum('work_mode', ['remote', 'onsite', 'hybrid']);
export const applicationStatusEnum = pgEnum('application_status', [
  'submitted',
  'reviewing',
  'interview',
  'rejected',
  'accepted'
]);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Student profiles
export const studentProfiles = pgTable('student_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  university: varchar('university', { length: 255 }),
  major: varchar('major', { length: 255 }),
  graduationYear: integer('graduation_year'),
  gpa: varchar('gpa', { length: 10 }),
  bio: text('bio'),
  resumeUrl: varchar('resume_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Employer profiles
export const employerProfiles = pgTable('employer_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 255 }),
  companySize: varchar('company_size', { length: 50 }),
  website: varchar('website', { length: 500 }),
  description: text('description'),
  logoUrl: varchar('logo_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Jobs table
export const jobs = pgTable('jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  employerId: uuid('employer_id').references(() => employerProfiles.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').array().notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  type: jobTypeEnum('type').notNull(),
  workMode: workModeEnum('work_mode').notNull(),
  salary: varchar('salary', { length: 100 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Applications table
export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => studentProfiles.id, { onDelete: 'cascade' }).notNull(),
  status: applicationStatusEnum('status').default('submitted').notNull(),
  coverLetter: text('cover_letter'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Saved jobs table
export const savedJobs = pgTable('saved_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  jobId: uuid('job_id').references(() => jobs.id, { onDelete: 'cascade' }).notNull(),
  studentId: uuid('student_id').references(() => studentProfiles.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  studentProfile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  employerProfile: one(employerProfiles, {
    fields: [users.id],
    references: [employerProfiles.userId],
  }),
}));

export const studentProfilesRelations = relations(studentProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [studentProfiles.userId],
    references: [users.id],
  }),
  applications: many(applications),
  savedJobs: many(savedJobs),
}));

export const employerProfilesRelations = relations(employerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [employerProfiles.userId],
    references: [users.id],
  }),
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employerProfiles, {
    fields: [jobs.employerId],
    references: [employerProfiles.id],
  }),
  applications: many(applications),
  savedBy: many(savedJobs),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
  student: one(studentProfiles, {
    fields: [applications.studentId],
    references: [studentProfiles.id],
  }),
}));

export const savedJobsRelations = relations(savedJobs, ({ one }) => ({
  job: one(jobs, {
    fields: [savedJobs.jobId],
    references: [jobs.id],
  }),
  student: one(studentProfiles, {
    fields: [savedJobs.studentId],
    references: [studentProfiles.id],
  }),
}));
