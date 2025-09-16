import { getProjectById } from '@/lib/projects';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = getProjectById(slug);
    
    if (!project) {
      return new Response('Project not found', { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || project.title;
    const status = searchParams.get('status') || project.status;
    const stack = searchParams.get('stack') || project.stack.slice(0, 3).join(', ');
    const updated = searchParams.get('updated') || new Date(project.pushedAt).toLocaleDateString();

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
            {/* Status badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: status === 'complete' ? '#10b981' : status === 'in-progress' ? '#f59e0b' : '#6b7280',
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
              {status === 'complete' ? 'Complete' : status === 'in-progress' ? 'In Progress' : 'Archived'}
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

            {/* Stack chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '32px',
                justifyContent: 'center',
              }}
            >
              {stack.split(',').slice(0, 3).map((tech, index) => (
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
                  {tech.trim()}
                </div>
              ))}
            </div>

            {/* Updated date */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#9ca3af',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '8px' }}
              >
                <path
                  d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13H12.01M12 17H12.01M8 17H8.01M16 17H16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Updated {updated}
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
            justinwessels.vercel.app
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
