import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Printer, Search, Download, Award, User } from 'lucide-react'

const demoClasses = [
  { id: 'demo-class-1', day: 'Monday', time_slot: '4:00 PM - 5:00 PM', levels: { name: 'Basic Skills 1' } },
  { id: 'demo-class-2', day: 'Wednesday', time_slot: '5:30 PM - 6:30 PM', levels: { name: 'Basic Skills 2' } },
  { id: 'demo-class-3', day: 'Saturday', time_slot: '10:00 AM - 11:00 AM', levels: { name: 'Pre-Free Skate' } }
]

const demoReports = [
  {
    id: 'demo-report-1',
    class_id: 'demo-class-1',
    profiles: { full_name: 'Emma Carter' },
    classes: { levels: { name: 'Basic Skills 1' } },
    instructor_id: 'Coach Sarah',
    created_at: '2026-04-05T15:00:00Z',
    feedback: 'Strong progress with forward swizzles and one-foot glide. Keep knees bent through turns.',
    skills_achieved: ['Forward Swizzles', 'One-Foot Glide']
  },
  {
    id: 'demo-report-2',
    class_id: 'demo-class-2',
    profiles: { full_name: 'Noah Lee' },
    classes: { levels: { name: 'Basic Skills 2' } },
    instructor_id: 'Coach Maria',
    created_at: '2026-04-09T16:00:00Z',
    feedback: 'Crossovers are more controlled this week. Practice stronger pushes on the outside edge.',
    skills_achieved: ['Forward Crossovers', 'Two-Foot Spin Entry']
  }
]

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [reports, setReports] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      // Fetch classes for the dropdown
      const { data: classData } = await supabase
        .from('classes')
        .select('*, levels(name)')
      setClasses(classData?.length ? classData : demoClasses)

      await fetchReports()
    } catch (err) {
      console.error(err)
      setClasses(demoClasses)
      setReports(demoReports)
    } finally {
      setLoading(false)
    }
  }

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('feedback_reports')
      .select(`
        *,
        profiles (full_name),
        classes (id, day, time_slot, levels (name))
      `)
      .order('created_at', { ascending: false })
    
    if (!error) setReports(data?.length ? data : demoReports)
    if (error) setReports(demoReports)
  }

  const exportToCSV = () => {
    if (reports.length === 0) return alert('No reports to export.')
    
    const headers = ['Student', 'Level', 'Instructor', 'Date', 'Feedback', 'Skills']
    const csvContent = [
      headers.join(','),
      ...reports.map(r => [
        `"${r.profiles?.full_name}"`,
        `"${r.classes?.levels?.name}"`,
        `"${r.instructor_id}"`,
        `"${r.created_at.split('T')[0]}"`,
        `"${r.feedback.replace(/"/g, '""')}"`,
        `"${r.skills_achieved.join('; ')}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `SkateSchool_Reports_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = (report) => {
    window.print()
  }

  const handleShare = (report) => {
    const text = `Shared ${report.profiles?.full_name}'s feedback report.`
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
    }
    alert(`${text} (summary copied to clipboard if available)`)
  }

  const filteredReports = reports.filter((report) => {
    const classMatches = selectedClass === 'all' || report.class_id === selectedClass
    const studentName = report.profiles?.full_name || ''
    const studentMatches = studentName.toLowerCase().includes(searchTerm.toLowerCase())
    return classMatches && studentMatches
  })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Feedback reports</h2>
          <p style={{ color: 'var(--text-muted)' }}>Generate and print feedback reports for students.</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Download size={20} /> Export All (CSV)
        </button>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--sidebar-border)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Filter by Class</label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            >
              <option value="all">All Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.day} - {c.levels?.name} ({c.time_slot})</option>
              ))}
            </select>
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Search Student</label>
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', bottom: '0.85rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Student name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            />
          </div>
          <button onClick={fetchReports} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Refresh</button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading reports...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {filteredReports.map(report => (
            <div key={report.id} style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '1px solid var(--sidebar-border)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', top: 0, right: 0, 
                width: '60px', height: '60px', 
                background: '#f8fafc', borderRadius: '0 0 0 100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                paddingLeft: '10px', paddingBottom: '10px'
              }}>
                <Award size={24} color="var(--primary-color)" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={24} color="var(--primary-color)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{report.profiles?.full_name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Level: {report.classes?.levels?.name}</p>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date</span>
                  <span style={{ fontWeight: 600 }}>{report.created_at.split('T')[0]}</span>
                </div>
                <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.4 }}>
                  {report.feedback.substring(0, 100)}{report.feedback.length > 100 ? '...' : ''}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button 
                  onClick={() => handlePrint(report)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.625rem', borderRadius: '0.5rem',
                    border: '1px solid var(--primary-color)', color: 'var(--primary-color)',
                    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', background: 'white'
                  }}
                >
                  <Printer size={18} /> Print
                </button>
                <button
                  onClick={() => handleShare(report)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.625rem', borderRadius: '0.5rem',
                    background: '#f1f5f9', color: '#334155',
                    fontWeight: 600, fontSize: '0.875rem',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer'
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No feedback reports found.
            </div>
          )}
        </div>
      )}
      {/* Print-only View (Hidden in normal UI) */}
      <div id="print-area" className="print-only" style={{ display: 'none' }}>
        {/* Style this for paper output */}
      </div>
    </div>
  )
}

export default Reports
