import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  User,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Import the new Sidebar component
import InstitutionSidebar from './InstitutionSidebar';
import { registerCounselor, fetchCounselors, clearRegistrationStatus, updateCounselorStatus, deleteCounselor } from '../store/slices/counselorSlice';

const ManageCounselors = () => {
  const dispatch = useDispatch();
  const { counselors, loading, error, registrationSuccess, registrationError } = useSelector(state => state.counselor);
  const { user, profile } = useSelector(state => state.auth);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [specializationInput, setSpecializationInput] = useState('');
  
  // Get college ID from profile
  const collegeId = profile?.college?._id;
  
  // Form state for new counselor
  const [newCounselor, setNewCounselor] = useState({
    email: '',
    password: '',
    userType: 'concellor',
    name: '',
    qualification: '',
    specialization: [],
    college: collegeId || '', // Use profile college ID
    contactEmail: '',
    contactPhone: ''
  });

  // Fetch counselors on component mount
  useEffect(() => {
    if (collegeId) {
      console.log('Fetching counselors for college:', collegeId);
      dispatch(fetchCounselors(collegeId));
    } else {
      console.log('No college ID found in profile:', profile);
    }
  }, [dispatch, collegeId, profile]);

  // Update college in form when profile changes
  useEffect(() => {
    if (collegeId) {
      setNewCounselor(prev => ({
        ...prev,
        college: collegeId
      }));
    }
  }, [collegeId]);

  // Clear registration status when modal closes
  useEffect(() => {
    if (!showAddModal) {
      dispatch(clearRegistrationStatus());
    }
  }, [showAddModal, dispatch]);

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = counselor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (Array.isArray(counselor.specialization) 
                            ? counselor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
                            : counselor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && counselor.status === 'Active') ||
                         (filterStatus === 'inactive' && counselor.status === 'Inactive');
    return matchesSearch && matchesFilter;
  });

  const handleAddSpecialization = () => {
    if (specializationInput.trim() && !newCounselor.specialization.includes(specializationInput.trim())) {
      setNewCounselor({
        ...newCounselor,
        specialization: [...newCounselor.specialization, specializationInput.trim()]
      });
      setSpecializationInput('');
    }
  };

  const handleRemoveSpecialization = (index) => {
    setNewCounselor({
      ...newCounselor,
      specialization: newCounselor.specialization.filter((_, i) => i !== index)
    });
  };

  const handleAddCounselor = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newCounselor.name || !newCounselor.email || !newCounselor.password || !newCounselor.qualification) {
      return;
    }

    // Ensure college ID is set
    if (!collegeId) {
      console.error('No college ID available');
      return;
    }

    // Set contactEmail to email if not provided
    const counselorData = {
      ...newCounselor,
      college: collegeId, // Ensure college ID is set
      contactEmail: newCounselor.contactEmail || newCounselor.email
    };

    console.log('Registering counselor with data:', counselorData);

    try {
      await dispatch(registerCounselor(counselorData)).unwrap();
      // Reset form
      setNewCounselor({
        email: '',
        password: '',
        userType: 'concellor',
        name: '',
        qualification: '',
        specialization: [],
        college: collegeId,
        contactEmail: '',
        contactPhone: ''
      });
      setShowAddModal(false);
      // Refresh counselors list
      if (collegeId) {
        dispatch(fetchCounselors(collegeId));
      }
    } catch (error) {
      console.error('Failed to register counselor:', error);
    }
  };

  const toggleCounselorStatus = async (counselor) => {
    const newStatus = counselor.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await dispatch(updateCounselorStatus({ 
        counselorId: counselor._id, 
        status: newStatus 
      })).unwrap();
    } catch (error) {
      console.error('Failed to update counselor status:', error);
    }
  };

  // Add a loading state check
  if (!collegeId && profile !== null) {
    return (
      <div className="flex min-h-screen bg-[#eaf1f5] items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2dc8ca] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#767272]">Loading college information...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-base text-[#767272]">
                  {profile?.college?.name && `Add, edit, and monitor counselors for ${profile.college.name}`}
                </p>
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
                <span className="text-white font-bold text-sm">
                  {profile?.profile?.name?.[0]?.toUpperCase() || 'A'}
                </span>
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
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.filter(c => c.status === 'Active' || c.status === undefined).length}</p>
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
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.reduce((sum, c) => sum + (c.sessionsThisMonth || 0), 0)}</p>
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
                    <p className="text-2xl font-bold text-[#2e2f34]">{counselors.filter(c => c.status === 'Active' || c.status === undefined).length}</p>
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
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${(counselor.status === 'Active' || counselor.status === undefined) ? 'bg-[#f2f7eb] text-[#889260]' : 'bg-[#fdf0f0] text-[#f38788]'}`}>{(counselor.status === 'Active' || counselor.status === undefined) ? 'Active' : 'Inactive'}</span>
                                        </div>
                                        {/* Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-[#767272]"><Mail className="w-4 h-4 mr-2" />{counselor.email || counselor.contactEmail}</div>
                                                <div className="flex items-center text-sm text-[#767272]"><Phone className="w-4 h-4 mr-2" />{counselor.contactPhone || counselor.phone}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm"><span className="font-medium text-[#2e2f34]">Qualification:</span> {counselor.qualification}</p>
                                                <p className="text-sm"><span className="font-medium text-[#2e2f34]">Specialization:</span> {
                                                  Array.isArray(counselor.specialization) 
                                                    ? counselor.specialization.join(', ')
                                                    : counselor.specialization || 'Not specified'
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => toggleCounselorStatus(counselor)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${(counselor.status === 'Active' || counselor.status === undefined) ? 'bg-[#fdf0f0] text-[#f38788] hover:bg-[#f38788] hover:text-white' : 'bg-[#f2f7eb] text-[#889260] hover:bg-[#889260] hover:text-white'}`}>{(counselor.status === 'Active' || counselor.status === undefined) ? 'Deactivate' : 'Activate'}</button>
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
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between" style={{borderColor:'#c8ced1'}}>
                    <h3 className="text-xl font-bold text-[#2e2f34]">Add New Counselor</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleAddCounselor} className="p-6 space-y-6">
                {/* Success/Error Messages */}
                {registrationSuccess && (
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Counselor registered successfully!</span>
                  </div>
                )}
                
                {registrationError && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-800">{registrationError}</span>
                </div>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#2e2f34]">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2e2f34] mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        value={newCounselor.name} 
                        onChange={(e) => setNewCounselor({...newCounselor, name: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="Dr. John Doe"
                        required
                      />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2e2f34] mb-2">Email *</label>
                      <input 
                        type="email" 
                        value={newCounselor.email} 
                        onChange={(e) => setNewCounselor({...newCounselor, email: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="counselor@viit.ac.in"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2e2f34] mb-2">Password *</label>
                      <input 
                        type="password" 
                        value={newCounselor.password} 
                        onChange={(e) => setNewCounselor({...newCounselor, password: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2e2f34] mb-2">Qualification *</label>
                      <input 
                        type="text" 
                        value={newCounselor.qualification} 
                        onChange={(e) => setNewCounselor({...newCounselor, qualification: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="M.A. Psychology"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Specialization */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#2e2f34]">Specialization</h4>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        value={specializationInput} 
                        onChange={(e) => setSpecializationInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                        className="flex-1 px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="Add specialization (e.g., Career Guidance)"
                      />
                      <button 
                        type="button"
                        onClick={handleAddSpecialization}
                        className="px-4 py-2 bg-[#2dc8ca] text-white rounded-lg hover:opacity-90"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newCounselor.specialization.map((spec, index) => (
                        <span 
                          key={index}
                          className="flex items-center space-x-1 px-3 py-1 bg-[#f2f7eb] text-[#889260] rounded-full text-sm"
                        >
                          <span>{spec}</span>
                          <button 
                            type="button"
                            onClick={() => handleRemoveSpecialization(index)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#2e2f34]">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2e2f34] mb-2">Contact Email</label>
                      <input 
                        type="email" 
                        value={newCounselor.contactEmail} 
                        onChange={(e) => setNewCounselor({...newCounselor, contactEmail: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="counselor@viit.ac.in"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2e2f34] mb-2">Contact Phone</label>
                      <input 
                        type="tel" 
                        value={newCounselor.contactPhone} 
                        onChange={(e) => setNewCounselor({...newCounselor, contactPhone: e.target.value})} 
                        className="w-full px-4 py-2 border rounded-lg" 
                        style={{borderColor:'#c8ced1'}} 
                        placeholder="+91-9999999999"
                      />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t" style={{borderColor:'#c8ced1'}}>
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)} 
                    className="px-6 py-2 border rounded-lg font-semibold text-[#767272] hover:bg-[#f2f7eb]" 
                    style={{borderColor:'#c8ced1'}}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#2dc8ca] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <span>Add Counselor</span>
                    )}
                  </button>
                </div>
              </form>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCounselors;