import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Shield, Save, CheckCircle } from 'lucide-react'

const Profile = () => {
  const { profile, user } = useAuth()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [saved, setSaved] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id)
      
      if (error) throw error
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Error saving profile: ' + err.message)
    }
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>My Profile</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and account settings.</p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        maxWidth: '600px'
      }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--primary-color)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white'
              }}>
                <User size={40} />
              </div>
              <div>
                <h3 style={{ fontWeight: 600 }}>{profile?.full_name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{profile?.role}</p>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--sidebar-border)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  value={user?.email || 'user@example.com'} 
                  disabled
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--sidebar-border)',
                    background: '#f8fafc',
                    color: 'var(--text-muted)',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Account Role</label>
              <div style={{ position: 'relative' }}>
                <Shield size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={profile?.role || 'Student'} 
                  disabled
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--sidebar-border)',
                    background: '#f8fafc',
                    color: 'var(--text-muted)',
                    cursor: 'not-allowed',
                    textTransform: 'capitalize'
                  }}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '1rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {saved ? <CheckCircle size={20} /> : <Save size={20} />}
              {saved ? 'Changes Saved!' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
