'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

export interface SkillTab {
  id: string;
  name: string;
  description: string;
  trigger: string;
  html: string;
  pro?: boolean;
}

interface Props {
  skills: SkillTab[];
  heading: string;
  subheading: string;
  youType: string;
  claudeScaffolds: string;
  proBadge: string;
}

export function SkillsShowcaseTabs({
  skills,
  heading,
  subheading,
  youType,
  claudeScaffolds,
  proBadge,
}: Props) {
  const [active, setActive] = useState(skills[0].id);
  const skill = skills.find((s) => s.id === active)!;

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">{subheading}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="overflow-x-auto border-b border-zinc-800">
            <div className="flex min-w-max px-4">
              {skills.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    'flex items-center gap-1.5 border-b-2 px-4 py-3.5 font-mono text-xs whitespace-nowrap transition-colors',
                    active === s.id
                      ? 'border-sky-400 text-sky-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200',
                  )}
                >
                  /{s.name}
                  {s.pro && (
                    <span className="rounded bg-amber-500/20 px-1 py-0.5 font-sans text-[10px] font-semibold text-amber-400">
                      {proBadge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-zinc-300">
              {skill.description}
            </p>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                {youType}
              </p>
              <div className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
                <span className="font-mono text-sm text-sky-400">›</span>
                <span className="font-mono text-sm text-zinc-200">
                  {skill.trigger}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                {claudeScaffolds}
              </p>
              <div
                className="overflow-hidden rounded-lg border border-zinc-800 [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!bg-[#0a0a0a] [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: skill.html }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
