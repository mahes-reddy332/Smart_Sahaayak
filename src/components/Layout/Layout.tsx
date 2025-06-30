import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Default to closed on mobile, open on desktop
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  // Auto-open sidebar on desktop, keep closed on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <Header 
        language={language} 
        onLanguageToggle={toggleLanguage}
        onSidebarToggle={toggleNav}
        isSidebarOpen={isNavOpen}
      />
      
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar - Only show when open */}
        {isNavOpen && (
          <div className="hidden lg:block">
            <Navigation isOpen={isNavOpen} onToggle={toggleNav} language={language} />
          </div>
        )}
        
        {/* Mobile Sidebar - Always use overlay */}
        <div className="lg:hidden">
          <Navigation isOpen={isNavOpen} onToggle={toggleNav} language={language} />
        </div>
        
        {/* Main Content - Responsive padding and spacing */}
        <main className={`flex-1 overflow-auto transition-all duration-500 ${
          isNavOpen ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pt-4 sm:pt-6 lg:pt-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Layout;