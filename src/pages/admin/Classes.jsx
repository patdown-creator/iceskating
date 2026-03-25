import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit, Trash2, Calendar, MapPin, Award } from 'lucide-react'

const Classes = () => {
  const [classes, setClasses] = useState([])
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  
  // Mock data for initial view if DB is not ready
  const mockClasses = [
    { id: 1, day: 'Monday', time_slot: '4:00 PM - 5:00 PM', ice_location: 'Rink A', level_name: 'Basic 1' },
    { id: 2, day: 'Wednesday', time_slot: '5:30 PM - 6:30 PM', ice_location: 'Rink B', level_name: 'Freeskate 2' },
  ]

  useEffect(() => {
    // fetchData()
    setClasses(mockClasses)
    setLoading(false)
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Class Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create and manage skating sessions and instructor assignments.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} /> Add Class
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Day</th>
              <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Time Slot</th>
              <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Location</th>
              <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Level</th>
              <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} color="var(--text-muted)" />
                    {cls.day}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{cls.time_slot}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="var(--text-muted)" />
                    {cls.ice_location}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.625rem', 
                    background: '#e0f2fe', 
                    color: '#0369a1', 
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {cls.level_name}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button style={{ color: 'var(--text-muted)', marginRight: '1rem' }}><Edit size={18} /></button>
                  <button style={{ color: '#ef4444' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Add New Class</h3>
            <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Day</label>
                  <select style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Location</label>
                  <input type="text" placeholder="Rink A" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Time Slot</label>
                <input type="text" placeholder="4:00 PM - 5:00 PM" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Level</label>
                <select style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <option>Basic 1</option>
                  <option>Basic 2</option>
                  <option>Freeskate 1</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Class</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Classes
