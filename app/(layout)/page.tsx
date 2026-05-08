import type { Metadata } from 'next';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingStats } from '@/components/landing/LandingStats';
import { LandingProblem } from '@/components/landing/LandingProblem';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingSkills } from '@/components/landing/LandingSkills';
import { LandingStack } from '@/components/landing/LandingStack';
import { LandingSteps } from '@/components/landing/LandingSteps';
import { LandingCTA } from '@/components/landing/LandingCTA';

export const metadata: Metadata = {
  title: {
    absolute:
      'Claude Code Boilerplate — Next.js starter for AI-first development',
  },
  description:
    '12 pre-built Claude Code skills, 3 MCP servers, full-stack auth, Drizzle + Neon DB. Everything Claude needs to build your product — configured on day one.',
  openGraph: {
    title: 'Claude Code Boilerplate — Next.js starter for AI-first development',
    description:
      '12 pre-built Claude Code skills, 3 MCP servers, full-stack auth, Drizzle + Neon DB. Everything Claude needs to build your product — configured on day one.',
    url: '/',
  },
  twitter: {
    title: 'Claude Code Boilerplate — Next.js starter for AI-first development',
    description:
      '12 pre-built Claude Code skills, 3 MCP servers, full-stack auth, Drizzle + Neon DB. Everything Claude needs to build your product — configured on day one.',
  },
};

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingStats />
      <LandingProblem />
      <LandingFeatures />
      <LandingSkills />
      <LandingStack />
      <LandingSteps />
      <LandingCTA />
    </>
  );
}
