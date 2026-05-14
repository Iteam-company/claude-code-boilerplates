import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function DemoPage() {
  redirect(ROUTES.DEMO_DASHBOARD);
}
