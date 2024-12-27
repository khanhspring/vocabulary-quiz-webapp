import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    AUTH_URL: process.env.AUTH_URL,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
  },
};

export default nextConfig;
