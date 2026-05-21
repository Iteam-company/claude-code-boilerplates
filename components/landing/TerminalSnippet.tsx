'use client';

import dynamic from 'next/dynamic';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: false,
  loading: () => (
    <pre className="min-h-16 bg-[#0a0a0a] p-4 font-mono text-[11px] leading-relaxed whitespace-pre text-zinc-300" />
  ),
});

export function TerminalSnippet({ code }: { code: string }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
      <CodeBlock language="bash" code={code} fontSize="10px" />
    </div>
  );
}
