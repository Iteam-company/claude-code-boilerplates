import Link from 'next/link';

interface LinkItem {
  label: string;
  href: string;
}

interface Props {
  heading: string;
  links: LinkItem[];
}

export function FooterLinkList({ heading, links }: Props) {
  return (
    <div>
      <h3 className="text-foreground text-sm font-semibold">{heading}</h3>
      <ul className="mt-3 space-y-2">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
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
