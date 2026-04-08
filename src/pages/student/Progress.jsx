import React from 'react'
import { Award, CheckCircle2, Circle, Star, Trophy } from 'lucide-react'

const StudentProgress = () => {
  // Mock data for progress
  const levels = [
    { name: 'Basic Skills 1', status: 'completed', date: '2025-12-10', skills: ['Forward stroking', 'Forward swizzles', 'Backward swizzles'] },
    { name: 'Basic Skills 2', status: 'current', date: null, skills: ['Forward crossovers', 'One-foot glides', 'Backward stroking'] },
    { name: 'Basic Skills 3', status: 'locked', date: null, skills: ['Backward crossovers', 'Two-foot turns', 'Slalom'] }
  ]

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>My Progress</h2>
        <p style={{ color: 'var(--text-muted)' }}>Track your skating achievements and level milestones.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {levels.map((level, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            border: level.status === 'current' ? '2px solid var(--primary-color)' : '1px solid var(--sidebar-border)',
            opacity: level.status === 'locked' ? 0.7 : 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: level.status === 'completed' ? '#dcfce7' : level.status === 'current' ? '#e0f2fe' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: level.status === 'completed' ? '#16a34a' : level.status === 'current' ? '#0284c7' : '#94a3b8'
              }}>
                {level.status === 'completed' ? <Trophy size={24} /> : <Award size={24} />}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '1rem',
                  textTransform: 'uppercase',
                  background: level.status === 'completed' ? '#dcfce7' : level.status === 'current' ? '#e0f2fe' : '#f1f5f9',
                  color: level.status === 'completed' ? '#16a34a' : level.status === 'current' ? '#0284c7' : '#64748b'
                }}>
                  {level.status}
                </span>
                {level.date && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{level.date}</p>}
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{level.name}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {level.skills.map((skill, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {level.status === 'completed' ? (
                    <CheckCircle2 size={18} color="#16a34a" />
                  ) : level.status === 'current' && sIdx === 0 ? (
                    <Star size={18} color="#f59e0b" fill="#f59e0b" />
                  ) : (
                    <Circle size={18} color="#cbd5e1" />
                  )}
                  <span style={{ fontSize: '0.9375rem', color: level.status === 'locked' ? 'var(--text-muted)' : 'var(--text-color)' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentProgress
