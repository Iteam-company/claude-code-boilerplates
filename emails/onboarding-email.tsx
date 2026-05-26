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

interface OnboardingEmailProps {
  appName: string;
  githubUrl: string;
  docsUrl: string;
  discordUrl: string;
}

export function OnboardingEmail({
  appName,
  githubUrl,
  docsUrl,
  discordUrl,
}: OnboardingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your free {appName} access -- repo link inside</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Padding lives on <td> (Column), not <table> (Section/Container) */}
          <Section>
            <Row>
              <Column style={styles.inner}>
                <Heading style={styles.heading}>Welcome to {appName}!</Heading>

                <Text style={styles.text}>
                  Thanks for signing up. Here is everything you need to get
                  started with your free boilerplate.
                </Text>

                <Section style={styles.btnSection}>
                  <Button href={`${githubUrl}/generate`} style={styles.button}>
                    Use this template →
                  </Button>
                </Section>

                {/* Steps — border-left + padding-left on <td> */}
                <Section style={styles.stepsSection}>
                  <Row>
                    <Column style={styles.stepsCell}>
                      <Text style={styles.stepsHeading}>
                        Quick start (4 steps)
                      </Text>
                      <Text style={styles.step}>
                        <strong>1. Create your repo from the template</strong>
                        <br />
                        Click the button above (or go to the repo and hit "Use
                        this template"). GitHub creates a fresh copy under your
                        account -- your commits stay yours.
                      </Text>
                      <Text style={styles.step}>
                        <strong>2. Clone &amp; install</strong>
                        <br />
                        Clone your new repo and run{' '}
                        <code style={styles.code}>npm install</code>.
                      </Text>
                      <Text style={styles.step}>
                        <strong>3. Configure environment</strong>
                        <br />
                        Copy <code style={styles.code}>
                          .env.example
                        </code> to <code style={styles.code}>.env</code> and
                        fill in your database URL, JWT secret, and any optional
                        services (Stripe, Resend, Cloudinary).
                      </Text>
                      <Text style={styles.step}>
                        <strong>4. Run migrations &amp; start</strong>
                        <br />
                        Run <code style={styles.code}>
                          npm run db:push
                        </code>{' '}
                        then <code style={styles.code}>npm run dev</code> to
                        launch locally.
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Section style={styles.linksSection}>
                  <Text style={styles.linksHeading}>Useful links</Text>
                  <Text style={styles.linkItem}>
                    <Link href={docsUrl} style={styles.link}>
                      Documentation
                    </Link>{' '}
                    -- setup guides, API reference, and conventions
                  </Text>
                  <Text style={styles.linkItem}>
                    <Link href={discordUrl} style={styles.link}>
                      Discord community
                    </Link>{' '}
                    -- ask questions and share what you build
                  </Text>
                  <Text style={styles.linkItem}>
                    <Link href={githubUrl} style={styles.link}>
                      GitHub repository
                    </Link>{' '}
                    -- source code and issue tracker
                  </Text>
                </Section>

                <Text style={styles.footer}>
                  You received this email because you signed up for the free{' '}
                  {appName} boilerplate. Reply to this email if you have any
                  questions.
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
    borderLeft: '3px solid #e5e7eb',
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
  footer: {
    borderTop: '1px solid #e5e7eb',
    color: '#9ca3af',
    fontSize: '13px',
    lineHeight: '20px',
    margin: '24px 0 0',
    paddingTop: '16px',
  },
};
