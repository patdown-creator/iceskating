import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

const Unauthorized = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <ShieldAlert size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Access Denied</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
        You don't have permission to view this page. Please contact your administrator if you believe this is an error.
      </p>
      <Link to="/" className="btn btn-primary">Go to My Dashboard</Link>
    </div>
  )
}

export default Unauthorized
