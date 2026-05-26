import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface ProOnboardingEmailProps {
  appName: string;
  githubUsername: string;
  repoUrl: string;
  docsUrl: string;
  discordUrl: string;
}

export function ProOnboardingEmail({
  appName,
  githubUsername,
  repoUrl,
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
          <Section>
            <Row>
              <Column style={styles.inner}>
                <Text style={styles.badgeText}>PRO</Text>

                <Heading style={styles.heading}>
                  Welcome to {appName} Pro, {githubUsername}!
                </Heading>

                <Text style={styles.text}>
                  Your payment is confirmed. Here is what happens next.
                </Text>

                <Section style={styles.stepsSection}>
                  <Row>
                    <Column style={styles.stepsCell}>
                      <Text style={styles.stepsHeading}>Getting access</Text>
                      <Text style={styles.step}>
                        <strong>1. Accept your GitHub invite</strong>
                        <br />A repository invite has been sent to your GitHub
                        account <strong>@{githubUsername}</strong>. Check your
                        GitHub notifications or email from GitHub and accept the
                        invite to gain access to the private repository.
                      </Text>
                      <Text style={styles.step}>
                        <strong>2. Clone &amp; install</strong>
                        <br />
                        Once you have accepted the invite, clone the Pro repo
                        and run <code style={styles.code}>npm install</code>.
                      </Text>
                      <Text style={styles.step}>
                        <strong>3. Configure &amp; run</strong>
                        <br />
                        Copy <code style={styles.code}>
                          .env.example
                        </code> to <code style={styles.code}>.env</code>, fill
                        in your credentials, then run{' '}
                        <code style={styles.code}>npm run db:push</code> and{' '}
                        <code style={styles.code}>npm run dev</code>.
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Section style={styles.btnSection}>
                  <Button href={repoUrl} style={styles.button}>
                    Open Pro repo →
                  </Button>
                </Section>

                <Section>
                  <Row>
                    <Column style={styles.discordCell}>
                      <Text style={styles.discordHeading}>
                        Join the Pro community
                      </Text>
                      <Text style={styles.discordText}>
                        Get direct access to the Pro Discord channel -- connect
                        with other Pro members, ask questions, and share what
                        you build.
                      </Text>
                      <Button href={discordUrl} style={styles.discordButton}>
                        Join Pro Discord →
                      </Button>
                    </Column>
                  </Row>
                </Section>

                <Section style={styles.linksSection}>
                  <Text style={styles.linksHeading}>Resources</Text>
                  <Text style={styles.linkItem}>
                    <Link href={docsUrl} style={styles.link}>
                      Documentation
                    </Link>{' '}
                    -- full setup guide, API reference, and conventions
                  </Text>
                </Section>

                <Section>
                  <Row>
                    <Column style={styles.noteCell}>
                      <Text style={styles.noteText}>
                        Did not receive the GitHub invite? Reply to this email
                        with your GitHub username and we will resend it
                        manually.
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Text style={styles.footer}>
                  You received this email because you purchased {appName} Pro.
                  Reply to this email for any support questions.
                </Text>
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
  badgeText: {
    backgroundColor: '#0a0a0a',
    borderRadius: '4px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    margin: '0 0 20px',
    paddingTop: '3px',
    paddingRight: '8px',
    paddingBottom: '3px',
    paddingLeft: '8px',
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
  btnSection: {
    marginTop: '24px',
    marginBottom: '24px',
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
  stepsSection: {
    marginTop: '24px',
    marginBottom: '24px',
  },
  stepsCell: {
    borderLeft: '3px solid #0a0a0a',
    margin: '16px 0',
    paddingTop: '12px',
    paddingBottom: '12px',
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
    paddingTop: '1px',
    paddingRight: '4px',
    paddingBottom: '1px',
    paddingLeft: '4px',
  },
  discordCell: {
    backgroundColor: '#5865f2',
    borderRadius: '8px',
    paddingTop: '20px',
    paddingRight: '24px',
    paddingBottom: '20px',
    paddingLeft: '24px',
    textAlign: 'center' as const,
  },
  discordHeading: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    margin: '0 0 6px',
  },
  discordText: {
    color: '#dde1ff',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0 0 16px',
  },
  discordButton: {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    color: '#5865f2',
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '700',
    paddingTop: '10px',
    paddingRight: '20px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    textDecoration: 'none',
  },
  linksSection: {
    marginTop: '24px',
    marginBottom: '24px',
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
  noteCell: {
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    paddingTop: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
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
