# Deployment Guide

This guide details how to deploy the Skating School MVP to Vercel and Supabase.

## Supabase Setup (Database & Auth)
1. Sign up for [Supabase](https://supabase.com/).
2. Create a new project.
3. In the **SQL Editor**, run the contents of `supabase/schema.sql`.
4. Enable **Email Auth** in the Authentication settings.
5. Note your **API URL** and **Anon Key** from Project Settings > API.

## Vercel Setup (Frontend)
1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Add the following Environment Variables in the Vercel project dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase API URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
3. Deploy the project.

## Render Setup (Optional Backend)
If you decide to add a custom Node.js backend:
1. Create a new **Web Service** on Render.
2. Connect your repo.
3. Set environment variables.
4. Set build command: `npm install` and start command: `npm start`.

## Estimated Hosting Costs
- **Supabase**: Free Tier (suitable for MVP).
- **Vercel**: Free Tier for Hobby/MVP.
- **Render**: Free Tier for basic web services.
**Total Estimated Cost**: $0/mo for initial testing.

## Maintenance Considerations
- Regularly back up the Supabase database.
- Monitor Vercel build logs for errors.
- Update dependencies monthly to patch security vulnerabilities.
