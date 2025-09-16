import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Enable tree shaking
    esmExternals: true,
  },
  // Optimize server components
  serverExternalPackages: ['gray-matter', 'js-yaml'],
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Webpack optimizations
  webpack: (config: any, { dev }) => {
    // Tree shaking optimization
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
      // Dead code elimination
      minimize: !dev,
      minimizer: [
        ...config.optimization.minimizer,
        // Add custom minimizer for better dead code elimination
      ],
    };

    // Bundle analyzer (only when ANALYZE=true)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: './bundle-analysis.html',
          generateStatsFile: true,
          statsFilename: './bundle-stats.json',
        })
      );
    }

    // Optimize imports for better tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      // Ensure ESM modules are used for better tree shaking
      'lucide-react': 'lucide-react/dist/esm',
    };

    // Add performance budgets
    config.performance = {
      maxAssetSize: 500000, // 500KB
      maxEntrypointSize: 500000, // 500KB
      hints: dev ? 'warning' : 'error',
    };

    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites for API optimization
  async rewrites() {
    return [
      {
        source: '/api/projects',
        destination: '/api/projects/index',
      },
    ];
  },
};

export default nextConfig;
