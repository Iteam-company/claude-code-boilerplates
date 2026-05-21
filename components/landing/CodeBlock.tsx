'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  language: string;
  code: string;
  fontSize?: string;
}

export default function CodeBlock({
  language,
  code,
  fontSize = '0.75rem',
}: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        background: '#0a0a0a',
        fontSize,
        lineHeight: '1.6',
      }}
      codeTagProps={{ style: { fontSize } }}
      PreTag="div"
    >
      {code}
    </SyntaxHighlighter>
  );
}
