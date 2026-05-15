'use client';
import Link from 'next/link';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { usePost } from '@/hooks/api/post';
import { Container } from '@/components/Container';
import type { ComponentProps } from 'react';

interface Props {
  slug: string;
}

type CodeProps = ComponentProps<'code'> & { inline?: boolean };

export function BlogPost({ slug }: Props) {
  const { data: post, isLoading, error } = usePost(slug);
  const { resolvedTheme } = useTheme();

  const CodeBlock = ({ inline, className, children, ...rest }: CodeProps) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const language = match?.[1] ?? 'text';
    const code = String(children).replace(/\n$/, '');

    if (inline || !match) {
      return (
        <code
          className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
          {...rest}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={language}
        style={resolvedTheme === 'dark' ? oneDark : oneLight}
        customStyle={{
          borderRadius: '0.5rem',
          fontSize: '0.8125rem',
          margin: '1.5rem 0',
        }}
      >
        {code}
      </SyntaxHighlighter>
    );
  };

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          ← All posts
        </Link>

        {isLoading && (
          <div className="text-muted-foreground mt-8 text-sm">Loading…</div>
        )}

        {error && (
          <div className="text-destructive mt-8 text-sm">
            Failed to load post. Please try again.
          </div>
        )}

        {post && (
          <>
            <header className="mt-8 mb-10">
              <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {post.title}
              </h1>
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                <time dateTime={new Date(post.createdAt).toISOString()}>
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </time>
              </div>
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <>{children}</>,
                  code: CodeBlock,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </>
        )}
      </div>
    </Container>
  );
}
