import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import ManageCounselors from './Components/ManageCounselors'
import PeerSupportManagement from './Components/PeerSupportManagement'
import CounselorDashboard from './Components/CounsellorDashboard'
import PeerSupport from './Components/PeerSupport'
import Meditation from './Components/Meditation'
import Exercise from './Components/Exercise'
import AdminAnalyticsDashboard from './Components/AdminAnalyticsDashboard'  
import MainAdmin from './Components/MainAdmin'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/institution-registration" element={<InstitutionRegistration />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sahay />} />
        <Route path="/booking" element={<BookCounselor />} />
        <Route path="/checkin" element={<DailyCheckIn />} />
        <Route path="/resources" element={<PsychoeducationalResourceHub />} />
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
