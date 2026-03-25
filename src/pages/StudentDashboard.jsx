import React from 'react'
import { Calendar, Award, Star } from 'lucide-react'

const StudentDashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Student Dashboard</h2>
        <p style={{ color: 'var(--text-muted)' }}>Quick access to your schedule and progress reports.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <Calendar size={20} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>My Next Class</h3>
          </div>
          <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
            <p style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Basic Skills 2</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Saturday, 10:30 AM</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Rink B • Instructor: Coach Sarah</p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#fef9c3', color: '#ca8a04', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <Star size={20} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Current Level</h3>
          </div>
          <div style={{ padding: '1.25rem', background: '#fdfcf0', borderRadius: '0.75rem', border: '1px solid #fef08a' }}>
            <p style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>Pre-Free Skate</p>
            <div style={{ width: '100%', background: '#e2e8f0', height: '8px', borderRadius: '4px', marginTop: '0.75rem' }}>
              <div style={{ width: '65%', background: '#ca8a04', height: '100%', borderRadius: '4px' }}></div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>65% towards next level</p>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid var(--sidebar-border)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>Latest Feedback</h3>
        <div style={{ padding: '1.25rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <p style={{ fontWeight: 600 }}>Great job on the crossovers!</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>March 22, 2026</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Your balance is improving significantly. Focus on keeping your head up during the back edges.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <button style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={16} /> View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
