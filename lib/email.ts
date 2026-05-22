import React from 'react';
import { Resend } from 'resend';

// Feature flags — toggle these to enable/disable email flows
export const ENABLE_WELCOME_EMAIL = false;
export const ENABLE_EMAIL_VERIFICATION = false;

const resend = new Resend(process.env.RESEND_API_KEY);

const RESEND_SANBOX_FROM_EMAIL =
  process.env.NO_REPLY_EMAIL || 'onboarding@resend.dev';
export const APP_NAME = 'MyApp';
export const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  react: React.ReactElement;
}

export const emailService = {
  sendEmail: async ({
    to,
    from = RESEND_SANBOX_FROM_EMAIL,
    subject,
    react,
  }: SendEmailOptions) => {
    const { error } = await resend.emails.send({
      from: from,
      to,
      subject,
      react,
    });
    if (error) throw new Error(`Failed to send email: ${error.message}`);
  },
};
