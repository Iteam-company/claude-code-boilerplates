import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'github-dark-default' })
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        // allow rehype-pretty-code class/style output on code blocks
        code: [...(defaultSchema.attributes?.code ?? []), 'className', 'style'],
        span: [...(defaultSchema.attributes?.span ?? []), 'className', 'style'],
        pre: [...(defaultSchema.attributes?.pre ?? []), 'className', 'style'],
      },
    })
    .use(rehypeStringify)
    .process(content);

  return String(result);
}
