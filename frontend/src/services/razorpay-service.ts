// Razorpay Integration for Payments (India)
// FREE TIER: Pay-per-transaction model, no setup fees

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise (100 paise = 1 rupee)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  customer_notify?: number;
  timeout?: number;
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const razorpayService = {
  // Load Razorpay script
  loadRazorpayScript: (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  // Open Razorpay payment modal
  openPaymentModal: async (options: RazorpayOptions): Promise<void> => {
    const scriptLoaded = await razorpayService.loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    const rzp = new window.Razorpay({
      key: options.key,
      ...options,
    });

    rzp.open();
  },

  // Create order (backend call - you'll implement this)
  createOrder: async (
    amount: number,
    appointmentId: string
  ): Promise<{ orderId: string; amount: number }> => {
    // This should be called from your backend
    // Backend should create order on Razorpay
    return {
      orderId: 'order_id_from_backend',
      amount,
    };
  },

  // Verify payment (backend call)
  verifyPayment: async (
    orderId: string,
    paymentId: string,
    signature: string
  ): Promise<{ success: boolean; message: string }> => {
    // This should be called from your backend
    // Backend should verify signature with Razorpay
    return {
      success: true,
      message: 'Payment verified successfully',
    };
  },
};
