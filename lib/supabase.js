import { createClient } from '@supabase/supabase-js'

// Client-side (Vite) usage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client factory (DO NOT IMPORT THIS IN BROWSER BUNDLES)
export function createAdminSupabase() {
  const url = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in server environment')
  }
  return createClient(url, key)
}
