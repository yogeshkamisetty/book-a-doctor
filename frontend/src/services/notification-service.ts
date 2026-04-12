// Email Service via Backend
// Using SendGrid (FREE TIER: 100 emails/day)
// Twilio SMS (FREE TIER: Sending only, no inbound)

export const emailService = {
  // Send email via backend
  sendEmail: async (data: {
    to: string;
    subject: string;
    template: string;
    variables?: Record<string, string>;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: 'Failed to send email' };
    }
  },

  // Send appointment confirmation
  sendAppointmentConfirmation: async (
    email: string,
    appointmentDetails: {
      doctorName: string;
      date: string;
      time: string;
      type: string;
    }
  ): Promise<void> => {
    await emailService.sendEmail({
      to: email,
      subject: 'Appointment Confirmation - Get the Doctor',
      template: 'appointment_confirmation',
      variables: appointmentDetails,
    });
  },

  // Send appointment reminder (backend will schedule this)
  sendAppointmentReminder: async (
    email: string,
    appointmentDetails: any
  ): Promise<void> => {
    await emailService.sendEmail({
      to: email,
      subject: 'Appointment Reminder - Get the Doctor',
      template: 'appointment_reminder',
      variables: appointmentDetails,
    });
  },
};

export const smsService = {
  // Send SMS via backend
  sendSMS: async (data: {
    phoneNumber: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { success: false, message: 'Failed to send SMS' };
    }
  },

  // Send OTP
  sendOTP: async (phoneNumber: string, otp: string): Promise<void> => {
    await smsService.sendSMS({
      phoneNumber,
      message: `Your Get the Doctor verification code is: ${otp}. Valid for 10 minutes.`,
    });
  },

  // Send appointment notification
  sendAppointmentNotification: async (
    phoneNumber: string,
    doctorName: string,
    appointmentTime: string
  ): Promise<void> => {
    await smsService.sendSMS({
      phoneNumber,
      message: `Your appointment with Dr. ${doctorName} is scheduled for ${appointmentTime}. Reply CONFIRM to confirm.`,
    });
  },
};
