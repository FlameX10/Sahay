import React from 'react';
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
  Settings
} from 'lucide-react';

const InstitutionSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // Sidebar navigation items are now defined directly in the component
  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', active: true, href: '#' },
    { icon: Users, label: 'Student Analytics', href: '#' },
    { icon: UserPlus, label: 'Manage Counselors', href: '#' },
    { icon: MessageSquare, label: 'Create Community', href: '#' },
    { icon: Calendar, label: 'Appointments', href: '#' },
    { icon: BookOpen, label: 'Resource Hub', href: '#' },
    { icon: Shield, label: 'Moderation', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' }
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`w-72 bg-white border-r flex-shrink-0 z-50 lg:z-auto ${
          sidebarOpen ? 'fixed inset-y-0 left-0' : 'hidden'
        } lg:static lg:block`}
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
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-[#2dc8ca] text-white'
                      : 'text-[#767272] hover:bg-[#f2f7eb] hover:text-[#2e2f34]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
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