import { getTranslations } from 'next-intl/server';
import { CheckoutButton } from './CheckoutButton';

interface PricingFeature {
  text: string;
}

interface Props {
  name: string;
  description: string;
  price: string;
  period?: string;
  priceId?: string;
  href?: string;
  mode?: 'payment' | 'subscription';
  features: PricingFeature[];
  highlighted?: boolean;
  ctaLabel?: string;
}

export async function PricingCard({
  name,
  description,
  price,
  period,
  priceId,
  href,
  mode = 'payment',
  features,
  highlighted = false,
  ctaLabel,
}: Props) {
  const t = await getTranslations('checkout');

  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 ${highlighted ? 'border-primary bg-primary/5 shadow-lg' : 'border-border bg-card'}`}
    >
      {highlighted && (
        <span className="bg-primary text-primary-foreground mb-4 self-start rounded-full px-3 py-1 text-xs font-semibold">
          {t('mostPopular')}
        </span>
      )}
      <h3 className="text-foreground text-xl font-bold">{name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>

      <div className="mt-6 flex items-end gap-1">
        <span className="text-foreground text-4xl font-bold">{price}</span>
        {period && (
          <span className="text-muted-foreground mb-1 text-sm">/{period}</span>
        )}
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {features.map((f) => (
          <li
            key={f.text}
            className="text-foreground flex items-center gap-2 text-sm"
          >
            <svg
              className="text-primary h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {f.text}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {href ? (
          <a
            href={href}
            className={`block w-full rounded-md px-6 py-2.5 text-center text-sm font-medium ${
              highlighted
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-border text-foreground hover:bg-muted border'
            }`}
          >
            {ctaLabel ?? t('buyNow')}
          </a>
        ) : (
          <CheckoutButton
            priceId={priceId!}
            mode={mode}
            label={
              ctaLabel ??
              (mode === 'subscription' ? t('subscribe') : t('buyNow'))
            }
            className={`w-full rounded-md px-6 py-2.5 text-sm font-medium disabled:opacity-50 ${
              highlighted
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border-border text-foreground hover:bg-muted border'
            }`}
          />
        )}
      </div>
    </div>
  );
}
