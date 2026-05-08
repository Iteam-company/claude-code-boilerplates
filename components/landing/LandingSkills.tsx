import { Container } from '@/components/Container';

const capabilities = [
  { what: 'Add a new data type', example: '"add a categories feature"' },
  { what: 'Create a page or form', example: '"add a contact form page"' },
  { what: 'Fetch and display data', example: '"show posts on the homepage"' },
  { what: 'Run a database update', example: '"update the database schema"' },
  { what: 'Link related data', example: '"connect posts to categories"' },
  { what: 'Protect a route', example: '"make this page login-only"' },
  { what: 'Add image upload', example: '"let users upload a profile photo"' },
  { what: 'Deploy the app', example: '"deploy to Vercel"' },
  { what: 'Add a pricing page', example: '"add a pricing section with plans"' },
  {
    what: 'Add types and validation',
    example: '"add validation for this form"',
  },
  { what: 'Build a UI section', example: '"add a pricing section"' },
  { what: 'Query the database', example: '"get all posts by this user"' },
];

export function LandingSkills() {
  return (
    <section className="border-border bg-muted/40 border-b py-24">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
              Just say what you want. Claude knows how to build it.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              The boilerplate comes pre-loaded with instructions that tell
              Claude exactly how your app is structured. No setup, no
              re-explaining — Claude is ready to build from your very first
              message.
            </p>
            <p className="text-muted-foreground mt-6 text-sm">
              Say{' '}
              <span className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                &quot;add a categories feature&quot;
              </span>{' '}
              and Claude creates everything needed — the database table, the
              page, the form, and all the logic — in one go.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6">
            <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
              Things Claude can build for you
            </p>
            <div className="space-y-2">
              {capabilities.map((cap) => (
                <div
                  key={cap.what}
                  className="border-border flex items-center justify-between gap-4 rounded-lg border px-3 py-2"
                >
                  <span className="text-foreground shrink-0 text-sm font-medium">
                    {cap.what}
                  </span>
                  <span className="text-muted-foreground truncate text-right text-xs">
                    {cap.example}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
