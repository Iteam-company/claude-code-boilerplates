import { Container } from '@/components/Container';

const skills = [
  { name: 'drizzle-module', trigger: '"add a categories module"' },
  { name: 'nextjs-api-route', trigger: '"add a POST endpoint for posts"' },
  { name: 'swr-hooks', trigger: '"I need to fetch posts on the client"' },
  { name: 'drizzle-migrate', trigger: '"run the migration"' },
  { name: 'drizzle-relations', trigger: '"add a relation between tables"' },
  { name: 'auth-patterns', trigger: '"protect this route"' },
  { name: 'cloudinary-upload', trigger: '"add image upload"' },
  { name: 'vercel-deploy', trigger: '"deploy to Vercel"' },
  { name: 'nextjs-mdx-blog', trigger: '"set up the MDX blog"' },
  { name: 'dto-patterns', trigger: '"add types for this module"' },
  { name: 'ui-patterns', trigger: '"add a hero section"' },
  { name: 'db-patterns', trigger: '"write a query with relations"' },
];

export function LandingSkills() {
  return (
    <section className="border-border bg-muted/40 border-b py-24">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
              Claude knows exactly what to build — every time.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Skills are context documents that load automatically when you ask
              Claude to build something. No re-explaining architecture. No
              drift. Just consistent, pattern-correct code.
            </p>
            <p className="text-muted-foreground mt-6 text-sm">
              Say{' '}
              <span className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                &quot;add a categories module&quot;
              </span>{' '}
              and Claude scaffolds all 7 files — schema, relations, types,
              validation, repo, service, and index — in one shot, following your
              exact conventions.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6">
            <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
              12 included skills
            </p>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="border-border flex items-center justify-between gap-4 rounded-lg border px-3 py-2"
                >
                  <span className="text-foreground shrink-0 font-mono text-sm font-medium">
                    {skill.name}
                  </span>
                  <span className="text-muted-foreground truncate text-right text-xs">
                    {skill.trigger}
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
