import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  appName: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ appName, dashboardUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {appName} — you&apos;re all set!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Welcome to {appName}!</Heading>
          <Text style={styles.text}>Hi there,</Text>
          <Text style={styles.text}>
            Thanks for signing up. We&apos;re glad to have you on board.
          </Text>
          <Text style={styles.text}>
            Get started by visiting your dashboard:
          </Text>
          <Section style={styles.btnSection}>
            <Button href={dashboardUrl} style={styles.button}>
              Go to Dashboard
            </Button>
          </Section>
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
    margin: '32px 0 0',
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
};
