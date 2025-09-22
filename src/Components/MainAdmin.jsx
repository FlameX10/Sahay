// import React, { useState } from 'react';
// import { Check, X, Eye, MapPin, Users, Calendar, Filter, Search } from 'lucide-react';

// const CollegeAdminDashboard = () => {
//   const [colleges, setColleges] = useState([
//     {
//       id: 1,
//       name: "St. Xavier's College",
//       location: "Mumbai, Maharashtra",
//       type: "Private",
//       established: "1869",
//       students: "12,000+",
//       courses: "Arts, Science, Commerce",
//       status: "pending",
//       appliedDate: "2024-09-20",
//       contact: "admin@xaviers.edu",
//       description: "Premier autonomous college affiliated with University of Mumbai"
//     },
//     {
//       id: 2,
//       name: "Delhi University",
//       location: "New Delhi, Delhi",
//       type: "Public",
//       established: "1922",
//       students: "132,000+",
//       courses: "All Disciplines",
//       status: "pending",
//       appliedDate: "2024-09-19",
//       contact: "registrar@du.ac.in",
//       description: "Central university offering undergraduate and postgraduate programs"
//     },
//     {
//       id: 3,
//       name: "Indian Institute of Technology",
//       location: "Chennai, Tamil Nadu",
//       type: "Public",
//       established: "1959",
//       students: "10,000+",
//       courses: "Engineering, Technology",
//       status: "pending",
//       appliedDate: "2024-09-18",
//       contact: "dean@iitm.ac.in",
//       description: "Premier engineering and technology institute"
//     },
//     {
//       id: 4,
//       name: "Christ University",
//       location: "Bangalore, Karnataka",
//       type: "Private",
//       established: "1969",
//       students: "20,000+",
//       courses: "Multi-disciplinary",
//       status: "approved",
//       appliedDate: "2024-09-15",
//       contact: "info@christuniversity.in",
//       description: "Deemed university known for quality education"
//     },
//     {
//       id: 5,
//       name: "Jadavpur University",
//       location: "Kolkata, West Bengal",
//       type: "Public",
//       established: "1955",
//       students: "15,000+",
//       courses: "Engineering, Arts, Science",
//       status: "rejected",
//       appliedDate: "2024-09-14",
//       contact: "registrar@jaduniv.edu.in",
//       description: "State university known for engineering and liberal arts"
//     }
//   ]);

//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleApprove = (id) => {
//     setColleges(colleges.map(college => 
//       college.id === id ? { ...college, status: 'approved' } : college
//     ));
//   };

//   const handleReject = (id) => {
//     setColleges(colleges.map(college => 
//       college.id === id ? { ...college, status: 'rejected' } : college
//     ));
//   };

//   const filteredColleges = colleges.filter(college => {
//     const matchesFilter = filter === 'all' || college.status === filter;
//     const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'approved': return 'bg-green-100 text-green-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const pendingCount = colleges.filter(c => c.status === 'pending').length;
//   const approvedCount = colleges.filter(c => c.status === 'approved').length;
//   const rejectedCount = colleges.filter(c => c.status === 'rejected').length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">A</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">College Approval System</h1>
//                 <p className="text-sm text-gray-500">Manage college registration requests</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900">Admin Dashboard</p>
//                 <p className="text-xs text-gray-500">Tuesday, Sep 23 2:17 AM</p>
//               </div>
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold">A</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Stats Cards */}
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Total Applications</p>
//                 <p className="text-3xl font-bold text-gray-900">{colleges.length}</p>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Pending Review</p>
//                 <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Approved</p>
//                 <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <Check className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Rejected</p>
//                 <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
//               </div>
//               <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                 <X className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//             <div className="flex items-center space-x-4">
//               <Filter className="w-5 h-5 text-gray-400" />
//               <select 
//                 value={filter} 
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               >
//                 <option value="all">All Applications</option>
//                 <option value="pending">Pending Review</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>
            
//             <div className="relative">
//               <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search colleges..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-80"
//               />
//             </div>
//           </div>
//         </div>

//         {/* College List */}
//         <div className="space-y-4">
//           {filteredColleges.map((college) => (
//             <div key={college.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900">{college.name}</h3>
//                       <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           {college.location}
//                         </div>
//                         <span>•</span>
//                         <span>{college.type}</span>
//                         <span>•</span>
//                         <span>Est. {college.established}</span>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(college.status)}`}>
//                       {college.status.charAt(0).toUpperCase() + college.status.slice(1)}
//                     </span>
//                   </div>
                  
//                   <p className="text-gray-600 mb-3">{college.description}</p>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <span className="font-medium text-gray-700">Students:</span>
//                       <span className="ml-2 text-gray-600">{college.students}</span>
//                     </div>
//                     <div>
//                       <span className="font-medium text-gray-700">Courses:</span>
//                       <span className="ml-2 text-gray-600">{college.courses}</span>
//                     </div>
//                     <div>
//                       <span className="font-medium text-gray-700">Applied:</span>
//                       <span className="ml-2 text-gray-600">{college.appliedDate}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-3 lg:ml-6">
//                   <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
//                     <Eye className="w-4 h-4 mr-2" />
//                     View Details
//                   </button>
                  
//                   {college.status === 'pending' && (
//                     <>
//                       <button 
//                         onClick={() => handleReject(college.id)}
//                         className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                       >
//                         <X className="w-4 h-4 mr-2" />
//                         Reject
//                       </button>
//                       <button 
//                         onClick={() => handleApprove(college.id)}
//                         className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                       >
//                         <Check className="w-4 h-4 mr-2" />
//                         Approve
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredColleges.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
//             <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CollegeAdminDashboard;
import React, { useState } from 'react';
import { Check, X, Eye, MapPin, Users, Calendar, Filter, Search, FileText, Globe, Mail, User } from 'lucide-react';

const CollegeAdminDashboard = () => {
  const [colleges, setColleges] = useState([
    {
      id: 1,
      collegeName: "St. Xavier's College",
      collegeType: "Private",
      domain: "www.xaviers.edu",
      nameOfApplicant: "Dr. Rajesh Kumar",
      designation: "Principal",
      verifiedCollegeDocument: "college_verification_001.pdf",
      proofOfDesignation: "appointment_letter_001.pdf",
      email: "principal@xaviers.edu",
      password: "********",
      status: "pending",
      appliedDate: "2024-09-20",
      location: "Mumbai, Maharashtra"
    },
    {
      id: 2,
      collegeName: "Delhi University",
      collegeType: "Government",
      domain: "www.du.ac.in",
      nameOfApplicant: "Prof. Meera Sharma",
      designation: "Registrar",
      verifiedCollegeDocument: "du_verification_002.pdf",
      proofOfDesignation: "registrar_appointment_002.pdf",
      email: "registrar@du.ac.in",
      password: "********",
      status: "pending",
      appliedDate: "2024-09-19",
      location: "New Delhi, Delhi"
    },
    {
      id: 3,
      collegeName: "Indian Institute of Technology",
      collegeType: "Autonomous",
      domain: "www.iitm.ac.in",
      nameOfApplicant: "Dr. Anil Krishnan",
      designation: "Dean Academic Affairs",
      verifiedCollegeDocument: "iit_verification_003.pdf",
      proofOfDesignation: "dean_appointment_003.pdf",
      email: "dean@iitm.ac.in",
      password: "********",
      status: "pending",
      appliedDate: "2024-09-18",
      location: "Chennai, Tamil Nadu"
    },
    {
      id: 4,
      collegeName: "Christ University",
      collegeType: "Private",
      domain: "www.christuniversity.in",
      nameOfApplicant: "Dr. Sarah Thomas",
      designation: "Vice Chancellor",
      verifiedCollegeDocument: "christ_verification_004.pdf",
      proofOfDesignation: "vc_appointment_004.pdf",
      email: "vc@christuniversity.in",
      password: "********",
      status: "approved",
      appliedDate: "2024-09-15",
      location: "Bangalore, Karnataka"
    },
    {
      id: 5,
      collegeName: "Jadavpur University",
      collegeType: "Government",
      domain: "www.jaduniv.edu.in",
      nameOfApplicant: "Prof. Sunil Banerjee",
      designation: "Pro-Vice Chancellor",
      verifiedCollegeDocument: "ju_verification_005.pdf",
      proofOfDesignation: "pvc_appointment_005.pdf",
      email: "pvc@jaduniv.edu.in",
      password: "********",
      status: "rejected",
      appliedDate: "2024-09-14",
      location: "Kolkata, West Bengal"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id) => {
    setColleges(colleges.map(college => 
      college.id === id ? { ...college, status: 'approved' } : college
    ));
  };

  const handleReject = (id) => {
    setColleges(colleges.map(college => 
      college.id === id ? { ...college, status: 'rejected' } : college
    ));
  };

  const filteredColleges = colleges.filter(college => {
    const matchesFilter = filter === 'all' || college.status === filter;
    const matchesSearch = college.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.nameOfApplicant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = colleges.filter(c => c.status === 'pending').length;
  const approvedCount = colleges.filter(c => c.status === 'approved').length;
  const rejectedCount = colleges.filter(c => c.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">College Approval System</h1>
                <p className="text-sm text-gray-500">Manage college registration requests</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Dashboard</p>
                <p className="text-xs text-gray-500">Tuesday, Sep 23 2:17 AM</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{colleges.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-80"
              />
            </div>
          </div>
        </div>

        {/* College List */}
        <div className="space-y-4">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{college.collegeName}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {college.location}
                          </div>
                          <span>•</span>
                          <span>{college.collegeType}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {college.domain}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(college.status)}`}>
                        {college.status.charAt(0).toUpperCase() + college.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Applicant Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    Applicant Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Full Name:</span>
                      <p className="text-gray-900">{college.nameOfApplicant}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Designation:</span>
                      <p className="text-gray-900">{college.designation}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Email:</span>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        <p className="text-gray-900">{college.email}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Applied Date:</span>
                      <p className="text-gray-900">{college.appliedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Submitted Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                      <div>
                        <span className="text-sm font-medium text-gray-700">College Verification</span>
                        <p className="text-xs text-gray-500">{college.verifiedCollegeDocument}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-blue-200">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Designation Proof</span>
                        <p className="text-xs text-gray-500">{college.proofOfDesignation}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Application ID: #{college.id.toString().padStart(4, '0')}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Details
                    </button>
                    
                    {college.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleReject(college.id)}
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                        <button 
                          onClick={() => handleApprove(college.id)}
                          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                      </>
                    )}
                    
                    {college.status === 'approved' && (
                      <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                        <Check className="w-4 h-4 mr-2" />
                        Approved Application
                      </div>
                    )}
                    
                    {college.status === 'rejected' && (
                      <div className="flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg">
                        <X className="w-4 h-4 mr-2" />
                        Rejected Application
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeAdminDashboard;