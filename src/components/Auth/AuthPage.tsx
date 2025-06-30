import React, { useState } from 'react';
import { Sparkles, TrendingUp, Shield, Zap, Star, Award, Users, Globe } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import LandingPage from '../Landing/LandingPage';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleGetStarted = () => {
    setShowAuth(true);
    setIsLogin(false); // Show signup form when getting started
  };

  if (!showAuth) {
    return <LandingPage onGetStarted={handleGetStarted} language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 lang-toggle flex items-center space-x-2"
      >
        <Globe size={16} />
        <span className="text-sm font-semibold">{language === 'en' ? 'हिं' : 'EN'}</span>
      </button>

      {/* Back to Landing */}
      <button
        onClick={() => setShowAuth(false)}
        className="fixed top-6 left-6 z-50 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-xl text-gray-700 hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-2"
      >
        <span>← {language === 'en' ? 'Back' : 'वापस'}</span>
      </button>

      {/* Left Side - Enhanced Hero Section with Indian Theme */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-saffron via-orange-500 to-green-india relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Indian Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32 animate-bounce-gentle"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-300 rounded-full animate-ping"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm animate-pulse-glow">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold gradient-text-white">SmartSahaayak</h1>
                <p className="text-xl text-orange-100 font-medium">
                  {language === 'en' ? 'Your Digital Business Partner' : 'आपका डिजिटल व्यापार साथी'}
                </p>
              </div>
            </div>
            
            <p className="text-lg text-orange-100 leading-relaxed mb-8">
              {language === 'en' 
                ? 'Transform your local business with powerful digital tools. Manage inventory, track sales, generate insights, and grow faster than ever before.'
                : 'शक्तिशाली डिजिटल टूल्स के साथ अपने स्थानीय व्यापार को बदलें। इन्वेंटरी प्रबंधन, बिक्री ट्रैकिंग, और तेज़ी से बढ़ें।'
              }
            </p>
          </div>

          {/* Enhanced Feature Highlights with Indian Context */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="p-3 bg-white bg-opacity-15 rounded-2xl backdrop-blur-sm group-hover:bg-opacity-25 transition-all duration-300">
                <TrendingUp className="h-7 w-7 animate-bounce-gentle" />
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  {language === 'en' ? 'Smart Analytics' : 'स्मार्ट विश्लेषण'}
                </h3>
                <p className="text-orange-100 text-sm">
                  {language === 'en' 
                    ? 'Get insights to boost your profit and make better decisions'
                    : 'अपने लाभ को बढ़ाने और बेहतर निर्णय लेने के लिए जानकारी प्राप्त करें'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group">
              <div className="p-3 bg-white bg-opacity-15 rounded-2xl backdrop-blur-sm group-hover:bg-opacity-25 transition-all duration-300">
                <Shield className="h-7 w-7 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  {language === 'en' ? 'Secure & Reliable' : 'सुरक्षित और विश्वसनीय'}
                </h3>
                <p className="text-orange-100 text-sm">
                  {language === 'en' 
                    ? 'Your business data is safe with enterprise-grade security'
                    : 'आपका व्यापारिक डेटा एंटरप्राइज़-ग्रेड सुरक्षा के साथ सुरक्षित है'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group">
              <div className="p-3 bg-white bg-opacity-15 rounded-2xl backdrop-blur-sm group-hover:bg-opacity-25 transition-all duration-300">
                <Zap className="h-7 w-7 animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  {language === 'en' ? 'Lightning Fast' : 'बिजली की तेज़ी'}
                </h3>
                <p className="text-orange-100 text-sm">
                  {language === 'en' 
                    ? 'Manage your entire business in seconds, not hours'
                    : 'अपने पूरे व्यापार को घंटों में नहीं, सेकंडों में प्रबंधित करें'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Testimonial with Indian Context */}
          <div className="mt-12 p-6 bg-white bg-opacity-15 rounded-2xl backdrop-blur-sm border border-white border-opacity-20">
            <div className="flex items-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-orange-100 italic mb-4 text-lg">
              {language === 'en' 
                ? '"This app transformed my small grocery store. I now track everything digitally and my profits have increased by 30%!"'
                : '"इस ऐप ने मेरी छोटी किराना दुकान को बदल दिया। अब मैं सब कुछ डिजिटल रूप से ट्रैक करता हूं और मेरा मुनाफा 30% बढ़ गया है!"'
              }
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">RS</span>
              </div>
              <div>
                <p className="font-bold text-lg">राजेश शर्मा • Rajesh Sharma</p>
                <p className="text-orange-200 text-sm">
                  {language === 'en' ? 'Local Grocery Store Owner' : 'स्थानीय किराना दुकान मालिक'}
                </p>
              </div>
            </div>
          </div>

          {/* Success Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-orange-200 text-sm">
                {language === 'en' ? 'Happy Merchants' : 'खुश व्यापारी'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">₹50L+</div>
              <div className="text-orange-200 text-sm">
                {language === 'en' ? 'Revenue Tracked' : 'आय ट्रैक की गई'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-orange-200 text-sm">
                {language === 'en' ? 'Uptime' : 'अपटाइम'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} language={language} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} language={language} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;