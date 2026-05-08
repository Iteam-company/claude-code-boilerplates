import { Container } from '@/components/Container';

const stats = [
  { value: '12', label: 'Claude Code skills' },
  { value: '3', label: 'MCP servers ready' },
  { value: '7', label: 'Files per module' },
  { value: '0', label: 'Config to write' },
];

export function LandingStats() {
  return (
    <section className="border-border bg-muted/40 border-b py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-foreground text-4xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
