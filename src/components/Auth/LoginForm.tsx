import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Store, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  language: 'en' | 'hi';
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, language }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(formData.email, formData.password);
    
    if (!success) {
      setError(language === 'en' 
        ? 'Invalid email or password. Please try again.' 
        : 'गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।'
      );
    }
    
    setIsLoading(false);
  };

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
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 animate-fade-in-up">
            <p className="text-red-600 text-sm font-medium">{error}</p>
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
      </div>
    </div>
  );
};

export default LoginForm;