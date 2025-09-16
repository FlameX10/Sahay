import React, { useState } from 'react';
import { 
  Heart, Shield, Users, Upload, FileText, CheckCircle, 
  AlertCircle, ArrowRight, ArrowLeft, Building, Mail, Phone, 
  User, GraduationCap, Award, CreditCard, FileCheck, MessageCircle, Loader2, Lock
} from 'lucide-react';

export default function InstitutionRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Part A: Basic Information
    collegeName: '',
    collegeAddress: '',
    city: '',
    state: '',
    pincode: '',
    nodalOfficerName: '',
    nodalOfficerDesignation: '',
    nodalOfficerPhone: '',
    officialEmail: '',
    password: '',         // ADDED: Password state
    confirmPassword: '',  // ADDED: Confirm Password state
    
    // Document uploads
    documents: {
      letterOfRequest: null,
      affiliationCertificate: null,
      regulatoryApproval: null,
      gstCertificate: null
    },
    consent: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    letterOfRequest: null,
    affiliationCertificate: null,
    regulatoryApproval: null,
    gstCertificate: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Institution Details', description: 'Basic information' },
    { number: 2, title: 'Nodal Officer', description: 'Contact & Credentials' }, // CHANGED description
    { number: 3, title: 'Document Upload', description: 'Verification files' },
    { number: 4, title: 'Review & Submit', description: 'Final confirmation' }
  ];

  const documentTypes = [
    {
      key: 'letterOfRequest',
      title: 'Letter of Request',
      description: 'On official college letterhead, signed and stamped by Principal/Dean',
      icon: <FileText className="w-6 h-6" />
    },
    {
      key: 'affiliationCertificate',
      title: 'Affiliation Certificate',
      description: 'From your parent university (e.g., Savitribai Phule Pune University)',
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      key: 'regulatoryApproval',
      title: 'Regulatory Approval',
      description: 'Proof of approval from UGC, AICTE, or relevant regulatory body',
      icon: <Award className="w-6 h-6" />
    },
    {
      key: 'gstCertificate',
      title: 'GST Certificate / PAN Card',
      description: 'Tax registration documents of the institution',
      icon: <CreditCard className="w-6 h-6" />
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
        documents: { ...prev.documents, [documentType]: file }
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
      if (!formData.collegeAddress.trim()) newErrors.collegeAddress = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    
    // --- CHANGED: Added password validation ---
    if (step === 2) {
      if (!formData.nodalOfficerName.trim()) newErrors.nodalOfficerName = 'Nodal officer name is required';
      if (!formData.nodalOfficerDesignation.trim()) newErrors.nodalOfficerDesignation = 'Designation is required';
      if (!formData.nodalOfficerPhone.trim()) newErrors.nodalOfficerPhone = 'Phone number is required';
      else if (!/^\+?[1-9][0-9]{7,14}$/.test(formData.nodalOfficerPhone)) newErrors.nodalOfficerPhone = 'Enter a valid phone number';

      if (!formData.officialEmail.trim()) {
        newErrors.officialEmail = 'Official email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail) || formData.officialEmail.includes('@gmail.') || formData.officialEmail.includes('@yahoo.')) {
        newErrors.officialEmail = 'Must be an official domain email (not Gmail/Yahoo)';
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
    if (validateStep(4)) {
      setIsSubmitting(true);
      // Create a copy of formData and remove password fields for security before logging
      const secureFormData = { ...formData };
      delete secureFormData.password;
      delete secureFormData.confirmPassword;
      console.log("Submitting Form Data:", secureFormData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setCurrentStep(5);
    }
  };

  // --- Step Indicator, Step 1, Step 3, Step 4, and Success renderers remain the same ---
  // (Code for those functions is omitted for brevity but should be kept from the previous version)

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
              currentStep >= step.number 
                ? 'bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
            </div>
            <div className="mt-2">
              <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-[#44679F]' : 'text-gray-500'}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-400 max-w-24 hidden md:block">
                {step.description}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 sm:w-16 h-1 rounded-full mx-2 sm:mx-4 transition-all duration-300 ${
              currentStep > step.number ? 'bg-gradient-to-r from-[#44679F] to-[#3B577D]' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <Building className="w-16 h-16 text-[#44679F] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Institution Details</h3>
            <p className="text-gray-600">Please provide your institution's official information.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Official College Name *</label>
            <input
                type="text" value={formData.collegeName} onChange={(e) => handleInputChange('collegeName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.collegeName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., College of Engineering, Pune" />
            {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
            </div>
            <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
            <textarea
                value={formData.collegeAddress} onChange={(e) => handleInputChange('collegeAddress', e.target.value)}
                rows="3"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.collegeAddress ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Street address, landmark, area" />
            {errors.collegeAddress && <p className="text-red-500 text-sm mt-1">{errors.collegeAddress}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
                type="text" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Pune" />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <select
                value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Other">Other</option>
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
            <input
                type="text" value={formData.pincode} onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 411005" maxLength="6" />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
        </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="text-center mb-8">
            <User className="w-16 h-16 text-[#44679F] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nodal Officer Details & Credentials</h3>
            <p className="text-gray-600">Enter the contact person's details and create their login password.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* --- Existing Nodal Officer Fields --- */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
                type="text" value={formData.nodalOfficerName} onChange={(e) => handleInputChange('nodalOfficerName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.nodalOfficerName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Dr. Rajesh Kumar" />
            {errors.nodalOfficerName && <p className="text-red-500 text-sm mt-1">{errors.nodalOfficerName}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
            <input
                type="text" value={formData.nodalOfficerDesignation} onChange={(e) => handleInputChange('nodalOfficerDesignation', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.nodalOfficerDesignation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Dean of Student Affairs" />
            {errors.nodalOfficerDesignation && <p className="text-red-500 text-sm mt-1">{errors.nodalOfficerDesignation}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
            <input
                type="tel" value={formData.nodalOfficerPhone} onChange={(e) => handleInputChange('nodalOfficerPhone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.nodalOfficerPhone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., +919876543210" />
            {errors.nodalOfficerPhone && <p className="text-red-500 text-sm mt-1">{errors.nodalOfficerPhone}</p>}
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Official College Email *</label>
            <input
                type="email" value={formData.officialEmail} onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.officialEmail ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., principal@coep.ac.in" />
            {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
            </div>
            
            {/* --- ADDED: Password Fields --- */}
            <div className="md:col-span-2 border-t pt-6 mt-2">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Create Password *</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Minimum 8 characters" />
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#44679F] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
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
            <Upload className="w-16 h-16 text-[#44679F] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h3>
            <p className="text-gray-600">Please upload the following verification documents (PDF, JPG, PNG).</p>
        </div>
        <div className="grid gap-6">
            {documentTypes.map((doc) => (
                <div key={doc.key} className={`border-2 border-dashed rounded-lg p-6 transition-colors ${errors[doc.key] ? 'border-red-400' : 'border-gray-300 hover:border-[#44679F]'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
                        <div className="bg-[#DDF5F7] p-3 rounded-lg text-[#44679F] mb-4 sm:mb-0">{doc.icon}</div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{doc.title} *</h4>
                            <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                            <div className="flex items-center space-x-4">
                                <label className="cursor-pointer">
                                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(doc.key, e.target.files[0])} className="hidden" />
                                    <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300 flex items-center space-x-2">
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
            <FileCheck className="w-16 h-16 text-[#44679F] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h3>
            <p className="text-gray-600">Please confirm all details are correct before submitting.</p>
        </div>
        <div className="space-y-6 border border-gray-200 rounded-lg p-6">
            <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center border-b pb-2"><Building className="w-5 h-5 mr-2 text-[#44679F]" />Institution Details</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">College Name:</span><p className="font-medium text-gray-800">{formData.collegeName}</p></div>
                    <div><span className="text-gray-600">City, State:</span><p className="font-medium text-gray-800">{formData.city}, {formData.state}</p></div>
                    <div className="md:col-span-2"><span className="text-gray-600">Address:</span><p className="font-medium text-gray-800">{formData.collegeAddress}, {formData.pincode}</p></div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center border-b pb-2"><User className="w-5 h-5 mr-2 text-[#44679F]" />Nodal Officer Details</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-600">Name:</span><p className="font-medium text-gray-800">{formData.nodalOfficerName}</p></div>
                    <div><span className="text-gray-600">Designation:</span><p className="font-medium text-gray-800">{formData.nodalOfficerDesignation}</p></div>
                    <div><span className="text-gray-600">Phone:</span><p className="font-medium text-gray-800">{formData.nodalOfficerPhone}</p></div>
                    <div><span className="text-gray-600">Email:</span><p className="font-medium text-gray-800">{formData.officialEmail}</p></div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center border-b pb-2"><FileText className="w-5 h-5 mr-2 text-[#44679F]" />Uploaded Documents</h4>
                <div className="space-y-3">
                    {documentTypes.map((doc) => (
                        <div key={doc.key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{doc.title}</span>
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
                <input type="checkbox" checked={formData.consent} onChange={(e) => handleInputChange('consent', e.target.checked)} className="h-4 w-4 text-[#44679F] focus:ring-[#3B577D] border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">I hereby declare that the information provided is true and correct.</span>
            </label>
            {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
        </div>
    </div>
  );
  
  const renderSuccess = () => (
    <div className="text-center p-10 animate-fade-in">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
        <p className="text-gray-600 mb-8">Our team will review your application. Upon approval, login credentials for <strong className="text-[#44679F]">{formData.officialEmail}</strong> will be activated. You will be notified within 3-5 business days.</p>
        <button
            onClick={() => { setCurrentStep(1); /* Reset form logic */ }}
            className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300">
            Register Another Institution
        </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-2 rounded-xl"><Heart className="w-8 h-8 text-white" /></div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Sahay</h1>
                        <p className="text-gray-500">Institutional Registration</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
                {currentStep <= 4 && renderStepIndicator()}
                <div className="mt-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderSuccess()}
                </div>
                {currentStep <= 4 && (
                    <div className="mt-12 pt-6 border-t flex justify-between items-center">
                        <button
                            onClick={prevStep} disabled={currentStep === 1}
                            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2">
                            <ArrowLeft className="w-5 h-5" /><span>Previous</span>
                        </button>
                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300 flex items-center space-x-2">
                                <span>Next</span><ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit} disabled={isSubmitting}
                                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-600 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center space-x-2">
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