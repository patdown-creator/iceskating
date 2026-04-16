import React, { useState } from 'react'
import { Award, Plus, Trash2, Edit2 } from 'lucide-react'

const AdminLevels = () => {
  const [levels, setLevels] = useState([
    { id: '1', name: 'Basic Skills 1', description: 'Beginner fundamentals', skillCount: 8 },
    { id: '2', name: 'Basic Skills 2', description: 'Developing glide and edge work', skillCount: 12 },
    { id: '3', name: 'Free Skate 1', description: 'Introduction to jumps and spins', skillCount: 15 },
  ])
  const [editingLevel, setEditingLevel] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skillCount: 1
  })

  const openCreateModal = () => {
    setEditingLevel(null)
    setFormData({ name: '', description: '', skillCount: 1 })
    setShowModal(true)
  }

  const openEditModal = (level) => {
    setEditingLevel(level)
    setFormData({
      name: level.name,
      description: level.description,
      skillCount: level.skillCount
    })
    setShowModal(true)
  }

  const handleDelete = (levelId) => {
    if (!window.confirm('Delete this level?')) return
    setLevels((previous) => previous.filter((level) => level.id !== levelId))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingLevel) {
      setLevels((previous) =>
        previous.map((level) =>
          level.id === editingLevel.id ? { ...level, ...formData, skillCount: Number(formData.skillCount) } : level
        )
      )
    } else {
      setLevels((previous) => [
        ...previous,
        {
          id: Date.now().toString(),
          ...formData,
          skillCount: Number(formData.skillCount)
        }
      ])
    }
    setShowModal(false)
    setSavedMessage(editingLevel ? 'Level updated successfully.' : 'Level created successfully.')
    setTimeout(() => setSavedMessage(''), 2500)
  }

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>Curriculum Levels</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage skating levels and required skill sets.</p>
          {savedMessage && <p style={{ color: '#15803d', fontSize: '0.875rem', marginTop: '0.5rem' }}>{savedMessage}</p>}
        </div>
        <button 
          type="button"
          onClick={openCreateModal}
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
                  <button
                    type="button"
                    onClick={() => openEditModal(level)}
                    title="Edit level"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(level.id)}
                    title="Delete level"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
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

      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20
          }}
        >
          <div style={{ background: 'white', borderRadius: '1rem', width: '100%', maxWidth: '480px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
              {editingLevel ? 'Edit Level' : 'Add Level'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Level Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', minHeight: '100px', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Skill Count</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.skillCount}
                  onChange={(e) => setFormData({ ...formData, skillCount: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ border: 'none', background: 'transparent', padding: '0.625rem 0.75rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.625rem 1rem' }}>
                  {editingLevel ? 'Update Level' : 'Create Level'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLevels
