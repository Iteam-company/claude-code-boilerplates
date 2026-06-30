import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Next.js Boilerplate — Ship SaaS in Days';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background:
          'linear-gradient(135deg, #09090b 0%, #0f0f12 50%, #0c0c10 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
      }}
    >
      {/* subtle glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
          display: 'flex',
        }}
      />

      {/* top label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '40px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '100px',
          padding: '8px 20px',
        }}
      >
        <span
          style={{
            color: '#71717a',
            fontSize: '18px',
            letterSpacing: '0.05em',
          }}
        >
          Next.js SaaS Boilerplate
        </span>
      </div>

      {/* title */}
      <div
        style={{
          color: '#ffffff',
          fontSize: '72px',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-2.5px',
          textAlign: 'center',
          marginBottom: '24px',
          display: 'flex',
        }}
      >
        Claude Code Boilerplate
      </div>

      {/* subtitle */}
      <div
        style={{
          color: '#71717a',
          fontSize: '26px',
          fontWeight: 400,
          lineHeight: 1.4,
          textAlign: 'center',
          maxWidth: '760px',
          marginBottom: '56px',
          display: 'flex',
        }}
      >
        Ship a SaaS in days, not weeks. Free forever.
      </div>

      {/* tags */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {['Auth', 'Payments', 'Blog', 'AI Chat', 'Multi-tenancy'].map((tag) => (
          <div
            key={tag}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '10px 20px',
              color: '#a1a1aa',
              fontSize: '17px',
              display: 'flex',
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
