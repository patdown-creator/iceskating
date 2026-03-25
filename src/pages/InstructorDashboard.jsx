import React from 'react'
import { Calendar, ClipboardCheck, Award } from 'lucide-react'

const InstructorDashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Instructor Dashboard</h2>
        <p style={{ color: 'var(--text-muted)' }}>View your assigned classes and manage student attendance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '0.75rem' }}>
            <Calendar size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Assigned Classes</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>4 classes</p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{ background: '#fef9c3', color: '#ca8a04', padding: '1rem', borderRadius: '0.75rem' }}>
            <ClipboardCheck size={32} />
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Pending Attendance</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>2 sessions</p>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid var(--sidebar-border)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>Today's Schedule</h3>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Time</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Class</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Level</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>4:00 PM - 5:00 PM</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>Basic 1 - Group A</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>Basic 1</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <button style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.875rem' }}>Mark Attendance</button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>5:15 PM - 6:15 PM</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>Intermediate Spins</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>Freeskate 2</td>
                <td style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                  <button style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.875rem' }}>Mark Attendance</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
