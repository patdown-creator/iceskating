import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(profile)
      }
      setLoading(false)
    }

    getSession()

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(profile)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: async (data) => {
      const { email, password } = data
      
      // If we are in demo mode, mock the sign-in
      const isDemo = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (isDemo) {
        let role = 'student'
        if (email.includes('admin')) role = 'admin'
        else if (email.includes('instructor')) role = 'instructor'
        
        const mockUser = { id: 'demo-user-id', email }
        const mockProfile = { 
          id: 'demo-user-id', 
          full_name: email.split('@')[0].toUpperCase(), 
          role 
        }
        
        setUser(mockUser)
        setProfile(mockProfile)
        return { data: { user: mockUser }, error: null }
      }
      
      return supabase.auth.signInWithPassword(data)
    },
    signOut: () => {
      setUser(null)
      setProfile(null)
      return supabase.auth.signOut()
    },
    user,
    profile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
