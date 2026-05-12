import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  appName: string;
  resetUrl: string;
}

export function ResetPasswordEmail({
  appName,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your {appName} password</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Reset your password</Heading>
          <Text style={styles.text}>Hi there,</Text>
          <Text style={styles.text}>
            We received a request to reset your {appName} password. Click the
            button below to choose a new one.
          </Text>
          <Text style={styles.expiry}>This link expires in 1 hour.</Text>
          <Section style={styles.btnSection}>
            <Button href={resetUrl} style={styles.button}>
              Reset Password
            </Button>
          </Section>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            If you didn&apos;t request this, you can safely ignore this email.
            Your password won&apos;t change.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    margin: '0',
    padding: '0',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    margin: '40px auto',
    maxWidth: '560px',
    padding: '40px',
  },
  heading: {
    color: '#0a0a0a',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 24px',
  },
  text: {
    color: '#444444',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 16px',
  },
  expiry: {
    color: '#888888',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0 0 16px',
  },
  btnSection: {
    margin: '32px 0',
  },
  button: {
    backgroundColor: '#0a0a0a',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '600',
    padding: '12px 24px',
    textDecoration: 'none',
  },
  hr: {
    borderColor: '#e6e6e6',
    margin: '24px 0',
  },
  footer: {
    color: '#888888',
    fontSize: '13px',
    lineHeight: '20px',
    margin: '0',
  },
};
