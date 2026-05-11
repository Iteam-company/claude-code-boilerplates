import { Resend } from 'resend';

// Feature flags — toggle these to enable/disable email flows
export const ENABLE_WELCOME_EMAIL = false;
export const ENABLE_EMAIL_VERIFICATION = false;

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = 'onboarding@resend.dev';
const APP_NAME = 'MyApp';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const emailService = {
  sendEmail: async ({ to, subject, html }: SendEmailOptions) => {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  },

  sendWelcomeEmail: async (email: string) => {
    await emailService.sendEmail({
      to: email,
      subject: `Welcome to ${APP_NAME}!`,
      html: `
        <h1>Welcome to ${APP_NAME}!</h1>
        <p>Hi there,</p>
        <p>Thanks for signing up. We're glad to have you on board.</p>
        <p>Get started by visiting your dashboard:</p>
        <a href="${BASE_URL}/dashboard" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Go to Dashboard</a>
      `,
    });
  },

  sendPasswordResetEmail: async (email: string, resetToken: string) => {
    const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`;

    await emailService.sendEmail({
      to: email,
      subject: `Reset your ${APP_NAME} password`,
      html: `
        <h1>Reset your password</h1>
        <p>Hi there,</p>
        <p>We received a request to reset your password. Click the link below to choose a new one.</p>
        <p>This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Reset Password</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  },

  sendVerificationEmail: async (email: string, verificationToken: string) => {
    const verifyUrl = `${BASE_URL}/verify-email?token=${verificationToken}`;

    await emailService.sendEmail({
      to: email,
      subject: `Verify your ${APP_NAME} email`,
      html: `
        <h1>Verify your email address</h1>
        <p>Hi there,</p>
        <p>Please verify your email address to activate your account.</p>
        <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">Verify Email</a>
        <p>If you didn't sign up, you can safely ignore this email.</p>
      `,
    });
  },
};
