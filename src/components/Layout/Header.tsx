import React, { useState, useEffect } from 'react';
import { Globe, User, LogOut, Settings, Crown, Lock, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { useApp } from '../../context/AppContext';
import PaywallModal from '../Insights/PaywallModal';

interface HeaderProps {
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageToggle, onSidebarToggle, isSidebarOpen }) => {
  const { state: authState, logout } = useAuth();
  const { state: appState } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
  };

  const handleUpgradeClick = () => {
    setShowPaywall(true);
    setShowProfileDropdown(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="w-full px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo and Sidebar Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Sidebar Toggle - Black Text */}
              <button
                onClick={onSidebarToggle}
                className="p-2 sm:p-2.5 bg-white border-2 border-gray-300 text-black rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
              >
                {isSidebarOpen ? <X size={18} className="text-black" /> : <Menu size={18} className="text-black" />}
              </button>

              {/* Logo - Responsive */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-saffron to-green-india rounded-lg sm:rounded-xl shadow-lg animate-pulse-glow">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-md sm:rounded-lg flex items-center justify-center">
                    <span className="text-saffron font-bold text-sm sm:text-lg">S</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">SmartSahaayak</h1>
                  <p className="text-xs text-gray-500 hidden md:block">
                    {language === 'en' ? 'Your Digital Partner' : 'आपका डिजिटल साथी'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Language Toggle - Black Text, Responsive */}
              <button
                onClick={onLanguageToggle}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all duration-200 min-w-[70px] sm:min-w-[100px] justify-center border border-gray-300 bg-white"
              >
                <Globe size={14} className="text-black sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs sm:text-sm font-bold text-black">
                  {language === 'en' ? 'हिं' : 'EN'}
                </span>
              </button>

              {/* Live Time - Enhanced, Hidden on small screens */}
              <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 px-3 py-2 rounded-xl shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-700">
                    {currentTime.toLocaleTimeString('hi-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {currentTime.toLocaleDateString('hi-IN', { 
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
              </div>

              {/* Profile Dropdown - Enhanced, Responsive */}
              {authState.user && (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 shadow-md border-2 border-gray-300 hover:border-gray-400"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-saffron to-green-india rounded-md sm:rounded-lg flex items-center justify-center shadow-lg">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold text-gray-900 truncate max-w-24 lg:max-w-32">
                        {authState.user.businessName}
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className={`flex items-center space-x-1 ${
                          appState.userTier === 'pro' ? 'text-purple-600' : 'text-gray-500'
                        }`}>
                          {appState.userTier === 'pro' ? <Crown className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          <span className="text-xs font-bold">{appState.userTier.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''} sm:w-[14px] sm:h-[14px]`} />
                  </button>

                  {/* Dropdown Menu - Responsive */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-gray-200 py-2 z-50">
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                        <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{authState.user.businessName}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{authState.user.ownerName}</p>
                        <p className="text-xs text-gray-500 truncate">{authState.user.email}</p>
                      </div>
                      
                      <div className="py-2">
                        <button className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                          <Settings className="h-4 w-4" />
                          <span>{language === 'en' ? 'Settings' : 'सेटिंग्स'}</span>
                        </button>
                        
                        {appState.userTier === 'free' && (
                          <button 
                            onClick={handleUpgradeClick}
                            className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 text-purple-600 hover:bg-purple-50 transition-colors text-sm"
                          >
                            <Crown className="h-4 w-4" />
                            <span>{language === 'en' ? 'Upgrade to Pro' : 'Pro में अपग्रेड करें'}</span>
                          </button>
                        )}
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{language === 'en' ? 'Logout' : 'लॉग आउट'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {showProfileDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowProfileDropdown(false)}
          />
        )}
      </header>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature="Premium Upgrade"
      />
    </>
  );
};

export default Header;