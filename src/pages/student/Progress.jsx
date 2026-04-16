import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { CheckCircle2, Star, Trophy } from 'lucide-react'

const demoReports = [
  {
    id: 'demo-progress-1',
    created_at: '2026-03-22T13:00:00Z',
    classes: { levels: { name: 'Pre-Free Skate' } },
    skills_achieved: ['Forward Crossovers', 'Backward One-Foot Glide', 'Two-Foot Spin'],
    feedback: 'Great edge control this week. Keep shoulders steady during spin entry.'
  },
  {
    id: 'demo-progress-2',
    created_at: '2026-04-08T13:00:00Z',
    classes: { levels: { name: 'Free Skate 1' } },
    skills_achieved: ['Waltz Jump', 'Half Flip Entry'],
    feedback: 'Jump timing is improving. Continue focusing on clean takeoff posture.'
  }
]

const StudentProgress = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      const { data, error } = await supabase
        .from('feedback_reports')
        .select(`
          *,
          classes (levels (name))
        `)
        .eq('student_id', user?.id || '')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setReports(data?.length ? data : demoReports)
    } catch (err) {
      console.error(err)
      setReports(demoReports)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-color)' }}>My Progress</h2>
        <p style={{ color: 'var(--text-muted)' }}>Track your skating achievements and level milestones.</p>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your achievements...</div>
      ) : reports.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {reports.map((report, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              border: '1px solid var(--sidebar-border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '12px', 
                  background: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a'
                }}>
                  <Trophy size={24} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    background: '#e0f2fe',
                    color: '#0284c7'
                  }}>
                    Achievement
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{report.created_at.split('T')[0]}</p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{report.classes?.levels?.name || 'Skill Milestone'}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {report.skills_achieved?.map((skill, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-color)' }}>{skill}</span>
                  </div>
                ))}
              </div>
              
              {report.feedback && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Instructor Feedback:</p>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>"{report.feedback}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--sidebar-border)' }}>
          <Star size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
          <p>You don't have any recorded feedback yet. Keep practicing!</p>
        </div>
      )}
    </div>
  )
}

export default StudentProgress
