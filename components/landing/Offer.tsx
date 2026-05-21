import { Container } from '@/components/Container';
import { PricingCTAButton } from './PricingCTAButton';
import { FadeIn } from './FadeIn';

const FREE_FEATURES = [
  'Stripe checkout',
  'Subscriptions',
  'Webhooks',
  'Customer portal',
  'Auth (login, verify, reset)',
  'Email (Resend + react-email)',
  'File uploads (Cloudinary)',
  'MDX blog',
  'Dark / light theme',
];

const PRO_FEATURES = [
  '40+ skills',
  '11 agents',
  'MCP configs',
  'Multi-tenancy',
  'AI / Claude module',
  'Premium skill packs',
  'Lifetime updates',
  'Private Discord',
];

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="border-border bg-background text-muted-foreground rounded-md border px-2.5 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

export function Offer() {
  return (
    <section className="py-24">
      <Container>
        <FadeIn>
          <h2 className="text-foreground mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight md:text-5xl">
            Free includes what others charge for. Pro includes what others
            don&apos;t have.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Free card */}
            <div className="border-border bg-muted/30 flex flex-col rounded-2xl border p-8">
              <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">
                Free forever
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                Stripe subscriptions. Customer portal. Email verification.
                Password reset. File uploads. All production-ready. All free.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                ShipFast charges $199 for the same stack. supastarter charges
                $261. We give it away because the real value is the Claude Code
                workflow on top.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {FREE_FEATURES.map((f) => (
                  <FeatureChip key={f} label={f} />
                ))}
              </div>
              <PricingCTAButton
                plan="free"
                label="Get the free version →"
                highlighted={false}
              />
            </div>

            {/* Pro card */}
            <div className="border-primary/20 bg-primary/5 flex flex-col rounded-2xl border p-8">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase">
                Claude Code superpowers
              </p>
              <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                40+ Claude Code skills, 11 custom agents, MCP server configs,
                and the multi-tenancy + AI modules. The workflow layer that
                turns a boilerplate into a build-anything machine.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {PRO_FEATURES.map((f) => (
                  <FeatureChip key={f} label={f} />
                ))}
              </div>
              <PricingCTAButton
                plan="pro"
                label="Reserve your free spot →"
                highlighted
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
