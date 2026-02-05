import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  experimental: {
    optimizePackageImports: ['@repo/ui', 'lucide-react'],
  },
};

export default nextConfig;
