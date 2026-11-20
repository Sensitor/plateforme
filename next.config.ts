import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // English keeps the unprefixed URLs, French lives under /fr. Pages are built under
  // app/[locale]: unprefixed paths are served from /en, and /en itself redirects back.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        // Everything except locale-prefixed paths, API and auth handlers, Next internals and files.
        { source: "/:path((?!(?:en|fr|api|auth|_next)(?:/|$))[^.]*)", destination: "/en/:path" },
      ],
    };
  },
};

export default nextConfig;
