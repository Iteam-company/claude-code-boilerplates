import { Container } from '@/components/Container';

const stack = [
  { name: 'Vercel', description: 'Deploys automatically on every push' },
  {
    name: 'Neon DB',
    description: 'Serverless database — no management needed',
  },
  { name: 'Cloudinary', description: 'Image and file storage in the cloud' },
  { name: 'GitHub', description: 'Push code — Vercel picks it up instantly' },
  { name: 'Next.js', description: 'Fast, SEO-friendly web app framework' },
  { name: 'Tailwind CSS', description: 'Beautiful design out of the box' },
  {
    name: 'Dark / Light mode',
    description: 'Switches automatically with the system',
  },
  { name: 'User auth', description: 'Login and register, already built in' },
  {
    name: 'Forms & validation',
    description: 'Inputs that catch errors before submit',
  },
  { name: 'Image uploads', description: 'Users can upload photos and files' },
  {
    name: 'Content pages',
    description: 'Landing pages, docs, or blog — any text content',
  },
  { name: 'Mobile ready', description: 'Works on phone, tablet, and desktop' },
];

export function LandingStack() {
  return (
    <section className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            Powered by tools that just work
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every piece of the stack was chosen so you never have to think about
            it — it&apos;s configured, connected, and ready.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <div
              key={item.name}
              className="border-border bg-card flex items-center gap-3 rounded-xl border px-4 py-3"
            >
              <span className="bg-primary/10 text-primary flex h-2 w-2 shrink-0 rounded-full" />
              <div>
                <span className="text-foreground text-sm font-medium">
                  {item.name}
                </span>
                <p className="text-muted-foreground text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
