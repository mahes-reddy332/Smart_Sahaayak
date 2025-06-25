import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'hi';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
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
                Bolt.new
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

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 SmartSahaayak | {language === 'en' ? 'Your Digital Business Partner' : 'आपका डिजिटल व्यापार साथी'}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
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
    </footer>
  );
};

export default Footer;