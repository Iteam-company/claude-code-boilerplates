import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <Hero
      title="Your Blog Title"
      subtitle="A short description of what this blog is about and who it is for."
      cta={{ label: 'Read the blog', href: '/blog' }}
      secondaryCta={{ label: 'Learn more', href: '#about' }}
    />
  );
}
