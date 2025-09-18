import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserPlus,
  Menu,
  Bell,
  Heart,
  Building,
  Plus,
  Edit,
  Star,
  Clock,
  Phone,
  Mail,
  Search,
  MoreVertical,
  User
} from 'lucide-react';

// Import the new Sidebar component
import InstitutionSidebar from './InstitutionSidebar';

const ManageCounselors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock counselor data
  const [counselors, setCounselors] = useState([
    // ... (Your full counselors array)
    { id: 1, name: 'Dr. Priya Sharma', email: 'priya.sharma@abcuni.edu', phone: '+91 98765-43210', specialization: 'Anxiety & Depression', experience: '8 years', rating: 4.8, sessionsThisMonth: 42, totalSessions: 324, availability: 'Available', status: 'active', joinDate: '2022-01-15', languages: ['Hindi', 'English'], workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM', nextAvailable: 'Today 2:30 PM' },
    { id: 2, name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@abcuni.edu', phone: '+91 98765-43211', specialization: 'Academic Stress & Burnout', experience: '6 years', rating: 4.7, sessionsThisMonth: 38, totalSessions: 287, availability: 'Busy', status: 'active', joinDate: '2022-08-20', languages: ['Hindi', 'English', 'Gujarati'], workingHours: 'Mon-Sat: 10:00 AM - 6:00 PM', nextAvailable: 'Tomorrow 11:00 AM' },
    { id: 3, name: 'Dr. Meera Patel', email: 'meera.patel@abcuni.edu', phone: '+91 98765-43212', specialization: 'Relationship & Social Issues', experience: '10 years', rating: 4.9, sessionsThisMonth: 35, totalSessions: 412, availability: 'Available', status: 'active', joinDate: '2021-03-10', languages: ['Hindi', 'English', 'Marathi'], workingHours: 'Tue-Sat: 9:00 AM - 4:00 PM', nextAvailable: 'Today 4:00 PM' },
    { id: 4, name: 'Dr. Arjun Singh', email: 'arjun.singh@abcuni.edu', phone: '+91 98765-43213', specialization: 'Career Counseling', experience: '4 years', rating: 4.6, sessionsThisMonth: 28, totalSessions: 156, availability: 'Offline', status: 'inactive', joinDate: '2023-06-01', languages: ['Hindi', 'English', 'Punjabi'], workingHours: 'Mon-Fri: 11:00 AM - 7:00 PM', nextAvailable: 'On Leave' }
  ]);

  const [newCounselor, setNewCounselor] = useState({
    name: '', email: '', phone: '', specialization: '',
    experience: '', languages: [], workingHours: ''
  });

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          counselor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || counselor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddCounselor = () => {
    if (newCounselor.name && newCounselor.email) {
      const counselor = {
        id: counselors.length + 1, ...newCounselor, rating: 0,
        sessionsThisMonth: 0, totalSessions: 0, availability: 'Available',
        status: 'active', joinDate: new Date().toISOString().split('T')[0],
        nextAvailable: 'Available Now'
      };
      setCounselors([...counselors, counselor]);
      setNewCounselor({
        name: '', email: '', phone: '', specialization: '',
        experience: '', languages: [], workingHours: ''
      });
      setShowAddModal(false);
    }
  };

  const toggleCounselorStatus = (id) => {
    setCounselors(counselors.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  return (
    <div className="flex min-h-screen bg-[#eaf1f5]">
      {/* Sidebar Component */}
      <InstitutionSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
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
                <h2 className="text-2xl font-bold text-[#2e2f34]">Manage Counselors</h2>
                <p className="text-base text-[#767272]">Add, edit, and monitor counselor availability</p>
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
            {/* Stats Cards and other content remains the same */}
            {/* ... Paste the <main> content from your original file here ... */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#2dc8ca] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.filter(c => c.status === 'active').length}</p>
                    <p className="text-sm text-[#767272]">Active Counselors</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#889260] rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.reduce((sum, c) => sum + c.sessionsThisMonth, 0)}</p>
                    <p className="text-sm text-[#767272]">Sessions This Month</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f99c5b] rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2e2f34]">4.7</p>
                    <p className="text-sm text-[#767272]">Average Rating</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border" style={{borderColor:'#c8ced1'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#cdbdd4] rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.filter(c => c.availability === 'Available').length}</p>
                    <p className="text-sm text-[#767272]">Available Now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8d949d] w-5 h-5" />
                  <input type="text" placeholder="Search counselors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-64" style={{borderColor:'#c8ced1'}}/>
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg text-[#767272]" style={{borderColor:'#c8ced1'}}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-[#2dc8ca] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Add Counselor
              </button>
            </div>

            {/* Counselors List */}
            <div className="bg-white rounded-xl border shadow-sm" style={{borderColor:'#c8ced1'}}>
                {/* List Content */}
                <div className="p-6 border-b" style={{borderColor:'#c8ced1'}}>
                    <h3 className="text-lg font-bold text-[#2e2f34]">All Counselors ({filteredCounselors.length})</h3>
                </div>
                <div className="divide-y" style={{borderColor:'#c8ced1'}}>
                    {filteredCounselors.map((counselor) => (
                        <div key={counselor.id} className="p-6">
                            {/* ... counselor item JSX ... */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <div className="w-14 h-14 bg-[#cdbdd4] rounded-lg flex items-center justify-center"><User className="w-7 h-7 text-white" /></div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h4 className="text-lg font-semibold text-[#2e2f34]">{counselor.name}</h4>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${counselor.status === 'active' ? 'bg-[#f2f7eb] text-[#889260]' : 'bg-[#fdf0f0] text-[#f38788]'}`}>{counselor.status === 'active' ? 'Active' : 'Inactive'}</span>
                                        </div>
                                        {/* Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-[#767272]"><Mail className="w-4 h-4 mr-2" />{counselor.email}</div>
                                                <div className="flex items-center text-sm text-[#767272]"><Phone className="w-4 h-4 mr-2" />{counselor.phone}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm"><span className="font-medium text-[#2e2f34]">Specialization:</span> {counselor.specialization}</p>
                                                <p className="text-sm"><span className="font-medium text-[#2e2f34]">Experience:</span> {counselor.experience}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => toggleCounselorStatus(counselor.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${counselor.status === 'active' ? 'bg-[#fdf0f0] text-[#f38788] hover:bg-[#f38788] hover:text-white' : 'bg-[#f2f7eb] text-[#889260] hover:bg-[#889260] hover:text-white'}`}>{counselor.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                                    <button className="p-2 text-[#767272] hover:text-[#2e2f34] hover:bg-[#f2f7eb] rounded-lg"><Edit className="w-5 h-5" /></button>
                                    <button className="p-2 text-[#767272] hover:text-[#2e2f34] hover:bg-[#f2f7eb] rounded-lg"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>

        {/* Add Counselor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              {/* ... modal content ... */}
              <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b" style={{borderColor:'#c8ced1'}}>
                    <h3 className="text-xl font-bold text-[#2e2f34]">Add New Counselor</h3>
                </div>
                <div className="p-6 space-y-4">
                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2e2f34] mb-2">Full Name *</label>
                            <input type="text" value={newCounselor.name} onChange={(e) => setNewCounselor({...newCounselor, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" style={{borderColor:'#c8ced1'}} placeholder="Dr. John Doe"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2e2f34] mb-2">Email *</label>
                            <input type="email" value={newCounselor.email} onChange={(e) => setNewCounselor({...newCounselor, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" style={{borderColor:'#c8ced1'}} placeholder="john.doe@abcuni.edu"/>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t flex justify-end space-x-4" style={{borderColor:'#c8ced1'}}>
                    <button onClick={() => setShowAddModal(false)} className="px-6 py-2 border rounded-lg font-semibold text-[#767272] hover:bg-[#f2f7eb]" style={{borderColor:'#c8ced1'}}>Cancel</button>
                    <button onClick={handleAddCounselor} className="px-6 py-2 bg-[#2dc8ca] text-white rounded-lg font-semibold hover:opacity-90">Add Counselor</button>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCounselors;