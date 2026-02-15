import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/api", "@repo/utils"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: true,
};

export default nextConfig;
