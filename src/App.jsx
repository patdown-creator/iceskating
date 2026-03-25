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

// Layouts
import MainLayout from './layouts/MainLayout'

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
            path="/student/*" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
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
  const { profile, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!profile) return <Navigate to="/login" />
  
  if (profile.role === 'admin') return <Navigate to="/admin" />
  if (profile.role === 'instructor') return <Navigate to="/instructor" />
  return <Navigate to="/student" />
}

export default App
