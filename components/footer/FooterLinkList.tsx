import Link from 'next/link';

interface LinkItem {
  label: string;
  href: string;
  target?: string;
}

interface Props {
  heading: string;
  links: LinkItem[];
}

export function FooterLinkList({ heading, links }: Props) {
  return (
    <div>
      <h2 className="text-foreground text-sm font-semibold">{heading}</h2>
      <ul className="mt-3 space-y-2">
        {links.map(({ label, href, target }) => (
          <li key={label}>
            <Link
              href={href}
              target={target}
              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
