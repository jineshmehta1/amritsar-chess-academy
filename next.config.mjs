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
      {
        source: '/:path*',
        has: [  // Only match if host is non-www
          {
            type: 'header',
            key: 'host',
            value: 'theamritsarchessclub.com',  // Your non-www domain
          },
        ],
        destination: 'https://www.theamritsarchessclub.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;