import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override built-in HTML elements with your own styled versions:
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-semibold">{children}</h2>
    ),
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ...components,
  };
}
