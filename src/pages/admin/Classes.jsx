import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit, Trash2, Calendar, MapPin, Award } from 'lucide-react'

const Classes = () => {
  const [classes, setClasses] = useState([])
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingClass, setEditingClass] = useState(null)
  const [formData, setFormData] = useState({
    day: 'Monday',
    time_slot: '',
    ice_location: '',
    level_id: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: levelsData } = await supabase.from('levels').select('*').order('name')
      setLevels(levelsData || [])

      const { data: classesData, error } = await supabase
        .from('classes')
        .select(`
          *,
          levels (name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setClasses(classesData || [])
    } catch (error) {
      console.error('Error fetching data:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingClass) {
        const { error } = await supabase
          .from('classes')
          .update(formData)
          .eq('id', editingClass.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('classes')
          .insert([formData])
        if (error) throw error
      }
      setShowModal(false)
      setEditingClass(null)
      setFormData({ day: 'Monday', time_slot: '', ice_location: '', level_id: '' })
      fetchData()
    } catch (error) {
      alert('Error saving class: ' + error.message)
    }
  }

  const handleEdit = (cls) => {
    setEditingClass(cls)
    setFormData({
      day: cls.day,
      time_slot: cls.time_slot,
      ice_location: cls.ice_location,
      level_id: cls.level_id
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return
    try {
      const { error } = await supabase.from('classes').delete().eq('id', id)
      if (error) throw error
      fetchData()
    } catch (error) {
      alert('Error deleting class: ' + error.message)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Class Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create and manage skating sessions and instructor assignments.</p>
        </div>
        <button 
          onClick={() => {
            setEditingClass(null)
            setFormData({ day: 'Monday', time_slot: '', ice_location: '', level_id: levels[0]?.id || '' })
            setShowModal(true)
          }}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} /> Add Class
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading classes...</div>
        ) : (
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
                      {cls.levels?.name || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEdit(cls)}
                      style={{ color: 'var(--text-muted)', marginRight: '1rem', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cls.id)}
                      style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {classes.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No classes found. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Day</label>
                  <select 
                    value={formData.day}
                    onChange={(e) => setFormData({...formData, day: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  >
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
                  <input 
                    type="text" 
                    value={formData.ice_location}
                    onChange={(e) => setFormData({...formData, ice_location: e.target.value})}
                    placeholder="Rink A" 
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} 
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Time Slot</label>
                <input 
                  type="text" 
                  value={formData.time_slot}
                  onChange={(e) => setFormData({...formData, time_slot: e.target.value})}
                  placeholder="4:00 PM - 5:00 PM" 
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} 
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Level</label>
                <select 
                  value={formData.level_id}
                  onChange={(e) => setFormData({...formData, level_id: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  required
                >
                  <option value="" disabled>Select Level</option>
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                  {editingClass ? 'Update Class' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Classes
