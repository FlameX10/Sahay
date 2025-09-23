import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, User, Building, Mail, Lock, Heart, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { loginUser, clearError } from '../store/slices/authSlice';

export default function UnifiedLoginPage() {
  const [userType, setUserType] = useState('student'); // 'student' | 'institution' | 'counsellor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, isAuthenticated, user } = useSelector(state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }));

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // Enhanced validation
    if (!email.trim()) {
      dispatch(clearError());
      return;
    }
    
    if (!password.trim()) {
      dispatch(clearError());
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(clearError());
      return;
    }

    try {
      const result = await dispatch(loginUser({ email: email.trim(), password }));
      
      if (loginUser.fulfilled.match(result)) {
        const userType = result.payload.data.user.userType;
        
        // Route based on user type - only after successful login
        if (userType === 'admin') {
          navigate('/admin');
        } else if (userType === 'collage_admin') {
          navigate('/collage_admin/dashboard');
        } else if (userType === 'student') {
          navigate('/student/dashboard');
        } else if (userType === 'counsellor') {
          navigate('/counsellor/dashboard');
        } else {
          // Default fallback
          navigate('/dashboard');
        }
      }
    } catch (err) {
      // Error is handled by Redux
      console.error('Login error:', err);
    }
  };

  const UserTypeToggle = () => (
    <div className="bg-[#f2f7eb] p-1 rounded-full flex w-full max-w-xl mx-auto mb-8">
      <button
        onClick={() => setUserType('student')}
        className={`w-1/3 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          userType === 'student' ? 'bg-white text-[#2e2f34] shadow-md' : 'text-[#767272]'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Student</span>
      </button>
      <button
        onClick={() => setUserType('institution')}
        className={`w-1/3 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          userType === 'institution' ? 'bg-white text-[#2e2f34] shadow-md' : 'text-[#767272]'
        }`}
      >
        <Building className="w-4 h-4" />
        <span>Institution</span>
      </button>
      <button
        onClick={() => setUserType('counsellor')}
        className={`w-1/3 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          userType === 'counsellor' ? 'bg-white text-[#2e2f34] shadow-md' : 'text-[#767272]'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Counsellor</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eaf1f5] flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-[#3d9098] p-2 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
              <h1 className="text-3xl font-bold text-[#2e2f34]">Sahay</h1>
              <p className="text-[#8d949d]">Your Mental Wellness Companion</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border" style={{borderColor:'#c8ced1'}}>
          <UserTypeToggle />

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#2e2f34]">
              Welcome Back
            </h2>
            <p className="text-[#767272]">
              Please sign in to your {userType === 'student' ? 'student' : userType === 'institution' ? 'institutional' : 'counsellor'} account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2e2f34] mb-2">
                {userType === 'student' ? 'Student Email' : userType === 'institution' ? 'Official College Email' : 'Counsellor Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === 'student' ? 'your.name@college.ac.in' : userType === 'institution' ? 'principal@college.ac.in' : 'counsellor@college.ac.in'}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent"
                  style={{borderColor:'#c8ced1'}}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2e2f34] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8d949d]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2dc8ca] focus:border-transparent"
                  style={{borderColor:'#c8ced1'}}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#2dc8ca] focus:ring-[#3d9098] rounded" style={{borderColor:'#c8ced1'}} />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#2e2f34]">Remember me</label>
                </div>

                <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-[#2dc8ca] hover:underline">Forgot your password?</a>
                </div>
            </div>

            {error && (
              <div className="p-4 rounded border text-red-700 bg-red-50 flex items-start" style={{borderColor:'#fecaca'}}>
                <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                <div className="text-sm">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2dc8ca] text-white py-3 px-4 rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-6 h-6" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {userType !== 'counsellor' && (
            <p className="mt-8 text-center text-sm text-[#767272]">
              {userType === 'student' ? "Don't have an account?" : "Haven't registered your institution?"}{' '}
              <a href={userType === 'student' ? '/student-registration' : '/institution-registration'} className="font-medium text-[#2dc8ca] hover:underline">
                Register here
                <ArrowRight className="inline ml-1 w-4 h-4"/>
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}