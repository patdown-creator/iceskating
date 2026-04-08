import React from 'react'
import { Award, Plus, Trash2, Edit2 } from 'lucide-react'

const AdminLevels = () => {
  const levels = [
    { id: '1', name: 'Basic Skills 1', description: 'Beginner fundamentals', skillCount: 8 },
    { id: '2', name: 'Basic Skills 2', description: 'Developing glide and edge work', skillCount: 12 },
    { id: '3', name: 'Free Skate 1', description: 'Introduction to jumps and spins', skillCount: 15 },
  ]

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>Curriculum Levels</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage skating levels and required skill sets.</p>
        </div>
        <button 
          className="btn btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            borderRadius: '0.5rem',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          Add Level
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {levels.map((level) => (
          <div key={level.id} style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            border: '1px solid var(--sidebar-border)',
            display: 'flex',
            gap: '1rem'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-color)'
            }}>
              <Award size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{level.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{level.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  {level.skillCount} Skills
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminLevels
