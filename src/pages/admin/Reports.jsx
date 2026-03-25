import React, { useState } from 'react'
import { Printer, Search, Download, Award, User } from 'lucide-react'

const Reports = () => {
  const [selectedClass, setSelectedClass] = useState('all')

  const reports = [
    { id: 1, student: 'Alice Cooper', level: 'Basic 1', instructor: 'Coach Sarah', date: '2026-03-24' },
    { id: 2, student: 'Bob Dylan', level: 'Basic 1', instructor: 'Coach Sarah', date: '2026-03-24' },
    { id: 3, student: 'Charlie Brown', level: 'Basic 2', instructor: 'Coach Mike', date: '2026-03-22' },
  ]

  const handlePrint = (report) => {
    // In a real app, this would open a print-friendly route
    window.print()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Feedback reports</h2>
          <p style={{ color: 'var(--text-muted)' }}>Generate and print feedback reports for students.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={20} /> Export All (PDF)
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
              <option value="1">Monday - Basic 1</option>
              <option value="2">Wednesday - Freeskate</option>
            </select>
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Search Student</label>
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', bottom: '0.85rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Student name..." 
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Apply Filters</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {reports.map(report => (
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
                <h4 style={{ fontWeight: 700, fontSize: '1.125rem' }}>{report.student}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Level: {report.level}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Instructor</span>
                <span style={{ fontWeight: 600 }}>{report.instructor}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Date</span>
                <span style={{ fontWeight: 600 }}>{report.date}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button 
                onClick={() => handlePrint(report)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.625rem', borderRadius: '0.5rem',
                  border: '1px solid var(--primary-color)', color: 'var(--primary-color)',
                  fontWeight: 600, fontSize: '0.875rem'
                }}
              >
                <Printer size={18} /> Print Report
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.625rem', borderRadius: '0.5rem',
                background: 'var(--primary-color)', color: 'white',
                fontWeight: 600, fontSize: '0.875rem'
              }}>
                <Download size={18} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Print-only View (Hidden in normal UI) */}
      <div id="print-area" className="print-only" style={{ display: 'none' }}>
        {/* Style this for paper output */}
      </div>
    </div>
  )
}

export default Reports
