import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse (via pdfjs-dist) resolves its worker file relative to its own
  // package at runtime; bundling it with webpack/Turbopack breaks that
  // resolution. Load it as a native Node dependency instead.
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
