import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  appName: string;
  dashboardUrl: string;
}

export function WelcomeEmail({ appName, dashboardUrl }: WelcomeEmailProps) {
  const safeUrl = dashboardUrl.startsWith('https://') ? dashboardUrl : '#';
  return (
    <Html>
      <Head />
      <Preview>Welcome to {appName} -- you&apos;re all set!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Row>
              <Column style={styles.inner}>
                <Heading style={styles.heading}>Welcome to {appName}!</Heading>
                <Text style={styles.text}>Hi there,</Text>
                <Text style={styles.text}>
                  Thanks for signing up. We&apos;re glad to have you on board.
                </Text>
                <Text style={styles.text}>
                  Get started by visiting your dashboard:
                </Text>
                <Section style={styles.btnSection}>
                  <Button href={safeUrl} style={styles.button}>
                    Go to Dashboard
                  </Button>
                </Section>
              </Column>
            </Row>
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
  },
  inner: {
    paddingTop: '40px',
    paddingRight: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
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
    marginTop: '32px',
    marginBottom: '0',
  },
  button: {
    backgroundColor: '#0a0a0a',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '600',
    paddingTop: '12px',
    paddingRight: '24px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    textDecoration: 'none',
  },
};
