import React from 'react'
import { Users, Calendar, Award, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '124', icon: <Users size={24} />, color: '#3b82f6' },
    { label: 'Active Classes', value: '18', icon: <Calendar size={24} />, color: '#10b981' },
    { label: 'Instructors', value: '12', icon: <Users size={24} />, color: '#8b5cf6' },
    { label: 'Attendance Rate', value: '92%', icon: <TrendingUp size={24} />, color: '#f59e0b' },
  ]
  const recentClasses = [
    { id: 'c1', day: 'Monday', time: '4:00 PM', level: 'Basic Skills 1', rink: 'Rink A' },
    { id: 'c2', day: 'Wednesday', time: '5:30 PM', level: 'Basic Skills 2', rink: 'Rink B' },
    { id: 'c3', day: 'Saturday', time: '10:00 AM', level: 'Pre-Free Skate', rink: 'Rink A' }
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Admin Dashboard</h2>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here's what's happening at the school today.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid var(--sidebar-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              background: `${stat.color}15`,
              color: stat.color,
              padding: '0.75rem',
              borderRadius: '0.75rem'
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>Recent Classes</h3>
          {recentClasses.map((classItem) => (
            <div key={classItem.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{classItem.level}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {classItem.day} at {classItem.time} - {classItem.rink}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>Announcements</h3>
          <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Spring Show Rehearsal</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starts this Saturday at 10 AM. All instructors must be present.</p>
          </div>
          <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>New Safety Protocols</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Please review the updated rink safety guidelines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
