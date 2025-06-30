// Test-Only Payment Service for SmartSahaayak
// Simulates payment processing without external dependencies

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

class TestPaymentService {
  private isTestMode: boolean = true;

  constructor() {
    console.log('🧪 Test Payment Service initialized - No external dependencies');
  }

  // Simulate payment processing with realistic delays and success rates
  async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResult> {
    return new Promise((resolve) => {
      console.log('💳 Processing test payment:', paymentRequest);
      
      // Simulate processing delay
      setTimeout(() => {
        // 95% success rate for testing
        const isSuccess = Math.random() > 0.05;
        
        if (isSuccess) {
          const paymentId = `pay_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const orderId = `order_test_${Date.now()}`;
          
          console.log('✅ Test payment successful:', paymentId);
          resolve({
            success: true,
            paymentId,
            orderId
          });
        } else {
          const errors = [
            'Payment declined by test bank',
            'Insufficient test funds',
            'Test card expired',
            'Test network timeout',
            'Invalid test card details',
            'Test transaction limit exceeded'
          ];
          const randomError = errors[Math.floor(Math.random() * errors.length)];
          
          console.log('❌ Test payment failed:', randomError);
          resolve({
            success: false,
            error: randomError
          });
        }
      }, 2000); // 2 second delay to simulate real payment processing
    });
  }

  // UPI Test Payment
  async processUPIPayment(upiId: string, amount: number, description: string): Promise<PaymentResult> {
    console.log('📱 Processing test UPI payment:', { upiId, amount });
    
    if (!upiId || upiId.trim().length < 3) {
      return {
        success: false,
        error: 'Please enter a valid UPI ID'
      };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.05;
        
        if (isSuccess) {
          console.log('✅ Test UPI payment successful');
          resolve({
            success: true,
            paymentId: `upi_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            orderId: `order_upi_test_${Date.now()}`,
          });
        } else {
          const errors = [
            'Test UPI ID not found',
            'Test transaction declined',
            'Test daily limit exceeded',
            'Test UPI service unavailable',
            'Invalid test UPI PIN'
          ];
          const randomError = errors[Math.floor(Math.random() * errors.length)];
          
          console.log('❌ Test UPI payment failed:', randomError);
          resolve({
            success: false,
            error: randomError
          });
        }
      }, 1500);
    });
  }

  // Net Banking Test Payment
  async processNetBankingPayment(bankCode: string, amount: number, customerDetails: any): Promise<PaymentResult> {
    console.log('🏦 Processing test Net Banking payment:', { bankCode, amount });
    
    if (!bankCode) {
      return {
        success: false,
        error: 'Please select a bank'
      };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.05;
        
        if (isSuccess) {
          console.log('✅ Test Net Banking payment successful');
          resolve({
            success: true,
            paymentId: `nb_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            orderId: `order_nb_test_${Date.now()}`,
          });
        } else {
          const errors = [
            'Test bank service unavailable',
            'Invalid test credentials',
            'Test transaction timeout',
            'Test daily limit exceeded',
            'Test account temporarily blocked'
          ];
          const randomError = errors[Math.floor(Math.random() * errors.length)];
          
          console.log('❌ Test Net Banking payment failed:', randomError);
          resolve({
            success: false,
            error: randomError
          });
        }
      }, 2500);
    });
  }

  // Validate payment data
  validatePaymentData(method: string, data: any): { valid: boolean; error?: string } {
    switch (method) {
      case 'upi':
        if (!data.upiId || data.upiId.trim().length < 3) {
          return { valid: false, error: 'Please enter a valid UPI ID' };
        }
        break;
      case 'netbanking':
        if (!data.bankName) {
          return { valid: false, error: 'Please select a bank' };
        }
        break;
      case 'card':
        if (!data.cardNumber || data.cardNumber.replace(/\s/g, '').length < 16) {
          return { valid: false, error: 'Please enter a valid card number' };
        }
        if (!data.expiryDate || data.expiryDate.length < 5) {
          return { valid: false, error: 'Please enter a valid expiry date' };
        }
        if (!data.cvv || data.cvv.length < 3) {
          return { valid: false, error: 'Please enter a valid CVV' };
        }
        if (!data.cardholderName || data.cardholderName.trim().length < 2) {
          return { valid: false, error: 'Please enter cardholder name' };
        }
        break;
      default:
        return { valid: false, error: 'Invalid payment method' };
    }
    
    return { valid: true };
  }

  // Get supported banks for testing
  getSupportedBanks() {
    return [
      { code: 'sbi', name: 'State Bank of India (Test)' },
      { code: 'hdfc', name: 'HDFC Bank (Test)' },
      { code: 'icici', name: 'ICICI Bank (Test)' },
      { code: 'axis', name: 'Axis Bank (Test)' },
      { code: 'kotak', name: 'Kotak Mahindra Bank (Test)' },
      { code: 'pnb', name: 'Punjab National Bank (Test)' },
      { code: 'bob', name: 'Bank of Baroda (Test)' },
      { code: 'canara', name: 'Canara Bank (Test)' },
      { code: 'union', name: 'Union Bank of India (Test)' },
      { code: 'indian', name: 'Indian Bank (Test)' },
      { code: 'yes', name: 'Yes Bank (Test)' },
      { code: 'idbi', name: 'IDBI Bank (Test)' }
    ];
  }

  // Get test card details
  getTestCards() {
    return {
      success: [
        { number: '4111 1111 1111 1111', type: 'Test Visa', expiry: '12/25', cvv: '123' },
        { number: '5555 5555 5555 4444', type: 'Test Mastercard', expiry: '12/25', cvv: '123' },
        { number: '6074 6000 0000 0007', type: 'Test RuPay', expiry: '12/25', cvv: '123' }
      ],
      failure: [
        { number: '4000 0000 0000 0002', type: 'Test Declined', expiry: '12/25', cvv: '123' },
        { number: '4000 0000 0000 0069', type: 'Test Expired', expiry: '12/25', cvv: '123' }
      ]
    };
  }

  // Get configuration status
  getConfigurationStatus() {
    return {
      isTestMode: true,
      environment: 'Test Only',
      message: 'Test mode active - simulated payments only',
      paymentMethods: ['card', 'upi', 'netbanking'],
      testCardsAvailable: true
    };
  }
}

export const testPaymentService = new TestPaymentService();
export type { PaymentRequest, PaymentResult };