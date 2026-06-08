# TechSkillsHub Setup Instructions — Phase A & B Complete

## What's Been Implemented

### Phase A: Theme System & Dark Mode ✅
- Tailwind dark mode enabled (`darkMode: 'class'`)
- Marist Red (#a01f34) set as primary color
- `ThemeProvider` component with localStorage persistence
- System preference detection (respects OS theme on first visit)
- Manual override capability
- Theme toggle button (sun/moon icon) in AppShell header
- Dark mode classes added to all AppShell components

### Phase B: Prisma Schema & Database Models ✅
- Changed database from PostgreSQL to **SQLite** for development (simpler setup)
- Added 8 new Role types: President, VicePresident, Secretary, Treasurer, Advisor, SystemAdmin, Faculty, Student, Other
- Added 7 new enums: `CredentialProgressStatus`, `Difficulty`, `CompanyType`, `Semester`
- Extended User model with: clubRole, club, department, and relationships to clubs, credentials, projects, interviews, faculty
- Added 14 new Prisma models:
  - **Clubs**: Club, ClubMember, ClubAnnouncement, UserClubFollow
  - **Credentials & Roadmaps**: Roadmap, RoadmapStep, UserCredentialProgress
  - **Micro-Projects**: UserMicroProject
  - **Interview Challenges**: InterviewChallenge, InterviewSubmission, InterviewFeedback
  - **Faculty**: Faculty
  - **Analytics**: EmployerSkillDemand
  - **Audit**: AuditLog

### Environment Setup ✅
- Created `.env.local` with SQLite database URL
- Storage configuration set to local (can switch to S3/Supabase later)
- Placeholder for Suitable integration and SAML SSO

---

## Next Steps: Installation & Running

### 1. Install Dependencies

Node.js must be in your PATH. Run:

```bash
npm install
```

This will install Shadcn/UI, Sharp (image processing), and all other dependencies.

### 2. Set Up Database

Generate Prisma client and create SQLite database:

```bash
npx prisma migrate dev
```

When prompted, name the migration something like "init" (initialization).

### 3. Seed Sample Data

Populate the database with test accounts (Alex Rivera, Jordan Lee, sample clubs, credentials, etc.):

```bash
npx prisma db seed
```

(Note: This requires `prisma/seed.ts` to be implemented — see Phase K for seeding details.)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with mock credentials.

---

## Testing the Implementation

### Theme Toggle
1. Navigate to any page (you'll be redirected to login if not authenticated)
2. Look for the **sun/moon icon** in the top-right header
3. Click to toggle between light and dark modes
4. Refresh the page — your preference should persist
5. Clear localStorage and revisit — should respect your system preference

### Database
- SQLite database will be created at `./dev.db`
- Use VS Code's SQLite extension or any SQLite viewer to inspect
- Prisma Studio (optional): `npx prisma studio`

---

## Known Limitations (Development)

1. **No Real SSO Yet** — Using mock Entra ID login
   - Test account: `demo@marist.edu` (hardcoded in mock auth)
   - Real SAML 2.0 integration pending Marist IT details

2. **SQLite Only** — Not production-ready
   - No concurrent write support (won't matter in dev)
   - Will switch to PostgreSQL + AWS RDS for production

3. **Local File Storage** — All uploads go to `/public/uploads/`
   - Production will use AWS S3 + CloudFront
   - Abstraction layer already in place to swap providers

4. **Image Processing** — Sharp.js is installed but not yet integrated
   - File upload endpoint needs to be built (Phase C)
   - Will resize images on upload

5. **Seed Data Not Complete** — `prisma/seed.ts` skeleton exists
   - Needs implementation for roadmaps, challenges, employer data, etc.

---

## File Changes Summary

### Modified Files
- `tailwind.config.ts` — dark mode enabled, primary colors added
- `package.json` — added Shadcn/UI and related dependencies
- `prisma/schema.prisma` — entire schema extended with new models
- `src/app/layout.tsx` — ThemeProvider wrapped around app
- `src/components/AppShell.tsx` — theme toggle added, dark mode classes
- `.env.local` — created with SQLite and storage config

### New Files Created
- `src/lib/theme/ThemeProvider.tsx` — context provider for theme management
- `src/components/ThemeToggle.tsx` — sun/moon toggle button

---

## Next Phases (Coming Soon)

- **Phase C**: File upload API + Sharp.js image processing
- **Phase D**: Credential tracking UI (status badges, proof upload modal)
- **Phase E**: Micro-projects + Portfolio page
- **Phase F**: Interview Simulation system
- **Phase G**: Mentorship Hub
- **Phase H**: Event Management + Club enhancements
- ... (through Phase M: SAML SSO + Testing)

---

## Common Issues & Troubleshooting

### "npm: The term 'npm' is not recognized"
- Node.js is not in your PATH
- Solution: Add Node.js to PATH or use full path: `C:\Program Files\nodejs\npm.cmd install`

### "DATABASE_URL not set"
- Make sure `.env.local` exists in the root directory
- Should contain: `DATABASE_URL="file:./dev.db"`

### Prisma migration fails
- Delete `prisma/migrations/` folder
- Delete `dev.db` file
- Run `npx prisma migrate dev` again

### Dark mode not working
- Clear browser localStorage: DevTools → Application → Local Storage → Clear
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `<html>` element has `class="dark"` when toggle is active

---

## Git Commit

When ready, commit all changes:

```bash
git add .
git commit -m "feat: Phase A & B - Theme system, dark mode, extended Prisma schema"
git push origin main
```

---

**Last Updated**: 2026-06-08  
**Status**: Phase A & B complete. Ready for Phase C (file uploads).
