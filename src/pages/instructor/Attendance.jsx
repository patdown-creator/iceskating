import React, { useState } from 'react'
import { Calendar, Check, X, Search } from 'lucide-react'

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(1)
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'Alice Cooper', level: 'Basic 1', status: 'present' },
    { id: 2, name: 'Bob Dylan', level: 'Basic 1', status: 'absent' },
    { id: 3, name: 'Charlie Brown', level: 'Basic 1', status: 'present' },
    { id: 4, name: 'David Bowie', level: 'Basic 1', status: 'present' },
  ])

  const toggleAttendance = (id) => {
    setAttendance(attendance.map(item => 
      item.id === id ? { ...item, status: item.status === 'present' ? 'absent' : 'present' } : item
    ))
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Attendance Tracking</h2>
        <p style={{ color: 'var(--text-muted)' }}>Mark daily attendance for your students.</p>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Select Class</label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            >
              <option value={1}>Monday - Basic 1 (4:00 PM)</option>
              <option value={2}>Wednesday - Freeskate (5:30 PM)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Date</label>
            <input 
              type="date" 
              defaultValue={new Date().toISOString().split('T')[0]}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Load Roster</button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search students..." 
              style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            />
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
            Present: <span style={{ color: '#16a34a' }}>{attendance.filter(a => a.status === 'present').length}</span> / {attendance.length}
          </div>
        </div>
        
        <div style={{ padding: '1rem' }}>
          {attendance.map((student) => (
            <div key={student.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1rem', 
              borderBottom: '1px solid #f1f5f9' 
            }}>
              <div>
                <p style={{ fontWeight: 600 }}>{student.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.level}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => toggleAttendance(student.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: student.status === 'present' ? '#dcfce7' : '#f1f5f9',
                    color: student.status === 'present' ? '#16a34a' : 'var(--text-muted)',
                    border: student.status === 'present' ? '1px solid #86efac' : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <Check size={20} />
                </button>
                <button 
                  onClick={() => toggleAttendance(student.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: student.status === 'absent' ? '#fef2f2' : '#f1f5f9',
                    color: student.status === 'absent' ? '#ef4444' : 'var(--text-muted)',
                    border: student.status === 'absent' ? '1px solid #fecaca' : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1.5rem', textAlign: 'right', borderTop: '1px solid #f1f5f9' }}>
          <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Attendance</button>
        </div>
      </div>
    </div>
  )
}

export default Attendance
