import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  MessageSquare,
  Heart,
  Shield,
  CheckCircle,
  Menu,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Star,
  Clock,
  Mail,
  Phone
} from 'lucide-react';

// Assuming InstitutionSidebar.js exists in the same directory
import InstitutionSidebar from './InstitutionSidebar';

const PeerSupportManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('volunteers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    studentId: '',
    email: '',
    year: '',
    dept: '',
    phone: ''
  });

  // Mock data for peer volunteers
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      studentId: 'CSE2022001',
      email: 'priya.sharma@college.edu',
      year: '3rd Year',
      dept: 'Computer Science',
      status: 'active',
      joinedAt: '2024-08-15',
      sessionsCompleted: 24,
      rating: 4.8,
      specializations: ['Academic Stress', 'Social Anxiety'],
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      studentId: 'ME2023002',
      email: 'rahul.kumar@college.edu',
      year: '2nd Year',
      dept: 'Mechanical',
      status: 'training',
      joinedAt: '2024-09-01',
      sessionsCompleted: 8,
      rating: 4.5,
      specializations: ['Career Worries', 'Time Management'],
      phone: '+91 87654 32109'
    },
    {
      id: 3,
      name: 'Ananya Patel',
      studentId: 'ECE2021003',
      email: 'ananya.patel@college.edu',
      year: '4th Year',
      dept: 'Electronics',
      status: 'active',
      joinedAt: '2024-07-20',
      sessionsCompleted: 35,
      rating: 4.9,
      specializations: ['Relationship Issues', 'Self-esteem'],
      phone: '+91 76543 21098'
    }
  ]);

  // Mock data for peer support communities
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'Academic Success Circle',
      description: 'Support for students struggling with academic stress and study management.',
      members: 45,
      moderators: ['Priya Sharma', 'Ananya Patel'],
      status: 'active',
      createdAt: '2024-08-01',
      category: 'Academic',
      isAnonymous: true,
      avgRating: 4.6
    },
    {
      id: 2,
      name: 'Social Connect Hub',
      description: 'Building friendships and overcoming social anxiety together.',
      members: 32,
      moderators: ['Rahul Kumar'],
      status: 'active',
      createdAt: '2024-08-15',
      category: 'Social',
      isAnonymous: false,
      avgRating: 4.4
    },
    {
      id: 3,
      name: 'Career Guidance Network',
      description: 'Peer support for career planning and job search anxiety.',
      members: 28,
      moderators: ['Priya Sharma'],
      status: 'pending',
      createdAt: '2024-09-10',
      category: 'Career',
      isAnonymous: true,
      avgRating: 4.2
    }
  ]);

  const stats = [
    {
      title: 'Active Volunteers',
      value: volunteers.filter(v => v.status === 'active').length.toString(),
      change: '+15%',
      icon: Users,
      bgColor: 'bg-[#2dc8ca]'
    },
    {
      title: 'Support Communities',
      value: communities.length.toString(),
      change: '+25%',
      icon: MessageSquare,
      bgColor: 'bg-[#889260]'
    },
    {
      title: 'Monthly Sessions',
      value: '156',
      change: '+18%',
      icon: Heart,
      bgColor: 'bg-[#f99c5b]'
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+5%',
      icon: CheckCircle,
      bgColor: 'bg-[#cdbdd4]'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInviteVolunteer = () => {
    if (!inviteForm.name || !inviteForm.studentId || !inviteForm.email || !inviteForm.year || !inviteForm.dept || !inviteForm.phone) {
      alert('Please fill out all fields.');
      return;
    }
    
    const newVolunteer = {
      id: volunteers.length + 1,
      ...inviteForm,
      status: 'training',
      joinedAt: new Date().toISOString().split('T')[0],
      sessionsCompleted: 0,
      rating: 0,
      specializations: []
    };
    setVolunteers([...volunteers, newVolunteer]);
    setShowInviteModal(false);
    setInviteForm({
      name: '',
      studentId: '',
      email: '',
      year: '',
      dept: '',
      phone: ''
    });
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          volunteer.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          volunteer.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || volunteer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || community.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#eaf1f5]">
      <InstitutionSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <h2 className="text-2xl font-bold text-[#2e2f34]">Peer Support Management</h2>
                <p className="text-base text-[#767272]">Manage volunteers and support communities</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#2dc8ca] text-white rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Volunteer</span>
              </button>
              <button className="relative p-2.5 rounded-lg bg-[#f38788] hover:opacity-90 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2dc8ca] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
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
                  <div className="flex items-center text-sm font-semibold text-[#889260]">
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#2e2f34] mb-1">{stat.value}</h3>
                <p className="text-[#767272] text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border shadow-sm" style={{borderColor:'#c8ced1'}}>
            <div className="border-b px-6 py-4" style={{borderColor:'#c8ced1'}}>
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('volunteers')}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'volunteers' 
                      ? 'border-[#2dc8ca] text-[#2dc8ca]' 
                      : 'border-transparent text-[#767272] hover:text-[#2e2f34]'
                  }`}
                >
                  Peer Volunteers ({volunteers.length})
                </button>
                <button
                  onClick={() => setActiveTab('communities')}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'communities' 
                      ? 'border-[#2dc8ca] text-[#2dc8ca]' 
                      : 'border-transparent text-[#767272] hover:text-[#2e2f34]'
                  }`}
                >
                  Support Communities ({communities.length})
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="px-6 py-4 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between" style={{borderColor:'#c8ced1'}}>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#767272]" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                  style={{borderColor:'#c8ced1'}}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Filter className="w-4 h-4 text-[#767272]" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                  style={{borderColor:'#c8ced1'}}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="training">Training</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'volunteers' && (
                <div className="space-y-4">
                  {filteredVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{borderColor:'#c8ced1'}}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-[#2dc8ca] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {volunteer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-[#2e2f34]">{volunteer.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                volunteer.status === 'active' 
                                  ? 'bg-[#f2f7eb] text-[#889260]' 
                                  : volunteer.status === 'training'
                                  ? 'bg-[#fbecb3] text-[#eac163]'
                                  : 'bg-[#f8d7da] text-[#f38788]'
                              }`}>
                                {volunteer.status.toUpperCase()}
                              </span>
                              {volunteer.rating > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-[#eac163] fill-current" />
                                  <span className="text-sm text-[#767272]">{volunteer.rating}</span>
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#767272]">
                              <div><strong>Student ID:</strong> {volunteer.studentId}</div>
                              <div><strong>Department:</strong> {volunteer.dept}</div>
                              <div><strong>Year:</strong> {volunteer.year}</div>
                              <div><strong>Sessions:</strong> {volunteer.sessionsCompleted}</div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {volunteer.specializations.map((spec, index) => (
                                <span key={index} className="px-2 py-1 bg-[#e7f3ff] text-[#2dc8ca] rounded text-xs">
                                  {spec}
                                </span>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center space-x-4 text-xs text-[#767272]">
                              <div className="flex items-center space-x-1"><Mail className="w-3 h-3" /><span>{volunteer.email}</span></div>
                              <div className="flex items-center space-x-1"><Phone className="w-3 h-3" /><span>{volunteer.phone}</span></div>
                              <div className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Joined: {new Date(volunteer.joinedAt).toLocaleDateString()}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'communities' && (
                <div className="space-y-4">
                  {filteredCommunities.map((community) => (
                    <div key={community.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{borderColor:'#c8ced1'}}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-[#2e2f34] text-lg">{community.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              community.status === 'active' 
                                ? 'bg-[#f2f7eb] text-[#889260]' 
                                : 'bg-[#fbecb3] text-[#eac163]'
                            }`}>
                              {community.status.toUpperCase()}
                            </span>
                            {community.isAnonymous && (
                              <span className="px-2 py-1 bg-[#cdbdd4] text-white rounded-full text-xs font-medium">ANONYMOUS</span>
                            )}
                          </div>
                          <p className="text-[#767272] text-sm mb-3">{community.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div><strong className="text-[#2e2f34]">Members:</strong><span className="text-[#767272] ml-1">{community.members}</span></div>
                            <div><strong className="text-[#2e2f34]">Category:</strong><span className="text-[#767272] ml-1">{community.category}</span></div>
                            <div><strong className="text-[#2e2f34]">Rating:</strong><span className="text-[#767272] ml-1">{community.avgRating}/5.0</span></div>
                          </div>
                          <div className="mt-3">
                            <strong className="text-[#2e2f34] text-sm">Moderators:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {community.moderators.map((moderator, index) => (
                                <span key={index} className="px-2 py-1 bg-[#e7f3ff] text-[#2dc8ca] rounded text-xs">{moderator}</span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-[#767272] flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Created: {new Date(community.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><Shield className="w-4 h-4" /></button>
                          <button className="p-2 text-[#767272] hover:bg-[#f2f7eb] rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Invite Volunteer Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#2e2f34] mb-4">Invite New Peer Volunteer</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleInviteVolunteer();
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={inviteForm.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    style={{borderColor:'#c8ced1'}}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-1">Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    required
                    value={inviteForm.studentId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    style={{borderColor:'#c8ced1'}}
                    placeholder="e.g., CSE2022001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={inviteForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    style={{borderColor:'#c8ced1'}}
                    placeholder="student@college.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={inviteForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    style={{borderColor:'#c8ced1'}}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2e2f34] mb-1">Year</label>
                    <select
                      name="year"
                      required
                      value={inviteForm.year}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      style={{borderColor:'#c8ced1'}}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2e2f34] mb-1">Department</label>
                    <select
                      name="dept"
                      required
                      value={inviteForm.dept}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      style={{borderColor:'#c8ced1'}}
                    >
                      <option value="">Select Dept</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-[#c8ced1] text-[#767272] rounded-lg hover:bg-[#f2f7eb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#2dc8ca] text-white rounded-lg hover:opacity-90 transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerSupportManagement;