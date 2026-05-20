'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function TerminalSnippet({ code }: { code: string }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-800">
      <SyntaxHighlighter
        language="bash"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#0a0a0a',
          fontSize: '11px',
          lineHeight: '1.6',
          whiteSpace: 'pre',
        }}
        codeTagProps={{ style: { fontSize: '11px' } }}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
