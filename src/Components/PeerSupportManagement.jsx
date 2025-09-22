import React, { useState } from 'react';
import { Users, UserPlus, Star, Mail, Phone, Clock } from 'lucide-react';
import InstitutionSidebar from './InstitutionSidebar';

const PeerSupportManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [assigningPeer, setAssigningPeer] = useState(null);

  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Mock data for peer volunteers
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya.sharma@college.edu',
      status: 'active',
      joinedAt: '2024-08-15',
      sessionsCompleted: 24,
      rating: 4.8,
      specializations: ['Academic Stress', 'Social Anxiety'],
      phone: '+91 98765 43210',
      assignedStudents: []
    }
  ]);

  // Mock students to assign peers
  const students = [
    { id: 1, name: 'Aarav Singh' },
    { id: 2, name: 'Anika Sharma' },
    { id: 3, name: 'Rohan Mehta' },
    { id: 4, name: 'Sanya Patel' },
    { id: 5, name: 'Vivaan Kumar' },
    { id: 6, name: 'Ishita Rao' },
    { id: 7, name: 'Aditya Joshi' },
    { id: 8, name: 'Diya Singh' },
    { id: 9, name: 'Kabir Khan' },
    { id: 10, name: 'Tara Gupta' }
  ];

  const stats = [
    {
      title: 'Active Volunteers',
      value: volunteers.filter(v => v.status === 'active').length.toString(),
      change: '+15%',
      icon: Users,
      bgColor: 'bg-[#2dc8ca]'
    },
    {
      title: 'Monthly Sessions',
      value: '156',
      change: '+18%',
      icon: Star,
      bgColor: 'bg-[#f99c5b]'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteForm(prev => ({ ...prev, [name]: value }));
  };

  const handleInviteVolunteer = () => {
    const { name, email, phone } = inviteForm;
    if (!name || !email || !phone) {
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
      specializations: [],
      assignedStudents: []
    };

    setVolunteers([...volunteers, newVolunteer]);
    setInviteForm({ name: '', email: '', phone: '' });
    setShowInviteModal(false);
    setAssigningPeer(newVolunteer);
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || volunteer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Assign student to volunteer
  const assignStudent = (volunteerId, studentId) => {
    const student = students.find(s => s.id.toString() === studentId);
    setVolunteers(prev =>
      prev.map(v =>
        v.id === volunteerId
          ? { ...v, assignedStudents: [...v.assignedStudents, student] }
          : v
      )
    );
    setAssigningPeer(null);
  };

  return (
    <div className="flex min-h-screen bg-[#eaf1f5]">
      <InstitutionSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30" style={{borderColor:'#c8ced1'}}>
          <div className="px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-bold text-[#2e2f34]">Peer Support Management</h2>
                <p className="text-base text-[#767272]">Manage volunteers and assign them to students</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#2dc8ca] text-white rounded-lg hover:opacity-90 transition flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Volunteer</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Volunteers List */}
          <div className="bg-white rounded-xl border shadow-sm p-6" style={{borderColor:'#c8ced1'}}>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-semibold text-lg text-[#2e2f34]">Peer Volunteers ({volunteers.length})</h3>
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm"
              />
            </div>
            <div className="space-y-4">
              {filteredVolunteers.map(volunteer => (
                <div key={volunteer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{borderColor:'#c8ced1'}}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#2dc8ca] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {volunteer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-[#2e2f34]">{volunteer.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            volunteer.status === 'active' 
                              ? 'bg-[#f2f7eb] text-[#889260]' 
                              : 'bg-[#fbecb3] text-[#eac163]'
                          }`}>{volunteer.status.toUpperCase()}</span>
                          {volunteer.rating > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-[#eac163] fill-current" />
                              <span className="text-sm text-[#767272]">{volunteer.rating}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex items-center space-x-4 text-xs text-[#767272]">
                          <div className="flex items-center space-x-1"><Mail className="w-3 h-3" /><span>{volunteer.email}</span></div>
                          <div className="flex items-center space-x-1"><Phone className="w-3 h-3" /><span>{volunteer.phone}</span></div>
                          <div className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Joined: {new Date(volunteer.joinedAt).toLocaleDateString()}</span></div>
                        </div>

                        {/* Assigned Students */}
                        {volunteer.assignedStudents.length > 0 && (
                          <div className="mt-3 text-sm">
                            <strong>Assigned Students:</strong>
                            <ul className="list-disc list-inside">
                              {volunteer.assignedStudents.map(s => (
                                <li key={s.id}>{s.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Invite Volunteer Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold text-[#2e2f34] mb-4">Invite New Peer Volunteer</h3>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowInviteModal(false)}>×</button>
            <form onSubmit={(e) => { e.preventDefault(); handleInviteVolunteer(); }}>
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={inviteForm.name} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
                <input type="email" name="email" placeholder="Email" value={inviteForm.email} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
                <input type="text" name="phone" placeholder="Phone" value={inviteForm.phone} onChange={handleInputChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div className="flex space-x-3 mt-6">
                <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 px-4 py-2 border border-[#c8ced1] rounded-lg hover:bg-[#f2f7eb]">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#2dc8ca] text-white rounded-lg hover:opacity-90">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Peer to Student Modal */}
      {assigningPeer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold text-[#2e2f34] mb-4">Assign {assigningPeer.name} to Student</h3>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setAssigningPeer(null)}>×</button>
            <select className="w-full border rounded px-3 py-2 mb-4" defaultValue="" onChange={(e) => {
              const studentId = e.target.value;
              if (studentId) assignStudent(assigningPeer.id, studentId);
            }}>
              <option value="" disabled>Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
            <button className="w-full bg-gray-300 py-2 rounded hover:opacity-90" onClick={() => setAssigningPeer(null)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PeerSupportManagement;
