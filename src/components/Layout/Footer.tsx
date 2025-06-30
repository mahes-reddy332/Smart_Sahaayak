import React from 'react';
import { Heart, Mail, Phone, MapPin, Zap } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'hi';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  // Fallback badge component if image doesn't load
  const BoltBadge = ({ width = 150, className = "" }) => (
    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`} style={{ width: `${width}px` }}>
      <Zap className="h-4 w-4" />
      <span>Built with Bolt</span>
    </div>
  );

  const BoltLink = ({ children, width = 150, className = "" }: { children: React.ReactNode, width?: number, className?: string }) => (
    <a 
      href="https://bolt.new" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-block transform hover:scale-105 transition-transform duration-300 ${className}`}
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-saffron to-green-india rounded-xl">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-saffron font-bold">S</span>
                </div>
              </div>
              <span className="text-xl font-bold">SmartSahaayak</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {language === 'en'
                ? 'Empowering Indian shopkeepers with smart digital tools to grow their business and increase profits.'
                : 'भारतीय दुकानदारों को अपने व्यापार को बढ़ाने और मुनाफा बढ़ाने के लिए स्मार्ट डिजिटल टूल्स के साथ सशक्त बनाना।'
              }
            </p>
            
            {/* Official Bolt.new Badge - Prominent Placement with Fallback */}
            <div className="mb-4">
              <BoltLink width={150}>
                <img 
                  src="https://bolt.new/badge.svg" 
                  alt="Built with Bolt" 
                  width="150" 
                  className="hover:opacity-90 transition-opacity duration-300"
                  onError={(e) => {
                    // Replace with fallback badge if image fails to load
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '';
                      const fallback = document.createElement('div');
                      fallback.className = 'inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105';
                      fallback.style.width = '150px';
                      fallback.innerHTML = '<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg><span>Built with Bolt</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </BoltLink>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-400" />
              <span>
                {language === 'en' ? 'Built with love in India using' : 'भारत में प्यार से बनाया गया'}
              </span>
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Bolt.new AI
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors">
                {language === 'en' ? 'Help Center' : 'सहायता केंद्र'}
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'संपर्क'}
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@smartsahaayak.com" className="hover:text-white transition-colors">
                  support@smartsahaayak.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {language === 'en' ? 'New Delhi, India' : 'नई दिल्ली, भारत'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Enhanced Bolt.new Attribution */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 SmartSahaayak | {language === 'en' ? 'Your Digital Business Partner' : 'आपका डिजिटल व्यापार साथी'}
              </p>
            </div>
            
            {/* Bolt.new Badge - Secondary Placement with Fallback */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <BoltLink width={120}>
                <img 
                  src="https://bolt.new/badge.svg" 
                  alt="Built with Bolt" 
                  width="120" 
                  className="hover:opacity-90 transition-opacity duration-300"
                  onError={(e) => {
                    // Replace with fallback badge if image fails to load
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '';
                      const fallback = document.createElement('div');
                      fallback.className = 'inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105';
                      fallback.style.width = '120px';
                      fallback.innerHTML = '<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg><span>Built with Bolt</span>';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </BoltLink>
              
              {/* Indian Flag Colors */}
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-2 bg-saffron rounded-sm"></div>
                  <div className="w-3 h-2 bg-white border border-gray-600 rounded-sm"></div>
                  <div className="w-3 h-2 bg-green-india rounded-sm"></div>
                </div>
                <span className="text-xs text-gray-500">
                  {language === 'en' ? 'Made in India' : 'भारत में निर्मित'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Hackathon Attribution with Fallback Badge */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-xs text-gray-500">
                🏆 {language === 'en' ? 'Submitted for Bolt AI Hackathon 2025' : 'Bolt AI हैकाथॉन 2025 के लिए प्रस्तुत'}
              </p>
              
              {/* Additional Fallback Badge */}
              <BoltLink width={100} className="sm:inline-block">
                <BoltBadge width={100} className="text-xs px-2 py-1" />
              </BoltLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;