import Link from "next/link";

const links = [{ title: "Home", href: "/" }];

export const Header = () => {
  return (
    <div className="flex justify-center">
      <header className="border border-black rounded-full px-6 y-4 mt-2">
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            {link.title}
          </Link>
        ))}
      </header>
    </div>
  );
};
