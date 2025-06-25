import React, { useState } from 'react';
import { X, Crown, Check, Zap, TrendingUp, Award, Star, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PaymentGateway from '../Payment/PaymentGateway';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, feature }) => {
  const { dispatch } = useApp();
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const handleUpgradeClick = () => {
    // Show payment gateway instead of directly upgrading
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = () => {
    // Only upgrade after successful payment
    dispatch({ type: 'UPGRADE_TO_PRO' });
    setShowPaymentGateway(false);
    onClose();
    
    // Show success message
    setTimeout(() => {
      alert(
        '🚀 Welcome to SmartSahaayak Pro!\n\n' +
        '✅ Advanced Analytics Unlocked\n' +
        '✅ Profit/Loss Analysis Available\n' +
        '✅ Monthly Trend Graphs Enabled\n' +
        '✅ Smart Business Tips Activated\n' +
        '✅ PDF Reports Ready\n' +
        '✅ Priority Support Active\n\n' +
        'All premium features are now available!'
      );
    }, 500);
  };

  const handlePaymentClose = () => {
    setShowPaymentGateway(false);
  };

  if (!isOpen) return null;

  const freeFeatures = [
    'इन्वेंटरी प्रबंधन • Inventory Management',
    'बिक्री लॉगिंग • Sales Logging',
    'बिलिंग और रसीदें • Billing & Receipts',
    'संपर्क बुक • Contact Book',
    'मैन्युअल रिमाइंडर • Manual Reminders',
    'बेसिक रिपोर्ट • Basic Reports'
  ];

  const proFeatures = [
    'उन्नत एनालिटिक्स • Advanced Analytics',
    'लाभ/हानि मार्जिन • Profit/Loss Margins',
    'मासिक ट्रेंड ग्राफ • Monthly Trend Graphs',
    'टॉप 5 उत्पाद • Top 5 Products Analysis',
    'स्मार्ट टिप्स • Smart Business Tips',
    'PDF रिपोर्ट डाउनलोड • PDF Report Download',
    'ऑटो रिमाइंडर • Automated Reminders',
    'प्राथमिकता सहायता • Priority Support'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 bg-opacity-20 rounded-full translate-y-24 -translate-x-24 animate-bounce-gentle"></div>
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors duration-200 z-10"
            >
              <X size={28} />
            </button>

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm animate-pulse-glow">
                  <Crown className="h-12 w-12 text-yellow-300" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                SmartSahaayak Premium अनलॉक करें
              </h2>
              <p className="text-xl text-pink-100 mb-6">
                Unlock SmartSahaayak Premium
              </p>
              <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4 inline-block">
                <p className="text-lg font-semibold">
                  आपने "{feature}" एक्सेस करने की कोशिश की
                </p>
                <p className="text-pink-100 text-sm">
                  You tried to access "{feature}"
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Free Tier */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Basic SmartSahaayak
                  </h3>
                  <p className="text-gray-600 mb-4">बेसिक स्मार्टसहायक</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ₹0
                  </div>
                  <p className="text-gray-500">हमेशा के लिए मुफ्त • Free Forever</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-100 rounded-xl p-4 text-center">
                  <p className="text-gray-600 font-medium">आपका वर्तमान प्लान</p>
                  <p className="text-gray-500 text-sm">Your Current Plan</p>
                </div>
              </div>

              {/* Pro Tier */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-300 relative overflow-hidden">
                {/* Popular Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>POPULAR</span>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    SmartSahaayak Premium
                  </h3>
                  <p className="text-purple-600 mb-4 font-semibold">स्मार्टसहायक प्रीमियम</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl text-gray-500 line-through">₹199</span>
                    <span className="text-4xl font-bold text-purple-600">₹99</span>
                    <span className="text-gray-600">/माह</span>
                  </div>
                  <p className="text-purple-500 font-medium">या ₹999/वर्ष (2 महीने मुफ्त!)</p>
                  <p className="text-gray-500 text-sm">or ₹999/year (2 months free!)</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="text-center mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      सभी Free फीचर्स + All Free Features +
                    </span>
                  </div>
                  {proFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleUpgradeClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  <Crown className="h-6 w-6" />
                  <span>अभी अपग्रेड करें • Upgrade Now</span>
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Premium के साथ अपना व्यापार बढ़ाएं • Grow Your Business with Premium
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">30% अधिक लाभ</h4>
                  <p className="text-gray-600 text-sm">स्मार्ट टिप्स से अपना मुनाफा बढ़ाएं</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">समय की बचत</h4>
                  <p className="text-gray-600 text-sm">ऑटो रिमाइंडर से 5 घंटे/सप्ताह बचाएं</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">बेहतर निर्णय</h4>
                  <p className="text-gray-600 text-sm">डेटा-ड्रिवन इनसाइट्स से सही फैसले लें</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic text-lg mb-4">
                "Premium प्लान से मेरी दुकान का मुनाफा 40% बढ़ गया! अब मैं डेटा के आधार पर सही निर्णय लेता हूं।"
              </p>
              <p className="text-gray-600 font-semibold">
                - राहुल गुप्ता, किराना स्टोर मालिक • Rahul Gupta, Grocery Store Owner
              </p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm mb-4">
                💳 सुरक्षित पेमेंट • 🔒 30-दिन मनी-बैक गारंटी • 📞 24/7 सपोर्ट
              </p>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                बाद में • Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentGateway
        isOpen={showPaymentGateway}
        onClose={handlePaymentClose}
        onPaymentSuccess={handlePaymentSuccess}
        amount={99}
        planName="SmartSahaayak Premium"
      />
    </>
  );
};

export default PaywallModal;