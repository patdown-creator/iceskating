import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, User, Lock, Loader2 } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await signIn({ email, password })
      if (error) throw error
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (role) => {
    setEmail(`${role}@example.com`)
    setPassword('password123')
    // In a real app, this would trigger an actual login or just mock it for MVP demo
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'white',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            background: 'var(--primary-color)',
            borderRadius: '1rem',
            color: 'white',
            marginBottom: '1rem'
          }}>
            <LogIn size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Skating School Admin System</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#b91c1c',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="email" 
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              background: 'var(--primary-color)',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem'
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1rem' }}>
            DEMO ACCOUNTS (Coming Soon)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <button onClick={() => handleDemoLogin('admin')} style={{ fontSize: '0.75rem', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '0.25rem' }}>Admin</button>
            <button onClick={() => handleDemoLogin('instructor')} style={{ fontSize: '0.75rem', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '0.25rem' }}>Staff</button>
            <button onClick={() => handleDemoLogin('student')} style={{ fontSize: '0.75rem', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '0.25rem' }}>Student</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
