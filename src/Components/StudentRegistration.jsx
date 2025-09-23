import React, { useState } from 'react';
import { 
  User, Lock, CheckCircle, 
  Loader2, UserPlus
} from 'lucide-react';


export default function StudentRegistrationSinglePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
    name: '',
    studentId: '',
    peer: null,
    collegeId: '68d1c9f9403d97c895f4aa6a'
  });

  // Generate unique student ID
  const generateStudentId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `STU-${timestamp.slice(-6)}-${random}`;
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  

  const validate = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Generate unique student ID
        const uniqueStudentId = generateStudentId();
        
        // Prepare JSON data exactly as required
        const jsonData = {
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          name: formData.name,
          studentId: uniqueStudentId,
          peer: formData.peer,
          collegeId: formData.collegeId
        };

        console.log("Sending JSON data:", jsonData);

        const response = await fetch('http://localhost:8000/api/v1/registration/register-any', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(jsonData)
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("Registration successful:", result);
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error("Registration failed:", errorData);
          setErrors({ submit: errorData.message || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error("Network error:", error);
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Validation Failed", errors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#eaf1f5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in border" style={{borderColor:'#c8ced1'}}>
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2e2f34] mb-4">Registration Successful!</h2>
          <p className="text-[#767272] mb-8">
              Registration successful! You can now login with your credentials.
          </p>
          <a href="/login" className="bg-[#2dc8ca] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 w-full block">
              Proceed to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaf1f5] font-sans p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2e2f34]">Student Registration</h1>
            <p className="text-[#767272]">Create your Sahay account for anonymous mental wellness support.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border" style={{borderColor:'#c8ced1'}}>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* --- Student Information Section --- */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b pb-4" style={{borderColor:'#c8ced1'}}>
                    <User className="w-8 h-8 text-[#2dc8ca]" />
                    <div>
                        <h3 className="text-xl font-bold text-[#2e2f34]">Student Information</h3>
                        <p className="text-sm text-[#767272]">Enter your basic details for registration.</p>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[#2e2f34] mb-2">Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}
                        style={{borderColor: errors.name ? '#ef4444' : '#c8ced1'}}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2e2f34] mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}
                        style={{borderColor: errors.email ? '#ef4444' : '#c8ced1'}}
                        placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

            </div>

            {/* --- Account Creation Section --- */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b pb-4" style={{borderColor:'#c8ced1'}}>
                    <Lock className="w-8 h-8 text-[#2dc8ca]" />
                    <div>
                        <h3 className="text-xl font-bold text-[#2e2f34]">Create Your Account</h3>
                        <p className="text-sm text-[#767272]">Set a secure password for your Sahay account.</p>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-[#2e2f34] mb-2">Password *</label>
                    <input type="password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}
                        style={{borderColor: errors.password ? '#ef4444' : '#c8ced1'}}
                        placeholder="Minimum 6 characters"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {errors.submit && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        {errors.submit}
                    </div>
                )}
            </div>

            <div className="pt-6 border-t" style={{borderColor:'#c8ced1'}}>
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center justify-center space-x-3"
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