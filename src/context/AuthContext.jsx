import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getDemoRole, formatNameFromEmail } from '../lib/authUtils'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Effect 1: Handle Auth State Changes
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        setLoading(true) // Start loading
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('Error getting initial session:', err)
        setLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth event:', _event)
      setUser(session?.user ?? null)
      if (!session) {
        setProfile(null)
        setLoading(false)
      } else {
        setLoading(true) // Re-trigger loading for profile fetch
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Centralized Demo Mode check
  const isDemo = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY

  // Effect 2: Handle Profile Fetching when User changes
  useEffect(() => {
    if (!user) {
      if (!loading) return; 
      return;
    }

    // Skip database fetch if in Demo Mode
    if (isDemo) {
      console.log('Demo mode detected, skipping database profile fetch')
      if (!profile) {
        setProfile({ 
          id: user.id, 
          full_name: formatNameFromEmail(user.email), 
          role: getDemoRole(user.email) 
        })
      }
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      console.log('User detected, fetching profile from Supabase for:', user.id)
      setLoading(true)
      
      const timeoutId = setTimeout(() => {
        setLoading(false)
      }, 5000)

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.warn('Profile fetch error:', error.message)
          setProfile(null)
        } else {
          console.log('Profile loaded successfully:', data.role)
          setProfile(data)
        }
      } catch (err) {
        console.error('Unexpected profile fetch error:', err)
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, isDemo])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: async (data) => {
      const { email, password } = data
      
      // If we are in demo mode, mock the sign-in
      
      if (isDemo) {
        const role = getDemoRole(email)
        const mockUser = { id: 'demo-user-id', email }
        const mockProfile = { 
          id: 'demo-user-id', 
          full_name: formatNameFromEmail(email), 
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
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
