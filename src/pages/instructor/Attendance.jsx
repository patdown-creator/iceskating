import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Calendar, Check, X, Search } from 'lucide-react'

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    const { data } = await supabase.from('classes').select('*, levels(name)')
    setClasses(data || [])
    if (data?.length > 0) setSelectedClass(data[0].id)
  }

  const loadRoster = async () => {
    if (!selectedClass) return
    setLoading(true)
    try {
      const { data: enrollments, error } = await supabase
        .from('enrollments')
        .select('student_id, profiles(full_name)')
        .eq('class_id', selectedClass)
      
      if (error) throw error

      // Also fetch existing attendance for this date
      const { data: existingAttendance } = await supabase
        .from('attendance')
        .select('*')
        .eq('class_id', selectedClass)
        .eq('date', date)

      const roster = enrollments.map(e => {
        const existing = existingAttendance?.find(a => a.student_id === e.student_id)
        return {
          id: e.student_id,
          name: e.profiles?.full_name,
          status: existing ? existing.status : 'absent'
        }
      })
      setAttendance(roster)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleAttendance = (id) => {
    setAttendance(attendance.map(item => 
      item.id === id ? { ...item, status: item.status === 'present' ? 'absent' : 'present' } : item
    ))
  }

  const handleSave = async () => {
    try {
      const records = attendance.map(a => ({
        class_id: selectedClass,
        student_id: a.id,
        status: a.status,
        date: date
      }))

      const { error } = await supabase
        .from('attendance')
        .upsert(records, { onConflict: 'class_id, student_id, date' })

      if (error) throw error
      alert('Attendance saved successfully!')
    } catch (err) {
      alert('Error saving attendance: ' + err.message)
    }
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
              <option value="">Choose a class...</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.day} - {c.levels?.name} ({c.time_slot})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            />
          </div>
          <button onClick={loadRoster} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Load Roster</button>
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading roster...</div>
          ) : attendance.length > 0 ? (
            attendance.map((student) => (
              <div key={student.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1rem', 
                borderBottom: '1px solid #f1f5f9' 
              }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{student.name}</p>
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
                      cursor: 'pointer'
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
                      cursor: 'pointer'
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              Select a class and click "Load Roster" to start.
            </div>
          )}
        </div>
        {attendance.length > 0 && (
          <div style={{ padding: '1.5rem', textAlign: 'right', borderTop: '1px solid #f1f5f9' }}>
            <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Attendance</button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Attendance
