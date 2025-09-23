import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { 
  BarChart3, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Calendar, 
  Users, 
  Menu, 
  X, 
  Settings,
  LogOut,
  Shield,
  Brain
} from 'lucide-react';

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', color: 'bg-[#3d9098]', path: '/dashboard' },
    { id: 'assessment', icon: Heart, label: 'Self Assessment', color: 'bg-[#f99c5b]', path: '/assessmentFlow' },
    { id: 'resources', icon: BookOpen, label: 'Resources', color: 'bg-[#cab2cb]', path: '/resources' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Support', color: 'bg-[#9ea9a9]', path: '/chatbot' },
    { id: 'booking', icon: Calendar, label: 'Book Counselor', color: 'bg-[#d8c1ad]', path: '/booking' },
    { id: 'community', icon: Users, label: 'Peer Support', color: 'bg-[#7d7074]', path: '/community' },
    { id: 'meditation', icon: Brain, label: 'Meditation', color: 'bg-[#a0b4bb]', path: '/meditation' },
    { id: 'exercise', icon: Calendar, label: 'Exercise', color: 'bg-[#fbecb3]', path: '/exercise' },
  ];

  const handleLogout = async () => {
    try {
      // Clear all localStorage items
      localStorage.clear();
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      });

      // Dispatch logout action to clear Redux state
      dispatch(logoutUser());
      
      // Navigate to login page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, still navigate to login
      navigate('/');
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b" style={{borderColor:'#c8ced1'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3d9098] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2e2f34]">Sahay</h1>
                <p className="text-sm text-[#8d949d]">Mental Wellness Hub</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#f2f7eb] transition-colors"
              aria-label="Close sidebar"
              title="Close menu"
            >
              <X className="w-5 h-5 text-[#2e2f34]" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'bg-[#e1d1c9] text-[#2e2f34] shadow-sm' 
                  : 'text-[#767272] hover:bg-[#fbf1ea] hover:text-[#2e2f34]'
              }`}
            >
              <div className={`w-10 h-10 ${location.pathname === item.path ? 'bg-[#3d9098]' : item.color} rounded-lg flex items-center justify-center transition-colors`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 pt-0 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#767272] hover:bg-[#f2f7eb] rounded-xl transition-colors">
            <div className="w-8 h-8 bg-[#b7c0d0] rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#ab5275] hover:bg-[#cdbdd4] rounded-xl transition-colors" onClick={handleLogout}>
            <div className="w-8 h-8 bg-[#f38788] rounded-lg flex items-center justify-center">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
