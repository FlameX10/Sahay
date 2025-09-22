import React, { useState } from 'react';
import { 
  Heart, Upload, FileText, CheckCircle, 
  AlertCircle, ArrowRight, ArrowLeft, Building, Mail, 
  User, GraduationCap, FileCheck, Loader2, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCollegeRegistration } from '../store/slices/collegeRegistrationSlice';

export default function InstitutionRegistration() {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const createStatus = useSelector(state => state.collegeRegistration?.createStatus);
  const createError = useSelector(state => state.collegeRegistration?.error);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Required fields
    collegeName: '',
    collegeType: '',
    domain: '',
    nameOfApplicant: '',
    designation: '',
    email: '',
    password: '',
    confirmPassword: '',

    // Document uploads (two only)
    verifiedCollegeDocument: null,
    proofOfDesignation: null,

    consent: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    verifiedCollegeDocument: null,
    proofOfDesignation: null
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Institution Details', description: 'Basic information' },
    { number: 2, title: 'Applicant & Credentials', description: 'Contact & password' },
    { number: 3, title: 'Documents', description: 'Verification files' },
    { number: 4, title: 'Review & Submit', description: 'Final confirmation' }
  ];

  const documentTypes = [
    {
      key: 'verifiedCollegeDocument',
      title: 'Verified College Document',
      description: 'Proof of college verification (PDF, JPG, PNG).',
      icon: <FileText className="w-6 h-6" />
    },
    {
      key: 'proofOfDesignation',
      title: 'Proof of Designation',
      description: 'Document proving applicant’s designation (PDF, JPG, PNG).',
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileUpload = (documentType, file) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [documentType]: file }));
      setFormData(prev => ({
        ...prev,
        [documentType]: file
      }));
      if (errors[documentType]) {
        setErrors(prev => ({ ...prev, [documentType]: null }));
      }
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required';
      if (!formData.collegeType.trim()) newErrors.collegeType = 'College type is required';
      if (!formData.domain.trim()) newErrors.domain = 'Domain/website is required';
    }
    
    if (step === 2) {
      if (!formData.nameOfApplicant.trim()) newErrors.nameOfApplicant = 'Applicant name is required';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 3) {
      documentTypes.forEach(doc => {
        if (!uploadedFiles[doc.key]) {
          newErrors[doc.key] = `${doc.title} is required`;
        }
      });
    }

    if (step === 4) {
      if (!formData.consent) {
        newErrors.consent = 'You must agree to the terms before submitting.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const multipart = new FormData();
    multipart.append('collegeName', formData.collegeName);
    multipart.append('collegeType', formData.collegeType);
    multipart.append('domain', formData.domain);
    multipart.append('nameOfApplicant', formData.nameOfApplicant);
    multipart.append('designation', formData.designation);
    multipart.append('email', formData.email);
    multipart.append('password', formData.password);
    if (formData.verifiedCollegeDocument) multipart.append('verifiedCollegeDocument', formData.verifiedCollegeDocument);
    if (formData.proofOfDesignation) multipart.append('proofOfDesignation', formData.proofOfDesignation);

    try {
      const action = await dispatch(createCollegeRegistration(multipart));
      if (createCollegeRegistration.fulfilled.match(action)) {
        alert('Your registration has been submitted successfully. Once approved, you will receive an email notification. You can now log in.');
        navigate('/login');
      }
    } catch {}
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
              currentStep >= step.number 
                ? 'bg-[#2dc8ca] text-white' 
                : 'bg-[#c8ced1] text-[#767272]'
            }`}>
              {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
            </div>
            <div className="mt-2">
              <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-[#2e2f34]' : 'text-[#767272]'}`}>
                {step.title}
              </p>
              <p className="text-xs text-[#8d949d] max-w-24 hidden md:block">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-1 rounded-full mx-2 sm:mx-4 transition-all duration-300 ${
              currentStep > step.number ? 'bg-[#2dc8ca]' : 'bg-[#c8ced1]'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <Building className="w-16 h-16 text-[#2dc8ca] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2e2f34] mb-2">Institution Details</h3>
            <p className="text-[#767272]">Provide your institution's basic information.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">Official College Name *</label>
              <input
                type="text" value={formData.collegeName} onChange={(e) => handleInputChange('collegeName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.collegeName ? 'border-red-500' : ''}`}
                style={{borderColor: errors.collegeName ? '#ef4444' : '#c8ced1'}}
                placeholder="e.g., College of Engineering, Pune" />
              {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">College Type *</label>
              <select
                value={formData.collegeType} onChange={(e) => handleInputChange('collegeType', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.collegeType ? 'border-red-500' : ''}`}
                style={{borderColor: errors.collegeType ? '#ef4444' : '#c8ced1'}}>
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Autonomous">Autonomous</option>
              </select>
              {errors.collegeType && <p className="text-red-500 text-sm mt-1">{errors.collegeType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">Domain/Website *</label>
              <input
                type="text" value={formData.domain} onChange={(e) => handleInputChange('domain', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.domain ? 'border-red-500' : ''}`}
                style={{borderColor: errors.domain ? '#ef4444' : '#c8ced1'}}
                placeholder="e.g., coep.ac.in" />
              {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
            </div>
        </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <User className="w-16 h-16 text-[#2dc8ca] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2e2f34] mb-2">Applicant Details & Credentials</h3>
            <p className="text-[#767272]">Enter applicant info and create a password.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">Full Name of Applicant *</label>
              <input
                type="text" value={formData.nameOfApplicant} onChange={(e) => handleInputChange('nameOfApplicant', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.nameOfApplicant ? 'border-red-500' : ''}`}
                style={{borderColor: errors.nameOfApplicant ? '#ef4444' : '#c8ced1'}}
                placeholder="e.g., Dr. Rajesh Kumar" />
              {errors.nameOfApplicant && <p className="text-red-500 text-sm mt-1">{errors.nameOfApplicant}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">Designation *</label>
              <input
                type="text" value={formData.designation} onChange={(e) => handleInputChange('designation', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.designation ? 'border-red-500' : ''}`}
                style={{borderColor: errors.designation ? '#ef4444' : '#c8ced1'}}
                placeholder="e.g., Dean of Student Affairs" />
              {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2e2f34] mb-2">Official Email (unique) *</label>
              <input
                type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}
                style={{borderColor: errors.email ? '#ef4444' : '#c8ced1'}}
                placeholder="e.g., principal@coep.ac.in" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="md:col-span-2 border-t pt-6 mt-2">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-2">Create Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
                    <input
                      type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}
                      style={{borderColor: errors.password ? '#ef4444' : '#c8ced1'}}
                      placeholder="Minimum 8 characters" />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2e2f34] mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
                    <input
                      type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      style={{borderColor: errors.confirmPassword ? '#ef4444' : '#c8ced1'}}
                      placeholder="Re-enter password" />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
        </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <Upload className="w-16 h-16 text-[#2dc8ca] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2e2f34] mb-2">Document Upload</h3>
            <p className="text-[#767272]">Please upload the following verification documents (PDF, JPG, PNG).</p>
        </div>
        <div className="grid gap-6">
            {documentTypes.map((doc) => (
                <div key={doc.key} className={`border-2 border-dashed rounded-lg p-6 transition-colors ${errors[doc.key] ? 'border-red-400' : ''}`} style={{borderColor: errors[doc.key] ? '#f87171' : '#c8ced1'}}>
                    <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
                        <div className="bg-[#eaf1f5] p-3 rounded-lg text-[#2dc8ca] mb-4 sm:mb-0">{doc.icon}</div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-[#2e2f34] mb-1">{doc.title} *</h4>
                            <p className="text-sm text-[#767272] mb-4">{doc.description}</p>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer">
                                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(doc.key, e.target.files[0])} className="hidden" />
                                    <div className="bg-[#2dc8ca] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center space-x-2">
                                        <Upload className="w-4 h-4" /><span>Choose File</span>
                                    </div>
                                </label>
                                {uploadedFiles[doc.key] && (
                                    <div className="flex items-center space-x-2 text-green-600">
                                        <CheckCircle className="w-4 h-4" /><span className="text-sm truncate max-w-xs">{uploadedFiles[doc.key].name}</span>
                                    </div>
                                )}
                            </div>
                            {errors[doc.key] && <p className="text-red-500 text-sm mt-2">{errors[doc.key]}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <FileCheck className="w-16 h-16 text-[#2dc8ca] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2e2f34] mb-2">Review Your Application</h3>
            <p className="text-[#767272]">Please confirm all details are correct before submitting.</p>
        </div>
        <div className="space-y-6 border rounded-lg p-6" style={{borderColor:'#c8ced1'}}>
            <div>
                <h4 className="font-semibold text-[#2e2f34] mb-4 flex items-center border-b pb-2"><Building className="w-5 h-5 mr-2 text-[#2dc8ca]" />Institution Details</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-[#767272]">College Name:</span><p className="font-medium text-[#2e2f34]">{formData.collegeName}</p></div>
                    <div><span className="text-[#767272]">Type:</span><p className="font-medium text-[#2e2f34]">{formData.collegeType}</p></div>
                    <div className="md:col-span-2"><span className="text-[#767272]">Domain:</span><p className="font-medium text-[#2e2f34]">{formData.domain}</p></div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-[#2e2f34] mb-4 flex items-center border-b pb-2"><User className="w-5 h-5 mr-2 text-[#2dc8ca]" />Applicant Details</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-[#767272]">Name:</span><p className="font-medium text-[#2e2f34]">{formData.nameOfApplicant}</p></div>
                    <div><span className="text-[#767272]">Designation:</span><p className="font-medium text-[#2e2f34]">{formData.designation}</p></div>
                    <div className="md:col-span-2"><span className="text-[#767272]">Email:</span><p className="font-medium text-[#2e2f34]">{formData.email}</p></div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-[#2e2f34] mb-4 flex items-center border-b pb-2"><FileText className="w-5 h-5 mr-2 text-[#2dc8ca]" />Uploaded Documents</h4>
                <div className="space-y-3">
                    {documentTypes.map((doc) => (
                        <div key={doc.key} className="flex items-center justify-between">
                            <span className="text-sm text-[#767272]">{doc.title}</span>
                            {uploadedFiles[doc.key] ? (
                                <div className="flex items-center space-x-2 text-green-600"><CheckCircle className="w-4 h-4" /><span className="text-sm font-medium">{uploadedFiles[doc.key].name}</span></div>
                            ) : (
                                <span className="text-red-500 text-sm font-medium">Not uploaded</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-6">
            <label className="flex items-center">
                <input type="checkbox" checked={formData.consent} onChange={(e) => handleInputChange('consent', e.target.checked)} className="h-4 w-4 text-[#2dc8ca] focus:ring-[#3d9098] rounded" style={{borderColor:'#c8ced1'}} />
                <span className="ml-2 text-sm text-[#2e2f34]">I hereby declare that the information provided is true and correct.</span>
            </label>
            {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
        </div>
    </div>
  );

  const isSubmitting = createStatus === 'loading';

  return (
    <div className="min-h-screen bg-[#eaf1f5] font-sans p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-[#3d9098] p-2 rounded-xl"><Heart className="w-8 h-8 text-white" /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#2e2f34]">Sahay</h1>
                        <p className="text-[#8d949d]">Institutional Registration</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border" style={{borderColor:'#c8ced1'}}>
                {currentStep <= 4 && renderStepIndicator()}
                <div className="mt-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                </div>
                {createError && (
                  <div className="mt-6 p-4 rounded border text-red-700 bg-red-50 flex items-start" style={{borderColor:'#fecaca'}}>
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                    <div className="text-sm">{createError?.message || 'Failed to submit. Please try again.'}</div>
                  </div>
                )}
                {currentStep <= 4 && (
                    <div className="mt-12 pt-6 border-t flex justify-between items-center">
                        <button
                            onClick={prevStep} disabled={currentStep === 1 || isSubmitting}
                            className="bg-[#c8ced1] text-[#2e2f34] px-6 py-3 rounded-lg font-semibold hover:bg-[#b7c0d0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2">
                            <ArrowLeft className="w-5 h-5" /><span>Previous</span>
                        </button>
                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep} disabled={isSubmitting}
                                className="bg-[#2dc8ca] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2">
                                <span>Next</span><ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit} disabled={isSubmitting}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center space-x-2">
                                {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>) : (<><CheckCircle className="w-5 h-5" /><span>Submit Application</span></>)}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}