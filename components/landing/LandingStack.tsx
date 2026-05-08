import { Container } from '@/components/Container';

const stack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn UI',
  'Drizzle ORM',
  'Neon DB',
  'JWT auth',
  'bcryptjs',
  'Zod v4',
  'React Hook Form',
  'SWR',
  'next-themes',
  'sonner',
  'Recharts',
  'Cloudinary',
];

export function LandingStack() {
  return (
    <section className="border-border border-b py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            A modern, production-ready stack
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every library chosen for reliability, TypeScript support, and Claude
            Code compatibility.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="border-border bg-card text-foreground rounded-full border px-4 py-2 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
