import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, X, Crown, Loader } from 'lucide-react';

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  planName: string;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  amount, 
  planName 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankName: ''
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate payment success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        // Payment successful
        onPaymentSuccess();
        onClose();
        
        // Show success message
        alert(
          '🎉 Payment Successful!\n\n' +
          `✅ ${planName} activated\n` +
          '✅ Premium features unlocked\n' +
          '✅ Welcome to SmartSahaayak Pro!\n\n' +
          'You can now access all premium features.'
        );
      } else {
        // Payment failed
        alert(
          '❌ Payment Failed\n\n' +
          'Your payment could not be processed. Please try again with different payment details.\n\n' +
          'Common issues:\n' +
          '• Insufficient balance\n' +
          '• Invalid card details\n' +
          '• Network connectivity'
        );
      }
    } catch (error) {
      alert('Payment processing error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            disabled={isProcessing}
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
              <CreditCard className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Secure Payment</h2>
              <p className="text-blue-100">Complete your upgrade to {planName}</p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Amount:</span>
              <span className="text-3xl font-bold">₹{amount}</span>
            </div>
            <p className="text-blue-100 text-sm mt-1">Includes all taxes • Secure payment</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  UPI
                </div>
                <span className="text-sm font-medium">UPI</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  NET
                </div>
                <span className="text-sm font-medium">Net Banking</span>
              </button>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cardholder name"
                    required
                    disabled={isProcessing}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    required
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </>
            )}

            {/* UPI Payment Form */}
            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="yourname@paytm / yourname@gpay"
                  required
                  disabled={isProcessing}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter your UPI ID (Google Pay, PhonePe, Paytm, etc.)
                </p>
              </div>
            )}

            {/* Net Banking Form */}
            {paymentMethod === 'netbanking' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isProcessing}
                >
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                  <option value="bob">Bank of Baroda</option>
                </select>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Secure Payment • SSL Encrypted • PCI DSS Compliant
                </span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-6 w-6 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Crown className="h-6 w-6" />
                  <span>Pay ₹{amount} & Upgrade to Pro</span>
                  <CheckCircle className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> This is a simulated payment gateway. No real money will be charged. 
              The payment will be processed after 3 seconds with a 90% success rate for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;