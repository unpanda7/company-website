import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com'
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/zh-CN',
        permanent: true
      }
    ]
  }
};

export default withNextIntl(nextConfig);
