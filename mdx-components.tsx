import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-foreground mt-8 mb-4 text-3xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-foreground mt-8 mb-3 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-foreground mt-6 mb-2 text-xl font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-foreground mt-4 mb-2 text-lg font-semibold">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-foreground/90 my-4 leading-7">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? '#'}
        className="text-foreground font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="text-foreground/90 my-4 ml-6 list-disc space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-foreground/90 my-4 ml-6 list-decimal space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="text-muted-foreground border-border my-4 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted border-border my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed">
        {children}
      </pre>
    ),
    hr: () => <hr className="border-border my-8" />,
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table className="border-border w-full border-collapse text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-border border-b">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-border border-b last:border-0">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="text-foreground px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="text-foreground/90 px-4 py-2">{children}</td>
    ),
    ...components,
  };
}
