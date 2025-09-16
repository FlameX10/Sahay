import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, User, Lock, Upload, CheckCircle, 
  Mail, Building, Loader2, AlertCircle, UserPlus
} from 'lucide-react';

// Mock function to simulate fetching verified colleges
const fetchVerifiedColleges = async (query) => {
    const allColleges = [
        { id: 'coep', name: 'College of Engineering, Pune', domain: 'coep.ac.in' },
        { id: 'vit', name: 'Vishwakarma Institute of Technology', domain: 'vit.edu' },
        { id: 'sppu', name: 'Savitribai Phule Pune University', domain: 'unipune.ac.in' },
        { id: 'mit', name: 'MIT World Peace University', domain: 'mitwpu.edu.in' }
    ];
    if (!query) return [];
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return allColleges.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
};

export default function StudentRegistrationSinglePage() {
  const [collegeQuery, setCollegeQuery] = useState('');
  const [collegeResults, setCollegeResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    collegeId: '',
    studentId: '',
    course: '',
    yearOfStudy: '',
    fullName: '',
    personalEmail: '',
    collegeEmail: '',
    password: '',
    confirmPassword: '',
    consent: false,
    idCard: null
  });

  const [idCardFile, setIdCardFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (collegeQuery.length > 2 && !selectedCollege) {
      setIsSearching(true);
      const search = async () => {
        const results = await fetchVerifiedColleges(collegeQuery);
        setCollegeResults(results);
        setIsSearching(false);
      };
      search();
    } else {
      setCollegeResults([]);
    }
  }, [collegeQuery, selectedCollege]);

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
    setFormData(prev => ({ ...prev, collegeId: college.id }));
    setCollegeQuery(college.name);
    setCollegeResults([]);
    if(errors.college) setErrors(prev => ({...prev, college: null}));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const handleFileUpload = (file) => {
    if (file) {
      setIdCardFile(file);
      setFormData(prev => ({ ...prev, idCard: file }));
      if(errors.idCard || errors.collegeEmail) {
        setErrors(prev => ({ ...prev, idCard: null, collegeEmail: null }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Academic Info
    if (!selectedCollege) newErrors.college = 'Please select your institution from the list.';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student/Roll Number is required.';
    if (!formData.course.trim()) newErrors.course = 'Course/Branch is required.';
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Please select your year of study.';
    
    // Personal & Verification
    if (!formData.fullName.trim()) newErrors.fullName = 'Your full name is required.';
    if (!formData.collegeEmail.trim() && !idCardFile) {
        newErrors.verification = 'Either college email or ID card upload is required for verification.';
    }
    if (selectedCollege && formData.collegeEmail && !formData.collegeEmail.endsWith(selectedCollege.domain)) {
        newErrors.collegeEmail = `Email must end with @${selectedCollege.domain}`;
    }
    if (!formData.personalEmail.trim()) {
        newErrors.personalEmail = 'Personal email is required for recovery.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalEmail)) {
        newErrors.personalEmail = 'Please enter a valid email address.';
    }

    // Account Creation
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.consent) newErrors.consent = 'You must agree to the terms and privacy policy.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      console.log("Submitting Student Data:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
    } else {
      console.log("Validation Failed", errors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">
              {formData.collegeEmail ? 
              `A verification link has been sent to ${formData.collegeEmail}. Please check your inbox.` : 
              `Your application has been submitted. We will verify your ID card and notify you at ${formData.personalEmail} within 24 hours.`
              }
          </p>
          <a href="/login" className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300 w-full block">
              Proceed to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
            <p className="text-gray-500">Create your Sahay account for anonymous mental wellness support.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* --- Academic Information Section --- */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b pb-4">
                    <GraduationCap className="w-8 h-8 text-[#44679F]" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Academic Information</h3>
                        <p className="text-sm text-gray-500">Start by identifying your institution and course.</p>
                    </div>
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search for your Institution *</label>
                    <input
                        type="text"
                        value={collegeQuery}
                        onChange={(e) => {
                            setCollegeQuery(e.target.value);
                            setSelectedCollege(null);
                            setFormData(prev => ({ ...prev, collegeId: '' }));
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.college ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Start typing your college name..."
                    />
                    {isSearching && <Loader2 className="absolute right-3 top-10 w-5 h-5 text-gray-400 animate-spin" />}
                    {collegeResults.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                            {collegeResults.map(college => (
                                <li key={college.id} onClick={() => handleCollegeSelect(college)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    {college.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student ID / Roll Number *</label>
                        <input type="text" value={formData.studentId} onChange={(e) => handleInputChange('studentId', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.studentId ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g., 11223344"
                        />
                         {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course / Branch *</label>
                         <input type="text" value={formData.course} onChange={(e) => handleInputChange('course', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="e.g., Computer Engineering"
                        />
                        {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                    </div>
                    <div className='md:col-span-2'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                        <select value={formData.yearOfStudy} onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Year</option>
                            <option value="1">First Year</option><option value="2">Second Year</option><option value="3">Third Year</option><option value="4">Fourth Year</option><option value="5">Fifth Year (or higher)</option>
                        </select>
                        {errors.yearOfStudy && <p className="text-red-500 text-sm mt-1">{errors.yearOfStudy}</p>}
                    </div>
                </div>
            </div>

            {/* --- Personal & Verification Section --- */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b pb-4">
                    <User className="w-8 h-8 text-[#44679F]" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Personal & Verification Details</h3>
                        <p className="text-sm text-gray-500">Provide your details and verify your student status.</p>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="As per your college records"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Verification Method *</h4>
                    <p className="text-sm text-gray-600 mb-4">For instant verification, use your official college email. If unavailable, upload your ID card.</p>
                    {errors.verification && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-lg">{errors.verification}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Official College Email</label>
                        <input type="email" value={formData.collegeEmail} onChange={(e) => handleInputChange('collegeEmail', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.collegeEmail ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder={selectedCollege ? `e.g., yourname@${selectedCollege.domain}` : 'Select a college first'}
                            disabled={!selectedCollege}
                        />
                        {errors.collegeEmail && <p className="text-red-500 text-sm mt-1">{errors.collegeEmail}</p>}
                    </div>
                    <div className="flex items-center my-4"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload College ID Card</label>
                        <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${idCardFile ? 'border-green-500' : 'border-gray-300'}`}>
                          <div className="flex items-center space-x-4">
                              <label className="cursor-pointer">
                                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e.target.files[0])} className="hidden" />
                                  <div className="bg-[#44679F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3B577D] transition-colors flex items-center space-x-2">
                                      <Upload className="w-4 h-4" /><span>Choose File</span>
                                  </div>
                              </label>
                              {idCardFile && <div className="flex items-center space-x-2 text-green-600"><CheckCircle className="w-4 h-4" /><span className="text-sm truncate max-w-xs">{idCardFile.name}</span></div>}
                          </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email Address *</label>
                    <input type="email" value={formData.personalEmail} onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.personalEmail ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="For account recovery"
                    />
                    {errors.personalEmail && <p className="text-red-500 text-sm mt-1">{errors.personalEmail}</p>}
                </div>
            </div>

            {/* --- Account Creation Section --- */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b pb-4">
                    <Lock className="w-8 h-8 text-[#44679F]" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Create Your Account</h3>
                        <p className="text-sm text-gray-500">Set a secure password for your Sahay account.</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                        <input type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Minimum 8 characters"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                        <input type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Re-enter your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <div>
                    <label className="flex items-start">
                        <input type="checkbox" checked={formData.consent} onChange={(e) => handleInputChange('consent', e.target.checked)}
                            className="h-4 w-4 mt-1 text-[#44679F] focus:ring-[#3B577D] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">I agree to the <a href="/terms" target="_blank" className="font-medium text-[#44679F] hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="font-medium text-[#44679F] hover:underline">Privacy Policy</a>. *</span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                </div>
            </div>

            <div className="pt-6 border-t">
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-600 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center justify-center space-x-3"
              >
                  {isSubmitting ? (
                      <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Creating Account...</span>
                      </>
                  ) : (
                       <>
                          <UserPlus className="w-6 h-6" />
                          <span>Create My Sahay Account</span>
                      </>
                  )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}