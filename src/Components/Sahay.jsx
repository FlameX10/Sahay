import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Calendar, 
  BarChart3, 
  Users, 
  Menu, 
  X, 
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  Smile,
  Brain,
  Shield,
  ChevronRight,
  Star,
  Zap,
  Sun,
  Moon,
  Coffee,
  Target,
  Award,
  Plus,
  ArrowRight
} from 'lucide-react';

const Sahay = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good morning', icon: Sun };
    if (hour < 17) return { text: 'Good afternoon', icon: Coffee };
    return { text: 'Good evening', icon: Moon };
  };

  const greeting = getGreeting();

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', color: 'bg-[#3d9098]' },
    { id: 'assessment', icon: Heart, label: 'Self Assessment', color: 'bg-[#f99c5b]' },
    { id: 'resources', icon: BookOpen, label: 'Resources', color: 'bg-[#cab2cb]' },
    { id: 'chatbot', icon: MessageCircle, label: 'AI Support', color: 'bg-[#9ea9a9]' },
    { id: 'booking', icon: Calendar, label: 'Book Counselor', color: 'bg-[#d8c1ad]' },
    { id: 'community', icon: Users, label: 'Peer Support', color: 'bg-[#7d7074]' },
  ];

  const quickActions = [
    {
      title: 'Daily Check-in',
      subtitle: 'How are you feeling today?',
      icon: Smile,
      bgColor: 'bg-[#889260]',
      action: 'Start Check-in',
      time: '2 minutes'
    },
    {
      title: 'AI Companion',
      subtitle: 'Chat with your wellness buddy',
      icon: Brain,
      bgColor: 'bg-[#cdbdd4]',
      action: 'Start Chat',
      time: 'Available 24/7'
    },
    {
      title: 'Book Session',
      subtitle: 'Talk to a counselor',
      icon: Calendar,
      bgColor: 'bg-[#2dc8ca]',
      action: 'Schedule',
      time: 'Next: Tomorrow 2pm'
    }
  ];

  const statsCards = [
    { label: 'Wellness Score', value: '8.2', unit: '/10', icon: Target, bgColor: 'bg-[#2ec3ca]', change: '+0.5' },
    { label: 'Daily Streak', value: '12', unit: 'days', icon: Zap, bgColor: 'bg-[#eac163]', change: '+1' },
    { label: 'Sessions Done', value: '24', unit: 'total', icon: Award, bgColor: 'bg-[#f38788]', change: '+3' },
  ];

  const recentActivity = [
    { 
      type: 'Mood Check-in', 
      description: 'Feeling good today - 8/10',
      time: '2 hours ago', 
      icon: Heart, 
      bgColor: 'bg-[#e1d1c9]',
      iconColor: 'text-[#ab5275]'
    },
    { 
      type: 'Resource Read', 
      description: 'Completed "Managing Exam Stress"',
      time: '1 day ago', 
      icon: BookOpen, 
      bgColor: 'bg-[#fbecb3]',
      iconColor: 'text-[#eac163]'
    },
    { 
      type: 'AI Chat', 
      description: 'Discussed anxiety coping strategies',
      time: '2 days ago', 
      icon: MessageCircle, 
      bgColor: 'bg-[#cdbdd4]',
      iconColor: 'text-[#4e4f65]'
    },
    { 
      type: 'Peer Group', 
      description: 'Joined study stress support group',
      time: '3 days ago', 
      icon: Users, 
      bgColor: 'bg-[#b7c0d0]',
      iconColor: 'text-[#3d9098]'
    },
  ];

  const featuredResources = [
    {
      title: 'Exam Stress Management',
      description: 'Evidence-based techniques for academic pressure',
      readTime: '5 min read',
      bgColor: 'bg-[#eaf1f5]',
      iconColor: 'text-[#2dc8ca]',
      category: 'Study Skills'
    },
    {
      title: 'Sleep & Mental Health',
      description: 'How quality sleep improves wellbeing',
      readTime: '3 min read',
      bgColor: 'bg-[#f2f7eb]',
      iconColor: 'text-[#889260]',
      category: 'Lifestyle'
    },
    {
      title: 'Building Resilience',
      description: 'Develop skills to bounce back stronger',
      readTime: '7 min read',
      bgColor: 'bg-[#fbecb3]',
      iconColor: 'text-[#f99c5b]',
      category: 'Mental Skills'
    }
  ];

  return (
    <div className="min-h-screen bg-[#eaf1f5]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
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
              <div className="w-10 h-10 bg-[#3d9098] rounded-2xl flex items-center justify-center">
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
              <Menu className="w-5 h-5 text-[#2e2f34]" />
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedFeature(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                selectedFeature === item.id 
                  ? 'bg-[#e1d1c9] text-[#2e2f34] shadow-sm' 
                  : 'text-[#767272] hover:bg-[#fbf1ea] hover:text-[#2e2f34]'
              }`}
            >
              <div className={`w-10 h-10 ${selectedFeature === item.id ? 'bg-[#3d9098]' : item.color} rounded-xl flex items-center justify-center transition-colors`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 pt-0 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#767272] hover:bg-[#f2f7eb] rounded-2xl transition-colors">
            <div className="w-8 h-8 bg-[#b7c0d0] rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#ab5275] hover:bg-[#cdbdd4] rounded-2xl transition-colors">
            <div className="w-8 h-8 bg-[#f38788] rounded-lg flex items-center justify-center">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30" style={{borderColor:'#c8ced1'}}>
          <div className="px-6 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl transition-colors"
                style={{background:'#c8ced1'}}
              >
                <Menu className="w-6 h-6 text-[#2e2f34]" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <div className="w-8 h-8 bg-[#fbecb3] rounded-full flex items-center justify-center">
                    <greeting.icon className="w-5 h-5 text-[#eac163]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#2e2f34]">{greeting.text}, Student!</h2>
                </div>
                <p className="text-lg text-[#767272]">How are you feeling today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-3 rounded-2xl bg-[#2dc8ca] hover:opacity-90 transition-colors group">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f38788] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </span>
              </button>
              <div className="w-12 h-12 bg-[#7d7074] rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-90 transition-colors">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border hover:shadow-md transition-shadow" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center text-sm font-bold px-3 py-1 rounded-full" style={{color:'#889260', background:'#f2f7eb'}}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#2e2f34] mb-1">
                  {stat.value}<span className="text-lg text-[#8d949d] font-normal">{stat.unit}</span>
                </div>
                <div className="text-[#767272] text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Wellness Score Highlight */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border" style={{borderColor:'#c8ced1'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#2e2f34] mb-2">Your Wellness Journey</h3>
                <p className="text-[#767272]">You're doing great! Keep up the momentum.</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-[#2dc8ca] mb-1">8.2</div>
                <div className="text-[#8d949d] font-medium">Wellness Score</div>
              </div>
            </div>
            <div className="w-full rounded-full h-4 overflow-hidden" style={{background:'#c8ced1'}}>
              <div className="bg-[#2dc8ca] h-4 rounded-full transition-all duration-1000 ease-out" style={{width: '82%'}}></div>
            </div>
            <div className="flex justify-between text-sm text-[#8d949d] mt-2">
              <span>Needs attention</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#2e2f34]">Quick Actions</h3>
              <button className="text-[#2dc8ca] font-semibold text-sm flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border hover:shadow-md transition-all duration-200 group cursor-pointer" style={{borderColor:'#c8ced1'}}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${action.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-[#8d949d] text-xs font-medium">{action.time}</div>
                    </div>
                  </div>
                  <h4 className="font-bold text-[#2e2f34] text-lg mb-2">{action.title}</h4>
                  <p className="text-[#767272] text-sm mb-4">{action.subtitle}</p>
                  <button className="w-full bg-[#f2f7eb] hover:bg-[#eaf1f5] text-[#2e2f34] font-semibold py-3 rounded-2xl transition-colors flex items-center justify-center group-hover:bg-[#e1d1c9] group-hover:text-[#3d9098]">
                    {action.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity & Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#2e2f34]">Recent Activity</h3>
                <button className="text-[#2dc8ca] text-sm font-semibold">View all</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[#2e2f34] font-semibold text-sm">{activity.type}</p>
                        <span className="text-[#8d949d] text-xs">{activity.time}</span>
                      </div>
                      <p className="text-[#767272] text-sm mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Resources */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#2e2f34]">Featured Resources</h3>
                <button className="text-[#2dc8ca] text-sm font-semibold">Browse all</button>
              </div>
              <div className="space-y-4">
                {featuredResources.map((resource, index) => (
                  <div key={index} className={`p-4 ${resource.bgColor} rounded-2xl cursor-pointer hover:shadow-sm transition-shadow group`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-bold ${resource.iconColor} bg-white px-2 py-1 rounded-full`}>
                        {resource.category}
                      </span>
                      <span className="text-[#8d949d] text-xs">{resource.readTime}</span>
                    </div>
                    <h4 className="font-bold text-[#2e2f34] mb-1 group-hover:text-[#3d9098] transition-colors">{resource.title}</h4>
                    <p className="text-[#767272] text-sm">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Highlight */}
          <div className="bg-[#2dc8ca] rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-3">Join Our Peer Support Community</h3>
                <p className="text-[#fbecb3] text-lg mb-6">Connect with fellow students in a safe, supportive space</p>
                <button className="bg-white text-[#2dc8ca] px-8 py-3 rounded-2xl font-bold hover:bg-[#f2f7eb] transition-colors flex items-center">
                  Join Community
                  <Users className="w-5 h-5 ml-2" />
                </button>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-[#a0b4bb] rounded-3xl flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sahay;