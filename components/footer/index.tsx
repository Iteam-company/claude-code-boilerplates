import Link from 'next/link';
import { Container } from '@/components/Container';

const footerLinks = [{ title: 'Blog', href: '/blog' }];

export function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Boilerplate. All rights reserved.
          </p>

          <nav className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
