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

interface VerifyEmailProps {
  appName: string;
  verifyUrl: string;
}

export function VerifyEmail({ appName, verifyUrl }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your {appName} email address</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Verify your email address</Heading>
          <Text style={styles.text}>Hi there,</Text>
          <Text style={styles.text}>
            Thanks for signing up for {appName}. Please verify your email
            address to activate your account.
          </Text>
          <Section style={styles.btnSection}>
            <Button href={verifyUrl} style={styles.button}>
              Verify Email
            </Button>
          </Section>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            If you didn&apos;t sign up for {appName}, you can safely ignore this
            email.
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
