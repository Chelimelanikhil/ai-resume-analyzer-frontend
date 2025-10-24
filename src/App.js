// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import CandidateDashboard from './components/CandidateDashboard'
import RecruiterDashboard from './components/RecruiterDashboard'
import AuthPages from './components/AuthPages'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import SettingsProfilePage from './components/SettingsProfilePage'
import JobDetails from './components/JobDetails'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole')
    if (token && role) {
      setIsAuthenticated(true)
      setUserRole(role)
    }
  }, [])

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />
    }
    if (allowedRole && userRole !== allowedRole) {
      return <Navigate to="/" replace />
    }
    return children
  }

  // Public Route Component (redirect if already logged in)
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to={userRole === 'candidate' ? '/dashboard' : '/recruiter'} replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/auth" 
          element={
            <PublicRoute>
              <AuthPages 
                onLoginSuccess={(role) => {
                  setIsAuthenticated(true)
                  setUserRole(role)
                }} 
              />
            </PublicRoute>
          } 
        />

        {/* Candidate Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/job-details" 
          element={
            <ProtectedRoute allowedRole="candidate">
              <JobDetails />
            </ProtectedRoute>
          } 
        />

        {/* Recruiter Routes */}
        <Route 
          path="/recruiter" 
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <ProtectedRoute allowedRole="recruiter">
              <AnalyticsDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Shared Routes (Both roles) */}
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsProfilePage userRole={userRole} />
            </ProtectedRoute>
          } 
        />

        {/* 404 - Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App