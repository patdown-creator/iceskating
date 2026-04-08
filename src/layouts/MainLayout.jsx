import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, Home, Users, Calendar, Award, ClipboardCheck, Printer, User } from 'lucide-react'

const MainLayout = () => {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navItems = {
    admin: [
      { label: 'Dashboard', icon: <Home size={20} />, path: '/admin' },
      { label: 'Users', icon: <Users size={20} />, path: '/admin/users' },
      { label: 'Classes', icon: <Calendar size={20} />, path: '/admin/classes' },
      { label: 'Levels', icon: <Award size={20} />, path: '/admin/levels' },
      { label: 'Reports', icon: <Printer size={20} />, path: '/admin/reports' },
      { label: 'My Profile', icon: <User size={20} />, path: '/profile' },
    ],
    instructor: [
      { label: 'My Classes', icon: <Calendar size={20} />, path: '/instructor' },
      { label: 'Attendance', icon: <ClipboardCheck size={20} />, path: '/instructor/attendance' },
      { label: 'Feedback', icon: <Award size={20} />, path: '/instructor/feedback' },
      { label: 'My Profile', icon: <User size={20} />, path: '/profile' },
    ],
    student: [
      { label: 'My Schedule', icon: <Calendar size={20} />, path: '/student' },
      { label: 'My Progress', icon: <Award size={20} />, path: '/student/progress' },
      { label: 'My Profile', icon: <User size={20} />, path: '/profile' },
    ],
  }

  const items = navItems[profile?.role] || []

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '8px' }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>SkateSchool</h1>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            {items.map((item) => (
              <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                <Link 
                  to={item.path} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    color: 'var(--text-color)',
                    transition: 'background 0.2s',
                    fontWeight: 500
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--sidebar-border)', paddingTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{profile?.full_name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{profile?.role}</p>
          </div>
          <button 
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              color: '#ef4444',
              fontWeight: 500
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
