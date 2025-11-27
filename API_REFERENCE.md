# CareerBridge - Complete API Reference

Complete documentation of all API endpoints for students, employers, and admins.

## Base URL
```
Development: http://localhost:3000
Production: https://yourdomain.com
```

## Authentication

All endpoints except GET `/api/jobs` require authentication. Authentication is handled via NextAuth with session-based JWT.

### Session Object
```typescript
{
  user: {
    id: "uuid",           // User ID
    email: "user@example.com",
    role: "student" | "employer",
    profileId: "uuid",    // Student or Employer Profile ID
    iat: 1234567890,      // Issued at
    exp: 1234654290       // Expiration
  }
}
```

---

## Public Endpoints

### GET /api/jobs
**Description**: Get all active job listings (public, no authentication required)

**Query Parameters**: None

**Response** (200):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Junior Software Engineer",
    "description": "We are looking for a junior software engineer...",
    "requirements": ["JavaScript", "React", "Node.js"],
    "location": "San Francisco, CA",
    "type": "entry-level",
    "workMode": "hybrid",
    "salary": "$80,000 - $100,000",
    "createdAt": "2024-01-15T10:30:00Z",
    "employer": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "companyName": "TechCorp",
      "logoUrl": "https://example.com/logo.png"
    }
  }
]
```

**Error Response** (500):
```json
{
  "error": "Failed to fetch jobs: connection timeout"
}
```

---

## Authentication Endpoints

### POST /api/auth/signin
**Description**: Sign in existing user (handled by NextAuth)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "callbackUrl": "/student/dashboard"
}
```

**Response** (200): Redirects to callback URL with session set

**Error Response** (401):
```json
{
  "error": "Invalid credentials"
}
```

### POST /api/auth/signup
**Description**: Register new student or employer (handled by NextAuth)

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "student",
  "fullName": "John Doe",
  "companyName": "My Company",
  "university": "Stanford University"
}
```

**Response** (201): User created, session established

### POST /api/auth/signout
**Description**: Sign out current user

**Response** (200): Session cleared, redirects to home

---

## Job Endpoints

### POST /api/jobs
**Description**: Post a new job (employer only)

**Authentication**: Required (employer role)

**Request Body**:
```json
{
  "title": "Frontend Developer",
  "description": "Build amazing user interfaces...",
  "requirements": ["React", "TypeScript", "Tailwind CSS"],
  "location": "Remote",
  "type": "entry-level",
  "workMode": "remote",
  "salary": "$90,000 - $120,000"
}
```

**Response** (200):
```json
{
  "success": true,
  "job": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "title": "Frontend Developer",
    "description": "Build amazing user interfaces...",
    "requirements": ["React", "TypeScript", "Tailwind CSS"],
    "location": "Remote",
    "type": "entry-level",
    "workMode": "remote",
    "salary": "$90,000 - $120,000",
    "employerId": "550e8400-e29b-41d4-a716-446655440001",
    "isActive": true,
    "createdAt": "2024-01-20T14:30:00Z"
  }
}
```

**Error Responses**:
- 401: `{ "error": "Unauthorized" }` (not an employer)
- 400: `{ "error": "Missing fields" }`

### DELETE /api/jobs/:id
**Description**: Delete a job (employer only, must be job owner)

**Authentication**: Required (employer role)

**Path Parameters**:
- `id` (string, UUID): Job ID to delete

**Response** (200):
```json
{
  "success": true
}
```

**Error Responses**:
- 401: `{ "error": "Unauthorized" }`
- 404: `{ "error": "Job not found or unauthorized" }`

### GET /api/jobs/:id/applicants
**Description**: Get applicants for a specific job (employer only)

**Authentication**: Required (employer role, must be job owner)

**Path Parameters**:
- `id` (string, UUID): Job ID

**Response** (200):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "Alice Smith",
    "email": "alice.smith@example.com",
    "university": "MIT",
    "major": "Computer Science",
    "gpa": "3.9",
    "createdAt": "2024-01-18T09:15:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "university": "Stanford",
    "major": "Software Engineering",
    "gpa": "3.8",
    "createdAt": "2024-01-19T11:45:00Z"
  }
]
```

---

## Student Endpoints

### POST /api/student/apply
**Description**: Apply to a job (student only)

**Authentication**: Required (student role)

**Request Body**:
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440002"
}
```

**Response** (200):
```json
{
  "success": true,
  "application": {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "jobId": "550e8400-e29b-41d4-a716-446655440002",
    "studentId": "550e8400-e29b-41d4-a716-446655440003",
    "status": "submitted",
    "createdAt": "2024-01-20T15:00:00Z"
  }
}
```

**Error Responses**:
- 401: `{ "error": "Unauthorized" }`
- 400: `{ "error": "Already applied to this job" }`
- 404: `{ "error": "Job not found" }`

### POST /api/student/save-job
**Description**: Save or unsave a job (student only, toggle)

**Authentication**: Required (student role)

**Request Body**:
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440002"
}
```

**Response** (200):
```json
{
  "success": true,
  "saved": true  // true if added, false if removed
}
```

### GET /api/student/applications
**Description**: Get all applications for current student

**Authentication**: Required (student role)

**Response** (200):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440005",
    "jobId": "550e8400-e29b-41d4-a716-446655440002",
    "studentId": "550e8400-e29b-41d4-a716-446655440003",
    "status": "submitted",
    "createdAt": "2024-01-20T15:00:00Z",
    "updatedAt": "2024-01-20T15:00:00Z"
  }
]
```

### GET /api/student/saved-jobs
**Description**: Get all saved jobs for current student

**Authentication**: Required (student role)

**Response** (200):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440006",
    "jobId": "550e8400-e29b-41d4-a716-446655440002",
    "studentId": "550e8400-e29b-41d4-a716-446655440003",
    "createdAt": "2024-01-18T12:30:00Z"
  }
]
```

### GET /api/student/profile
**Description**: Get current student's profile

**Authentication**: Required (student role)

**Response** (200):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "fullName": "John Doe",
  "university": "Stanford University",
  "major": "Computer Science",
  "graduationYear": 2025,
  "gpa": "3.8",
  "bio": "Passionate about building cool software",
  "resumeUrl": "https://example.com/resume.pdf",
  "createdAt": "2024-01-10T10:00:00Z",
  "updatedAt": "2024-01-15T14:20:00Z"
}
```

### PATCH /api/student/profile
**Description**: Update student profile (student only)

**Authentication**: Required (student role)

**Request Body** (all fields optional):
```json
{
  "fullName": "John Doe Updated",
  "university": "MIT",
  "major": "Computer Science",
  "graduationYear": 2025,
  "gpa": "3.9",
  "bio": "Software engineer interested in AI",
  "resumeUrl": "https://example.com/resume_v2.pdf"
}
```

**Response** (200):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "fullName": "John Doe Updated",
  "university": "MIT",
  "major": "Computer Science",
  "graduationYear": 2025,
  "gpa": "3.9",
  "bio": "Software engineer interested in AI",
  "resumeUrl": "https://example.com/resume_v2.pdf",
  "updatedAt": "2024-01-20T16:45:00Z"
}
```

---

## Employer Endpoints

### GET /api/employer/profile
**Description**: Get current employer's company profile

**Authentication**: Required (employer role)

**Response** (200):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "companyName": "TechCorp",
  "industry": "Technology",
  "companySize": "100-500",
  "website": "https://techcorp.example.com",
  "description": "Leading tech company building innovative solutions",
  "logoUrl": "https://example.com/logo.png",
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-15T13:30:00Z"
}
```

### PATCH /api/employer/profile
**Description**: Update employer company profile (employer only)

**Authentication**: Required (employer role)

**Request Body** (all fields optional):
```json
{
  "companyName": "TechCorp Inc",
  "industry": "Software Development",
  "companySize": "200-500",
  "website": "https://newtechcorp.com",
  "description": "We build amazing products",
  "logoUrl": "https://example.com/new-logo.png"
}
```

**Response** (200):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "companyName": "TechCorp Inc",
  "industry": "Software Development",
  "companySize": "200-500",
  "website": "https://newtechcorp.com",
  "description": "We build amazing products",
  "logoUrl": "https://example.com/new-logo.png",
  "updatedAt": "2024-01-20T17:00:00Z"
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

### Common Status Codes
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or invalid
- `403 Forbidden`: Authenticated but not authorized
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production:
- 100 requests per minute per IP for public endpoints
- 1000 requests per minute per user for authenticated endpoints

---

## CORS & Security Headers

- CORS: Enabled for same-origin requests (Next.js default)
- HTTPS: Required for production
- Cookies: Secure, HttpOnly, SameSite=Strict
- CSP: Content Security Policy recommended for production

---

## Examples Using cURL

### Get all jobs
```bash
curl -X GET http://localhost:3000/api/jobs
```

### Apply to a job
```bash
curl -X POST http://localhost:3000/api/student/apply \
  -H "Content-Type: application/json" \
  -d '{"jobId": "550e8400-e29b-41d4-a716-446655440002"}'
```

### Post a new job
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Frontend Developer",
    "description": "Build amazing UIs",
    "requirements": ["React", "TypeScript"],
    "location": "Remote",
    "type": "entry-level",
    "workMode": "remote",
    "salary": "$90,000 - $120,000"
  }'
```

### Update student profile
```bash
curl -X PATCH http://localhost:3000/api/student/profile \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "gpa": "3.9"
  }'
```

---

## Webhook Events (Future Implementation)

Consider adding webhooks for:
- Job application received
- Application status change
- Job posted
- Job application deadline

---

## Versioning

Current API Version: v1 (built into endpoints)

Future: Consider adding `/api/v2/` for backward compatibility

---

**Last Updated**: 2024-01-20
**Status**: Production Ready
