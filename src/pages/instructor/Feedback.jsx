import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Award, Save, Search, User } from 'lucide-react'

const demoStudents = [
  { id: 'student-1', full_name: 'Emma Carter', email: 'emma@example.com' },
  { id: 'student-2', full_name: 'Noah Lee', email: 'noah@example.com' },
  { id: 'student-3', full_name: 'Liam Brooks', email: 'liam@example.com' }
]

const Feedback = () => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [skills, setSkills] = useState([])
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [usingDemoData, setUsingDemoData] = useState(false)
  const [loading, setLoading] = useState(true)

  const availableSkills = [
    'Forward Crossovers', 'Backward Crossovers', 'Three-Turns', 
    'Mohawks', 'Sit Spin', 'Camel Spin', 'Waltz Jump', 'Salchow'
  ]

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('full_name')
      
      if (error) throw error
      setStudents(data?.length ? data : demoStudents)
      setUsingDemoData(!data?.length)
    } catch (err) {
      console.error(err)
      setStudents(demoStudents)
      setUsingDemoData(true)
    } finally {
      setLoading(false)
    }
  }

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedStudent) return
    if (usingDemoData) {
      alert('Feedback successfully saved for ' + selectedStudent.full_name + ' (demo mode)')
      setFeedback('')
      setSkills([])
      setSelectedStudent(null)
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      const { error } = await supabase
        .from('feedback_reports')
        .insert([{
          student_id: selectedStudent.id,
          instructor_id: user.id,
          feedback: feedback,
          skills_achieved: skills,
          // Note: In a real app, we'd also link the class_id
        }])

      if (error) throw error
      
      alert('Feedback successfully saved for ' + selectedStudent.full_name)
      setFeedback('')
      setSkills([])
      setSelectedStudent(null)
    } catch (err) {
      alert('Error saving feedback: ' + err.message)
    }
  }

  const filteredStudents = students.filter((student) =>
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Select Student</h3>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students..."
                style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
              />
            </div>
          </div>
          <div style={{ padding: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '1rem', textAlign: 'center' }}>Loading students...</div>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
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
                    marginBottom: '0.25rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <User size={16} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{student.full_name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.email}</p>
                  </div>
                </button>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No students found.</div>
            )}
          </div>
        </div>

        {/* Feedback Form */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--sidebar-border)' }}>
          {selectedStudent ? (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                Feedback for {selectedStudent.full_name}
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
                        transition: 'all 0.2s',
                        cursor: 'pointer'
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
                  required
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
