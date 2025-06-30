import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Package,
  ShoppingCart,
  Receipt,
  Users,
  Bell,
  TrendingUp,
  LogOut,
  User,
  Settings,
  Crown,
  Lock,
  Store
} from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { useApp } from '../../context/AppContext';
import PaywallModal from '../Insights/PaywallModal';

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  language: 'en' | 'hi';
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle, language }) => {
  const { state: authState, logout } = useAuth();
  const { state: appState } = useApp();
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState('');
  
  const navItems = [
    { to: '/', icon: Home, label: language === 'en' ? 'Dashboard' : 'डैशबोर्ड', tier: 'free' },
    { to: '/inventory', icon: Package, label: language === 'en' ? 'Inventory' : 'इन्वेंटरी', tier: 'free' },
    { to: '/sales', icon: ShoppingCart, label: language === 'en' ? 'Sales' : 'बिक्री', tier: 'free' },
    { to: '/bills', icon: Receipt, label: language === 'en' ? 'Bills' : 'बिल', tier: 'free' },
    { to: '/contacts', icon: Users, label: language === 'en' ? 'Contacts' : 'संपर्क', tier: 'free' },
    { to: '/reminders', icon: Bell, label: language === 'en' ? 'Reminders' : 'रिमाइंडर', tier: 'free' },
    { 
      to: '/insights', 
      icon: TrendingUp, 
      label: language === 'en' ? 'Insights' : 'विश्लेषण', 
      tier: 'free',
      hasProFeatures: true
    }
  ];

  const handleLogout = () => {
    logout();
    onToggle();
  };

  const handleUpgradeClick = () => {
    setPaywallFeature('Premium Upgrade');
    setShowPaywall(true);
  };

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      {/* Sidebar - Responsive Width */}
      <div className={`
        fixed top-16 bottom-0 left-0 z-40 bg-white shadow-2xl transform transition-all duration-500 ease-in-out overflow-hidden
        w-64 sm:w-72 lg:w-80
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:top-0 lg:bottom-auto lg:h-screen lg:sticky
      `}>
        <div className="flex flex-col h-full">
          {/* Compact Header - Responsive */}
          <div className="relative overflow-hidden bg-gradient-to-br from-saffron via-orange-500 to-green-india p-3 sm:p-4">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white bg-opacity-10 rounded-full -translate-y-10 sm:-translate-y-12 translate-x-10 sm:translate-x-12"></div>
            
            <div className="relative z-10 flex items-center space-x-2 text-white">
              <div className="p-1.5 sm:p-2 bg-white bg-opacity-20 rounded-lg sm:rounded-xl backdrop-blur-sm">
                <Store className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold tracking-wide">SmartSahaayak</h1>
                <p className="text-xs text-orange-100 font-medium truncate">
                  {language === 'en' ? 'Digital Partner' : 'डिजिटल साथी'}
                </p>
              </div>
            </div>
          </div>

          {/* Compact User Info - Responsive */}
          {authState.user && (
            <div className="p-3 sm:p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-saffron to-green-india rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-bold text-gray-900 truncate" title={authState.user.businessName}>
                    {truncateText(authState.user.businessName, 14)}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate" title={authState.user.ownerName}>
                      {truncateText(authState.user.ownerName, 10)}
                    </p>
                    <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                      appState.userTier === 'pro' 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {appState.userTier === 'pro' ? <Crown className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
                      <span>{appState.userTier === 'pro' ? 'PRO' : 'FREE'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Navigation with Better Selected State - Responsive */}
          <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 space-y-1 overflow-y-auto sidebar-scrollable">
            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onToggle()}
                className={({ isActive }) => `
                  group flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] relative nav-item
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-700 shadow-lg border-l-4 border-blue-500' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50 hover:text-gray-900 hover:shadow-md'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1 sm:p-1.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                      isActive 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
                    }`}>
                      <item.icon size={14} className="sm:w-4 sm:h-4" />
                    </div>
                    <span className={`font-semibold text-xs sm:text-sm flex-1 truncate ${
                      isActive ? 'text-blue-700' : ''
                    }`}>
                      {item.label}
                    </span>
                    
                    {/* Enhanced Active Indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                    
                    {/* Pro Feature Indicator - Responsive */}
                    {item.hasProFeatures && appState.userTier === 'free' && (
                      <div className="flex items-center space-x-0.5 flex-shrink-0">
                        <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-500" />
                        <span className="text-xs text-purple-600 font-bold hidden sm:inline">PRO</span>
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Compact Upgrade Section for Free Users - Responsive */}
          {appState.userTier === 'free' && (
            <div className="p-2 sm:p-3 border-t bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white text-center">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-xs sm:text-sm mb-1">Upgrade to Pro</h4>
                <p className="text-xs text-purple-100 mb-2">Advanced analytics & more</p>
                <button 
                  onClick={handleUpgradeClick}
                  className="bg-white text-purple-600 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold hover:bg-purple-50 transition-colors duration-200 w-full"
                >
                  ₹99/month
                </button>
              </div>
            </div>
          )}

          {/* Compact Settings Section - Responsive */}
          <div className="p-2 sm:p-3 border-t bg-gray-50">
            <button className="w-full flex items-center space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
              <div className="p-1 bg-gray-200 rounded-lg group-hover:bg-gray-300 transition-colors duration-200">
                <Settings size={12} className="sm:w-[14px] sm:h-[14px]" />
              </div>
              <span className="font-medium text-xs sm:text-sm">{language === 'en' ? 'Settings' : 'सेटिंग्स'}</span>
            </button>
          </div>

          {/* Compact Logout Button - Responsive */}
          <div className="p-2 sm:p-3 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-2 sm:px-3 py-2 sm:py-2.5 text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-300 group transform hover:scale-[1.02]"
            >
              <div className="p-1 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                <LogOut size={12} className="sm:w-[14px] sm:h-[14px]" />
              </div>
              <span className="font-semibold text-xs sm:text-sm">{language === 'en' ? 'Logout' : 'लॉग आउट'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Overlay - Responsive */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30 lg:hidden backdrop-blur-sm top-16"
          onClick={onToggle}
        />
      )}

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature={paywallFeature}
      />
    </>
  );
};

export default Navigation;