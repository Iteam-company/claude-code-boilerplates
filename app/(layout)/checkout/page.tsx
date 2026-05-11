import type { Metadata } from 'next';
import { PricingSection } from '@/components/checkout/PricingSection';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose a plan to get started.',
};

export default function CheckoutPage() {
  return <PricingSection />;
}
