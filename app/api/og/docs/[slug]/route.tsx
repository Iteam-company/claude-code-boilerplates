import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getDoc } from '@/lib/docs';
import { getBaseUrl } from '@/lib/utils';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const title = doc?.title ?? slug;

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
      <div
        style={{
          display: 'flex',
          fontSize: 20,
          color: '#94a3b8',
          fontFamily: 'sans-serif',
        }}
      >
        Claude Code Boilerplate — Docs
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          fontWeight: 700,
          color: '#f8fafc',
          lineHeight: 1.1,
          fontFamily: 'sans-serif',
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 18,
          color: '#475569',
          fontFamily: 'sans-serif',
        }}
      >
        {`${getBaseUrl()}/docs/${slug}`}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
