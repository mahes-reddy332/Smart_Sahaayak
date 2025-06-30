import React, { useState } from 'react';
import { X, Crown, Check, Zap, TrendingUp, Award, Star, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TestPaymentGateway from '../Payment/TestPaymentGateway';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, feature }) => {
  const { dispatch } = useApp();
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const handleUpgradeClick = () => {
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = async () => {
    dispatch({ type: 'UPGRADE_TO_PRO' });
    setShowPaymentGateway(false);
    onClose();
    
    setTimeout(() => {
      alert(
        '🚀 Welcome to SmartSahaayak Pro!\n\n' +
        '✅ Advanced Analytics Unlocked\n' +
        '✅ All Premium Features Available\n\n' +
        'Enjoy your upgraded experience!'
      );
    }, 500);
  };

  const handlePaymentClose = () => {
    setShowPaymentGateway(false);
  };

  if (!isOpen) return null;

  const proFeatures = [
    'Advanced Analytics & Charts',
    'Profit/Loss Analysis',
    'Monthly Trend Graphs',
    'Top 5 Products Analysis',
    'Smart Business Tips',
    'PDF Report Downloads',
    'Automated Reminders',
    'Priority Support'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
          {/* Compact Header */}
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm inline-block mb-4">
                <Crown className="h-8 w-8 text-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upgrade to Premium</h2>
              <p className="text-pink-100">Unlock all advanced features</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Feature Access Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-blue-800 font-medium">
                You tried to access: <span className="font-bold">"{feature}"</span>
              </p>
              <p className="text-blue-600 text-sm mt-1">Upgrade to Pro to unlock this feature</p>
            </div>

            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mb-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl text-gray-500 line-through">₹199</span>
                  <span className="text-4xl font-bold text-purple-600">₹99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-purple-600 font-medium">or ₹999/year (Save 2 months!)</p>
                <p className="text-sm text-gray-500 mt-2">Test Mode - No Real Charges</p>
              </div>
              
              <button
                onClick={handleUpgradeClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Crown className="h-5 w-5" />
                <span>Test Upgrade Now</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>

            {/* Features Grid - Compact */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">What You'll Get:</h3>
              <div className="grid grid-cols-2 gap-3">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">30%</div>
                  <div className="text-xs text-green-700">More Profit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">5hrs</div>
                  <div className="text-xs text-green-700">Time Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-xs text-green-700">Support</div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">
                🧪 Test Mode • No Real Charges • Simulated Payment Processing
              </p>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Payment Gateway Modal */}
      <TestPaymentGateway
        isOpen={showPaymentGateway}
        onClose={handlePaymentClose}
        onPaymentSuccess={handlePaymentSuccess}
        amount={99}
        planName="SmartSahaayak Premium"
        productId="smartsahaayak_pro_monthly"
      />
    </>
  );
};

export default PaywallModal;