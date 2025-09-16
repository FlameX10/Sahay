import React, { useState } from 'react'; // <-- CORRECTED LINE
import { LogIn, User, Building, Mail, Lock, Heart, ArrowRight, Loader2 } from 'lucide-react';

export default function UnifiedLoginPage() {
  const [userType, setUserType] = useState('student'); // 'student' or 'institution'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setIsSubmitting(true);
    console.log(`Attempting login for ${userType} with email: ${email}`);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock API response logic
    if (password === 'password123') {
      // On success, you would typically redirect the user
      alert(`Successfully logged in as ${userType}!`);
      // Example: window.location.href = `/${userType}/dashboard`;
    } else {
      setError('Invalid credentials. Please try again.');
    }

    setIsSubmitting(false);
  };

  const UserTypeToggle = () => (
    <div className="bg-gray-100 p-1 rounded-full flex w-full max-w-sm mx-auto mb-8">
      <button
        onClick={() => setUserType('student')}
        className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          userType === 'student' ? 'bg-white text-[#3B577D] shadow-md' : 'text-gray-500'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Student</span>
      </button>
      <button
        onClick={() => setUserType('institution')}
        className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          userType === 'institution' ? 'bg-white text-[#3B577D] shadow-md' : 'text-gray-500'
        }`}
      >
        <Building className="w-4 h-4" />
        <span>Institution</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-2 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
              <h1 className="text-3xl font-bold text-gray-900">Sahay</h1>
              <p className="text-gray-500">Your Mental Wellness Companion</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <UserTypeToggle />

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500">
              Please sign in to your {userType === 'student' ? 'student' : 'institutional'} account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'student' ? 'Student Email' : 'Official College Email'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={userType === 'student' ? 'your.name@college.ac.in' : 'principal@college.ac.in'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44679F] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#44679F] focus:ring-[#3B577D] border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">Remember me</label>
                </div>

                <div className="text-sm">
                    <a href="/forgot-password" className="font-medium text-[#44679F] hover:underline">Forgot your password?</a>
                </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white py-3 px-4 rounded-lg font-semibold text-lg hover:from-[#3B577D] hover:to-[#44679F] disabled:opacity-70 disabled:cursor-wait transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
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

          <p className="mt-8 text-center text-sm text-gray-600">
            {userType === 'student' ? "Don't have an account?" : "Haven't registered your institution?"}{' '}
            <a href={userType === 'student' ? '/register-student' : '/register-institution'} className="font-medium text-[#44679F] hover:underline">
              Register here
              <ArrowRight className="inline ml-1 w-4 h-4"/>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}