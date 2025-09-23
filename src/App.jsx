import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Homepage from './Components/HomePage'
import InstitutionRegistration from './Components/InstitutionRegistration'
import StudentRegistration from './Components/StudentRegistration'
import LoginPage from './Components/LoginPage'
import Sahay from './Components/Sahay'
import BookCounselor from './Components/BookCounselor'
import DailyCheckIn from './Components/DailyCheckIn'
import PsychoeducationalResourceHub from './Components/PsychoeducationalResourceHub'
import AdminDashboard from './Components/AdminDashboard'
import CollegeAdminDashboard from './Components/CollegeAdminDashboard'
import CollegeStudentReports from './Components/CollegeStudentReports'
import CollegeCounselingSessions from './Components/CollegeCounselingSessions'
import CollegeResources from './Components/CollegeResources'
import CollegeSettings from './Components/CollegeSettings'
import ManageCounselors from './Components/ManageCounselors'
import PeerSupportManagement from './Components/PeerSupportManagement'
import CounselorDashboard from './Components/CounsellorDashboard'
import PeerSupport from './Components/PeerSupport'
import Meditation from './Components/Meditation'
import Exercise from './Components/Exercise'
import AdminAnalyticsDashboard from './Components/AdminAnalyticsDashboard'  
import MainAdmin from './Components/MainAdmin'
import ProtectedRoute from './Components/ProtectedRoute'
import PublicRoute from './Components/PublicRoute'
import { initializeAuth } from './store/slices/authSlice'
import AssessmentFlow from './Components/AssessmentFlow';
import Chatbot from './Components/Chatbot';

function App() {
  const dispatch = useDispatch();

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/institution-registration" element={<InstitutionRegistration />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        
        {/* Protected Student Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Sahay />
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute allowedRoles={['student']}>
            <BookCounselor />
          </ProtectedRoute>
        } />
        <Route path="/checkin" element={
          <ProtectedRoute allowedRoles={['student']}>
            <DailyCheckIn />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute allowedRoles={['student']}>
            <PsychoeducationalResourceHub />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute allowedRoles={['student']}>
            <PeerSupport />
          </ProtectedRoute>
        } />
        <Route path="/meditation" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Meditation />
          </ProtectedRoute>
        } />
        <Route path="/exercise" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Exercise />
          </ProtectedRoute>
        } />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainAdmin />
          </ProtectedRoute>
        } />
        <Route path="/collage_admin/dashboard" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/collage_admin/counselors" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <ManageCounselors />
          </ProtectedRoute>
        } />
        <Route path="/collage_admin/peer-support" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <PeerSupportManagement />
          </ProtectedRoute>
        } />
        <Route path="/collage_admin/analytics" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <AdminAnalyticsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/collage_admin" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Protected College Admin Routes */}
        {/* <Route path="/institution/dashboard" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <CollegeAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/institution/students" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <CollegeStudentReports />
          </ProtectedRoute>
        } />
        <Route path="/institution/sessions" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <CollegeCounselingSessions />
          </ProtectedRoute>
        } />
        <Route path="/institution/resources" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <CollegeResources />
          </ProtectedRoute>
        } />
        <Route path="/institution/settings" element={
          <ProtectedRoute allowedRoles={['collage_admin']}>
            <CollegeSettings />
          </ProtectedRoute>
        } /> */}
        
        {/* Protected Counsellor Routes */}
        <Route path="/counsellor" element={
          <ProtectedRoute allowedRoles={['counsellor']}>
            <CounselorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/counsellor/dashboard" element={
          <ProtectedRoute allowedRoles={['counsellor']}>
            <CounselorDashboard />
          </ProtectedRoute>
        } />
        
        {/* Protected Student Dashboard */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Sahay />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sahay />} />
        <Route path="/booking" element={<BookCounselor />} />
        <Route path="/assessmentFlow" element={<AssessmentFlow />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/resources" element={<PsychoeducationalResourceHub />} />
        <Route path="/checkin" element={<DailyCheckIn />} />
        <Route path="/community" element={<PeerSupport />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/exercise" element={<Exercise />} />
        {/* Admin Side */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/counselors" element={<ManageCounselors />} />
        <Route path="/admin/peer-support" element={<PeerSupportManagement />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsDashboard />} />
        <Route path="/counsellor" element={<CounselorDashboard />} />
        <Route path="/admin" element={<MainAdmin/>} />
      </Routes>
    </Router>
  )
}

export default App
