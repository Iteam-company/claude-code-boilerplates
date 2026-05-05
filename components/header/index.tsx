import Link from 'next/link';

const links = [{ title: 'Home', href: '/' }];

export const Header = () => {
  return (
    <div className="flex justify-center">
      <header className="y-4 mt-2 rounded-full border border-black px-6">
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            {link.title}
          </Link>
        ))}
      </header>
    </div>
  );
};
