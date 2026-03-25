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

## Project Status: MVP Initial Phase Complete

We have successfully reached the completion of the first major milestone: a functional administration MVP with role-based access control and core tracking features.

### Work Done & Steps Taken
1.  **Project Initialization**: Set up a modern React + Vite project with essential dependencies (Supabase, React Router, Lucide-React).
2.  **Database Design**: Architected a Supabase schema including `profiles`, `levels`, `classes`, `attendance`, and `feedback_reports`.
3.  **Authentication Layer**: Implemented role-based security using Supabase Auth and a custom Auth Context.
4.  **Mock/Demo Mode**: Created a robust bypass for demoing the app without requiring immediate Supabase setup, allowing for instant feedback collection.
5.  **Dashboard Development**:
    - **Admin**: School-wide statistics and management shortcuts.
    - **Instructor**: Class schedule, attendance marking, and feedback entry.
    - **Student**: Personalized schedule and progress tracking.
6.  **Reporting System**: Built a reporting module for generating and printing student feedback.
7.  **Documentation**: Provided full setup and deployment guides for Vercel and Supabase.

### Project Overview (Current State)
The application is currently in a **Verified MVP** state:
- **UI/UX**: The interface features a premium "glassmorphism" design that is clean and intuitive for both desktop and tablet use.
- **Functionality**: Core workflows (login -> dashboard -> attendance -> feedback) are fully implemented and tested in demo mode.
- **Deployment-Ready**: The codebase is configured for one-click deployment to Vercel and easy schema migration to Supabase.
- **Extensibility**: The component-based structure is designed for easy expansion by teammates in future iterations.

## Future Improvements
- Mobile app for instructors on the ice.
- Automated email/SMS notifications for class changes.
- Payment integration for student enrollments.
