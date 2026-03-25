# Skating School Admin MVP

A full-stack administration system for local skating schools, designed to replace paper tracking with a streamlined digital workflow.

## Target Users
- **Administrators**: Manage the school, classes, levels, and generate reports.
- **Instructors**: Track attendance and provide student feedback.
- **Students**: View schedules and track progress.

## Main Features
- **Role-Based Access**: Secure login for Admin, Instructor, and Student roles.
- **Class Management**: Create and schedule classes across multiple rinks and levels.
- **Attendance Tracking**: Digital attendance marking for daily sessions.
- **Skill Progress**: Track student achievements across various skating levels.
- **Feedback Reports**: Generate printable progress reports for students (Admins/Instructors).

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (Premium Aesthetics)
- **Backend/Auth**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend), Render (optional API)

## Getting Started

### Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
   *Note: If you encounter permission issues during install, try `npm install --no-cache`.*
3. Copy `.env.example` to `.env` and add your Supabase credentials:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Run the development server:
   ```bash
   npm run dev
   ```

### Database Setup
1. Create a new project in [Supabase](https://supabase.com).
2. Run the SQL in `supabase/schema.sql` using the SQL Editor.
3. (Optional) Run `supabase/seed.sql` for sample data.

## Assumptions
- Supabase handles user authentication and session management.
- User roles are defined in the `profiles` table after sign-up.

## Future Improvements
- Mobile app for instructors on the ice.
- Automated email/SMS notifications for class changes.
- Payment integration for student enrollments.
