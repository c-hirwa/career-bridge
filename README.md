git clone https://github.com/yourusername/career-bridge.git
echo $DATABASE_URL
git checkout -b feature/add-new-feature
git commit -m "feat: add new feature"
git push origin feature/add-new-feature
# CareerBridge

Minimal README with only the essentials for running the app and delivering the summative demo.

## Quick local setup

1. Install dependencies

```powershell
npm install
```

2. Create `.env.local` with these values (example):

```
DATABASE_URL=postgresql://user:password@localhost:5432/careerbridge
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_secure_value
```

3. Run migrations and optional seed

```powershell
npx drizzle-kit generate
npx drizzle-kit push
npm run seed
```

4. Start dev server

```powershell
npm run dev
```

Open http://localhost:3000

---

## Assignment demo requirements

The summative requires a 5–10 minute recorded demo that captures:

- System description (what the app does)
- Problem statement (what real problem it solves)
- Why it's a problem
- Proposed solution (how the app addresses it)
- The demo (live walkthrough)
- Proof the prototype reflects the SRS (actors/processes)

See `DEMO_SCRIPT.md` for a concise 6–7 minute script tailored to those requirements.

---

## Resume upload

You can upload a resume from the Student Dashboard → Profile. The file is saved to `public/uploads` and the profile `resumeUrl` is updated. Endpoint: `POST /api/student/upload-resume` (body: JSON { fileName, content: base64 }).

Note: For production, replace file storage with cloud storage (S3 / Spaces) and secure access.

---

