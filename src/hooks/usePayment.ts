import { useState, useCallback } from 'react';
import { testPaymentService, PaymentRequest, PaymentResult } from '../services/testPaymentService';
import { useAuth } from '../components/Auth/AuthContext';
import { useApp } from '../context/AppContext';

interface UsePaymentReturn {
  isProcessing: boolean;
  processPayment: (amount: number, description: string) => Promise<PaymentResult>;
  processUPIPayment: (upiId: string, amount: number, description: string) => Promise<PaymentResult>;
  processNetBankingPayment: (bankCode: string, amount: number, description: string) => Promise<PaymentResult>;
  processCardPayment: (cardData: any, amount: number, description: string) => Promise<PaymentResult>;
  validatePaymentData: (method: string, data: any) => { valid: boolean; error?: string };
  isTestMode: boolean;
  getConfigurationStatus: () => any;
}

export function usePayment(): UsePaymentReturn {
  const { state: authState } = useAuth();
  const { dispatch } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = useCallback(async (amount: number, description: string): Promise<PaymentResult> => {
    if (!authState.user) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    setIsProcessing(true);
    
    try {
      console.log('🔄 Starting test payment process:', { amount, description });
      
      const paymentRequest: PaymentRequest = {
        amount,
        currency: 'INR',
        description,
        customerName: authState.user.ownerName,
        customerEmail: authState.user.email,
        customerPhone: authState.user.phone,
      };

      const result = await testPaymentService.processPayment(paymentRequest);
      
      if (result.success) {
        console.log('✅ Test payment successful, upgrading user to pro');
        dispatch({ type: 'UPGRADE_TO_PRO' });
      } else {
        console.log('❌ Test payment failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('💥 Test payment processing error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      };
    } finally {
      setIsProcessing(false);
    }
  }, [authState.user, dispatch]);

  const processCardPayment = useCallback(async (cardData: any, amount: number, description: string): Promise<PaymentResult> => {
    if (!authState.user) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    setIsProcessing(true);
    
    try {
      console.log('💳 Processing test card payment:', { amount, description, cardNumber: cardData.cardNumber?.substring(0, 4) + '...' });
      
      const paymentRequest: PaymentRequest = {
        amount,
        currency: 'INR',
        description,
        customerName: authState.user.ownerName,
        customerEmail: authState.user.email,
        customerPhone: authState.user.phone,
      };

      const result = await testPaymentService.processPayment(paymentRequest);
      
      if (result.success) {
        console.log('✅ Test card payment successful, upgrading user to pro');
        dispatch({ type: 'UPGRADE_TO_PRO' });
      } else {
        console.log('❌ Test card payment failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('💥 Test card payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Card payment failed'
      };
    } finally {
      setIsProcessing(false);
    }
  }, [authState.user, dispatch]);

  const processUPIPayment = useCallback(async (upiId: string, amount: number, description: string): Promise<PaymentResult> => {
    setIsProcessing(true);
    
    try {
      console.log('📱 Processing test UPI payment:', { upiId, amount });
      
      const result = await testPaymentService.processUPIPayment(upiId, amount, description);
      
      if (result.success) {
        console.log('✅ Test UPI payment successful, upgrading user to pro');
        dispatch({ type: 'UPGRADE_TO_PRO' });
      } else {
        console.log('❌ Test UPI payment failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('💥 Test UPI payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'UPI payment failed'
      };
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch]);

  const processNetBankingPayment = useCallback(async (bankCode: string, amount: number, description: string): Promise<PaymentResult> => {
    if (!authState.user) {
      return {
        success: false,
        error: 'User not authenticated'
      };
    }

    setIsProcessing(true);
    
    try {
      console.log('🏦 Processing test Net Banking payment:', { bankCode, amount });
      
      const customerDetails = {
        name: authState.user.ownerName,
        email: authState.user.email,
        phone: authState.user.phone,
      };

      const result = await testPaymentService.processNetBankingPayment(bankCode, amount, customerDetails);
      
      if (result.success) {
        console.log('✅ Test Net Banking payment successful, upgrading user to pro');
        dispatch({ type: 'UPGRADE_TO_PRO' });
      } else {
        console.log('❌ Test Net Banking payment failed:', result.error);
      }
      
      return result;
    } catch (error) {
      console.error('💥 Test Net Banking payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Net banking payment failed'
      };
    } finally {
      setIsProcessing(false);
    }
  }, [authState.user, dispatch]);

  const validatePaymentData = useCallback((method: string, data: any) => {
    return testPaymentService.validatePaymentData(method, data);
  }, []);

  const getConfigurationStatus = useCallback(() => {
    return testPaymentService.getConfigurationStatus();
  }, []);

  return {
    isProcessing,
    processPayment,
    processUPIPayment,
    processNetBankingPayment,
    processCardPayment,
    validatePaymentData,
    isTestMode: true,
    getConfigurationStatus,
  };
}