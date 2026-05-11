import { Container } from '../Container';
import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="w-full bg-black text-white">
      <Container className="py-4">
        <p>{t('info')}</p>
      </Container>
    </footer>
  );
}
