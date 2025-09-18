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
  ArrowDown
} from 'lucide-react';

// Import the self-contained Sidebar component
import InstitutionSidebar from './InstitutionSidebar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for dashboard
  const stats = [
    {
      title: 'Active Students',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-[#2dc8ca]',
      description: 'Registered this semester'
    },
    {
      title: 'Counseling Sessions',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      bgColor: 'bg-[#889260]',
      description: 'Scheduled this month'
    },
    {
      title: 'Peer Interactions',
      value: '3,249',
      change: '+23.1%',
      trend: 'up',
      icon: MessageSquare,
      bgColor: 'bg-[#f99c5b]',
      description: 'Support exchanges'
    },
    {
      title: 'Crisis Alerts',
      value: '7',
      change: '-15.3%',
      trend: 'down',
      icon: AlertTriangle,
      bgColor: 'bg-[#f38788]',
      description: 'Flagged for attention'
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
                <h2 className="text-2xl font-bold text-[#2e2f34]">Admin Dashboard</h2>
                <p className="text-base text-[#767272]">Monitor student wellness and manage resources</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2.5 rounded-lg bg-[#f38788] hover:opacity-90 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2dc8ca] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">7</span>
                </span>
              </button>
              <div className="w-10 h-10 bg-[#7d7074] rounded-lg flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold text-sm">A</span>
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

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mental Health Trends */}
            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Mental Health Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2e2f34]">Anxiety Levels</p>
                    <p className="text-xs text-[#767272]">Based on anonymous assessments</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#f38788]">62%</p>
                    <p className="text-xs text-[#f38788]">+5% from last month</p>
                  </div>
                </div>
                <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                  <div className="bg-[#f38788] h-2 rounded-full" style={{width: '62%'}}></div>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2e2f34]">Depression Indicators</p>
                    <p className="text-xs text-[#767272]">PHQ-9 scores above threshold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#f99c5b]">38%</p>
                    <p className="text-xs text-[#889260]">-3% from last month</p>
                  </div>
                </div>
                <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                  <div className="bg-[#f99c5b] h-2 rounded-full" style={{width: '38%'}}></div>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#2e2f34]">Stress Levels</p>
                    <p className="text-xs text-[#767272]">Self-reported high stress</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#2dc8ca]">45%</p>
                    <p className="text-xs text-[#f38788]">+2% from last month</p>
                  </div>
                </div>
                <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                  <div className="bg-[#2dc8ca] h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
            </div>

            {/* Platform Usage Analytics */}
            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h3 className="text-xl font-bold text-[#2e2f34] mb-6">Platform Usage Analytics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#2e2f34]">AI Chatbot Interactions</span>
                    <span className="text-sm text-[#767272]">1,245 sessions</span>
                  </div>
                  <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                    <div className="bg-[#2dc8ca] h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#2e2f34]">Resource Hub Views</span>
                    <span className="text-sm text-[#767272]">892 views</span>
                  </div>
                  <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                    <div className="bg-[#889260] h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#2e2f34]">Self-Assessment Completions</span>
                    <span className="text-sm text-[#767272]">678 assessments</span>
                  </div>
                  <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                    <div className="bg-[#f99c5b] h-2 rounded-full" style={{width: '48%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[#2e2f34]">Peer Support Participation</span>
                    <span className="text-sm text-[#767272]">234 active users</span>
                  </div>
                  <div className="w-full bg-[#f2f7eb] rounded-full h-2">
                    <div className="bg-[#cdbdd4] h-2 rounded-full" style={{width: '32%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demographic Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h4 className="text-lg font-bold text-[#2e2f34] mb-4">Risk Categories</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">Low Risk</span>
                  <span className="font-semibold text-[#889260]">1,842 (65%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">Moderate Risk</span>
                  <span className="font-semibold text-[#f99c5b]">748 (26%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">High Risk</span>
                  <span className="font-semibold text-[#f38788]">257 (9%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h4 className="text-lg font-bold text-[#2e2f34] mb-4">Peak Usage Times</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">10:00 PM - 12:00 AM</span>
                  <span className="font-semibold text-[#2dc8ca]">34%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">2:00 PM - 4:00 PM</span>
                  <span className="font-semibold text-[#889260]">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">8:00 AM - 10:00 AM</span>
                  <span className="font-semibold text-[#f99c5b]">21%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
              <h4 className="text-lg font-bold text-[#2e2f34] mb-4">Common Concerns</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">Academic Stress</span>
                  <span className="font-semibold text-[#f38788]">42%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">Social Anxiety</span>
                  <span className="font-semibold text-[#2dc8ca]">31%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#767272]">Career Worries</span>
                  <span className="font-semibold text-[#889260]">27%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-xl p-6 border shadow-sm" style={{borderColor:'#c8ced1'}}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2e2f34]">Mental Health Trends Over Time</h3>
              <select className="text-sm border rounded-lg px-3 py-2 text-[#767272]" style={{borderColor:'#c8ced1'}}>
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2dc8ca] rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#2e2f34] mb-1">Platform Adoption</h4>
                <p className="text-2xl font-bold text-[#2dc8ca] mb-1">78%</p>
                <p className="text-xs text-[#767272]">Students actively using platform</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#889260] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#2e2f34] mb-1">Wellbeing Score</h4>
                <p className="text-2xl font-bold text-[#889260] mb-1">6.4/10</p>
                <p className="text-xs text-[#767272]">Average self-reported wellbeing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#f99c5b] rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#2e2f34] mb-1">Intervention Success</h4>
                <p className="text-2xl font-bold text-[#f99c5b] mb-1">85%</p>
                <p className="text-xs text-[#767272]">Positive outcomes from support</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;