import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Store, User, Phone, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  language: 'en' | 'hi';
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, language }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'en' 
        ? 'Password must be at least 6 characters long' 
        : 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए'
      );
      setIsLoading(false);
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const success = await signup(userData);
    
    if (!success) {
      setError(language === 'en' 
        ? 'Email already exists. Please use a different email.' 
        : 'ईमेल पहले से मौजूद है। कृपया दूसरा ईमेल उपयोग करें।'
      );
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-green-india to-blue-600 rounded-3xl shadow-lg animate-pulse-glow">
            <Store className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3 gradient-text">
          {language === 'en' ? 'Start Your Journey' : 'अपनी यात्रा शुरू करें'}
        </h2>
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? 'Create your account and grow your business' 
            : 'अपना खाता बनाएं और अपने व्यापार को बढ़ाएं'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 animate-fade-in-up">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {language === 'en' ? 'Business Name' : 'व्यापार का नाम'}
            </label>
            <div className="relative">
              <Store className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
                placeholder={language === 'en' ? 'Your Shop Name' : 'आपकी दुकान का नाम'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {language === 'en' ? 'Owner Name' : 'मालिक का नाम'}
            </label>
            <div className="relative">
              <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
                placeholder={language === 'en' ? 'Your Full Name' : 'आपका पूरा नाम'}
                required
              />
            </div>
          </div>
        </div>

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
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {language === 'en' ? 'Phone Number' : 'फोन नंबर'}
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
              placeholder="+91 9876543210"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
                placeholder={language === 'en' ? 'Min 6 characters' : 'कम से कम 6 अक्षर'}
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {language === 'en' ? 'Confirm Password' : 'पासवर्ड की पुष्टि करें'}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-india focus:border-transparent transition-all duration-300 text-lg"
                placeholder={language === 'en' ? 'Repeat password' : 'पासवर्ड दोहराएं'}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-india to-blue-600 text-white py-4 px-6 rounded-2xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <>
              <span>{language === 'en' ? 'Create Account' : 'खाता बनाएं'}</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg">
          {language === 'en' ? 'Already have an account?' : 'पहले से खाता है?'}{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-green-india hover:text-green-700 font-semibold transition-colors duration-200"
          >
            {language === 'en' ? 'Sign in here' : 'यहाँ साइन इन करें'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;