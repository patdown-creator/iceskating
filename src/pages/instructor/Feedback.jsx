import React, { useState } from 'react'
import { Award, Save, Search, User } from 'lucide-react'

const Feedback = () => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [skills, setSkills] = useState([])

  const availableSkills = [
    'Forward Crossovers', 'Backward Crossovers', 'Three-Turns', 
    'Mohawks', 'Sit Spin', 'Camel Spin', 'Waltz Jump', 'Salchow'
  ]

  const students = [
    { id: 1, name: 'Alice Cooper', level: 'Basic 1' },
    { id: 2, name: 'Bob Dylan', level: 'Basic 1' },
    { id: 3, name: 'Charlie Brown', level: 'Basic 1' },
  ]

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Student Feedback</h2>
        <p style={{ color: 'var(--text-muted)' }}>Enter skill achievements and comments for student progress reports.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Student List */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Select Student</h3>
          </div>
          <div style={{ padding: '0.5rem' }}>
            {students.map(student => (
              <button 
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: selectedStudent?.id === student.id ? '#f0f9ff' : 'transparent',
                  color: selectedStudent?.id === student.id ? 'var(--primary-color)' : 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.25rem'
                }}
              >
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={16} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{student.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.level}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Form */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--sidebar-border)' }}>
          {selectedStudent ? (
            <form onSubmit={(e) => { e.preventDefault(); alert('Feedback saved!'); }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                Feedback for {selectedStudent.name}
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Skills Achieved
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {availableSkills.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid',
                        borderColor: skills.includes(skill) ? 'var(--primary-color)' : '#e2e8f0',
                        background: skills.includes(skill) ? '#e0f2fe' : 'transparent',
                        color: skills.includes(skill) ? 'var(--primary-color)' : 'var(--text-muted)',
                        transition: 'all 0.2s'
                      }}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Instructor Comments
                </label>
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter detailed feedback on the student's performance..."
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ textAlign: 'right' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
                  <Save size={18} /> Save Feedback
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <Award size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
              <p>Select a student from the list to enter feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feedback
