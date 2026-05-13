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

interface InvitationEmailProps {
  appName: string;
  invitedByEmail: string;
  acceptUrl: string;
}

export function InvitationEmail({
  appName,
  invitedByEmail,
  acceptUrl,
}: InvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {invitedByEmail} invited you to join an organization on {appName}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>You&apos;ve been invited</Heading>
          <Text style={styles.text}>Hi there,</Text>
          <Text style={styles.text}>
            <strong>{invitedByEmail}</strong> has invited you to join their
            organization on {appName}.
          </Text>
          <Text style={styles.text}>
            Click the button below to accept the invitation. This link expires
            in 7 days.
          </Text>
          <Section style={styles.btnSection}>
            <Button href={acceptUrl} style={styles.button}>
              Accept Invitation
            </Button>
          </Section>
          <Text style={styles.hint}>
            If you were not expecting this invitation, you can safely ignore
            this email.
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
    margin: '32px 0 24px',
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
  hint: {
    color: '#888888',
    fontSize: '13px',
    lineHeight: '20px',
    margin: '0',
  },
};
