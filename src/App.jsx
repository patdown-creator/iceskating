import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import InstructorDashboard from './pages/InstructorDashboard'
import StudentDashboard from './pages/StudentDashboard'
import Unauthorized from './pages/Unauthorized'

// Detailed Admin Pages
import AdminClasses from './pages/admin/Classes'
import AdminReports from './pages/admin/Reports'

// Detailed Instructor Pages
import InstructorAttendance from './pages/instructor/Attendance'
import InstructorFeedback from './pages/instructor/Feedback'

// New Phase 2 Pages
import Profile from './pages/Profile'
import StudentProgress from './pages/student/Progress'
import AdminUsers from './pages/admin/Users'
import AdminLevels from './pages/admin/Levels'

// Layouts
import MainLayout from './layouts/MainLayout'
import { Loader2 } from 'lucide-react'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />
  
  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route element={<MainLayout />}>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/classes" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminClasses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/levels" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLevels />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instructor" 
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instructor/attendance" 
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorAttendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instructor/feedback" 
            element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <InstructorFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/progress" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProgress />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect based on role */}
          <Route 
            path="/" 
            element={<DashboardRedirect />} 
          />
        </Route>
      </Routes>
    </Router>
  )
}

const DashboardRedirect = () => {
  const { user, profile, loading } = useAuth()
  
  console.log('DashboardRedirect state:', { loading, hasUser: !!user, hasProfile: !!profile })
  
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loader2 className="animate-spin" size={40} color="var(--primary-color)" />
    </div>
  )
  
  if (!user) {
    console.log('No user session, redirecting to login...')
    return <Navigate to="/login" />
  }
  
  if (!profile) {
    console.log('User exists but profile missing, redirecting to student by default...')
    // Fallback if profile didn't load for some reason
    return <Navigate to="/student" />
  }
  
  console.log('Redirecting based on role:', profile.role)
  if (profile.role === 'admin') return <Navigate to="/admin" />
  if (profile.role === 'instructor') return <Navigate to="/instructor" />
  return <Navigate to="/student" />
}

export default App
