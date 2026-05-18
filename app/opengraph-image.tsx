import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Claude Code Boilerplate';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          ⚡
        </div>
        <span style={{ color: '#a1a1aa', fontSize: '20px', fontWeight: 500 }}>
          claude-code-boilerplates
        </span>
      </div>

      <div
        style={{
          color: '#ffffff',
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-2px',
          marginBottom: '24px',
        }}
      >
        Claude Code Boilerplate
      </div>

      <div
        style={{
          color: '#71717a',
          fontSize: '28px',
          fontWeight: 400,
          lineHeight: 1.4,
          maxWidth: '800px',
        }}
      >
        Next.js 16 + Neon DB starter pre-wired for Claude Code
      </div>

      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '80px',
          display: 'flex',
          gap: '12px',
        }}
      >
        {['Auth', 'Payments', 'Blog', 'AI'].map((tag) => (
          <div
            key={tag}
            style={{
              background: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#a1a1aa',
              fontSize: '16px',
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
