import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, 
  Building,
  BarChart3, 
  Users, 
  UserPlus,
  MessageSquare,
  Calendar,
  BookOpen,
  Shield,
  Settings,
  LogOut
} from 'lucide-react';

const InstitutionSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // Navigation items, 'Settings' is handled separately at the bottom
  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: UserPlus, label: 'Manage Counselors', href: '/admin/counselors' },
    { icon: MessageSquare, label: 'Peer Support', href: '/admin/peer-support' },
    { icon: Users, label: 'Student Analytics', href: '/admin/analytics' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    // On smaller screens, close the sidebar after navigation
    if (window.innerWidth < 1024) { 
        setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 flex-shrink-0`}
        style={{ borderColor: '#c8ced1' }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#c8ced1' }}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#2dc8ca] rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2e2f34]">Sahay Admin</h1>
              <p className="text-sm text-[#767272]">College Dashboard</p>
            </div>
          </div>
        </div>

        {/* College Info */}
        <div className="p-6 border-b" style={{ borderColor: '#c8ced1' }}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-[#fbecb3] rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-[#eac163]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2e2f34]">ABC University</h3>
              <p className="text-sm text-[#767272]">Engineering Campus</p>
            </div>
          </div>
          <div className="text-xs text-[#8d949d]">
            Student ID Range: 2021-2025 • Total: 3,200 students
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavigate(item.href)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-[#2dc8ca] text-white'
                        : 'text-[#767272] hover:bg-[#f2f7eb] hover:text-[#2e2f34]'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Bottom Section: Settings & Logout */}
        <div className="p-4 border-t" style={{borderColor: '#c8ced1'}}>
           <ul className="space-y-2">
              <li>
                <button
                    onClick={() => handleNavigate('/admin/settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        pathname === '/admin/settings'
                        ? 'bg-[#2dc8ca] text-white'
                        : 'text-[#767272] hover:bg-[#f2f7eb] hover:text-[#2e2f34]'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </button>
              </li>
              <li>
                 <button
                    onClick={() => handleNavigate('/')} // Logs out and goes to login page
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-[#ab5275] hover:bg-[#cdbdd4]"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
              </li>
           </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default InstitutionSidebar;

