
import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Brain, CheckCircle, Star, ArrowRight, Menu, X, MessageCircle, Calendar, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#eaf1f5]">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#3d9098] p-2 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2e2f34]">Sahay</h1>
                <p className="text-xs" style={{color:'#8d949d'}}>Your Mental Wellness Companion</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="transition-colors" style={{color:'#767272'}}>About</a>
              <a href="#features" className="transition-colors" style={{color:'#767272'}}>Features</a>
              <a href="#how-it-works" className="transition-colors" style={{color:'#767272'}}>How It Works</a>
              <a href="#who-we-help" className="transition-colors" style={{color:'#767272'}}>Who We Help</a>
              <a href="#testimonials" className="transition-colors" style={{color:'#767272'}}>Reviews</a>
              <button className="text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105" style={{background:'#2dc8ca'}} onClick={()=>navigate('/login')}>
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
            <div className="md:hidden bg-white border-t py-4" style={{borderColor:'#c8ced1'}}>
              <div className="flex flex-col space-y-4">
                <a href="#about" className="px-4" style={{color:'#767272'}}>About</a>
                <a href="#features" className="px-4" style={{color:'#767272'}}>Features</a>
                <a href="#how-it-works" className="px-4" style={{color:'#767272'}}>How It Works</a>
                <a href="#who-we-help" className="px-4" style={{color:'#767272'}}>Who We Help</a>
                <a href="#testimonials" className="px-4" style={{color:'#767272'}}>Reviews</a>
                <button className="text-white px-6 py-2 rounded-full mx-4" style={{background:'#2dc8ca'}} onClick={()=>navigate('/login')
                  
                }>
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium" style={{background:'#eaf1f5', color:'#3d9098'}}>
                <Sparkles className="w-4 h-4" />
                <span>Completely Anonymous & Secure</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{color:'#2e2f34'}}>
                Your Mental Health{' '}
                <span className="text-[#2dc8ca]">Matters</span>
              </h1>
              
              <p className="text-xl leading-relaxed" style={{color:'#767272'}}>
                Sahay provides anonymous, stigma-free mental wellness support designed specifically for Indian college students. 
                Get 24/7 AI assistance, connect with campus counselors, and track your mental health journey - all while staying completely anonymous.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="w-full sm:w-auto text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" style={{background:'#2dc8ca'}} onClick={()=>navigate('/student-registration')}>
                  <span>Start Your Wellness Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto border-2 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2" style={{borderColor:'#3d9098', color:'#3d9098'}}>
                  <MessageCircle className="w-5 h-5" />
                  <span>Talk to AI Counselor</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" style={{color:'#889260'}} />
                  <span className="text-sm" style={{color:'#767272'}}>100% Anonymous</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" style={{color:'#889260'}} />
                  <span className="text-sm" style={{color:'#767272'}}>Verified Institutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" style={{color:'#ab5275'}} />
                  <span className="text-sm" style={{color:'#767272'}}>24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500" style={{background:'#e1d1c9'}}>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{background:'#eaf1f5'}}>
                        <p className="text-sm" style={{color:'#3d9098'}}>Hi! I'm here to support you. How are you feeling today?</p>
                      </div>
                      <div className="p-3 rounded-lg ml-8" style={{background:'#c8ced1'}}>
                        <p className="text-sm" style={{color:'#2e2f34'}}>I've been feeling anxious about my upcoming exams...</p>
                      </div>
                      <div className="p-3 rounded-lg" style={{background:'#eaf1f5'}}>
                        <p className="text-sm" style={{color:'#3d9098'}}>That's completely normal. Let me share some coping strategies that can help...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 text-white p-3 rounded-full shadow-lg animate-bounce" style={{background:'#3d9098'}}>
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 rounded-full shadow-lg" style={{background:'#b7c0d0'}}>
                <Shield className="w-6 h-6" style={{color:'#3d9098'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20" style={{background:'#f2f7eb'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{color:'#2e2f34'}}>
                  Who We Are & What We Do
                </h2>
                <p className="text-lg sm:text-xl leading-relaxed mb-6" style={{color:'#767272'}}>
                  Sahay is India's first comprehensive digital psychological intervention platform designed specifically for college students. We bridge the critical gap between students who need mental health support and the resources available to them.
                </p>
                <p className="text-lg leading-relaxed" style={{color:'#767272'}}>
                  Our platform addresses the unique challenges faced by Indian students - from academic pressure and social isolation to the stigma surrounding mental health conversations. We provide a safe, anonymous space where students can access professional help without fear of judgment.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl" style={{background:'#eaf1f5'}}>
                  <div className="p-3 rounded-full w-fit mb-4" style={{background:'#3d9098'}}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{color:'#2e2f34'}}>10,000+</h3>
                  <p className="text-sm" style={{color:'#767272'}}>Students Supported</p>
                </div>
                
                <div className="p-6 rounded-2xl" style={{background:'#fbf1ea'}}>
                  <div className="p-3 rounded-full w-fit mb-4" style={{background:'#f99c5b'}}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{color:'#2e2f34'}}>50+</h3>
                  <p className="text-sm" style={{color:'#767272'}}>Partner Institutions</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl p-8" style={{background:'#eaf1f5'}}>
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="p-4 rounded-full w-fit mx-auto" style={{background:'#3d9098'}}>
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold" style={{color:'#2e2f34'}}>Our Mission</h3>
                    <p className="leading-relaxed" style={{color:'#767272'}}>
                      To create a stigma-free environment where every Indian college student can access mental health support, 
                      build resilience, and thrive academically and personally.
                    </p>
                    <div className="flex items-center justify-center space-x-2" style={{color:'#3d9098'}}>
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Built with empathy, powered by technology</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 p-4 rounded-full shadow-lg animate-pulse" style={{background:'#3d9098'}}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 p-4 rounded-full shadow-lg" style={{background:'#b7c0d0'}}>
                <Sparkles className="w-8 h-8" style={{color:'#3d9098'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color:'#2e2f34'}}>
              Five Pillars of Mental Wellness
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color:'#767272'}}>
              Our comprehensive platform addresses every aspect of student mental health with privacy and accessibility at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group" style={{background:'#eaf1f5'}}>
                <div className="text-white p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300" style={{background:'#3d9098'}}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{color:'#2e2f34'}}>{feature.title}</h3>
                <p className="leading-relaxed" style={{color:'#767272'}}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20" style={{background:'#f2f7eb'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{color:'#2e2f34'}}>
              How Sahay Works
            </h2>
            <p className="text-xl" style={{color:'#767272'}}>
              Three simple steps to access anonymous mental health support
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background:'#3d9098'}}>
                  1
                </div>
                <Shield className="w-8 h-8 mx-auto" style={{color:'#3d9098'}} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color:'#2e2f34'}}>
                Verify & Register
              </h3>
              <p style={{color:'#767272'}}>
                Register using your official college email. We verify your institution while keeping you completely anonymous.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background:'#2dc8ca'}}>
                  2
                </div>
                <MessageCircle className="w-8 h-8 mx-auto" style={{color:'#2dc8ca'}} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color:'#2e2f34'}}>Access Support</h3>
              <p style={{color:'#767272'}}>
                Use our AI chatbot, browse wellness resources, take self-assessments, or book counselor appointments.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4" style={{background:'#f99c5b'}}>
                  3
                </div>
                <Heart className="w-8 h-8 mx-auto" style={{color:'#f99c5b'}} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color:'#2e2f34'}}>Track Progress</h3>
              <p style={{color:'#767272'}}>
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
            <h2 className="text-4xl font-bold mb-4" style={{color:'#2e2f34'}}>
              Who We Help
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color:'#767272'}}>
              Sahay is designed for the diverse community of Indian college students, addressing their unique mental health challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Students */}
            <div className="text-center group">
              <div className="rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{background:'#eaf1f5'}}>
                <div className="p-6 rounded-2xl w-fit mx-auto mb-6" style={{background:'#3d9098'}}>
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color:'#2e2f34'}}>Students</h3>
                <p className="mb-6 leading-relaxed" style={{color:'#767272'}}>
                  College students dealing with academic stress, anxiety, depression, social isolation, and adjustment challenges. 
                  Get confidential support without fear of judgment or stigma.
                </p>
                <div className="space-y-2 text-sm" style={{color:'#3d9098'}}>
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
              <div className="rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{background:'#f2f7eb'}}>
                <div className="p-6 rounded-2xl w-fit mx-auto mb-6" style={{background:'#2dc8ca'}}>
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color:'#2e2f34'}}>Counselors</h3>
                <p className="mb-6 leading-relaxed" style={{color:'#767272'}}>
                  Campus counselors and mental health professionals who need efficient tools to manage anonymous appointments 
                  and reach more students effectively.
                </p>
                <div className="space-y-2 text-sm" style={{color:'#2dc8ca'}}>
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
              <div className="rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{background:'#e1d1c9'}}>
                <div className="p-6 rounded-2xl w-fit mx-auto mb-6" style={{background:'#f99c5b'}}>
                  <BarChart3 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{color:'#2e2f34'}}>Institutions</h3>
                <p className="mb-6 leading-relaxed" style={{color:'#767272'}}>
                  College administrators who want to improve student wellness programs with data-driven insights 
                  while maintaining complete student privacy.
                </p>
                <div className="space-y-2 text-sm" style={{color:'#f99c5b'}}>
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
          <div className="rounded-3xl p-12" style={{background:'#eaf1f5'}}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4" style={{color:'#2e2f34'}}>The Problem We're Solving</h3>
              <p className="text-lg max-w-4xl mx-auto" style={{color:'#767272'}}>
                Mental health crisis among Indian college students is reaching critical levels, with unique challenges that existing solutions don't address
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full mt-1" style={{background:'#f2f7eb'}}>
                    <CheckCircle className="w-5 h-5" style={{color:'#889260'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{color:'#2e2f34'}}>Institutional Integration</h4>
                    <p style={{color:'#767272'}}>Deep integration with college systems while maintaining student privacy</p>
                  </div>
                  
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full mt-1" style={{background:'#f2f7eb'}}>
                    <CheckCircle className="w-5 h-5" style={{color:'#889260'}} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{color:'#2e2f34'}}>Institutional Integration</h4>
                    <p style={{color:'#767272'}}>Deep integration with college systems while maintaining student privacy</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-20" style={{background:'#f2f7eb'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{color:'#2e2f34'}}>
                Your Privacy is Our Priority
              </h2>
              <p className="text-xl mb-8" style={{color:'#767272'}}>
                We understand the stigma around mental health in India. That's why we built Sahay with anonymity at its core.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full" style={{background:'#f2f7eb'}}>
                    <CheckCircle className="w-6 h-6" style={{color:'#889260'}} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{color:'#2e2f34'}}>Dual Database Architecture</h3>
                    <p style={{color:'#767272'}}>Your identity and usage data are stored separately for maximum privacy.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full" style={{background:'#f2f7eb'}}>
                    <CheckCircle className="w-6 h-6" style={{color:'#889260'}} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{color:'#2e2f34'}}>Anonymous Interactions</h3>
                    <p style={{color:'#767272'}}>All platform interactions use anonymous usernames, never your real identity.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full" style={{background:'#f2f7eb'}}>
                    <CheckCircle className="w-6 h-6" style={{color:'#889260'}} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{color:'#2e2f34'}}>Institutional Verification</h3>
                    <p style={{color:'#767272'}}>Only students from verified institutions can join, ensuring a safe community.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8" style={{background:'#eaf1f5'}}>
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold" style={{color:'#2e2f34'}}>Privacy Dashboard</h3>
                  <Shield className="w-6 h-6" style={{color:'#2dc8ca'}} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{color:'#767272'}}>Identity Protection</span>
                    <span className="px-2 py-1 rounded text-xs" style={{background:'#f2f7eb', color:'#889260'}}>Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{color:'#767272'}}>Data Encryption</span>
                    <span className="px-2 py-1 rounded text-xs" style={{background:'#f2f7eb', color:'#889260'}}>256-bit</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{color:'#767272'}}>Anonymous Sessions</span>
                    <span className="px-2 py-1 rounded text-xs" style={{background:'#f2f7eb', color:'#889260'}}>Enabled</span>
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
          <h2 className="text-4xl font-bold mb-4" style={{color:'#2e2f34'}}>
            Students Love Sahay
          </h2>
          <p className="text-xl mb-12" style={{color:'#767272'}}>
            Hear from students who found support through our platform
          </p>

          <div className="rounded-3xl p-8 shadow-xl" style={{background:'#eaf1f5'}}>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6" style={{color:'#eac163'}} />
              ))}
            </div>
            
            <blockquote className="text-xl mb-6 italic" style={{color:'#2e2f34'}}>
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            
            <p className="font-semibold" style={{color:'#3d9098'}}>
              {testimonials[currentTestimonial].author}
            </p>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#2dc8ca]' : 'bg-[#c8ced1]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{background:'#2dc8ca'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          <p className="text-xl mb-8" style={{color:'#fbecb3'}}>
            Join thousands of students already using Sahay for anonymous, stigma-free mental health support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2" style={{color:'#3d9098'}} onClick={()=>navigate('/student-registration')}>
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2" style={{hoverColor:'#3d9098'}} onClick={()=>navigate('/institution-registration')}>
              <Users className="w-5 h-5" />
              <span>For Institutions</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-16" style={{background:'#2e2f34'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-xl" style={{background:'#3d9098'}}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sahay</h3>
                  <p style={{color:'#c8ced1'}}>Your Mental Wellness Companion</p>
                </div>
              </div>
              <p className="mb-6 max-w-md" style={{color:'#c8ced1'}}>
                Empowering Indian college students with anonymous, accessible, and culturally-aware mental health support.
              </p>
              <div className="flex space-x-4">
                <div className="p-3 rounded-lg" style={{background:'#7d7074'}}>
                  <span className="text-sm">🇮🇳 Made for Indian Students</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-3" style={{color:'#c8ced1'}}>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Institutions</h4>
              <ul className="space-y-3" style={{color:'#c8ced1'}}>
                <li><a href="/institution-registration" className="hover:text-white transition-colors">Get Started</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admin Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 text-center" style={{borderTop:'1px solid #7d7074', color:'#c8ced1'}}>
            <p>&copy; 2025 Sahay. All rights reserved. Built with ❤️ for Indian students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}