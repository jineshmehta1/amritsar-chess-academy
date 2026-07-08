// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/programs', destination: '/curriculum', permanent: false },
      { source: '/online-classes', destination: '/classes', permanent: false },
      { source: '/puzzle-arena', destination: '/analysis', permanent: false },
      { source: '/login', destination: '/contact', permanent: false },
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'host',
            value: 'theamritsarchessclub.com',
          },
        ],
        destination: 'https://www.theamritsarchessclub.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;