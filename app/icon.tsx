import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Indigo glow behind the bolt */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '360px',
          height: '360px',
          borderRadius: '180px',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)',
          display: 'flex',
        }}
      />
      {/* Lightning bolt — points in a 100×100 viewBox, centered */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="60,5 28,52 50,52 15,95 85,48 60,48 85,5"
          fill="white"
        />
      </svg>
    </div>,
    { ...size },
  );
}
