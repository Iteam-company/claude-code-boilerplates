import { ImageResponse } from 'next/og';
import { postService } from '@/modules/post';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = slug;
  try {
    const post = await postService.getBySlug(slug);
    title = post.title;
  } catch {}

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#0f172a',
        padding: 80,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 20, color: '#94a3b8', fontFamily: 'sans-serif' }}>
        Claude Code Boilerplate
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: '#f8fafc',
          lineHeight: 1.1,
          fontFamily: 'sans-serif',
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 18, color: '#475569', fontFamily: 'sans-serif' }}>
        claudecodeBoilerplate.dev/blog/{slug}
      </div>
    </div>,
    { ...size },
  );
}
