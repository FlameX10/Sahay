import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Menu,
  Bell,
  Heart,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  GraduationCap,
  BookOpen,
  UserCheck
} from 'lucide-react';

// Import the self-contained Sidebar component
import InstitutionSidebar from './InstitutionSidebar';

const CollegeAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for college admin dashboard - focused on their institution
  const stats = [
    {
      title: 'Enrolled Students',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-[#2dc8ca]',
      description: 'Active in our institution'
    },
    {
      title: 'Counseling Sessions',
      value: '89',
      change: '+12.5%',
      trend: 'up',
      icon: Calendar,
      bgColor: 'bg-[#889260]',
      description: 'This month'
    },
    {
      title: 'Peer Support Groups',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: MessageSquare,
      bgColor: 'bg-[#f99c5b]',
      description: 'Active groups'
    },
    {
      title: 'Wellness Alerts',
      value: '3',
      change: '-25%',
      trend: 'down',
      icon: AlertTriangle,
      bgColor: 'bg-[#f38788]',
      description: 'Students needing attention'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#eaf1f5]">
      {/* Sidebar component no longer needs items prop */}
      <InstitutionSidebar
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30" style={{borderColor:'#c8ced1'}}>
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-lg transition-colors"
                style={{background:'#c8ced1'}}
              >
                <Menu className="w-5 h-5 text-[#2e2f34]" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-[#2e2f34]">College Admin Dashboard</h2>
                <p className="text-base text-[#767272]">Manage your institution's student wellness</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2.5 rounded-lg bg-[#f38788] hover:opacity-90 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2dc8ca] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </span>
              </button>
              <div className="w-10 h-10 bg-[#7d7074] rounded-lg flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm font-semibold ${stat.trend === 'up' ? 'text-[#889260]' : 'text-[#f38788]'}`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#2e2f34] mb-1">{stat.value}</h3>
                <p className="text-[#767272] text-sm mb-2">{stat.title}</p>
                <p className="text-xs text-[#8d949d]">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Institution Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Wellness Overview */}
            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Student Wellness Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2e2f34]">Mental Health Status</p>
                    <p className="text-xs text-[#767272]">Based on recent assessments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#889260]">Good</p>
                    <p className="text-xs text-[#889260]">78% of students</p>
                  </div>
                </div>
                <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                  <div className="bg-[#889260] h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2e2f34]">Academic Stress</p>
                    <p className="text-xs text-[#767272]">Students reporting high stress</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#f99c5b]">23%</p>
                    <p className="text-xs text-[#f99c5b]">-5% from last month</p>
                  </div>
                </div>
                <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                  <div className="bg-[#f99c5b] h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center p-4 bg-[#2dc8ca] text-white rounded-lg hover:bg-[#26b3b5] transition-colors">
                  <GraduationCap className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">View Student Reports</p>
                    <p className="text-sm opacity-90">Check wellness assessments</p>
                  </div>
                </button>
                <button className="w-full flex items-center p-4 bg-[#889260] text-white rounded-lg hover:bg-[#7a7f56] transition-colors">
                  <BookOpen className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Manage Resources</p>
                    <p className="text-sm opacity-90">Update institution resources</p>
                  </div>
                </button>
                <button className="w-full flex items-center p-4 bg-[#f99c5b] text-white rounded-lg hover:bg-[#f18a3a] transition-colors">
                  <UserCheck className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Student Support</p>
                    <p className="text-sm opacity-90">Connect students with help</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
            <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-[#f2f7eb] rounded-lg">
                <div className="w-10 h-10 bg-[#2dc8ca] rounded-full flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2e2f34]">New student registration</p>
                  <p className="text-sm text-[#767272]">Sarah Johnson joined the wellness program</p>
                </div>
                <span className="text-xs text-[#8d949d]">2 hours ago</span>
              </div>
              <div className="flex items-center p-4 bg-[#f2f7eb] rounded-lg">
                <div className="w-10 h-10 bg-[#889260] rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2e2f34]">Counseling session completed</p>
                  <p className="text-sm text-[#767272]">Weekly check-in with 15 students</p>
                </div>
                <span className="text-xs text-[#8d949d]">4 hours ago</span>
              </div>
              <div className="flex items-center p-4 bg-[#f2f7eb] rounded-lg">
                <div className="w-10 h-10 bg-[#f99c5b] rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2e2f34]">Peer support group meeting</p>
                  <p className="text-sm text-[#767272]">Stress management group had 8 participants</p>
                </div>
                <span className="text-xs text-[#8d949d]">1 day ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CollegeAdminDashboard;
