import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, CheckCircle, X, Crown, Loader, Star, Zap, AlertCircle, Settings, Info } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { usePayment } from '../../hooks/usePayment';
import { testPaymentService } from '../../services/testPaymentService';

interface TestPaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  planName: string;
  productId: string;
}

const TestPaymentGateway: React.FC<TestPaymentGatewayProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  amount, 
  planName
}) => {
  const { state: authState } = useAuth();
  const { 
    isProcessing, 
    processCardPayment, 
    processUPIPayment, 
    processNetBankingPayment, 
    validatePaymentData, 
    isTestMode 
  } = usePayment();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankName: ''
  });
  const [processingStep, setProcessingStep] = useState('');
  const [configStatus, setConfigStatus] = useState<any>(null);

  // Get test payment configuration status
  useEffect(() => {
    const status = testPaymentService.getConfigurationStatus();
    setConfigStatus(status);
    console.log('🧪 Test Payment Configuration:', status);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isProcessing) return;
    
    try {
      setProcessingStep('Validating payment details...');
      
      // Validate payment data
      const validation = validatePaymentData(paymentMethod, formData);
      if (!validation.valid) {
        alert(validation.error);
        setProcessingStep('');
        return;
      }

      let result;
      const description = `${planName} - SmartSahaayak Premium Subscription`;
      
      switch (paymentMethod) {
        case 'card':
          setProcessingStep('Processing test card payment...');
          result = await processCardPayment(formData, amount, description);
          break;
          
        case 'upi':
          setProcessingStep('Processing test UPI payment...');
          result = await processUPIPayment(formData.upiId, amount, description);
          break;
          
        case 'netbanking':
          setProcessingStep('Processing test net banking payment...');
          result = await processNetBankingPayment(formData.bankName, amount, description);
          break;
          
        default:
          throw new Error('Invalid payment method');
      }

      if (result.success) {
        setProcessingStep('Activating premium features...');
        
        // Small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onPaymentSuccess();
        onClose();
        
        // Show success message
        setTimeout(() => {
          alert(
            '🎉 Test Payment Successful!\n\n' +
            `✅ ${planName} activated\n` +
            '✅ Premium features unlocked\n' +
            '✅ Welcome to SmartSahaayak Pro!\n\n' +
            'You can now access all premium features.\n' +
            `Test Payment ID: ${result.paymentId}`
          );
        }, 500);
      } else {
        throw new Error(result.error || 'Test payment failed');
      }
    } catch (error) {
      console.error('Test payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Test payment processing error';
      alert(`Test payment failed: ${errorMessage}\n\nThis is a simulated payment for testing purposes.`);
    } finally {
      setProcessingStep('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden">
        <div className="flex h-full">
          {/* Left Side - Payment Details */}
          <div className="w-1/2 bg-gradient-to-br from-green-600 to-blue-600 p-6 text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10 -translate-x-10"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Test Payment Gateway</h2>
                    <p className="text-blue-100 text-sm">
                      Simulated Payment Processing - No Real Charges
                    </p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-blue-100 text-sm mb-1">Complete your upgrade to</p>
                    <h3 className="text-xl font-bold mb-2">{planName}</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold">₹{amount}</span>
                      <span className="text-blue-200">/month</span>
                    </div>
                    <p className="text-blue-100 text-xs mt-1">Test Mode • No Real Charges</p>
                  </div>
                </div>
              </div>

              {/* Test Mode Status */}
              <div className="mb-4">
                <div className="bg-green-500 bg-opacity-20 border border-green-300 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-green-300" />
                    <span className="font-bold text-white">Test Mode Active</span>
                  </div>
                  <p className="text-white text-xs mb-2">
                    This is a simulated payment gateway for testing purposes only
                  </p>
                  <div className="space-y-1">
                    <p className="text-green-100 text-xs">
                      ✅ No external dependencies
                    </p>
                    <p className="text-green-100 text-xs">
                      🧪 95% success rate simulation
                    </p>
                    <p className="text-green-100 text-xs">
                      💳 Test cards accepted
                    </p>
                  </div>
                </div>
              </div>

              {/* Test Features */}
              <div className="mb-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-5 w-5 text-green-300" />
                    <span className="font-bold">Test Payment Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-300" />
                      <span>Simulated processing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-300" />
                      <span>Multiple payment methods</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-300" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-300" />
                      <span>No real charges</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Features */}
              <div className="flex-1">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 h-full">
                  <h4 className="font-bold mb-3 flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-300" />
                    <span>What You'll Get:</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      'Advanced Analytics & Charts',
                      'Profit/Loss Analysis',
                      'Monthly Trend Graphs',
                      'Top 5 Products Analysis',
                      'Smart Business Tips',
                      'PDF Report Downloads',
                      'Automated Reminders',
                      'Priority Support'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-yellow-300 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Shield className="h-3 w-3" />
                  <span className="text-xs font-medium">
                    Test Mode • Simulated Processing • No Real Charges
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={isProcessing}
            >
              <X size={24} />
            </button>

            <div className="mt-8">
              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Test Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Test Card' },
                    { id: 'upi', icon: null, label: 'Test UPI' },
                    { id: 'netbanking', icon: null, label: 'Test Banking' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      disabled={isProcessing}
                    >
                      {method.icon ? (
                        <method.icon className="h-5 w-5 mx-auto mb-1" />
                      ) : (
                        <div className={`w-5 h-5 mx-auto mb-1 ${
                          method.id === 'upi' ? 'bg-orange-500' : 'bg-green-500'
                        } rounded text-white text-xs flex items-center justify-center font-bold`}>
                          {method.id === 'upi' ? 'UPI' : 'NET'}
                        </div>
                      )}
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Test Card Information</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      Use these test card details for simulation:
                    </p>
                    <div className="text-xs text-green-600 space-y-1">
                      <p><strong>Success:</strong> 4111 1111 1111 1111</p>
                      <p><strong>Decline:</strong> 4000 0000 0000 0002</p>
                      <p><strong>Expiry:</strong> 12/25 | <strong>CVV:</strong> 123</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Test User"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                        if (value.length <= 19) {
                          setFormData({ ...formData, cardNumber: value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="4111 1111 1111 1111"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
                          if (value.length <= 5) {
                            setFormData({ ...formData, expiryDate: value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="12/25"
                        required
                        disabled={isProcessing}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            setFormData({ ...formData, cvv: value });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="123"
                        required
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5" />
                        <span>Test Pay ₹{amount} & Upgrade to Pro</span>
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Test UPI ID
                    </label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="test@paytm"
                      required
                      disabled={isProcessing}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter any UPI ID format for testing (e.g., test@paytm, demo@gpay)
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5" />
                        <span>Test UPI Pay - ₹{amount}</span>
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Net Banking Form */}
              {paymentMethod === 'netbanking' && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Test Bank
                    </label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                      disabled={isProcessing}
                    >
                      <option value="">Choose a test bank</option>
                      {testPaymentService.getSupportedBanks().map(bank => (
                        <option key={bank.code} value={bank.code}>{bank.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="h-5 w-5" />
                        <span>Test Net Banking - ₹{amount}</span>
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Processing Status */}
              {isProcessing && processingStep && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Loader className="h-5 w-5 animate-spin text-green-600" />
                    <span className="text-green-800 font-medium">{processingStep}</span>
                  </div>
                </div>
              )}

              {/* Test Mode Notice */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Test Mode:</strong> This is a simulated payment gateway for testing purposes only. 
                  No real money will be charged. 95% success rate for demonstration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPaymentGateway;