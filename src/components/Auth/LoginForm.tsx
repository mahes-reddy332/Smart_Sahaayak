import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Store, ArrowRight, Loader, AlertCircle, CheckCircle, ExternalLink, Settings } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  language: 'en' | 'hi';
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, language }) => {
  const { login, state, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Clear errors when component mounts or form data changes
  useEffect(() => {
    clearError();
    setLocalError('');
    setSuccessMessage('');
  }, [formData.email, formData.password, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setLocalError(language === 'en' 
        ? 'Please fill in all fields.' 
        : 'कृपया सभी फ़ील्ड भरें।'
      );
      setIsLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setLocalError(result.error || (language === 'en' 
        ? 'Login failed. Please try again.' 
        : 'लॉगिन असफल। कृपया पुनः प्रयास करें।'
      ));
    } else if (result.error) {
      // This handles cases like email confirmation messages
      setSuccessMessage(result.error);
    }
    
    setIsLoading(false);
  };

  // Use local error first, then auth context error
  const displayError = localError || state.error;

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-saffron to-green-india rounded-3xl shadow-lg animate-pulse-glow">
            <Store className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3 gradient-text">
          {language === 'en' ? 'Welcome Back!' : 'वापस स्वागत है!'}
        </h2>
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? 'Sign in to your business dashboard' 
            : 'अपने व्यापार डैशबोर्ड में साइन इन करें'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {displayError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 animate-fade-in-up">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-600 text-sm font-medium whitespace-pre-line">{displayError}</p>
                {displayError.includes('Site URL') && (
                  <div className="mt-3 p-3 bg-red-100 rounded-lg">
                    <p className="text-xs text-red-800 font-medium mb-2">🔧 Quick Fix:</p>
                    <ol className="text-xs text-red-700 space-y-1 list-decimal list-inside">
                      <li>Go to your Supabase Dashboard</li>
                      <li>Navigate to Authentication → URL Configuration</li>
                      <li>Set Site URL to your deployed app URL</li>
                      <li>Add redirect URLs for both localhost and production</li>
                    </ol>
                    <a 
                      href="https://supabase.com/dashboard" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 mt-2 text-xs text-red-600 hover:text-red-800 font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Open Supabase Dashboard</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 animate-fade-in-up">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-green-600 text-sm font-medium whitespace-pre-line">{successMessage}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {language === 'en' ? 'Email Address' : 'ईमेल पता'}
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 text-lg"
              placeholder={language === 'en' ? 'Enter your email' : 'अपना ईमेल दर्ज करें'}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {language === 'en' ? 'Password' : 'पासवर्ड'}
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-all duration-300 text-lg"
              placeholder={language === 'en' ? 'Enter your password' : 'अपना पासवर्ड दर्ज करें'}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-saffron to-green-india text-white py-4 px-6 rounded-2xl hover:from-orange-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <span>{language === 'en' ? 'Sign In' : 'साइन इन करें'}</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg">
          {language === 'en' ? "Don't have an account?" : 'खाता नहीं है?'}{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-saffron hover:text-orange-700 font-semibold transition-colors duration-200"
            disabled={isLoading}
          >
            {language === 'en' ? 'Create one now' : 'अभी बनाएं'}
          </button>
        </p>
      </div>

      {/* Enhanced Demo Credentials */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-yellow-800 font-bold">
            {language === 'en' ? 'Demo Credentials:' : 'डेमो क्रेडेंशियल:'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-yellow-700 font-medium">Email: demo@business.com</p>
          <p className="text-xs text-yellow-700 font-medium">Password: demo123</p>
        </div>
        <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
          <p className="text-xs text-yellow-800">
            {language === 'en' 
              ? '⚠️ If login fails, your Supabase Site URL must be configured to match your deployed application domain (not localhost).'
              : '⚠️ यदि लॉगिन असफल हो जाता है, तो आपका Supabase Site URL आपके deployed application domain से मैच करना चाहिए (localhost नहीं)।'
            }
          </p>
        </div>
      </div>

      {/* Configuration Help */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-800 mb-1">
              {language === 'en' ? 'Having authentication issues?' : 'प्रमाणीकरण समस्याएं हो रही हैं?'}
            </p>
            <p className="text-xs text-blue-700">
              {language === 'en' 
                ? 'Check the SUPABASE_AUTH_FIX.md file for detailed configuration instructions.'
                : 'विस्तृत कॉन्फ़िगरेशन निर्देशों के लिए SUPABASE_AUTH_FIX.md फ़ाइल देखें।'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;