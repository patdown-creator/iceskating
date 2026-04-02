import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Effect 1: Handle Auth State Changes
  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('Error getting initial session:', err)
      } finally {
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
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Effect 2: Handle Profile Fetching when User changes
  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      console.log('User detected, fetching profile for:', user.id)
      
      // Safety timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.warn('Profile fetch timeout, forcing loading to false')
          setLoading(false)
        }
      }, 3000)

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.warn('Profile not found or error:', error.message)
          setProfile(null)
        } else {
          console.log('Profile loaded:', data.role)
          setProfile(data)
        }
      } catch (err) {
        console.error('Unexpected error fetching profile:', err)
      } finally {
        clearTimeout(timeoutId)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

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
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
