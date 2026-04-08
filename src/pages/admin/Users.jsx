import React, { useState } from 'react'
import { Users, Mail, Shield, MoreVertical, Edit2, Trash2, Search } from 'lucide-react'

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock users
  const users = [
    { id: '1', full_name: 'Patrick Downey', email: 'admin@skate.com', role: 'admin' },
    { id: '2', full_name: 'Sarah Instructor', email: 'instructor@skate.com', role: 'instructor' },
    { id: '3', full_name: 'John Student', email: 'student@skate.com', role: 'student' },
    { id: '4', full_name: 'Emily skater', email: 'emily@skate.com', role: 'student' },
  ]

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>User Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage school accounts, roles, and permissions.</p>
        </div>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem 0.625rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--sidebar-border)',
              outline: 'none',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        border: '1px solid var(--sidebar-border)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--sidebar-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)' }}>User</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-muted)' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--sidebar-border)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'var(--primary-color)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}>
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{user.full_name}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    padding: '0.25rem 0.625rem', 
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    background: user.role === 'admin' ? '#fee2e2' : user.role === 'instructor' ? '#e0f2fe' : '#f1f5f9',
                    color: user.role === 'admin' ? '#dc2626' : user.role === 'instructor' ? '#0284c7' : '#64748b'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></div>
                    <span style={{ fontSize: '0.875rem' }}>Active</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button style={{ p: '0.5rem', borderRadius: '0.375rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <Edit2 size={16} />
                    </button>
                    <button style={{ p: '0.5rem', borderRadius: '0.375rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers
