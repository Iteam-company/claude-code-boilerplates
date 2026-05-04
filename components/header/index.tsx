import Link from "next/link";

const links = [{ title: "Home", href: "/" }];

export const Header = () => {
  return (
    <header className="border border-black rounded-full px-6 y-4 mt-2 w-auto">
      {links.map((link) => (
        <Link key={link.title} href={link.href}>
          {link.title}
        </Link>
      ))}
    </header>
  );
};
