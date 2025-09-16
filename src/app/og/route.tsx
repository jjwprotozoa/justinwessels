import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Justin Wessels - Full Stack Developer';
    const description = searchParams.get('description') || 'Portfolio of Justin Wessels, a passionate full-stack developer creating innovative web applications and digital experiences.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        >
          {/* Main content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#111111',
              borderRadius: '24px',
              padding: '60px',
              maxWidth: '800px',
              width: '90%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Developer badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Full Stack Developer
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                margin: '0 0 24px 0',
                lineHeight: '1.2',
                maxWidth: '700px',
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '20px',
                color: '#d1d5db',
                textAlign: 'center',
                margin: '0 0 32px 0',
                maxWidth: '600px',
                lineHeight: '1.4',
              }}
            >
              {description}
            </p>

            {/* Tech stack chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
                justifyContent: 'center',
              }}
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'].map((tech, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#1f2937',
                    color: '#d1d5db',
                    padding: '8px 16px',
                    borderRadius: '16px',
                    fontSize: '16px',
                    fontWeight: '500',
                    border: '1px solid #374151',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            justinwessels.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Error generating image', { status: 500 });
  }
}
