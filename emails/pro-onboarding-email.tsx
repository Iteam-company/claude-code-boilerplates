import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ProOnboardingEmailProps {
  appName: string;
  githubUsername: string;
  docsUrl: string;
  discordUrl: string;
}

export function ProOnboardingEmail({
  appName,
  githubUsername,
  docsUrl,
  discordUrl,
}: ProOnboardingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Your {appName} Pro access is confirmed -- check your GitHub invite
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </Section>

          <Heading style={styles.heading}>
            Welcome to {appName} Pro, {githubUsername}!
          </Heading>

          <Text style={styles.text}>
            Your payment is confirmed. Here is what happens next.
          </Text>

          <Section style={styles.stepsSection}>
            <Text style={styles.stepsHeading}>Getting access</Text>
            <Text style={styles.step}>
              <strong>1. Accept your GitHub invite</strong>
              <br />A repository invite has been sent to your GitHub account{' '}
              <strong>@{githubUsername}</strong>. Check your GitHub
              notifications or email from GitHub and accept the invite to gain
              access to the private repository.
            </Text>
            <Text style={styles.step}>
              <strong>2. Clone &amp; install</strong>
              <br />
              Once you have accepted the invite, clone the repo and run{' '}
              <code style={styles.code}>npm install</code>.
            </Text>
            <Text style={styles.step}>
              <strong>3. Configure &amp; run</strong>
              <br />
              Copy <code style={styles.code}>.env.example</code> to{' '}
              <code style={styles.code}>.env</code>, fill in your credentials,
              then run <code style={styles.code}>npm run db:push</code> and{' '}
              <code style={styles.code}>npm run dev</code>.
            </Text>
          </Section>

          <Section style={styles.linksSection}>
            <Text style={styles.linksHeading}>Resources</Text>
            <Text style={styles.linkItem}>
              <Link href={docsUrl} style={styles.link}>
                Documentation
              </Link>{' '}
              -- full setup guide, API reference, and conventions
            </Text>
            <Text style={styles.linkItem}>
              <Link href={discordUrl} style={styles.link}>
                Discord community
              </Link>{' '}
              -- ask questions, get help, and share what you build
            </Text>
          </Section>

          <Section style={styles.noteSection}>
            <Text style={styles.noteText}>
              Did not receive the GitHub invite? Reply to this email with your
              GitHub username and we will resend it manually.
            </Text>
          </Section>

          <Text style={styles.footer}>
            You received this email because you purchased {appName} Pro. Reply
            to this email for any support questions.
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
  badge: {
    margin: '0 0 20px',
  },
  badgeText: {
    backgroundColor: '#0a0a0a',
    borderRadius: '4px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    margin: '0',
    padding: '3px 8px',
  },
  heading: {
    color: '#0a0a0a',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 16px',
  },
  text: {
    color: '#444444',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 16px',
  },
  stepsSection: {
    borderLeft: '3px solid #0a0a0a',
    margin: '24px 0',
    paddingLeft: '16px',
  },
  stepsHeading: {
    color: '#0a0a0a',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    margin: '0 0 12px',
    textTransform: 'uppercase' as const,
  },
  step: {
    color: '#444444',
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0 0 12px',
  },
  code: {
    backgroundColor: '#f3f4f6',
    borderRadius: '3px',
    color: '#0a0a0a',
    fontFamily: 'monospace',
    fontSize: '13px',
    padding: '1px 4px',
  },
  linksSection: {
    margin: '24px 0',
  },
  linksHeading: {
    color: '#0a0a0a',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    margin: '0 0 12px',
    textTransform: 'uppercase' as const,
  },
  linkItem: {
    color: '#444444',
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0 0 8px',
  },
  link: {
    color: '#0a0a0a',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  noteSection: {
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    margin: '24px 0',
    padding: '16px',
  },
  noteText: {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0',
  },
  footer: {
    borderTop: '1px solid #e5e7eb',
    color: '#9ca3af',
    fontSize: '13px',
    lineHeight: '20px',
    margin: '24px 0 0',
    paddingTop: '16px',
  },
};
