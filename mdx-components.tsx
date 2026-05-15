import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ children, className, ...props }) => (
      <h1
        className={cn(
          'text-foreground mt-10 mb-4 scroll-mt-20 text-3xl font-bold tracking-tight',
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, className, ...props }) => (
      <h2
        className={cn(
          'text-foreground mt-10 mb-3 scroll-mt-20 text-2xl font-semibold tracking-tight',
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    ),

    h3: ({ children, className, ...props }) => (
      <h3
        className={cn(
          'text-foreground mt-8 mb-2 scroll-mt-20 text-xl font-semibold',
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    ),

    h4: ({ children, className, ...props }) => (
      <h4
        className={cn(
          'text-foreground mt-6 mb-2 scroll-mt-20 text-base font-semibold',
          className,
        )}
        {...props}
      >
        {children}
      </h4>
    ),

    p: ({ children, className, ...props }) => (
      <p className={cn('text-foreground my-5 leading-7', className)} {...props}>
        {children}
      </p>
    ),

    a: ({ children, className, ...props }) => (
      <a
        className={cn(
          'text-foreground decoration-border hover:decoration-foreground underline underline-offset-4 transition-colors',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    ),

    strong: ({ children, className, ...props }) => (
      <strong
        className={cn('text-foreground font-semibold', className)}
        {...props}
      >
        {children}
      </strong>
    ),

    blockquote: ({ children, className, ...props }) => (
      <blockquote
        className={cn(
          'border-border text-muted-foreground my-6 border-l-4 pl-6 italic',
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    ),

    code: ({ children, className, ...props }) => {
      const isBlock = !!className?.startsWith('language-');
      if (isBlock) {
        return (
          <code className={cn('font-mono text-sm', className)} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className={cn(
            'bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.875em]',
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    },

    pre: ({ children, className, ...props }) => {
      return (
        <pre
          className={cn(
            'bg-muted border-border my-6 overflow-x-auto rounded-lg border px-6 py-4 text-sm leading-relaxed',
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      );
    },

    ul: ({ children, className, ...props }) => (
      <ul
        className={cn(
          'text-foreground my-5 list-disc space-y-1.5 pl-6',
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    ),

    ol: ({ children, className, ...props }) => (
      <ol
        className={cn(
          'text-foreground my-5 list-decimal space-y-1.5 pl-6',
          className,
        )}
        {...props}
      >
        {children}
      </ol>
    ),

    li: ({ children, className, ...props }) => (
      <li className={cn('leading-7', className)} {...props}>
        {children}
      </li>
    ),

    hr: ({ className, ...props }) => (
      <hr className={cn('border-border my-10', className)} {...props} />
    ),

    table: ({ children, className, ...props }) => (
      <div className="border-border my-6 overflow-x-auto rounded-lg border">
        <table className={cn('w-full text-sm', className)} {...props}>
          {children}
        </table>
      </div>
    ),

    thead: ({ children, className, ...props }) => (
      <thead className={cn('bg-muted', className)} {...props}>
        {children}
      </thead>
    ),

    th: ({ children, className, ...props }) => (
      <th
        className={cn(
          'text-foreground border-border border-b px-4 py-2.5 text-left font-semibold',
          className,
        )}
        {...props}
      >
        {children}
      </th>
    ),

    td: ({ children, className, ...props }) => (
      <td
        className={cn(
          'text-muted-foreground border-border border-b px-4 py-2.5 last:[tr:last-child>&]:border-b-0',
          className,
        )}
        {...props}
      >
        {children}
      </td>
    ),
  };
}
