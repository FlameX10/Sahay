
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Brain, CheckCircle, Star, ArrowRight, Menu, X, MessageCircle, Calendar, BookOpen, BarChart3, Sparkles } from 'lucide-react';

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "Finally, a platform where I can seek help without anyone knowing who I am.", author: "Anonymous Student, IIT Delhi", rating: 5 },
    { text: "The AI chatbot helped me through my exam anxiety at 2 AM when no one else was available.", author: "Anonymous Student, NIT Trichy", rating: 5 },
    { text: "Our college counselors are now more accessible than ever through this platform.", author: "Anonymous Student, Delhi University", rating: 5 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Self-Assessment Tools",
      description: "Take confidential mental health screenings and track your wellness journey over time."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Psychoeducational Hub",
      description: "Access curated wellness resources in Hindi, English, and regional languages."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 AI Support",
      description: "Get immediate help from our CBT/DBT-based chatbot whenever you need it."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Anonymous Counseling",
      description: "Book appointments with verified campus counselors while staying completely anonymous."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Institution Dashboard",
      description: "Colleges get aggregated, anonymous insights to improve student wellness programs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DDF5F7] via-[#C0D9E4] to-[#44679F]/10">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-2 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#44679F] to-[#3B577D] bg-clip-text text-transparent">
                  Sahay
                </h1>
                <p className="text-xs text-gray-600">Your Mental Wellness Companion</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-[#44679F] transition-colors">About</a>
              <a href="#features" className="text-gray-700 hover:text-[#44679F] transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-[#44679F] transition-colors">How It Works</a>
              <a href="#who-we-help" className="text-gray-700 hover:text-[#44679F] transition-colors">Who We Help</a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#44679F] transition-colors">Reviews</a>
              <button className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-6 py-2 rounded-full hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="text-gray-700 hover:text-[#44679F] px-4">About</a>
                <a href="#features" className="text-gray-700 hover:text-[#44679F] px-4">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-[#44679F] px-4">How It Works</a>
                <a href="#who-we-help" className="text-gray-700 hover:text-[#44679F] px-4">Who We Help</a>
                <a href="#testimonials" className="text-gray-700 hover:text-[#44679F] px-4">Reviews</a>
                <button className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-6 py-2 rounded-full mx-4">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-[#DDF5F7] text-[#3B577D] px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Completely Anonymous & Secure</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Mental Health{' '}
                <span className="bg-gradient-to-r from-[#44679F] to-[#3B577D] bg-clip-text text-transparent">
                  Matters
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Sahay provides anonymous, stigma-free mental wellness support designed specifically for Indian college students. 
                Get 24/7 AI assistance, connect with campus counselors, and track your mental health journey - all while staying completely anonymous.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-[#3B577D] hover:to-[#44679F] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Your Wellness Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-[#44679F] text-[#44679F] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#DDF5F7] transition-all duration-300 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Talk to AI Counselor</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">100% Anonymous</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Verified Institutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4] rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#DDF5F7] p-3 rounded-lg">
                        <p className="text-sm text-[#3B577D]">Hi! I'm here to support you. How are you feeling today?</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg ml-8">
                        <p className="text-sm text-gray-700">I've been feeling anxious about my upcoming exams...</p>
                      </div>
                      <div className="bg-[#DDF5F7] p-3 rounded-lg">
                        <p className="text-sm text-[#3B577D]">That's completely normal. Let me share some coping strategies that can help...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white p-3 rounded-full shadow-lg animate-bounce">
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#C0D9E4] p-3 rounded-full shadow-lg">
                <Shield className="w-6 h-6 text-[#3B577D]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Who We Are & What We Do
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Sahay is India's first comprehensive digital psychological intervention platform designed specifically for college students. We bridge the critical gap between students who need mental health support and the resources available to them.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform addresses the unique challenges faced by Indian students - from academic pressure and social isolation to the stigma surrounding mental health conversations. We provide a safe, anonymous space where students can access professional help without fear of judgment.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4]/50 p-6 rounded-2xl">
                  <div className="bg-[#44679F] p-3 rounded-full w-fit mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">10,000+</h3>
                  <p className="text-sm text-gray-600">Students Supported</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#C0D9E4] to-[#44679F]/20 p-6 rounded-2xl">
                  <div className="bg-[#3B577D] p-3 rounded-full w-fit mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">50+</h3>
                  <p className="text-sm text-gray-600">Partner Institutions</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#DDF5F7] via-[#C0D9E4] to-[#44679F]/20 rounded-3xl p-8">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-4 rounded-full w-fit mx-auto">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To create a stigma-free environment where every Indian college student can access mental health support, 
                      build resilience, and thrive academically and personally.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-[#44679F]">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Built with empathy, powered by technology</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 bg-[#44679F] p-4 rounded-full shadow-lg animate-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#C0D9E4] p-4 rounded-full shadow-lg">
                <Sparkles className="w-8 h-8 text-[#3B577D]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Five Pillars of Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform addresses every aspect of student mental health with privacy and accessibility at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4]/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-[#C0D9E4]/30 to-[#DDF5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Sahay Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to access anonymous mental health support
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <Shield className="w-16 h-16 text-[#44679F] mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verify & Register</h3>
              <p className="text-gray-600">
                Register using your official college email. We verify your institution while keeping you completely anonymous.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <MessageCircle className="w-16 h-16 text-[#3B577D] mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Access Support</h3>
              <p className="text-gray-600">
                Use our AI chatbot, browse wellness resources, take self-assessments, or book counselor appointments.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <Heart className="w-16 h-16 text-[#C0D9E4] mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your mental wellness journey over time with our confidential tracking tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section id="who-we-help" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We Help
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sahay is designed for the diverse community of Indian college students, addressing their unique mental health challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Students */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4]/50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-6 rounded-2xl w-fit mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  College students dealing with academic stress, anxiety, depression, social isolation, and adjustment challenges. 
                  Get confidential support without fear of judgment or stigma.
                </p>
                <div className="space-y-2 text-sm text-[#3B577D]">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Anonymity</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>24/7 AI Support</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Peer Community</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Counselors */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#C0D9E4]/50 to-[#44679F]/20 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-[#3B577D] to-[#44679F] p-6 rounded-2xl w-fit mx-auto mb-6">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Counselors</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Campus counselors and mental health professionals who need efficient tools to manage anonymous appointments 
                  and reach more students effectively.
                </p>
                <div className="space-y-2 text-sm text-[#3B577D]">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Anonymous Booking System</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Efficient Scheduling</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Resource Library</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutions */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#44679F]/20 to-[#DDF5F7] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-6 rounded-2xl w-fit mx-auto mb-6">
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Institutions</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  College administrators who want to improve student wellness programs with data-driven insights 
                  while maintaining complete student privacy.
                </p>
                <div className="space-y-2 text-sm text-[#3B577D]">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Anonymous Analytics</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Wellness Insights</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Policy Recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4]/30 rounded-3xl p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">The Problem We're Solving</h3>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Mental health crisis among Indian college students is reaching critical levels, with unique challenges that existing solutions don't address
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Institutional Integration</h4>
                    <p className="text-gray-600">Deep integration with college systems while maintaining student privacy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20 bg-gradient-to-br from-[#C0D9E4]/20 to-[#DDF5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Privacy is Our Priority
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We understand the stigma around mental health in India. That's why we built Sahay with anonymity at its core.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dual Database Architecture</h3>
                    <p className="text-gray-600">Your identity and usage data are stored separately for maximum privacy.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Anonymous Interactions</h3>
                    <p className="text-gray-600">All platform interactions use anonymous usernames, never your real identity.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Institutional Verification</h3>
                    <p className="text-gray-600">Only students from verified institutions can join, ensuring a safe community.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4] rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Privacy Dashboard</h3>
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Identity Protection</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Data Encryption</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">256-bit</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Anonymous Sessions</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Students Love Sahay
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Hear from students who found support through our platform
          </p>

          <div className="bg-gradient-to-br from-[#DDF5F7] to-[#C0D9E4]/50 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl text-gray-700 mb-6 italic">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            
            <p className="text-[#44679F] font-semibold">
              {testimonials[currentTestimonial].author}
            </p>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#44679F]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#44679F] to-[#3B577D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          <p className="text-xl text-[#DDF5F7] mb-8">
            Join thousands of students already using Sahay for anonymous, stigma-free mental health support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#44679F] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#DDF5F7] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#44679F] transition-all duration-300 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>For Institutions</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-[#44679F] to-[#3B577D] p-2 rounded-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sahay</h3>
                  <p className="text-gray-400">Your Mental Wellness Companion</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering Indian college students with anonymous, accessible, and culturally-aware mental health support.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-sm">🇮🇳 Made for Indian Students</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Institutions</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Get Started</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admin Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sahay. All rights reserved. Built with ❤️ for Indian students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}